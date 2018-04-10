from __future__ import unicode_literals

import argparse
import collections
import logging
import os
import time

import numpy as np
import tensorflow as tf

from .do import play
from .export import export_model
from .memory import Memory
from .network import BounceBot, get_copy_op
from .summary import compute_game_statistics


LEARNING_RATE = 1e-3
BATCH_SIZE = 50
ITERATIONS_BETWEEN_SAVE = 1e2
ITERATIONS_BETWEEN_LOCAL_SAVE = 10
NUM_GAMES_BEFORE_TRAINING = 2
COPY_STEPS = 30
LOGGING_STEPS = 10
MEMORY_SIZE = 1e4
DISCOUNT_RATE = 0.95

logger = logging.getLogger(__name__)


def play_game(session, actor):
    worlds, won = play(session, actor)
    return worlds, won


def main(model_dir='checkpoints', export=False, export_local=False):
    logging.basicConfig(level=logging.INFO, format="%(asctime)s (%(levelname)s) %(message)s")
    tf.reset_default_graph()

    iteration = 0
    save_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), model_dir, 'bouncebot')
    model_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), model_dir)

    logger.info('Loading the graph')
    actor = BounceBot('actor', learning_rate=LEARNING_RATE)
    critic = BounceBot('critic', learning_rate=LEARNING_RATE)
    copy_critic_to_actor = get_copy_op(actor, critic)

    saver = tf.train.Saver()
    checkpoint_path = tf.train.latest_checkpoint(model_path)
    model_save_path = None

    with tf.Session() as session:
        if not checkpoint_path:
            session.run(tf.global_variables_initializer())
        else:
            saver.restore(session, checkpoint_path)
            iteration = critic.get_global_step(session)

        saver.save(session, save_path, global_step=iteration)

        summary_writer = tf.summary.FileWriter('./summary_log/train', session.graph)

        replay_memory = Memory(MEMORY_SIZE)
        rolling_scores = collections.deque([], maxlen=100)

        best_loss = float('Inf')
        best_loss_iteration = 0
        last_saved_loss = float('Inf')

        while True:
            iteration += 1
            start = time.time()

            games = []
            while 1:
                worlds, won = play_game(session, actor)
                replay_memory.add_worlds(worlds)
                games.append(worlds)

                if len(games) == NUM_GAMES_BEFORE_TRAINING:
                    break

            X_in, actions, rewards, X_out, carry_on = replay_memory.sample_memories(BATCH_SIZE)
            next_q_values = actor.get_q_values(session, X_out, training=True)
            max_next_q_values = np.max(next_q_values, axis=1, keepdims=True)
            targets = rewards + DISCOUNT_RATE * np.multiply(max_next_q_values, carry_on.reshape((len(carry_on), 1)))

            critic.train(session, X_in, actions, targets)

            mean_reward, mean_worlds_length, mean_num_lives, scores = compute_game_statistics(games)

            rolling_scores.extend(scores)
            num_victories_last_100_games = 100.0 * np.mean(rolling_scores) if len(rolling_scores) == 100 else 0.0

            summary, losses = critic.compute_summary(session, X_in, actions, targets, training=True, statistics=dict(
                mean_reward=mean_reward,
                mean_worlds_length=mean_worlds_length,
                mean_num_lives=mean_num_lives,
                num_victories_last_100_games=num_victories_last_100_games,
            ),)
            mean_loss = np.mean(losses)

            summary_writer.add_summary(summary, global_step=iteration)

            if mean_loss < best_loss:
                best_loss = mean_loss
                best_loss_iteration = iteration

            if iteration % LOGGING_STEPS == 0:
                logger.info('-------------------')
                logger.info('iteration: %d', iteration)
                logger.info('loss: %f', mean_loss)
                logger.info('best loss: %f (%d)', best_loss, best_loss_iteration)
                logger.info('Elapsed (total): %f', time.time() - start)
                logger.info('-------------------')

            if iteration % COPY_STEPS == 0:
                copy_critic_to_actor.run()

            if iteration % ITERATIONS_BETWEEN_LOCAL_SAVE == 0:
                model_save_path = saver.save(session, save_path, global_step=iteration)
                if export_local:
                    export_model(saver, model_save_path, local=True)

            if export and iteration % ITERATIONS_BETWEEN_SAVE == 0:
                if best_loss < last_saved_loss:
                    export_model(saver, model_save_path, best=True)
                    last_saved_loss = best_loss
                else:
                    export_model(saver, model_save_path)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--export', default=False, action='store_true')
    parser.add_argument('--export-local', '--export_local', default=False, action='store_true')

    args = parser.parse_args()

    main(export=args.export, export_local=args.export_local)

from __future__ import unicode_literals

import argparse
import logging
import os
import time

import numpy as np
import tensorflow as tf

from .export import export_model
from .features import get_training_features, split_features, get_features_from_games
from .neural_net import BounceDNN
from .play import play
from .summary import compute_game_statistics, update_rolling_scores


LEARNING_RATE = 1e-3
EPSILON = 1e-8
BATCH_SIZE = 10  # Number of games to play between training steps
ITERATIONS_BETWEEN_SAVE = 1e3
ITERATIONS_BETWEEN_LOCAL_SAVE = 10

logger = logging.getLogger(__name__)


def play_game((session, bounce_dnn)):
    game_start = time.time()
    logger.info('Game start')
    worlds, won = play(session, bounce_dnn)

    X, rewards, labels = get_training_features(worlds)
    logger.info(
        'Game end: %s (%d worlds; %d frames; Score: -%d) - elapsed: %f | mean reward: %s %s',
        'WON' if won else 'LOST',
        len(worlds.worlds),
        worlds.worlds[-1].frame_nb,
        sum(b.lives for b in worlds.worlds[-1].bricks),
        time.time() - game_start,
        np.mean(rewards),
        "| dead" if worlds.worlds[-1].ball.dead else ""
    )
    return X, rewards, labels, worlds


def main(model_dir='checkpoints', export=False, export_local=False):
    logging.basicConfig(level=logging.INFO, format="%(asctime)s (%(levelname)s) %(message)s")
    tf.reset_default_graph()

    iteration = 0
    save_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), model_dir, 'bouncebot')
    model_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), model_dir)

    logger.info('Loading the graph')
    bounce_dnn = BounceDNN(learning_rate=LEARNING_RATE, epsilon=EPSILON)

    checkpoint_path = tf.train.latest_checkpoint(model_path)

    saver = tf.train.Saver()
    model_save_path = None
    with tf.Session() as session:
        if not checkpoint_path:
            session.run(tf.global_variables_initializer())
        else:
            saver.restore(session, checkpoint_path)
            iteration = bounce_dnn.get_global_step(session)

        saver.save(session, save_path, global_step=iteration)

        summary_writer_train = tf.summary.FileWriter('./summary_log/train', session.graph)
        summary_writer_test = tf.summary.FileWriter('./summary_log/test', session.graph)

        best_loss = float('Inf')
        best_loss_iteration = 0
        last_saved_loss = float('Inf')

        rolling_scores = []

        while True:
            iteration += 1
            start = time.time()

            logger.info('------ Play -------')

            games = []
            for _ in xrange(BATCH_SIZE):
                games.append(play_game((session, bounce_dnn)))

            logger.info('Elapsed (play): %f', time.time() - start)

            logger.info('------ Train ------')

            learning_start = time.time()

            mean_reward, mean_worlds_length, mean_num_lives, scores = compute_game_statistics(games)

            num_victories_last_100_games = update_rolling_scores(rolling_scores, scores)

            X, rewards, labels = get_features_from_games(games)

            X_train, X_test, rewards_train, _, labels_train, labels_test = split_features(X, rewards, labels)

            all_gradients = bounce_dnn.compute_gradients(session, X_train, rewards_train, labels_train)

            new_gradients = np.mean(all_gradients, axis=0)

            bounce_dnn.apply_gradients(session, new_gradients)

            logger.info('Elapsed (train): %f', time.time() - learning_start)

            test_summary, loss = bounce_dnn.compute_summary(session, X_test, labels_test)
            mean_loss = np.mean(loss)

            if mean_loss < best_loss:
                logger.info('Saving new best model')
                model_save_path = saver.save(session, save_path, global_step=iteration)
                best_loss = mean_loss
                best_loss_iteration = iteration

            logger.info('iteration: %d', iteration)
            logger.info('loss: %f', mean_loss)
            logger.info('best loss: %f (%d)', best_loss, best_loss_iteration)
            logger.info('Elapsed (total): %f', time.time() - start)

            if export and iteration % ITERATIONS_BETWEEN_SAVE == 0:
                if best_loss < last_saved_loss:
                    export_model(saver, model_save_path, best=True)
                    last_saved_loss = best_loss
                else:
                    export_model(saver, model_save_path)

            if export_local and iteration % ITERATIONS_BETWEEN_LOCAL_SAVE == 0:
                export_model(saver, model_save_path, local=True)

            logger.info('Writing summary')
            train_summary, _ = bounce_dnn.compute_summary(
                session, X_train, labels_train,
                statistics=dict(
                    mean_reward=mean_reward,
                    mean_worlds_length=mean_worlds_length,
                    mean_num_lives=mean_num_lives,
                    num_victories_last_100_games=num_victories_last_100_games,
                ),
                training=True
            )
            summary_writer_train.add_summary(train_summary, global_step=iteration)
            summary_writer_test.add_summary(test_summary, global_step=iteration)

            logger.info('-------------------')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--export', default=False, action='store_true')
    parser.add_argument('--export-local', '--export_local', default=False, action='store_true')

    args = parser.parse_args()

    main(export=args.export, export_local=args.export_local)

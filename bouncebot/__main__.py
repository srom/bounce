from __future__ import unicode_literals

import argparse
import logging
from multiprocessing.dummy import Pool as ThreadPool, cpu_count
import os
import time

import numpy as np
import tensorflow as tf

from .train.export import export_model
from train.features import get_training_features, split_features, get_features_from_games
from .train.neural_net import BounceDNN
from .train.play import play


LEARNING_RATE = 0.01
BATCH_SIZE = 10  # Number of games to play between training steps

logger = logging.getLogger(__name__)


def play_game((session, bounce_dnn)):
    game_start = time.time()
    logger.info('Game start')
    worlds, won = play(session, bounce_dnn)

    X, rewards, labels = get_training_features(worlds)
    logger.info(
        'Game end: %s (%d worlds) - elapsed: %f',
        'WON' if won else 'LOST',
        len(worlds.worlds),
        time.time() - game_start,
    )
    return X, rewards, labels


def main(model_dir='checkpoints', export=False):
    logging.basicConfig(level=logging.INFO, format="%(asctime)s (%(levelname)s) %(message)s")
    tf.reset_default_graph()

    iteration = 0
    save_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), model_dir, 'bouncebot')
    model_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), model_dir)

    logger.info('Loading the graph')
    bounce_dnn = BounceDNN(learning_rate=LEARNING_RATE, reuse=False)

    checkpoint_path = tf.train.latest_checkpoint(model_path)

    saver = tf.train.Saver()
    with tf.Session() as session:
        if not checkpoint_path:
            session.run(tf.global_variables_initializer())
        else:
            saver.restore(session, checkpoint_path)

        saver.save(session, save_path, global_step=iteration)

        best_loss = float('Inf')
        last_saved_loss = float('Inf')

        while True:
            iteration += 1
            start = time.time()

            logger.info('------ Play -------')

            pool = ThreadPool(cpu_count())
            games = pool.map(play_game, [(session, bounce_dnn)] * BATCH_SIZE)

            logger.info('Elapsed (play): %f', time.time() - start)

            logger.info('------ Train ------')

            learning_start = time.time()

            X, rewards, labels = get_features_from_games(games)

            X_train, X_test, rewards_train, _, labels_train, labels_test = split_features(X, rewards, labels)

            all_gradients = bounce_dnn.compute_gradients(session, X_train, rewards_train, labels_train)

            new_gradients = np.mean(all_gradients, axis=0)

            bounce_dnn.apply_gradients(session, new_gradients)

            logger.info('Elapsed (train): %f', time.time() - learning_start)

            loss = bounce_dnn.compute_loss(session, X_test, labels_test)
            mean_loss = np.mean(loss)

            logger.info('loss: %f', mean_loss)
            logger.info('best loss: %f', best_loss)
            logger.info('Elapsed (total): %f', time.time() - start)

            if mean_loss < best_loss:
                logger.info('Saving new best model')
                saver.save(session, save_path, global_step=iteration)
                best_loss = mean_loss

            if export and iteration % 10 == 0 and best_loss < last_saved_loss:
                export_model(saver, model_dir)
                last_saved_loss = best_loss

            logger.info('-------------------')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--export', default=False, action='store_true')

    args = parser.parse_args()

    main(export=args.export)

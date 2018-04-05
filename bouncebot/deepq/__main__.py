from __future__ import unicode_literals

import argparse
import logging
import os
import time

import numpy as np
import tensorflow as tf

from .network import BounceBot, get_copy_op


LEARNING_RATE = 1e-3
BATCH_SIZE = 50
ITERATIONS_BETWEEN_SAVE = 1e3
ITERATIONS_BETWEEN_LOCAL_SAVE = 10

logger = logging.getLogger(__name__)


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

    checkpoint_path = tf.train.latest_checkpoint(model_path)

    saver = tf.train.Saver()
    model_save_path = None

    saver = tf.train.Saver()
    model_save_path = None
    with tf.Session() as session:
        if not checkpoint_path:
            session.run(tf.global_variables_initializer())
        else:
            saver.restore(session, checkpoint_path)
            iteration = critic.get_global_step(session)

        saver.save(session, save_path, global_step=iteration)

        summary_writer = tf.summary.FileWriter('./summary_log/train', session.graph)

        best_loss = float('Inf')
        best_loss_iteration = 0
        last_saved_loss = float('Inf')

        while True:
            raise NotImplementedError


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--export', default=False, action='store_true')
    parser.add_argument('--export-local', '--export_local', default=False, action='store_true')

    args = parser.parse_args()

    main(export=args.export, export_local=args.export_local)

from __future__ import unicode_literals

import os
import time

import numpy as np
import tensorflow as tf

from train.features import get_training_features, split_features
from .train.neural_net import BounceDNN
from .train.play import play


LEARNING_RATE = 0.01


def main(model_dir='checkpoints'):
    tf.reset_default_graph()

    iteration = 0
    save_path = os.path.join(model_dir, 'bouncebot')

    print 'Loading the graph'
    bounce_dnn = BounceDNN(learning_rate=LEARNING_RATE)

    checkpoint_path = tf.train.latest_checkpoint(model_dir, 'bouncebot')

    saver = tf.train.Saver()
    with tf.Session() as session:
        if not checkpoint_path:
            session.run(tf.global_variables_initializer())
        else:
            saver.restore(session, checkpoint_path)

        start = time.time()
        worlds, won = play(session, bounce_dnn)
        print 'Elapsed (play):', time.time() - start

        X, rewards, labels = get_training_features(worlds)

        X_train, X_test, rewards_train, rewards_test, labels_train, labels_test = split_features(X, rewards, labels)

        print '------------------------------------'
        print 'X_train', X_train.shape
        print 'X_test', X_test.shape
        print 'rewards_train', rewards_train.shape
        print 'rewards_test', rewards_test.shape
        print 'labels_train', labels_train.shape
        print 'labels_test', labels_test.shape
        print '------------------------------------'

        learning_start = time.time()
        all_gradients = bounce_dnn.compute_gradients(session, X_train, rewards_train, labels_train)

        new_gradients = np.mean(all_gradients, axis=0)

        bounce_dnn.apply_gradients(session, new_gradients)

        print 'Elapsed (train):', time.time() - learning_start

        loss = np.mean(
            bounce_dnn.compute_loss(session, X_test, labels_test),
            axis=0
        )

        print 'loss:', loss
        print 'WON' if won else 'LOST'
        print 'Elapsed (total):', time.time() - start
        print 'len(worlds)', len(worlds.worlds)

        saver.save(session, save_path, global_step=iteration)

        # tf.summary.FileWriter('./summary_log', session.graph)


if __name__ == '__main__':
    main()

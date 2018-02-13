from __future__ import unicode_literals

import os
import time

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

        X, rewards, labels = get_training_features(worlds)

        X_train, X_test, rewards_train, rewards_test, labels_train, labels_test = split_features(X, rewards, labels)

        bounce_dnn.train(session, X_train, rewards_train, labels_train)

        loss = bounce_dnn.compute_loss(session, X_test, rewards_test, labels_test)

        print 'loss:', loss
        print 'WON' if won else 'LOST'
        print 'elapsed:', time.time() - start
        print 'len(worlds)', len(worlds.worlds)

        saver.save(session, save_path, global_step=iteration)


if __name__ == '__main__':
    main()

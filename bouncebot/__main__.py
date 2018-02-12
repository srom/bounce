from __future__ import unicode_literals

import os
import time

import tensorflow as tf

from .train.neural_net import BounceDNN
from .train.play import play


def main(model_dir='checkpoints'):
    tf.reset_default_graph()

    iteration = 0
    save_path = os.path.join(model_dir, 'bouncebot')

    bounce_dnn = BounceDNN()

    checkpoint_path = tf.train.latest_checkpoint(model_dir, 'bouncebot')

    saver = tf.train.Saver()
    with tf.Session() as session:
        if not checkpoint_path:
            session.run(tf.global_variables_initializer())
        else:
            saver.restore(session, checkpoint_path)

        start = time.time()
        worlds, won = play(session, bounce_dnn)

        print 'WON' if won else 'LOST'
        print 'elapsed:', time.time() - start
        print 'len(worlds)', len(worlds.worlds)

        saver.save(session, save_path, global_step=iteration)


if __name__ == '__main__':
    main()

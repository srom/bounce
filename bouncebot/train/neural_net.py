from __future__ import unicode_literals

import tensorflow as tf


HIDDEN_UNITS = 256
NUM_INPUTS = 20
NUM_ACTIONS = 4


class BounceDNN(object):

    def __init__(self):
        with tf.variable_scope("input"):
            self.X = tf.placeholder(tf.float32, shape=[None, NUM_INPUTS])

        with tf.variable_scope("f_p"):
            self.f_explore = self._evaluation_function(explore=True)
            tf.get_variable_scope().reuse_variables()
            self.f_evaluate = self._evaluation_function(explore=False)

    def pick_action(self, session, X, explore=False):
        if explore:
            session.run(self.f_explore, feed_dict={
                self.X: X,
            })
        else:
            session.run(self.f_evaluate, feed_dict={
                self.X: X,
            })

    def _evaluation_function(self, explore=False):
        hidden_1 = tf.layers.dense(self.X, HIDDEN_UNITS, activation=tf.nn.elu, name='hidden_1')
        hidden_2 = tf.layers.dense(hidden_1, HIDDEN_UNITS, activation=tf.nn.elu, name='hidden_2')
        logits = tf.layers.dense(hidden_2, NUM_ACTIONS, activation=tf.nn.elu, name='logits')
        outputs = tf.nn.softmax(logits)
        if explore:
            return tf.multinomial(tf.log(outputs), 1)
        else:
            return tf.argmax(outputs)

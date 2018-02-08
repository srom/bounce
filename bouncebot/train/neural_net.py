from __future__ import unicode_literals

import tensorflow as tf

from .features import NUM_FEATURES as NUM_INPUTS


HIDDEN_UNITS = 256
NUM_ACTIONS = 4
DROPOUT_RATE = 0.5


class BounceDNN(object):

    def __init__(self):
        with tf.variable_scope("input"):
            self.X = tf.placeholder(tf.float32, shape=[None, NUM_INPUTS])
            self.training = tf.placeholder_with_default(False, shape=(), name='training')

        with tf.variable_scope("f_p"):
            self.f_explore = self._evaluation_function(explore=True)
            tf.get_variable_scope().reuse_variables()
            self.f_evaluate = self._evaluation_function(explore=False)

    def pick_action(self, session, X, explore=False):
        if explore:
            return session.run(self.f_explore, feed_dict={
                self.X: X,
            })[0][0]
        else:
            return session.run(self.f_evaluate, feed_dict={
                self.X: X,
            })[0][0]

    def _evaluation_function(self, explore=False):
        input_dropout = tf.layers.dropout(self.X, DROPOUT_RATE, training=self.training)
        hidden_1 = tf.layers.dense(input_dropout, HIDDEN_UNITS, activation=tf.nn.elu, name='hidden_1')
        dropout_1 = tf.layers.dropout(hidden_1, DROPOUT_RATE, training=self.training)
        hidden_2 = tf.layers.dense(dropout_1, HIDDEN_UNITS, activation=tf.nn.elu, name='hidden_2')
        dropout_2 = tf.layers.dropout(hidden_2, DROPOUT_RATE, training=self.training)
        logits = tf.layers.dense(dropout_2, NUM_ACTIONS, activation=tf.nn.elu, name='logits')
        outputs = tf.nn.softmax(logits)
        if explore:
            return tf.multinomial(tf.log(outputs), 1)
        else:
            return tf.argmax(outputs)

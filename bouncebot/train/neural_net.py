from __future__ import unicode_literals

import tensorflow as tf

from .features import NUM_FEATURES as NUM_INPUTS


HIDDEN_UNITS = 256
NUM_ACTIONS = 4
DROPOUT_RATE = 0.5


class BounceDNN(object):

    def __init__(self, learning_rate):
        with tf.variable_scope("input"):
            self.X = tf.placeholder(tf.float32, shape=[None, NUM_INPUTS])
            self.rewards = tf.placeholder(tf.float32, shape=[None, 1])
            self.actions = tf.placeholder(tf.float32, shape=[None, NUM_ACTIONS])
            self.training = tf.placeholder_with_default(False, shape=(), name='training')

        with tf.variable_scope("f_p"):
            self.logits = self._get_logits()
            self.f = self._evaluation_function()

        with tf.name_scope('loss'):
            self.cross_entropy = self._get_loss()

        with tf.variable_scope("train"):
            self.training_op = self._get_training_op(learning_rate)

    def pick_action(self, session, X, explore=False):
        return session.run(self.f, feed_dict={
            self.X: X,
            self.training_op: explore
        })[0][0]

    def _get_logits(self):
        input_dropout = tf.layers.dropout(self.X, DROPOUT_RATE, training=self.training)
        hidden_1 = tf.layers.dense(input_dropout, HIDDEN_UNITS, activation=tf.nn.elu, name='hidden_1')
        dropout_1 = tf.layers.dropout(hidden_1, DROPOUT_RATE, training=self.training)
        hidden_2 = tf.layers.dense(dropout_1, HIDDEN_UNITS, activation=tf.nn.elu, name='hidden_2')
        dropout_2 = tf.layers.dropout(hidden_2, DROPOUT_RATE, training=self.training)
        return tf.layers.dense(dropout_2, NUM_ACTIONS, activation=tf.nn.elu, name='logits')

    def _evaluation_function(self):
        """
        In training mode, explore by returning picking a random action drawn from a multinomial
        distribution of the output probabilities.

        In evaluation mode, simply returns the action with the highest probability (argmax).
        """
        outputs = tf.nn.softmax(self.logits)
        factor = tf.cond(tf.equal(self.training, tf.constant(True)), lambda: tf.constant(1), lambda: tf.constant(0))
        multinomial = tf.multinomial(tf.log(outputs), 1)
        argmax = tf.argmax(outputs)
        return (
            factor * multinomial + (1 - factor) * argmax
        )

    def _get_loss(self):
        return tf.nn.sigmoid_cross_entropy_with_logits(labels=self.actions, logits=self.logits)

    def _get_training_op(self, learning_rate):
        optimizer = tf.train.AdamOptimizer(learning_rate=learning_rate)

        grads_and_vars = optimizer.compute_gradients(self.cross_entropy)
        gradients = [grad for grad, _ in grads_and_vars]

        rewarded_gradients = tf.multiply(gradients, self.rewards)

        grads_and_vars_feed = []
        for index, (grad, variable) in grads_and_vars:
            shape = grad.get_shape()
            gradient = tf.slice(rewarded_gradients, [index], shape)
            grads_and_vars_feed.append((gradient, variable))

        return optimizer.apply_gradients(grads_and_vars_feed)

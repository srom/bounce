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
            self.outputs = tf.nn.softmax(self.logits)
            self.f_explore = self._evaluation_function(explore=True)
            self.f_evaluate = self._evaluation_function(explore=False)

        with tf.name_scope('loss'):
            self.cross_entropy = self._get_loss()

        with tf.variable_scope("train"):
            self.training_op = self._get_training_op(learning_rate)

    def pick_action(self, session, X, explore=False):
        if explore:
            f = self.f_explore
        else:
            f = self.f_evaluate

        return session.run(f, feed_dict={
            self.X: X,
            self.training: explore
        })[0][0]

    def train(self, session, X, rewards, labels):
        return session.run(self.training_op, feed_dict={
            self.X: X,
            self.rewards: rewards,
            self.actions: labels,
            self.training: True
        })

    def compute_loss(self, session, X, rewards, labels):
        session.run(self.cross_entropy, feed_dict={
            self.X: X,
            self.rewards: rewards,
            self.actions: labels,
            self.training: False
        })

    def _get_logits(self):
        input_dropout = tf.layers.dropout(self.X, DROPOUT_RATE, training=self.training)
        hidden_1 = tf.layers.dense(input_dropout, HIDDEN_UNITS, activation=tf.nn.elu, name='hidden_1')
        dropout_1 = tf.layers.dropout(hidden_1, DROPOUT_RATE, training=self.training)
        hidden_2 = tf.layers.dense(dropout_1, HIDDEN_UNITS, activation=tf.nn.elu, name='hidden_2')
        dropout_2 = tf.layers.dropout(hidden_2, DROPOUT_RATE, training=self.training)
        return tf.layers.dense(dropout_2, NUM_ACTIONS, activation=tf.nn.elu, name='logits')

    def _evaluation_function(self, explore):
        """
        In training mode, explore by picking a random action drawn from a multinomial
        distribution of the output probabilities.

        In evaluation mode, simply returns the action with the highest probability (argmax).
        """
        if explore:
            return tf.multinomial(tf.log(self.outputs), 1)
        else:
            return tf.argmax(self.outputs)

    def _get_loss(self):
        return tf.nn.sigmoid_cross_entropy_with_logits(labels=self.actions, logits=self.logits)

    def _get_training_op(self, learning_rate):
        optimizer = tf.train.AdamOptimizer(learning_rate=learning_rate)

        grads_and_vars = optimizer.compute_gradients(self.cross_entropy)

        import pprint
        pprint.pprint(grads_and_vars)

        gradients = [grad for grad, _ in grads_and_vars]

        rewarded_gradients = tf.multiply(gradients, self.rewards)

        grads_and_vars_feed = []
        for index, (grad, variable) in grads_and_vars:
            shape = grad.get_shape()
            gradient = tf.slice(rewarded_gradients, [index], shape)
            grads_and_vars_feed.append((gradient, variable))

        return optimizer.apply_gradients(grads_and_vars_feed)

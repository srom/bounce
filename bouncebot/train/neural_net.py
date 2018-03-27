from __future__ import unicode_literals

import tensorflow as tf

from .features import NUM_FEATURES as NUM_INPUTS


HIDDEN_UNITS = 256
NUM_ACTIONS = 4
DROPOUT_RATE = 0.5


class BounceDNN(object):

    def __init__(self, learning_rate, reuse=False):
        with tf.variable_scope("input", reuse=reuse):
            self.X = tf.placeholder(tf.float32, shape=[None, NUM_INPUTS], name='X')
            self.actions = tf.placeholder(tf.float32, shape=[None, NUM_ACTIONS], name='actions')
            self.training = tf.placeholder_with_default(False, shape=(), name='training')

        with tf.variable_scope("f_p", reuse=reuse):
            self.logits = self._get_logits()
            self.outputs = tf.nn.softmax(self.logits)
            self.f_explore = self._evaluation_function(explore=True)
            self.f_evaluate = self._evaluation_function(explore=False)

        with tf.variable_scope('loss', reuse=reuse):
            self.cross_entropy = self._get_loss()

        with tf.variable_scope("train", reuse=reuse):
            self.global_step = tf.Variable(0, name='global_step', trainable=False)
            optimizer = tf.train.AdamOptimizer(learning_rate=learning_rate)

            (self.compute_gradients_op,
             self.grads_and_vars,
             self.gradients) = self._get_compute_gradients_op(optimizer, learning_rate)

            self.apply_gradients_op = self._get_apply_gradients_op(optimizer)

        with tf.variable_scope('summary'):
            self.mean_reward = tf.placeholder(tf.float32, shape=[], name='mean_reward')
            self.mean_worlds_length = tf.placeholder(tf.float32, shape=[], name='mean_worlds_length')
            self.mean_num_lives = tf.placeholder(tf.float32, shape=[], name='mean_num_lives')
            self.overall_score = tf.placeholder(tf.int32, shape=[], name='overall_score')
            self.ratio_exploration = self._get_exploration_ratio()
            tf.summary.scalar('cross_entropy_mean', tf.reduce_mean(self.cross_entropy))
            tf.summary.scalar('learning_rate', optimizer._lr_t)
            tf.summary.scalar('mean_num_lives', self.mean_num_lives)
            tf.summary.scalar('mean_reward', self.mean_reward)
            tf.summary.scalar('mean_worlds_length', self.mean_worlds_length)
            tf.summary.scalar('overall_score', self.overall_score)
            tf.summary.scalar('ratio_exploration', self.ratio_exploration)

            probs_family = 'z_probability'
            self.mean_output_probabilities = tf.reduce_mean(self.outputs, 0)
            tf.summary.scalar('left', self.mean_output_probabilities[0], family=probs_family)
            tf.summary.scalar('right', self.mean_output_probabilities[1], family=probs_family)
            tf.summary.scalar('space', self.mean_output_probabilities[2], family=probs_family)
            tf.summary.scalar('hold', self.mean_output_probabilities[3], family=probs_family)

            self.summary = tf.summary.merge_all()

    def pick_action(self, session, X, training=False):
        return session.run(self.f_explore, feed_dict={
            self.X: X,
            self.training: training
        })[0][0]

    def compute_gradients(self, session, X, rewards, labels):
        all_gradients = []

        for i in xrange(X.shape[0]):
            x = X[i,...]
            reward = rewards[i]
            label = labels[i]

            gradients = session.run(self.compute_gradients_op, feed_dict={
                self.X: [x],
                self.actions: [label],
                self.training: True
            })

            all_gradients.append(reward * gradients)

        return all_gradients

    def apply_gradients(self, session, new_gradients):
        feed_dict = {self.training: True}

        for i, gradient_placeholder in enumerate(self.gradients):
            feed_dict[gradient_placeholder] = new_gradients[i]

        session.run(self.apply_gradients_op, feed_dict=feed_dict)

    def compute_loss(self, session, X, labels):
        return session.run(self.cross_entropy, feed_dict={
            self.X: X,
            self.actions: labels,
            self.training: False
        })

    def compute_summary(self, session, X, labels, statistics=None, training=False):
        if not statistics:
            statistics = {}

        feed_dict = {
            self.X: X,
            self.actions: labels,
            self.training: training,
            self.mean_reward: statistics.get('mean_reward', 0),
            self.mean_worlds_length: statistics.get('mean_worlds_length', 0),
            self.mean_num_lives: statistics.get('mean_num_lives', 0),
            self.overall_score: statistics.get('overall_score', 0),
        }
        return session.run([self.summary, self.cross_entropy], feed_dict=feed_dict)

    def get_global_step(self, session):
        return session.run(self.global_step)

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
            return tf.multinomial(tf.log(self.outputs), 1, name='f_explore')
        else:
            return tf.argmax(self.outputs, axis=1, name='f_evaluate')

    def _get_loss(self):
        return tf.nn.sigmoid_cross_entropy_with_logits(labels=self.actions, logits=self.logits, name="cross_entropy")

    def _get_compute_gradients_op(self, optimizer, learning_rate):
        grads_and_vars = optimizer.compute_gradients(self.cross_entropy)

        gradients = [grad for grad, _ in grads_and_vars]

        gradient_placeholders = []
        grads_and_vars_feed = []
        for gradient, variable in grads_and_vars:
            gradient_placeholder = tf.placeholder(tf.float32, shape=gradient.get_shape())
            gradient_placeholders.append(gradient_placeholder)
            grads_and_vars_feed.append((gradient_placeholder, variable))

        return gradients, grads_and_vars_feed, gradient_placeholders

    def _get_apply_gradients_op(self, optimizer):
        return optimizer.apply_gradients(self.grads_and_vars, name='apply_gradients')

    def _get_exploration_ratio(self):
        x = tf.add(self.f_evaluate, 1)
        y = tf.add(tf.reduce_sum(self.f_explore, axis=1), 1)
        return tf.reduce_mean(
            tf.divide(
                tf.abs(tf.subtract(x, y)),
                tf.maximum(tf.abs(tf.subtract(x, y)), 1)
            )
        )

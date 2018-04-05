from __future__ import unicode_literals


import tensorflow as tf

from ..train.features import NUM_FEATURES as NUM_INPUTS


HIDDEN_UNITS = 256
NUM_ACTIONS = 4
DEFAULT_EPSILON = 1e-8


class BounceBot(object):

    def __init__(self, name, learning_rate, epsilon=DEFAULT_EPSILON):
        """
        name is typically 'actor' or 'critic' since they share the
        same architecture but each uses its own weights.
        """
        with tf.variable_scope(name) as scope:
            self.scope = scope
            with tf.variable_scope('input'):
                self.x = tf.placeholder(tf.float32, shape=[None, NUM_INPUTS], name='X')
                self.targets = tf.placeholder(tf.float32, shape=[None, 1])
                self.actions = tf.placeholder(tf.float32, shape=[None, NUM_ACTIONS], name='actions')
                self.training = tf.placeholder_with_default(False, shape=(), name='training')

            with tf.variable_scope('q_values'):
                self.outputs = self._get_outputs()

            with tf.variable_scope('loss'):
                self.mse = self._get_loss()

            with tf.variable_scope('train'):
                self.global_step = tf.Variable(0, name='global_step', trainable=False)
                optimizer = tf.train.AdamOptimizer(learning_rate=learning_rate, epsilon=epsilon)
                self.training_op = optimizer.minimize(self.mse, global_step=self.global_step)

        self.trainable_variables = tf.get_collection(tf.GraphKeys.TRAINABLE_VARIABLES, scope=self.scope.name)

    def get_trainable_variables_by_name(self):
        return {
            var.name[len(self.scope.name):]: var
            for var in self.trainable_variables
        }

    def get_q_values(self, session, x, training=False):
        return session.run(self.outputs, feed_dict={
            self.x: x,
            self.training: training,
        })

    def train(self, session, x, actions, targets):
        return session.run(self.training_op, feed_dict={
            self.x: x,
            self.actions: actions,
            self.targets: targets,
            self.training: True,
        })

    def _get_outputs(self):
        hidden_1 = tf.layers.dense(self.x, HIDDEN_UNITS, activation=tf.nn.elu, name='hidden_1')
        hidden_2 = tf.layers.dense(hidden_1, HIDDEN_UNITS, activation=tf.nn.elu, name='hidden_2')
        return tf.layers.dense(hidden_2, NUM_ACTIONS, activation=tf.nn.elu, name='outputs')

    def _get_loss(self):
        critic_action_q_values = tf.reduce_sum(self.outputs * self.actions, axis=1, keep_dims=True)
        return tf.reduce_mean(tf.square(self.targets - critic_action_q_values))


def get_copy_op(actor, critic):
    actor_variables = actor.get_trainable_variables_by_name()
    critic_variables = critic.get_trainable_variables_by_name()
    copy_ops = [
        actor_variable.assign(critic_variables[var_name])
        for var_name, actor_variable in actor_variables.items()
    ]
    return tf.group(*copy_ops)

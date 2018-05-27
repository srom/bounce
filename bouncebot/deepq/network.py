from __future__ import unicode_literals


import numpy as np
import tensorflow as tf

from ..pg.features import NUM_FEATURES as NUM_INPUTS


# Parameters
HIDDEN_UNITS = 128
DEFAULT_EPSILON = 1e-8
DECAY_STEPS = 5e4

# Constants
NUM_ACTIONS = 4


class BounceBot(object):

    def __init__(self, name, learning_rate, epsilon=DEFAULT_EPSILON):
        """
        name is typically 'actor' or 'critic' since they share the
        same architecture but each uses its own weights.
        """
        with tf.variable_scope(name) as scope:
            self.random = np.random.RandomState()
            self.scope = scope
            with tf.variable_scope('input'):
                self.x = tf.placeholder(tf.float32, shape=[None, NUM_INPUTS], name='X')
                self.targets = tf.placeholder(tf.float32, shape=[None, 1], name='targets')
                self.actions = tf.placeholder(tf.float32, shape=[None, NUM_ACTIONS], name='actions')
                self.training = tf.placeholder_with_default(False, shape=(), name='training')

            with tf.variable_scope('q_values'):
                self.outputs = self._get_outputs()
                self.output_action = tf.argmax(self.outputs, axis=1, name='output_action')

            with tf.variable_scope('loss'):
                self.mse = self._get_loss()

            with tf.variable_scope('train'):
                self.global_step = tf.Variable(0, name='global_step', trainable=False)
                optimizer = tf.train.AdamOptimizer(learning_rate=learning_rate, epsilon=epsilon)
                self.training_op = optimizer.minimize(self.mse, global_step=self.global_step)

            if name == 'critic':
                with tf.variable_scope('summary'):
                    self.mean_reward = tf.placeholder(tf.float32, shape=[], name='mean_reward')
                    self.mean_worlds_length = tf.placeholder(tf.float32, shape=[], name='mean_worlds_length')
                    self.mean_num_lives = tf.placeholder(tf.float32, shape=[], name='mean_num_lives')
                    self.num_victories_last_100_games = tf.placeholder(tf.int32, shape=[],
                                                                       name='num_victories_last_100_games')

                    tf.summary.scalar('mse', tf.reduce_mean(self.mse))
                    tf.summary.scalar('learning_rate', optimizer._lr_t)
                    tf.summary.scalar('mean_num_lives', self.mean_num_lives)
                    tf.summary.scalar('mean_reward', self.mean_reward)
                    tf.summary.scalar('mean_worlds_length', self.mean_worlds_length)
                    tf.summary.scalar('num_victories_last_100_games', self.num_victories_last_100_games)

                self.summary = tf.summary.merge_all()

        self.trainable_variables = tf.get_collection(tf.GraphKeys.TRAINABLE_VARIABLES, scope=self.scope.name)

    def get_trainable_variables_by_name(self):
        return {
            var.name[len(self.scope.name):]: var
            for var in self.trainable_variables
        }

    def evaluate(self, session, x, training=False):
        """
        During training, chooses an action randomly with a probability of epsilon,
        or the optimal action with a probability (1 - epsilon).
        """
        eps_min, eps_max = 0.05, 1.0
        global_step = self.get_global_step(session)
        epsilon = max(eps_min, eps_max - (eps_max - eps_min) * global_step / DECAY_STEPS)
        if training and self.random.rand() < epsilon:
            return self.random.randint(NUM_ACTIONS)
        else:
            return session.run(self.output_action, feed_dict={
                self.x: x,
                self.training: training,
            })[0]

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

    def compute_summary(self, session, x, actions, targets, statistics=None, training=False):
        if not statistics:
            statistics = {}

        feed_dict = {
            self.x: x,
            self.actions: actions,
            self.targets: targets,
            self.training: training,
            self.mean_reward: statistics.get('mean_reward', 0),
            self.mean_worlds_length: statistics.get('mean_worlds_length', 0),
            self.mean_num_lives: statistics.get('mean_num_lives', 0),
            self.num_victories_last_100_games: statistics.get('num_victories_last_100_games', 0),
        }
        return session.run([self.summary, self.mse], feed_dict=feed_dict)

    def get_global_step(self, session):
        return session.run(self.global_step)

    def _get_outputs(self):
        hidden_1 = tf.layers.dense(self.x, HIDDEN_UNITS, activation=tf.nn.elu, name='hidden_1')
        hidden_2 = tf.layers.dense(hidden_1, HIDDEN_UNITS, activation=tf.nn.elu, name='hidden_2')
        return tf.layers.dense(hidden_2, NUM_ACTIONS, activation=tf.nn.elu, name='outputs')

    def _get_loss(self):
        critic_action_q_values = tf.reduce_sum(self.outputs * self.actions, axis=1, keepdims=True)
        return tf.reduce_mean(tf.square(self.targets - critic_action_q_values))


def get_copy_op(actor, critic):
    actor_variables = actor.get_trainable_variables_by_name()
    critic_variables = critic.get_trainable_variables_by_name()
    copy_ops = [
        actor_variable.assign(critic_variables[var_name])
        for var_name, actor_variable in actor_variables.items()
    ]
    return tf.group(*copy_ops)

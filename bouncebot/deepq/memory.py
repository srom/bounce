from __future__ import unicode_literals

import collections

import numpy as np

from ..pg.features import get_features, get_action_label


class Memory(object):

    def __init__(self, max_length):
        self.replay_memory = collections.deque([], maxlen=max_length)
        self.random = np.random.RandomState()

    def add_worlds(self, worlds_):
        memory_tuples = []

        worlds = list(worlds_.worlds)
        if len(worlds) % 2 != 0:
            worlds = worlds[1:]

        X_in, actions, rewards, X_out = get_features_from_worlds(worlds)

        n = X_in.shape[0]
        for i in range(n):
            x_in = X_in[i]
            x_out = X_out[i]
            action = actions[i]
            reward = rewards[i]
            if i + 1 == n:
                carry_on = 0.0
            else:
                carry_on = 1.0

            memory_tuples.append((x_in, action, reward, x_out, carry_on))

        self.replay_memory.extend(memory_tuples)

        return self

    def sample_memories(self, batch_size):
        indices = self.random.permutation(len(self.replay_memory))[:batch_size]

        X_in = []
        actions = []
        rewards = []
        X_out = []
        carry_on = []
        for i in indices:
            x_in, action, reward, x_out, co = self.replay_memory[i]
            X_in.append(x_in)
            actions.append(action)
            rewards.append(reward)
            X_out.append(x_out)
            carry_on.append(co)

        return map(lambda x: np.array(x, dtype=np.float32), [X_in, actions, rewards, X_out, carry_on])


def get_features_from_worlds(worlds):
    worlds_ = worlds + [None, None]
    pairs = list(zip(worlds_, worlds_[1:], worlds_[2:], worlds_[3:]))

    features_in = []
    features_out = []
    for i in range(0, len(pairs), 2):
        w_input1, w_input2, w_output1, w_output2 = pairs[i]

        x_in = get_features(w_input1, w_input2)
        features_in.append(x_in)

        if w_output1 is not None and w_output2 is not None:
            features_out.append(get_features(w_output1, w_output2))
        else:
            features_out.append(np.zeros(x_in.shape))

    X_in = np.array(features_in, dtype=np.float32)
    X_out = np.array(features_out, dtype=np.float32)
    rewards = np.array([[world.reward] for i, world in enumerate(worlds) if i % 2 == 0], dtype=np.float32)
    actions = np.array(
        [get_action_label(world.action) for i, world in enumerate(worlds) if i % 2 == 0], dtype=np.float32)

    return X_in, actions, rewards, X_out

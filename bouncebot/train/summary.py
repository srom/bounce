from __future__ import unicode_literals

import numpy as np


def compute_game_statistics(games):
    all_rewards = []
    worlds_lengths = []
    for X, rewards, _ in games:
        worlds_lengths.append(X.shape[0])
        all_rewards.append(np.mean(rewards))

    return np.mean(all_rewards), np.mean(worlds_lengths)


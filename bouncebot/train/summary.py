from __future__ import unicode_literals

import numpy as np


def compute_game_statistics(games):
    all_rewards = []
    for _, rewards, _ in games:
        all_rewards.append(np.mean(rewards))

    return np.mean(all_rewards)

from __future__ import unicode_literals

import numpy as np


def compute_game_statistics(games):
    all_rewards = []
    worlds_lengths = []
    lives = []
    for X, rewards, _, worlds in games:
        worlds_lengths.append(X.shape[0])
        all_rewards.append(np.mean(rewards))
        lives.append(sum(b.lives for b in worlds.worlds[-1].bricks))

    return np.mean(all_rewards), np.mean(worlds_lengths), np.mean(lives)


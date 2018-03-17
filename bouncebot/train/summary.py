from __future__ import unicode_literals

import numpy as np


def compute_game_statistics(games):
    all_rewards = []
    worlds_lengths = []
    lives = []
    overall_score = 0
    for X, rewards, _, worlds in games:
        last_world = worlds.worlds[-1]
        worlds_lengths.append(X.shape[0])
        all_rewards.append(np.mean(rewards))
        lives.append(sum(b.lives for b in last_world.bricks))
        if last_world.won:
            overall_score += 1

    return np.mean(all_rewards), np.mean(worlds_lengths), np.mean(lives), overall_score

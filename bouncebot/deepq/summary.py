from __future__ import unicode_literals

import numpy as np


def compute_game_statistics(games):
    all_rewards = []
    worlds_lengths = []
    lives = []
    scores = []
    for worlds in games:
        rewards = [world.reward for world in worlds.worlds]
        last_world = worlds.worlds[-1]
        worlds_lengths.append(len(worlds.worlds))
        all_rewards.append(np.mean(rewards))
        lives.append(sum(b.lives for b in last_world.bricks))
        scores.append(1 if last_world.won else 0)

    return np.mean(all_rewards), np.mean(worlds_lengths), np.mean(lives), scores

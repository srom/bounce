from __future__ import unicode_literals

import numpy as np

from ..train.features import get_features
from ..world.models.world_pb2 import HOLD, Worlds
from ..world.query import simulation
from ..world.reward import get_reward, update_rewards


def play(bouncebot):
    inputWorld = None
    action = HOLD
    rewards = []
    all_worlds = []

    while 1:
        outputWorld = simulation(inputWorld, action, num_epochs=60)

        reward, done = get_reward(inputWorld, outputWorld)
        rewards.append(reward)
        all_worlds.append(outputWorld)

        if done:
            worlds = Worlds()
            worlds.worlds.extend(all_worlds)
            won = update_rewards(worlds, rewards)
            return worlds, won

        X = get_features(inputWorld, outputWorld)
        inputWorld = outputWorld
        action = bouncebot.evaluate(np.array([X]))

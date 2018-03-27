from __future__ import unicode_literals

import logging

import numpy as np

from ..world.models.world_pb2 import Worlds, HOLD
from ..world.query import simulation
from ..world.reward import get_reward, update_rewards
from .features import get_features


logger = logging.getLogger(__name__)


def play(session, bounce_dnn):
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
        action = bounce_dnn.pick_action(session, np.array([X]), training=True)

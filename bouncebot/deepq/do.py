from __future__ import unicode_literals

import logging

import numpy as np

from ..world.models.world_pb2 import Worlds, HOLD
from ..world.query import simulation, TooManyErrors
from ..world.reward import get_reward
from ..pg.features import get_features


logger = logging.getLogger(__name__)


def play(session, bouncebot):
    inputWorld = None
    action = HOLD
    all_worlds = []

    done = False
    while 1:
        try:
            for _ in range(2):
                outputWorld = simulation(inputWorld, action, num_epochs=15)

                reward, done = get_reward(inputWorld, outputWorld)
                outputWorld.reward = reward
                all_worlds.append(outputWorld)

                if done:
                    break

        except TooManyErrors as e:
            logger.exception(e)
            done = True

        if done:
            worlds = Worlds()
            worlds.worlds.extend(all_worlds)
            return worlds, all_worlds[-1].won

        X = get_features(inputWorld, outputWorld)
        inputWorld = outputWorld
        action = bouncebot.evaluate(session, np.array([X]), training=True)

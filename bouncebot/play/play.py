from __future__ import unicode_literals

import logging

import numpy as np

from ..pg.features import get_features
from ..world.models.world_pb2 import HOLD, Worlds
from ..world.query import simulation, TooManyErrors
from ..world.reward import get_reward, update_rewards


logger = logging.getLogger(__name__)

ACTION_FRAMES = 60


def play_pg(bouncebot):
    inputWorld = None
    action = HOLD
    rewards = []
    all_worlds = []

    num_epochs = 5
    all_epochs = 0

    while 1:
        outputWorld = simulation(inputWorld, action, num_epochs=num_epochs)

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

        all_epochs += num_epochs
        if all_epochs % ACTION_FRAMES == 0:
            action = bouncebot.evaluate(np.array([X]))[0][0]

            if action == 0:
                logger.info('LEFT')
            if action == 1:
                logger.info('RIGHT')
            if action == 2:
                logger.info('SPACE')
            if action == 3:
                logger.info('HOLD')

            if outputWorld.physics and outputWorld.physics.target:
                logger.info('TARGET: %s', outputWorld.physics.target)


def play_deepq(bouncebot):
    inputWorld = None
    action = HOLD
    all_worlds = []

    num_epochs = 5
    all_epochs = 0

    while 1:
        try:
            outputWorld = simulation(inputWorld, action, num_epochs=num_epochs)

            reward, done = get_reward(inputWorld, outputWorld)
            outputWorld.reward = reward
            all_worlds.append(outputWorld)

        except TooManyErrors as e:
            logger.exception(e)
            done = True

        if done:
            worlds = Worlds()
            worlds.worlds.extend(all_worlds)
            return worlds, all_worlds[-1].won

        X = get_features(inputWorld, outputWorld)
        inputWorld = outputWorld

        all_epochs += num_epochs
        if all_epochs % 30 == 0:
            action = bouncebot.evaluate(np.array([X]))[0]

            if action == 0:
                logger.info('LEFT')
            if action == 1:
                logger.info('RIGHT')
            if action == 2:
                logger.info('SPACE')
            if action == 3:
                logger.info('HOLD')

            if outputWorld.physics and outputWorld.physics.target:
                logger.info('TARGET: %s', outputWorld.physics.target)

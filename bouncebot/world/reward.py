from __future__ import unicode_literals

import logging
import math

import numpy as np

from .models.world_pb2 import LEFT, RIGHT


WON_REWARD = +50
LOST_REWARD = -5
BRICK_LIFE = +50
EPSILON = +1

MAX_FRAMES = 5 * 60 * 60  # 5 minutes
MAX_PRE_FRAMES = 60 * 60  # 1 minute

DISCOUNT_RATE = 0.99

logger = logging.getLogger(__name__)


def get_reward(inputWorld, outputWorld):
    if outputWorld.won:
        return WON_REWARD, True
    elif lost(outputWorld):
        return LOST_REWARD, True

    reward = EPSILON

    if not outputWorld.arrow.ready and outputWorld.action in (LEFT, RIGHT):
        reward -= EPSILON

    if inputWorld:
        # if not inputWorld.arrow.ready and outputWorld.arrow.ready:
        #     reward += EPSILON

        lives_down = get_num_lives(inputWorld) - get_num_lives(outputWorld)
        reward += lives_down * BRICK_LIFE

    return reward * get_time_factor(outputWorld), False


def update_rewards(worlds, rewards):
    latest_world = worlds.worlds[-1]

    discounted_rewards = []
    for index, world in enumerate(worlds.worlds):
        discounted_reward = discount_reward(world, rewards[index:])
        discounted_rewards.append(discounted_reward)

    X = np.array(discounted_rewards)
    # X_norm = X / np.std(X)
    X_norm = X

    for index, world in enumerate(worlds.worlds):
        world.reward = X_norm[index]

    return latest_world.won


def discount_reward(world, rewards):
    return sum(
        reward * math.pow(DISCOUNT_RATE, index)
        for index, reward in enumerate(rewards)
    )


def get_time_factor(outputWorld):
    if not outputWorld.arrow.ready:
        x = 1.0 * outputWorld.pre_frame_nb / MAX_PRE_FRAMES
    else:
        x = 1.0 * get_post_frame_nb(outputWorld) / MAX_FRAMES

    return - 100 * x * math.log(x, 10)

    # if outputWorld.arrow.ready:
    #     return 1.0
    # else:
    #     return 0.1


def lost(outputWorld):
    return (
        outputWorld.lost or
        outputWorld.pre_frame_nb > MAX_FRAMES or
        get_post_frame_nb(outputWorld) > MAX_FRAMES
    )


def get_num_lives(world):
    return sum(brick.lives for brick in world.bricks)


def get_post_frame_nb(world):
    x = world.frame_nb - world.pre_frame_nb
    return x if x > 0 else 1

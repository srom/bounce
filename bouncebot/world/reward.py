from __future__ import unicode_literals

import math

from .models.world_pb2 import LEFT, RIGHT, SPACE, HOLD


WON_REWARD = +100
LOST_REWARD = -100
BRICK_LIFE = +5
EPSILON = +1

MAX_FRAMES = 2 * 60 * 60  # 2 minutes
MAX_PRE_FRAMES = 5 * 60  # 5 seconds


def get_reward(inputWorld, outputWorld):
    if outputWorld.won:
        return WON_REWARD, True
    elif outputWorld.lost or get_post_frame_nb(outputWorld) > MAX_FRAMES:
        return LOST_REWARD, True

    reward = EPSILON / 3.0

    if not outputWorld.arrow.ready and outputWorld.action in (LEFT, RIGHT):
        reward -= EPSILON
    elif not outputWorld.arrow.ready and outputWorld.action in (SPACE, HOLD):
        reward += EPSILON

    if inputWorld:
        if not inputWorld.arrow.ready and outputWorld.arrow.ready:
            reward += EPSILON

        lives_down = get_num_lives(inputWorld) - get_num_lives(outputWorld)
        reward += lives_down * BRICK_LIFE

    return reward * get_time_factor(outputWorld), False


def get_time_factor(outputWorld):
    if not outputWorld.arrow.ready:
        x = 1.0 * outputWorld.pre_frame_nb / MAX_PRE_FRAMES
        return -x * math.log(x, 10)
    else:
        return -math.log(1.0 * get_post_frame_nb(outputWorld) / MAX_FRAMES, 10)


def get_num_lives(world):
    return sum(brick.lives for brick in world.bricks)


def get_post_frame_nb(world):
    x = world.frame_nb - world.pre_frame_nb
    return x if x > 0 else 1

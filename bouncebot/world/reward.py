from __future__ import unicode_literals

from .models.world_pb2 import LEFT, RIGHT, SPACE, HOLD


WON_REWARD = +100
LOST_REWARD = -100
BRICK_LIFE = +5
EPSILON = +1


def get_reward(inputWorld, outputWorld):
    if outputWorld.won:
        return WON_REWARD
    elif outputWorld.lost:
        return LOST_REWARD

    reward = EPSILON / 2.0

    if not outputWorld.arrow.ready and outputWorld.action in (LEFT, RIGHT):
        reward -= EPSILON
    elif not outputWorld.arrow.ready and outputWorld.action in (SPACE, HOLD):
        reward += EPSILON

    if inputWorld:
        if not inputWorld.arrow.ready and outputWorld.arrow.ready:
            reward += EPSILON

        lives_down = get_num_lives(inputWorld) - get_num_lives(outputWorld)
        reward += lives_down * BRICK_LIFE

    return reward * get_time_factor(inputWorld, outputWorld)


def get_time_factor(inputWorld, outputWorld):
    return 1


def get_num_lives(world):
    return sum(brick.lives for brick in world.bricks)

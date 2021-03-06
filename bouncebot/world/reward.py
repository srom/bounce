from __future__ import unicode_literals

import logging
import math

import numpy as np

from .models.world_pb2 import LEFT, RIGHT, SPACE, HOLD


WON_REWARD = +1
LOST_REWARD = -1
BRICK_LIFE = +1
EPSILON = +1
ALL_LIVES = 7

MAX_FRAMES = 1 * 60 * 60  # 1 minute
MAX_PRE_FRAMES = 5 * 60  # 5 seconds

DISCOUNT_RATE = 0.99

INITIAL_TIME_MULTIPLIER = 1.0

logger = logging.getLogger(__name__)


def get_reward(inputWorld, outputWorld):
    if outputWorld.won:
        return WON_REWARD, True
    elif lost(outputWorld):
        return LOST_REWARD, True

    reward = 0
    if not outputWorld.arrow.ready:
        # reward = EPSILON
        reward = 0

        if outputWorld.action in (LEFT, RIGHT):
            reward -= 0
            # reward -= EPSILON
    else:
        if not inputWorld.arrow.ready:
            reward += 2 * EPSILON

        if outputWorld.physics and outputWorld.physics.target:
            # Use output of ray casting to help evaluate the position.
            # world.physics.target describes what the ball is facing.
            # It can take 4 values:
            #  - BRICK: great.
            #  - PADDLE: good, more chances to survive.
            #  - WALL: OK, ball can probably keep on playing.
            #  - VOID: facing death

            if outputWorld.physics.target == 'BRICK':
                reward += 0
            elif outputWorld.physics.target == 'PADDLE':
                reward += 0
            elif outputWorld.physics.target == 'WALL':
                reward += 0
            elif outputWorld.physics.target == 'VOID':
                reward -= 0

        # if outputWorld.action in (LEFT, RIGHT):
        #     if inputWorld.paddle.x_px != outputWorld.paddle.x_px:
        #         reward += EPSILON
        #     else:
        #         reward -= EPSILON

        # if ball_bounced_on_paddle(inputWorld, outputWorld):
        #     logger.info('BOUUUUNCE')
        #     reward += BRICK_LIFE * EPSILON

        # if outputWorld.action == SPACE and inputWorld.arrow.ready:
        #     reward -= EPSILON

        if inputWorld:
            # Brick's life is worth more as we more closer to a win
            # goal_multiplier = ALL_LIVES - get_num_lives(outputWorld) + 1
            goal_multiplier = 1

            lives_down = get_num_lives(inputWorld) - get_num_lives(outputWorld)
            reward += goal_multiplier * lives_down * BRICK_LIFE

    return reward * get_time_factor(outputWorld), False


def ball_bounced_on_paddle(inputWorld, outputWorld):
    initialBallY = 540
    return inputWorld.ball.y_px - initialBallY > 0 and outputWorld.ball.y_px - initialBallY < 0


def update_rewards(worlds, rewards):
    latest_world = worlds.worlds[-1]

    discounted_rewards = []
    for index, world in enumerate(worlds.worlds):
        discounted_reward = discount_reward(world, rewards[index:])
        discounted_rewards.append(discounted_reward)

    X = np.array(discounted_rewards)
    X_norm = X / np.std(X)
    # X_norm = X

    for index, world in enumerate(worlds.worlds):
        world.reward = X_norm[index]

    return latest_world.won


def discount_reward(world, rewards):
    return sum(
        reward * math.pow(DISCOUNT_RATE, index)
        for index, reward in enumerate(rewards)
    )


def get_time_factor(outputWorld):
    # if not outputWorld.arrow.ready:
    #     x = 1.0 * outputWorld.pre_frame_nb / MAX_PRE_FRAMES
    #     return - 100 * x * math.log(x, 10)
    # else:
    #     x = 1.0 * get_post_frame_nb(outputWorld) / MAX_FRAMES
    #
    #     if x < 0.5:
    #         return INITIAL_TIME_MULTIPLIER
    #     else:
    #         return -INITIAL_TIME_MULTIPLIER * math.log(x, 10)

    return 1.0

    # if time_factor > 1:
    #     time_factor = 1

    # return time_factor

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
    # x = world.frame_nb - world.pre_frame_nb
    # return x if x > 0 else 1
    return world.frame_nb

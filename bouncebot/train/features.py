from __future__ import unicode_literals

import numpy as np

from ..world.models.world_pb2 import LEFT, RIGHT, SPACE


NUM_WORLD_FEATURES = 49
NUM_FEATURES = 2 * NUM_WORLD_FEATURES
TRAIN_TEST_RATIO = 0.8


def get_features_from_games(games):
    games_array = np.array(games)
    return (
        np.concatenate(games_array[...,0]),
        np.concatenate(games_array[...,1]),
        np.concatenate(games_array[...,2]),
    )


def get_training_features(worlds):
    features = []
    for input_world, output_world in zip([None] + list(worlds.worlds), list(worlds.worlds)):
        features.append(get_features(input_world, output_world))

    X = np.array(features, dtype=np.float32)
    rewards = np.array([[world.reward] for world in worlds.worlds], dtype=np.float32)
    labels = np.array([get_action_label(world.action) for world in worlds.worlds], dtype=np.float32)

    return X, rewards, labels


def split_features(X, rewards, labels):
    l = X.shape[0]
    index = int(TRAIN_TEST_RATIO * l) - 1
    return X, X[index+1:,:], rewards, rewards[index+1:], labels, labels[index+1:]


def get_features(inputWorld, outputWorld):
    res =  np.concatenate((
        get_world_features(inputWorld),
        get_world_features(outputWorld),
    ))
    return res


def get_action_label(action):
    if action == LEFT:
        return [1, 0, 0, 0]
    elif action == RIGHT:
        return [0, 1, 0, 0]
    elif action == SPACE:
        return [0, 0, 1, 0]
    else:
        return [0, 0, 0, 1]


def get_world_features(world):
    if not world or not world.paddle:
        return np.array([0] * NUM_WORLD_FEATURES, dtype=np.float32)

    features = [
        float(world.won),
        float(world.lost),
        world.frame_nb,
        world.pre_frame_nb,
    ]

    for field_name in ['ball', 'paddle', 'arrow']:
        field = getattr(world, field_name)
        update_features_from_field(features, field)

    for brick in world.bricks:
        update_features_from_field(features, brick)

    X = np.array(features, dtype=np.float32)

    return normalize(X)


def normalize(X):
    return (X - np.mean(X, axis=0)) / np.std(X, axis=0)


def update_features_from_field(features, field):
    for descriptor in field.DESCRIPTOR.fields:
        attr = getattr(field, descriptor.name)
        features.append(float(attr))

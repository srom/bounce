from __future__ import unicode_literals

import numpy as np


NUM_WORLD_FEATURES = 49
NUM_FEATURES = 2 * NUM_WORLD_FEATURES


def get_features(inputWorld, outputWorld):
    print '--------------'
    res =  np.concatenate((
        get_world_features(inputWorld),
        get_world_features(outputWorld),
    ))
    print '--------------'
    return res


def get_world_features(world):
    if not world or not world.paddle:
        return np.array([0] * NUM_WORLD_FEATURES, dtype=np.float32)

    features = [
        float(world.won),
        float(world.lost),
        world.frame_nb,
        world.pre_frame_nb,
    ]
    print 'before', len(features), features

    for field_name in ['ball', 'paddle', 'arrow']:
        field = getattr(world, field_name)
        update_features_from_field(features, field)

    print 'during', len(features), features

    print len(world.bricks)
    for brick in world.bricks:
        update_features_from_field(features, brick)

    print 'after', len(features), features
    print

    return np.array(features, dtype=np.float32)


def update_features_from_field(features, field):
    for descriptor in field.DESCRIPTOR.fields:
        attr = getattr(field, descriptor.name)
        features.append(float(attr))

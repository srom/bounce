from __future__ import unicode_literals

from google.protobuf.json_format import MessageToJson

from ..world.query import simulation
from ..world.models.world_pb2 import Worlds, HOLD


NUM_FRAMES = 600


def record_movie():
    result = None
    action = HOLD

    all_worlds = Worlds()
    frame = 0
    while frame < NUM_FRAMES:
        res_worlds = simulation(result, action, movie=True)
        frame += len(res_worlds.worlds)
        worlds = res_worlds.worlds
        new_result = worlds[-1]
        if new_result.frame_nb > 0:
            result = new_result
            all_worlds.worlds.extend(worlds)

    print MessageToJson(all_worlds)

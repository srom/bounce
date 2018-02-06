from __future__ import unicode_literals

from google.protobuf.json_format import MessageToJson

from query import simulation
from reward import get_reward
from models.world_pb2 import Worlds, HOLD

NUM_FRAMES = 600


def main():
    result = None
    action = HOLD
    # movie = True

    action = simulation(result, action)

    recent_rewards = []
    print get_reward(None, action, recent_rewards)

    # all_worlds = Worlds()
    # frame = 0
    # while frame < NUM_FRAMES:
    #     res_worlds = simulation(result, action, movie=movie)
    #     frame += len(res_worlds.worlds)
    #     worlds = res_worlds.worlds
    #     new_result = worlds[-1]
    #     if new_result.frame_nb > 0:
    #         result = new_result
    #         all_worlds.worlds.extend(worlds)
    #
    # print MessageToJson(all_worlds)


if __name__ == '__main__':
    main()

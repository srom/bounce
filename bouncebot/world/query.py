from __future__ import unicode_literals

import socket

from models.world_pb2 import World, Worlds, HOLD


SOCKET_URL = '/tmp/bounce.sock'
FRAME_RATE = 1.0 / 60
DEFAULT_NUM_EPOCHS = 20


def simulation(current_world, action, movie=False, num_epochs=DEFAULT_NUM_EPOCHS):
    if not current_world:
        current_world = getDefaultWorld()

    return run_simulation(current_world, action, num_epochs, movie)


def run_simulation(current_world, action, num_epochs, movie):
    current_world.action = action if action is not None else current_world.action
    current_world.request.frame_rate = FRAME_RATE
    current_world.request.num_epochs = num_epochs
    current_world.request.movie = movie

    current_world_str = current_world.SerializeToString()

    error = 0
    while error < 500:
        data = query_socket(current_world_str)

        if movie:
            worlds = Worlds()
            worlds.ParseFromString(data)

            if any(w.pre_frame_nb == 0 for w in worlds.worlds):
                error += 1
                continue

            return worlds
        else:
            new_world = World()
            new_world.ParseFromString(data)

            if len(new_world.bricks) > 5:
                # TODO investigate further: 5 bricks on JS side => 10 bricks on python side sometimes.
                del new_world.bricks[5:]

            if new_world.pre_frame_nb == 0:
                error += 1
                continue

            return new_world

    raise ValueError('Cannot get valid output')


def getDefaultWorld():
    world = World()
    world.action = HOLD

    data = query_socket(world.SerializeToString())

    new_world = World()
    new_world.ParseFromString(data)
    return new_world


def query_socket(message):
    sock = socket.socket(socket.AF_UNIX)
    sock.settimeout(1)
    sock.connect(SOCKET_URL)
    try:
        sock.sendall(message)
        return sock.recv(32768)
    finally:
        sock.close()

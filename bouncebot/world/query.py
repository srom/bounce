from __future__ import unicode_literals

import socket

from models.world_pb2 import World, Worlds, HOLD


SOCKET_URL = '/tmp/bounce.sock'
FRAME_RATE = 1.0 / 60
NUM_EPOCHS = 15


def simulation(current_world, action, movie=False):
    if not current_world:
        current_world = getDefaultWorld()

    return run_simulation(current_world, action, NUM_EPOCHS, movie)


def run_simulation(current_world, action, num_epochs, movie):
    current_world.action = action if action else current_world.action
    current_world.request.frame_rate = FRAME_RATE
    current_world.request.num_epochs = num_epochs
    current_world.request.movie = movie

    data = query_socket(current_world.SerializeToString())

    if movie:
        worlds = Worlds()
        worlds.ParseFromString(data)
        return worlds
    else:
        new_world = World()
        new_world.ParseFromString(data)
        return new_world


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
        return sock.recv(1048576)
    finally:
        sock.close()

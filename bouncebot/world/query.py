from __future__ import unicode_literals

import socket

from models.world_pb2 import World, HOLD


SOCKET_URL = '/tmp/bounce.sock'

FRAME_RATE = 1.0 / 60


def simulation(current_world, action, num_epochs):
    if not current_world:
        current_world = getDefaultWorld()

    return run_simulation(current_world, action, num_epochs)


def run_simulation(current_world, action, num_epochs):
    current_world.action = action if action else current_world.action
    current_world.request.frame_rate = FRAME_RATE
    current_world.request.num_epochs = num_epochs
    message = current_world.SerializeToString()
    return query_socket(message)


def getDefaultWorld():
    world = World()
    world.action = HOLD
    message = world.SerializeToString()
    return query_socket(message)


def query_socket(message):
    sock = socket.socket(socket.AF_UNIX)
    sock.settimeout(1)
    sock.connect(SOCKET_URL)

    try:
        sock.sendall(message)

        data = sock.recv(4096)

        new_world = World()
        new_world.ParseFromString(data)

        return new_world

    finally:
        sock.close()

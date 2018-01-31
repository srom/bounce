from __future__ import unicode_literals

import socket

from models.world_pb2 import World


SOCKET_URL = '/tmp/bounce.sock'


def query_socket():
    sock = socket.socket(socket.AF_UNIX)
    sock.settimeout(1)
    sock.connect(SOCKET_URL)

    try:
        world = World()
        world.request.frame_rate = 1.0 / 60
        message = world.SerializeToString()

        sock.sendall(message)

        data = sock.recv(4096)

        new_world = World()
        new_world.ParseFromString(data)

        return new_world

    finally:
        sock.close()

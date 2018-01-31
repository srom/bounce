from __future__ import unicode_literals

import socket

from models.world_pb2 import World


def query_socket():
    sock = socket.socket(socket.AF_UNIX)
    sock.settimeout(3)
    socket_url = '/tmp/bounce.sock'
    sock.connect(socket_url)

    world = World()
    world.request.frame_rate = 1.0 / 60
    message = world.SerializeToString()

    sock.sendall(message)

    data = sock.recv(4096)

    new_world = World()
    new_world.ParseFromString(data)

    print "received message:", new_world

    sock.close()

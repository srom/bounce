from __future__ import unicode_literals

import json
import socket


def query_socket():
    sock = socket.socket(socket.AF_UNIX)
    sock.settimeout(3)
    socket_url = '/tmp/bounce.sock'
    sock.connect(socket_url)
    message = json.dumps(dict(hello='world'))
    sock.sendall(message)

    data = sock.recv(4096)
    print "received message:", json.loads(data)

    sock.close()

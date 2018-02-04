from __future__ import unicode_literals

from google.protobuf.json_format import MessageToJson

from query import simulation


def main():
    result = simulation(None, None, movie=True)
    print MessageToJson(result)


if __name__ == '__main__':
    main()

from __future__ import unicode_literals

from query import simulation


NUM_EPOCHS = 10


def main():
    result = simulation(None, None, NUM_EPOCHS)
    print result


if __name__ == '__main__':
    main()

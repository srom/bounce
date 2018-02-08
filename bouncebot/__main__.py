from __future__ import unicode_literals

from .train.neural_net import BounceDNN
from .train.play import play


def main():
    session = None
    bounce_dnn = BounceDNN()

    play(session, bounce_dnn)


if __name__ == '__main__':
    main()

from __future__ import unicode_literals

import logging

from google.protobuf.json_format import MessageToJson
import tensorflow as tf

from .play import play
from .load import load_model


logger = logging.getLogger(__name__)


def main():
    logging.basicConfig(level=logging.INFO, format="%(asctime)s (%(levelname)s) %(message)s")
    tf.reset_default_graph()

    with load_model() as bouncebot:
        worlds, won = play(bouncebot)

        logger.info(
            'Game end: %s (%d worlds; %d frames; %d bricks left)',
            'WON' if won else 'LOST',
            len(worlds.worlds),
            worlds.worlds[-1].frame_nb,
            len(worlds.worlds[-1].bricks),
        )

        print MessageToJson(worlds)


if __name__ == '__main__':
    main()

from __future__ import unicode_literals

import argparse
import logging
import sys

from google.protobuf.json_format import MessageToJson
import tensorflow as tf

from .play import play_pg, play_deepq
from .load import load_pg_model, load_deepq_model


logger = logging.getLogger(__name__)


def main_pg():
    with load_pg_model() as bouncebot:
        worlds, won = play_pg(bouncebot)

        logger.info(
            'Game end: %s (%d worlds; %d frames; %d lives left) ; Arrow ready: %s',
            'WON' if won else 'LOST',
            len(worlds.worlds),
            worlds.worlds[-1].frame_nb,
            sum(b.lives for b in worlds.worlds[-1].bricks),
            worlds.worlds[-1].arrow.ready,
        )

        print MessageToJson(worlds)


def main_deepq():
    with load_deepq_model() as bouncebot:
        worlds, won = play_deepq(bouncebot)

        logger.info(
            'Game end: %s (%d worlds; %d frames; %d lives left) ; Arrow ready: %s',
            'WON' if won else 'LOST',
            len(worlds.worlds),
            worlds.worlds[-1].frame_nb,
            sum(b.lives for b in worlds.worlds[-1].bricks),
            worlds.worlds[-1].arrow.ready,
        )

        print MessageToJson(worlds)


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO, format="%(asctime)s (%(levelname)s) %(message)s")
    tf.reset_default_graph()

    parser = argparse.ArgumentParser()
    parser.add_argument('--deepq', default=False, action='store_true')
    parser.add_argument('--pg', default=False, action='store_true')

    args = parser.parse_args()

    deepq_option = args.deepq
    pg_option = args.pg

    if not deepq_option and not pg_option:
        deepq_option = True
    elif deepq_option and pg_option:
        logger.error('Pick an algorithm: --deepq (default) or --pg')
        sys.exit(1)

    if deepq_option:
        main_deepq()
    else:
        main_pg()

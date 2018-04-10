from __future__ import unicode_literals

import logging

import numpy as np
import tensorflow as tf


logger = logging.getLogger(__name__)


class BounceBotModel(object):

    def __init__(self, session, x, f_x):
        self.session = session
        self.x = x
        self.f_x = f_x

    def evaluate(self, x):
        return self.session.run(self.f_x, feed_dict={self.x: x})

    def close(self):
        self.session.close()

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.close()


def load_pg_model():
    """
    Use as a context manager or explicitly close after use.
    """
    return load_model(
        path='bouncebot/model/bouncebot.pb',
        input_name='bouncebot/input/X:0',
        evaluator_name='bouncebot/f_p/f_explore/Multinomial:0',
    )


def load_deepq_model():
    """
    Use as a context manager or explicitly close after use.
    """
    return load_model(
        path='bouncebot/model/deepq.pb',
        input_name='bouncebot/critic/input/X:0',
        evaluator_name='bouncebot/critic/q_values/output_action:0',
    )


def load_model(path, input_name, evaluator_name):
    """
    Use as a context manager or explicitly close after use.
    """
    with tf.gfile.GFile(path, "rb") as f:
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())

    with tf.Graph().as_default() as graph:
        tf.import_graph_def(graph_def, name='bouncebot')
        session = tf.Session(graph=graph)

        x = graph.get_tensor_by_name(input_name)
        f_x = graph.get_tensor_by_name(evaluator_name)

        return BounceBotModel(session, x, f_x)

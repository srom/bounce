from __future__ import unicode_literals

import tensorflow as tf


class BounceBotModel(object):

    def __init__(self, session, x, f_x):
        self.session = session
        self.x = x
        self.f_x = f_x

    def evaluate(self, x):
        return self.session.run(self.f_x, feed_dict={self.x: x})[0]

    def close(self):
        self.session.close()

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.close()


def load_model():
    """
    Use as a context manager or explicitly close after use.
    """
    with tf.gfile.GFile("bouncebot/model/bouncebot.pb", "rb") as f:
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())

    with tf.Graph().as_default() as graph:
        tf.import_graph_def(graph_def, name='bouncebot')
        session = tf.Session(graph=graph)

        x = graph.get_tensor_by_name('bouncebot/input/X:0')
        f_x = graph.get_tensor_by_name('bouncebot/f_p/f_evaluate:0')

        return BounceBotModel(session, x, f_x)

from __future__ import unicode_literals

import logging

import boto3
import tensorflow as tf
from tensorflow.python.framework import graph_util


BUCKET_NAME = 'bouncebot'
OUTPUT_KEY_NAME = 'model/bouncebot.pb'
OUTPUT_KEY_NAME_BEST = 'model/bouncebot_best.pb'
LOCAL_EXPORT = 'bouncebot/model/bouncebot.pb'


logger = logging.getLogger(__name__)


def export_model(saver, model_save_path, local=False, best=False):
    logger.info('Exporting model')

    with tf.Session() as session:
        saver.restore(session, model_save_path)

        output_node_names = ['f_p/f_evaluate', 'f_p/f_explore/Multinomial']

        output_graph_def = graph_util.convert_variables_to_constants(
            session,
            session.graph.as_graph_def(),
            output_node_names,
        )

        if local:
            export_model_to_disk(output_graph_def)
        else:
            export_model_to_s3(output_graph_def, best=best)

    logger.info('Export completed')


def export_model_to_s3(output_graph_def, best=False):
    s3 = boto3.resource('s3', region_name='eu-west-1')
    bucket = s3.Bucket(BUCKET_NAME)
    key_name = OUTPUT_KEY_NAME if not best else OUTPUT_KEY_NAME_BEST
    bucket.put_object(Key=key_name, Body=output_graph_def.SerializeToString())
    logger.info('Model exported to s3://%s/%s', BUCKET_NAME, key_name)


def export_model_to_disk(output_graph_def):
    with open(LOCAL_EXPORT, 'wb') as f:
        f.write(output_graph_def.SerializeToString())

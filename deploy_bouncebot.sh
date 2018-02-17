#!/bin/bash

pushd bouncebot

TARFILE=bouncebot.tar.gz
tar --exclude '.git*' --exclude '*.sqlite3' --exclude 'env' --exclude 'packages/*' --exclude '.idea/*' \
    --exclude '*.pyc' --exclude 'checkpoints/*' --exclude 'summary_log/*' --exclude 'model/*' \
    --exclude 'node_modules/*' -pczvf $TARFILE .

aws s3 cp $TARFILE s3://romainstrock-packages/

popd

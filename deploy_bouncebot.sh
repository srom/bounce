#!/bin/bash

TARFILE=bouncebot.tar.gz
tar --exclude '.git*' --exclude '*.sqlite3' --exclude 'env' --exclude 'packages/*' \
    --exclude '*.pyc' --exclude 'summary_log/*' --exclude 'model/*' --exclude '.idea/*' \
    --exclude 'node_modules/*' --exclude 'resources/*' --exclude 'src/*' --exclude 'vendor/*' \
    --exclude 'checkpoints/*' --exclude 'train/checkpoints/*' \
    -pczvf $TARFILE .

aws s3 cp $TARFILE s3://romainstrock-packages/

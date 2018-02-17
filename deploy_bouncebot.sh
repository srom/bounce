#!/bin/bash

TARFILE=bouncebot.tar.gz
tar --exclude '.git*' --exclude '*.sqlite3' --exclude 'env' --exclude 'packages/*' --exclude '.idea/*' \
    --exclude '*.pyc' --exclude 'checkpoints/*' --exclude 'summary_log/*' --exclude 'model/*' \
    --exclude 'node_modules/*' --exclude 'resources/*' --exclude 'src/*' --exclude 'vendor/*' -pczvf $TARFILE .

aws s3 cp $TARFILE s3://romainstrock-packages/

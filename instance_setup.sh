#!/bin/bash

set -e
set -x

curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodej
sudo apt-get install -y build-essentials
sudo npm install -g npm@latest

sudo pip2 install pip --upgrade
sudo pip2 install virtualenv

sudo pip2 install awscli --upgrade --user

aws s3 cp s3://romainstrock-packages/bouncebot.tar.gz .

rm -r bouncebot || true
mkdir bouncebot
tar -xzf bouncebot.tar.gz -C bouncebot

pushd bouncebot

virtualenv env
env/bin/pip install -r requirements_deploy.txt

npm install
cp -r node_modules/ server/

rm -r log || true
mkdir log

popd

# nohup ./run_server.sh > log/node_server.log 2>&1 &
# nohup env/bin/python -m bouncebot.train --export > log/bouncebot.log 2>&1 &
# nohup env/bin/tensorboard --logdir summary_log/ > log/tensorboard.log 2>&1 &

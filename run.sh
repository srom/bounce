#!/bin/bash

trap "kill 0 $(jobs -p)" SIGINT EXIT

./node_modules/.bin/webpack --progress --watch &

python -m SimpleHTTPServer 8000

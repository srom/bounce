#!/bin/bash

rm /tmp/bounce.sock || true

pushd server

node node_modules/babel-cli/bin/babel.js ./ \
    --out-dir dist/ \
    --ignore ./node_modules,./.babelrc,./package.json,./npm-debug.log,./dist \
    --copy-file

node dist/index.js

popd

#!/bin/bash

../node_modules/protobufjs/bin/pbjs -t static-module --es6 -o ../server/models/world.js world.proto

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDefaultWorld = exports.parseWorld = undefined;

var _world = require('./models/world');

var parseWorld = exports.parseWorld = function parseWorld(data) {
    var world = _world.World.decode(data);
    if (!world.ball) {
        // Object is empty
        return null;
    }
    return world;
};

var getDefaultWorld = exports.getDefaultWorld = function getDefaultWorld() {
    return _world.World.create({
        Request: {
            frame_rate: 1 / 60
        }
    });
};
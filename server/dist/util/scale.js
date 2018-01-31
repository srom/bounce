'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.metersToPixels = exports.pixelsToMeters = undefined;

var _constants = require('../constants');

var pixelsToMeters = exports.pixelsToMeters = function pixelsToMeters(pixels) {
    return pixels * _constants.RATIO;
};

var metersToPixels = exports.metersToPixels = function metersToPixels(meters) {
    return meters / _constants.RATIO;
};
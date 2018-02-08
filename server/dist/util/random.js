"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var randomFloat = exports.randomFloat = function randomFloat(max, min) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(4));
};

var randomBoolean = exports.randomBoolean = function randomBoolean() {
    return Math.random() >= 0.5;
};
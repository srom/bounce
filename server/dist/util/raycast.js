'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rayCast = undefined;

var _box2dweb = require('box2dweb');

var _box2dweb2 = _interopRequireDefault(_box2dweb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var RAYCAST_LENGTH = 100;

var rayCast = exports.rayCast = function rayCast(prevBallPos, ballPos, paddle, bricks, walls) {
    var rayCastInput = new _box2dweb2.default.Collision.b2RayCastInput(prevBallPos, ballPos, RAYCAST_LENGTH);

    var closestElement = null;
    var closestFraction = RAYCAST_LENGTH;

    [paddle].concat(_toConsumableArray(bricks), _toConsumableArray(walls)).forEach(function (element) {
        var fixture = getFixture(element.body);
        if (fixture) {
            var output = new _box2dweb2.default.Collision.b2RayCastOutput();
            if (fixture.RayCast(output, rayCastInput)) {
                if (output.fraction < closestFraction) {
                    closestFraction = output.fraction;
                    closestElement = element;
                }
            }
        }
    });

    return closestElement;
};

var getFixture = function getFixture(body) {
    return body ? body.GetFixtureList() : null;
};
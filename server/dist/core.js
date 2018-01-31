'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDefaultWorld = exports.parseWorld = undefined;

var _box2dweb = require('box2dweb');

var _box2dweb2 = _interopRequireDefault(_box2dweb);

var _world = require('./models/world');

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

var _ball = require('./entity/ball');

var _ball2 = _interopRequireDefault(_ball);

var _paddle = require('./entity/paddle');

var _paddle2 = _interopRequireDefault(_paddle);

var _arrow = require('./entity/arrow');

var _arrow2 = _interopRequireDefault(_arrow);

var _brick = require('./entity/brick');

var _brick2 = _interopRequireDefault(_brick);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseWorld = exports.parseWorld = function parseWorld(data) {
    var world = _world.World.decode(data);
    if (!world.paddle) {
        // Object is empty
        return null;
    }
    return world;
};

var getDefaultWorld = exports.getDefaultWorld = function getDefaultWorld() {
    return initializeWorld();
};

var initializeWorld = function initializeWorld() {
    var b2World = _box2dweb2.default.Dynamics.b2World;
    var b2Vec2 = _box2dweb2.default.Common.Math.b2Vec2;

    var paddleWidth = 100;
    var paddleHeight = 20;
    var initialPaddleX = constants.STAGE_WIDTH_PX / 2 - paddleWidth / 2;
    var initialPaddleY = constants.STAGE_HEIGHT_PX - 50;

    var ballRadius = 6;
    var initialBallX = initialPaddleX + paddleWidth / 2;
    var initialBallY = initialPaddleY - ballRadius - 4;

    var initialArrowX = initialBallX + ballRadius / 2;
    var initialArrowY = initialBallY - 2 * ballRadius;

    var world = new b2World(new b2Vec2(0, 0), // gravity
    true // allow sleep
    );

    var bricks = (0, _brick.setBricks)(world);

    return _world.World.create({
        frameNb: 0,
        preFrameNb: 0,
        action: 3, // HOLD
        ball: {
            xPx: initialBallX,
            yPx: initialBallY,
            radiusPx: ballRadius,
            linearVelocityXM: 0,
            linearVelocityYM: 0
        },
        paddle: {
            xPx: initialPaddleX,
            yPx: initialPaddleY,
            widthPx: paddleWidth,
            heightPx: paddleHeight
        },
        arrow: {
            xPx: initialArrowX,
            yPx: initialArrowY,
            angularVelocityXM: 0,
            angularVelocityYM: 0
        },
        bricks: bricks.map(function (brick) {
            return {
                xPx: brick.el.position.x,
                yPx: brick.el.position.y,
                widthPx: brick.el.position.width,
                heightPx: brick.el.position.height,
                lives: brick.lives
            };
        })
    });
};
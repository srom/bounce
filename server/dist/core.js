'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.runMainLoop = exports.getDefaultWorld = exports.parseWorld = undefined;

var _box2dweb = require('box2dweb');

var _box2dweb2 = _interopRequireDefault(_box2dweb);

var _world = require('./models/world');

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

var _random = require('./util/random');

var _ball = require('./entity/ball');

var _ball2 = _interopRequireDefault(_ball);

var _paddle = require('./entity/paddle');

var _paddle2 = _interopRequireDefault(_paddle);

var _arrow = require('./entity/arrow');

var _arrow2 = _interopRequireDefault(_arrow);

var _brick = require('./entity/brick');

var _brick2 = _interopRequireDefault(_brick);

var _wall = require('./entity/wall');

var _wall2 = _interopRequireDefault(_wall);

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

var runMainLoop = exports.runMainLoop = function runMainLoop(inputWorld) {
    return mainLoop(inputWorld);
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
    false // allow sleep
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
            angularVelocityYM: 0,
            rotation: (0, _random.randomFloat)(-_arrow.MAX_ANGLE, _arrow.MAX_ANGLE),
            reversed: (0, _random.randomBoolean)()
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

var mainLoop = function mainLoop(inputWorld) {
    var b2World = _box2dweb2.default.Dynamics.b2World;
    var b2Vec2 = _box2dweb2.default.Common.Math.b2Vec2;
    var b2Listener = _box2dweb2.default.Dynamics.b2ContactListener;

    var b2_world = new b2World(new b2Vec2(0, 0), // gravity
    false // allow sleep
    );

    var request = parseRequest(inputWorld.request);
    var ball = parseBall(inputWorld.ball, b2_world);
    var paddle = parsePaddle(inputWorld.paddle, b2_world);
    var arrow = parseArrow(inputWorld.arrow);
    var bricks = parseBricks(inputWorld.bricks, b2_world);
    (0, _wall.setWalls)(b2_world);

    var movie = request.movie;
    var worlds = [];

    var listener = new b2Listener();
    b2_world.SetContactListener(contactListener(listener));

    var num_epochs = request.numEpochs;
    var currentWorld = inputWorld;
    for (var i = 0; i < num_epochs; i++) {
        if (currentWorld.won || currentWorld.lost) {
            break;
        }
        update(b2_world, currentWorld, request.frameRate, ball, paddle, arrow, bricks);
        clean(b2_world);

        var newWorld = getOutputWorld(currentWorld, request, ball, paddle, arrow, bricks);
        currentWorld = newWorld;
        worlds.push(newWorld);
    }

    if (movie) {
        return _world.Worlds.create({
            worlds: worlds
        });
    } else {
        return worlds[worlds.length - 1];
    }
};

var update = function update(b2_world, inputWorld, frame_rate, ball, paddle, arrow, bricks) {
    b2_world.Step(frame_rate, constants.VELOCITY_ITERATIONS, constants.POSITION_ITERATIONS);

    var input = getInputFromAction(inputWorld);

    ball.render();
    paddle.render(input);
    arrow.render(input);

    bricks.forEach(function (brick) {
        if (brick.isGarbage() && brick.body) {
            b2_world.DestroyBody(brick.body);
            brick.body = null;
        }
    });

    if (arrow.ready && !ball.canMove) {
        paddle.canMove = true;
        ball.canMove = true;
        ball.createBody(b2_world).setLinearVelocity(constants.VELOCITY_FACTOR * arrow.velocity.x, constants.VELOCITY_FACTOR * arrow.velocity.y);
    }

    if (bricks.every(function (b) {
        return b.isGarbage();
    })) {
        youWin(inputWorld);
    }

    if (ball.dead) {
        gameOver(inputWorld);
    }

    if (ball.body) {
        console.log('ball linear velocity', ball.body.GetLinearVelocity());
    }
};

var clean = function clean(world) {
    world.ClearForces();
};

var youWin = function youWin(inputWorld) {
    inputWorld.won = true;
    console.log("WON");
};

var gameOver = function gameOver(inputWorld) {
    inputWorld.lost = true;
    console.log("LOST");
};

var contactListener = function contactListener(listener) {
    listener.EndContact = function (contact) {
        var bodyA = contact.GetFixtureA().GetBody();
        var bodyB = contact.GetFixtureB().GetBody();

        var ball = getInstanceOrNull(bodyA, bodyB, _ball2.default);
        var brick = getInstanceOrNull(bodyA, bodyB, _brick2.default);
        var wall = getInstanceOrNull(bodyA, bodyB, _wall2.default);
        var paddle = getInstanceOrNull(bodyA, bodyB, _paddle2.default);

        if (ball !== null && brick !== null) {
            console.log('=== CONTACT BALL & BRICK');
            brick.contact();
        }

        if (ball !== null) {
            ball.contact();

            if (wall !== null) {
                console.log('=== CONTACT BALL & WALL', wall._initialPosition);
            } else if (paddle !== null) {
                console.log('=== CONTACT BALL & PADDLE');
            }
        } else {
            console.log('=== CONTACT WTF');
            console.log('BODY A', contact.GetFixtureA().GetBody().GetUserData());
            console.log('BODY B', contact.GetFixtureB().GetBody().GetUserData());
        }
    };
    return listener;
};

var getInstanceOrNull = function getInstanceOrNull(bodyA, bodyB, cls) {
    var userDataA = bodyA.GetUserData();
    var userDataB = bodyB.GetUserData();
    return getIfInstanceOfElseNull(userDataA, cls) || getIfInstanceOfElseNull(userDataB, cls);
};

var getIfInstanceOfElseNull = function getIfInstanceOfElseNull(userData, cls) {
    if (userData instanceof cls) {
        return userData;
    }
    return null;
};

var parseRequest = function parseRequest(pb_request) {
    return pb_request;
};

var parseBall = function parseBall(pb_ball, world) {
    var ball = new _ball2.default(pb_ball.xPx, pb_ball.yPx, pb_ball.radiusPx);
    ball.dead = pb_ball.dead;
    ball.canMove = pb_ball.canMove;
    ball.bouncing = pb_ball.bouncing;
    if (ball.canMove) {
        ball.createBody(world);
        ball.setLinearVelocity(pb_ball.linearVelocityXM, pb_ball.linearVelocityYM);
    }
    return ball;
};

var parsePaddle = function parsePaddle(pb_paddle, world) {
    var paddle = new _paddle2.default(pb_paddle.xPx, pb_paddle.yPx, pb_paddle.widthPx, pb_paddle.heightPx);
    paddle.canMove = pb_paddle.canMove;
    paddle.createBody(world);
    return paddle;
};

var parseArrow = function parseArrow(pb_arrow) {
    var arrow = new _arrow2.default(pb_arrow.xPx, pb_arrow.yPx);
    arrow.ready = pb_arrow.ready;
    arrow._reversed = pb_arrow.reversed;
    arrow.el.rotation = pb_arrow.rotation;
    arrow.velocity = {
        x: pb_arrow.angularVelocityXM,
        y: pb_arrow.angularVelocityYM
    };
    return arrow;
};

var parseBricks = function parseBricks(pb_bricks, world) {
    var bricks = pb_bricks.map(function (pb_brick) {
        var brick = new _brick2.default(pb_brick.lives, pb_brick.xPx, pb_brick.yPx, pb_brick.widthPx, pb_brick.heightPx);
        brick.lives = pb_brick.lives;
        return brick;
    });
    bricks.forEach(function (brick) {
        if (brick.lives > 0) {
            brick.createBody(world);
        }
    });
    return bricks;
};

var getInputFromAction = function getInputFromAction(inputWorld) {
    return {
        LEFT_KEY: { isDown: inputWorld.action === 0 },
        RIGHT_KEY: { isDown: inputWorld.action === 1 },
        SPACE: { isDown: inputWorld.action === 2 }
    };
};

var getOutputWorld = function getOutputWorld(inputWorld, request, ball, paddle, arrow, bricks) {
    var ballVelocity = ball.body ? ball.body.GetLinearVelocity() : { x: 0, y: 0 };
    var ballPosition = ball.worldPosition();

    return _world.World.create({
        frameNb: getFrameNb(inputWorld),
        preFrameNb: getPreFrameNb(inputWorld, arrow),
        action: inputWorld.action,
        won: inputWorld.won,
        lost: inputWorld.lost,
        ball: {
            xPx: ballPosition.x,
            yPx: ballPosition.y,
            radiusPx: ball.radius,
            linearVelocityXM: ballVelocity.x,
            linearVelocityYM: ballVelocity.y,
            dead: ball.dead,
            canMove: ball.canMove,
            bouncing: ball.bouncing
        },
        paddle: {
            xPx: paddle.el.position.x,
            yPx: paddle.el.position.y,
            widthPx: paddle.width,
            heightPx: paddle.height
        },
        arrow: {
            xPx: arrow.el.position.x,
            yPx: arrow.el.position.y,
            angularVelocityXM: arrow.velocity.x,
            angularVelocityYM: arrow.velocity.y,
            rotation: arrow.el.rotation,
            reversed: arrow._reversed,
            ready: arrow.ready
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

var getFrameNb = function getFrameNb(inputWorld) {
    return inputWorld.frameNb + 1;
};

var getPreFrameNb = function getPreFrameNb(inputWorld, arrow) {
    if (arrow.ready) {
        return inputWorld.preFrameNb;
    } else {
        return inputWorld.preFrameNb + 1;
    }
};
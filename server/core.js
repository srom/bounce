import Box2D from 'box2dweb';

import { World, Worlds } from './models/world';
import * as constants from './constants';
import { randomFloat, randomBoolean } from './util/random';
import Ball from './entity/ball';
import Paddle from './entity/paddle';
import Arrow, { MAX_ANGLE } from './entity/arrow';
import Brick, { BrickLevel1, BrickLevel2, setBricks } from './entity/brick';
import Wall, { setWalls } from './entity/wall';

export const parseWorld = (data) => {
    const world = World.decode(data);
    if (!world.paddle) {
        // Object is empty
        return null;
    }
    return world;
};

export const getDefaultWorld = () => {
    return initializeWorld();
};

export const runMainLoop = (inputWorld) => {
    return mainLoop(inputWorld);
};

const initializeWorld = () => {
    const b2World = Box2D.Dynamics.b2World;
    const b2Vec2 = Box2D.Common.Math.b2Vec2;

    const paddleWidth = 100;
    const paddleHeight = 20;
    const initialPaddleX = constants.STAGE_WIDTH_PX / 2 - paddleWidth / 2;
    const initialPaddleY = constants.STAGE_HEIGHT_PX - 50;

    const ballRadius = 6;
    const initialBallX = initialPaddleX + paddleWidth / 2;
    const initialBallY = initialPaddleY - ballRadius - 4;

    const initialArrowX = initialBallX + ballRadius / 2;
    const initialArrowY = initialBallY - 2 * ballRadius;

    const world = new b2World(
        new b2Vec2(0, 0),  // gravity
        false               // allow sleep
    );

    const bricks = setBricks(world);

    const paddle = new Paddle(initialPaddleX, initialPaddleY, paddleWidth, paddleHeight);
    paddle.createBody(world);
    console.log('Paddle INITIAL position', paddle.body.GetPosition());

    return World.create({
        frameNb: 0,
        preFrameNb: 0,
        action: 3,  // HOLD
        ball: {
            xPx: initialBallX,
            yPx: initialBallY,
            radiusPx: ballRadius,
            linearVelocityXM: 0,
            linearVelocityYM: 0,
        },
        paddle: {
            xPx: initialPaddleX,
            yPx: initialPaddleY,
            widthPx: paddleWidth,
            heightPx: paddleHeight,
        },
        arrow: {
            xPx: initialArrowX,
            yPx: initialArrowY,
            angularVelocityXM : 0,
            angularVelocityYM: 0,
            rotation: randomFloat(-MAX_ANGLE, MAX_ANGLE),
            reversed: randomBoolean(),
        },
        bricks: bricks.map((brick) => {
            return {
                xPx: brick.el.position.x,
                yPx: brick.el.position.y,
                widthPx: brick.el.position.width,
                heightPx: brick.el.position.height,
                lives: brick.lives,
            };
        }),
    });
};

const mainLoop = (inputWorld) => {
    const b2World = Box2D.Dynamics.b2World;
    const b2Vec2 = Box2D.Common.Math.b2Vec2;
    const b2Listener = Box2D.Dynamics.b2ContactListener;

    const b2_world = new b2World(
        new b2Vec2(0, 0),  // gravity
        false               // allow sleep
    );

    const request = parseRequest(inputWorld.request);
    const ball = parseBall(inputWorld.ball, b2_world);
    const paddle = parsePaddle(inputWorld.paddle, b2_world);
    const arrow = parseArrow(inputWorld.arrow);
    const bricks = setBricks(b2_world);
    updateBricks(bricks, inputWorld.bricks, b2_world);
    setWalls(b2_world);

    const movie = request.movie;
    const worlds = [];

    const listener = new b2Listener;
    b2_world.SetContactListener(contactListener(listener));

    const num_epochs = request.numEpochs;
    let currentWorld = inputWorld;
    for (let i = 0; i < num_epochs; i++) {
        if (currentWorld.won || currentWorld.lost) {
            break;
        }
        update(b2_world, currentWorld, request.frameRate, ball, paddle, arrow, bricks);
        clean(b2_world);

        const newWorld = getOutputWorld(currentWorld, request, ball, paddle, arrow, bricks);
        currentWorld = newWorld;
        worlds.push(newWorld);
    }

    if (movie) {
        return Worlds.create({
            worlds: worlds,
        });
    } else {
        return worlds[worlds.length - 1];
    }
};

const update = (b2_world, inputWorld, frame_rate, ball, paddle, arrow, bricks) => {
    b2_world.Step(frame_rate, constants.VELOCITY_ITERATIONS, constants.POSITION_ITERATIONS);

    const input = getInputFromAction(inputWorld);

    ball.render();
    paddle.render(input);
    arrow.render(input);

    bricks.forEach((brick) => {
        if (brick.isGarbage() && brick.body) {
            b2_world.DestroyBody(brick.body);
            brick.body = null;
        }
    });

    if (arrow.ready && !ball.canMove) {
        paddle.canMove = true;
        ball.canMove = true;
        ball.createBody(b2_world).setLinearVelocity(
            constants.VELOCITY_FACTOR * arrow.velocity.x,
            constants.VELOCITY_FACTOR * arrow.velocity.y
        );
    }

    if (bricks.every((b) => b.isGarbage())) {
        youWin(inputWorld);
    }

    if (ball.dead) {
        gameOver(inputWorld);
    }
};

const clean = (world) => {
    world.ClearForces();
};

const youWin = (inputWorld) => {
    inputWorld.won = true;
    console.log("WON");
};

const gameOver = (inputWorld) => {
    inputWorld.lost = true;
    console.log("LOST");
};

const contactListener = (listener) => {
    listener.EndContact = function (contact) {
        const bodyA = contact.GetFixtureA().GetBody();
        const bodyB = contact.GetFixtureB().GetBody();

        const ball = getInstanceOrNull(bodyA, bodyB, Ball);
        const brick = getInstanceOrNull(bodyA, bodyB, Brick);
        const wall = getInstanceOrNull(bodyA, bodyB, Wall);
        const paddle = getInstanceOrNull(bodyA, bodyB, Paddle);

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
    return listener
};

const getInstanceOrNull = (bodyA, bodyB, cls) => {
    const userDataA = bodyA.GetUserData();
    const userDataB = bodyB.GetUserData();
    return getIfInstanceOfElseNull(userDataA, cls) || getIfInstanceOfElseNull(userDataB, cls);
};

const getIfInstanceOfElseNull = (userData, cls) => {
    if (userData instanceof cls) {
        return userData
    }
    return null;
};

const parseRequest = (pb_request) => {
    return pb_request;
};

const parseBall = (pb_ball, world) => {
    let ball = new Ball(pb_ball.xPx, pb_ball.yPx, pb_ball.radiusPx);
    ball.dead = pb_ball.dead;
    ball.canMove = pb_ball.canMove;
    ball.bouncing = pb_ball.bouncing;
    if (ball.canMove) {
        ball.createBody(world);
        ball.setLinearVelocity(pb_ball.linearVelocityXM, pb_ball.linearVelocityYM);
    }
    return ball;
};

const parsePaddle = (pb_paddle, world) => {
    let paddle = new Paddle(pb_paddle.xPx, pb_paddle.yPx, pb_paddle.widthPx, pb_paddle.heightPx);
    paddle.canMove = pb_paddle.canMove;
    paddle.createBody(world);
    return paddle;
};

const parseArrow = (pb_arrow) => {
    let arrow = new Arrow(pb_arrow.xPx, pb_arrow.yPx);
    arrow.ready = pb_arrow.ready;
    arrow._reversed = pb_arrow.reversed;
    arrow.el.rotation = pb_arrow.rotation;
    arrow.velocity = {
        x: pb_arrow.angularVelocityXM,
        y: pb_arrow.angularVelocityYM,
    };
    return arrow
};

const updateBricks = (bricks, pb_bricks, world) => {
    bricks.forEach((brick, index) => {
        const pb_brick = pb_bricks[index];
        brick.lives = pb_brick.lives;
        if (brick.lives <= 0) {
            world.DestroyBody(brick.body);
            brick.body = null;
        }
    });
    return bricks;
};

const getInputFromAction = (inputWorld) => {
    return {
        LEFT_KEY: { isDown: inputWorld.action === 0 },
        RIGHT_KEY: { isDown: inputWorld.action === 1 },
        SPACE: { isDown: inputWorld.action === 2 },
    };
};

const getOutputWorld = (inputWorld, request, ball, paddle, arrow, bricks) => {
    const ballVelocity = ball.body ? ball.body.GetLinearVelocity() : {x: 0, y: 0};
    const ballPosition = ball.worldPosition();

    return World.create({
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
            bouncing: ball.bouncing,
        },
        paddle: {
            xPx: paddle.el.position.x,
            yPx: paddle.el.position.y,
            widthPx: paddle.width,
            heightPx: paddle.height,
        },
        arrow: {
            xPx: arrow.el.position.x,
            yPx: arrow.el.position.y,
            angularVelocityXM : arrow.velocity.x,
            angularVelocityYM: arrow.velocity.y,
            rotation: arrow.el.rotation,
            reversed: arrow._reversed,
            ready: arrow.ready,
        },
        bricks: bricks.map((brick) => {
            return {
                xPx: brick.el.position.x,
                yPx: brick.el.position.y,
                widthPx: brick.el.position.width,
                heightPx: brick.el.position.height,
                lives: brick.lives,
            };
        }),
    });
};

const getFrameNb = (inputWorld) => {
    return inputWorld.frameNb + 1;
};

const getPreFrameNb = (inputWorld, arrow) => {
    if (arrow.ready) {
        return inputWorld.preFrameNb;
    } else {
        return inputWorld.preFrameNb + 1;
    }
};

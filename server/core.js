import Box2D from 'box2dweb';

import { World, Worlds } from './models/world';
import * as constants from './constants';
import { randomFloat, randomBoolean } from './util/random';
import Ball from './entity/ball';
import Paddle from './entity/paddle';
import Arrow from './entity/arrow';
import Brick, { BrickLevel1, BrickLevel2, setBricks } from './entity/brick';

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
        true               // allow sleep
    );

    const bricks = setBricks(world);

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
        true               // allow sleep
    );

    const request = parseRequest(inputWorld.request);
    const ball = parseBall(inputWorld.ball, b2_world);
    const paddle = parsePaddle(inputWorld.paddle, b2_world);
    const arrow = parseArrow(inputWorld.arrow);
    const bricks = parseBricks(inputWorld.bricks, b2_world);

    const movie = request.movie;
    const worlds = [];

    b2_world.SetContactListener(contactListener(b2Listener));

    const num_epochs = request.numEpochs;
    let currentWorld = inputWorld;
    for (let i = 0; i < num_epochs; i++) {
        if (currentWorld.won || currentWorld.lost) {
            console.log(currentWorld.won, currentWorld.lost);
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
        if (brick.isGarbage()) {
            b2_world.DestroyBody(brick.body);
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
    console.log("win");
};

const gameOver = (inputWorld) => {
    inputWorld.lost = true;
    console.log("lose");
};

const contactListener = (b2Listener) => {
    const listener = new b2Listener;
    listener.EndContact = function (contact) {
        const bodyA = contact.GetFixtureA().GetBody();
        const bodyB = contact.GetFixtureB().GetBody();

        const containsBall = [bodyA, bodyB].includes(ball.body);

        const brick = bricks.find((b) => [bodyA, bodyB].includes(b.body));
        if (containsBall && brick) {
            brick.contact();
        }

        if (containsBall) {
            ball.contact();
        }
    };
    return listener
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

const parseBricks = (pb_bricks, world) => {
    const bricks = pb_bricks.map((pb_brick) => {
        let brick = new Brick({}, pb_brick.xPx, pb_brick.yPx, pb_brick.widthPx, pb_brick.heightPx);
        brick.lives = pb_brick.lives;
        return brick;
    });
    bricks.forEach((brick) => {
        if (brick.lives > 0) {
            brick.createBody(world);
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

    return World.create({
        frameNb: getFrameNb(inputWorld),
        preFrameNb: getPreFrameNb(inputWorld, arrow),
        action: inputWorld.action,
        won: inputWorld.won,
        lost: inputWorld.lost,
        ball: {
            xPx: ball.el.position.x,
            yPx: ball.el.position.y,
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

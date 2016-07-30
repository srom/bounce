import $ from 'jquery';
import MainLoop from 'mainloop';
import Box2D from 'box2dweb';

import * as constants from './constants';
import Ball from './entity/ball';
import Paddle from './entity/paddle';
import Wall from './entity/wall';
import Brick from './entity/brick';
import debugPhysics from './util/debug';

const PIXI = window.PIXI;

const b2World = Box2D.Dynamics.b2World;
const b2Vec2 = Box2D.Common.Math.b2Vec2;
const b2Listener = Box2D.Dynamics.b2ContactListener;

const initialBallX = 470;
const initialBallY = constants.STAGE_HEIGHT_PX - 100;
const ballRadius = 8;
const initialBallVelocityX_m = 2.1;
const initialBallVelocityY_m = 1.6;

const initialPaddleX = 350;
const initialPaddleY = constants.STAGE_HEIGHT_PX - 50;
const paddleWidth = 100;
const paddleHeight = 20;

const brickWidth = 70;
const brickHeight = 30;

const renderer = PIXI.autoDetectRenderer(constants.STAGE_WIDTH_PX, constants.STAGE_HEIGHT_PX, {
    antialias: true,
    transparent: true
});
const container = document.getElementById(constants.CONTAINER_ID);
const canvas = container.appendChild(renderer.view);
canvas.className = "canvas";

PIXI.loader.add(
    'paddle', 'resources/entities/paddle@2x.png'
).add(
    'brickBlue', 'resources/entities/brick-blue@2x.png'
).once(
    'complete', init
).load();

function init () {
    const stage = new PIXI.Container();

    const world = new b2World(
        new b2Vec2(0, 0),  // gravity
        true               // allow sleep
    );

    const paddle = new Paddle(initialPaddleX, initialPaddleY, paddleWidth, paddleHeight);
    paddle.createBody(world);

    const ball = new Ball(initialBallX, initialBallY, ballRadius);
    ball.createBody(
        world
    ).setLinearVelocity(
        initialBallVelocityX_m, -initialBallVelocityY_m
    );

    const bricks = [
        (new Brick(
            40,
            100,
            brickWidth,
            brickHeight
        )).createBody(world),
        (new Brick(
            40 + brickWidth + 40,
            100 + brickHeight + 30,
            brickWidth,
            brickHeight
        )).createBody(world),
        (new Brick(
            constants.STAGE_WIDTH_PX - brickWidth - 40,
            100,
            brickWidth,
            brickHeight
        )).createBody(world),
        (new Brick(
            constants.STAGE_WIDTH_PX - 2 * brickWidth - 40 - 40,
            100 + brickHeight + 30,
            brickWidth,
            brickHeight
        )).createBody(world),
        (new Brick(
            (constants.STAGE_WIDTH_PX - brickWidth) / 2,
            80,
            brickWidth,
            brickHeight
        )).createBody(world),
    ];

    (new Wall(constants.WALL_THICKNESS, 'top')).createBody(world).addTo(stage);
    (new Wall(constants.WALL_THICKNESS, 'left')).createBody(world).addTo(stage);
    (new Wall(constants.WALL_THICKNESS, 'right')).createBody(world).addTo(stage);

    paddle.addTo(stage);
    ball.addTo(stage);
    bricks.forEach((brick) => brick.addTo(stage));

    const listener = new b2Listener;
    listener.EndContact = function (contact) {
        const bodyA = contact.GetFixtureA().GetBody();
        const bodyB = contact.GetFixtureB().GetBody();

        const brick = bricks.find((b) => [bodyA, bodyB].includes(b.body));

        if (([bodyA, bodyB].includes(ball.body)) && brick) {
            brick.contact();
        }
    };
    world.SetContactListener(listener);

    renderer.render(stage);

    if (constants.DEBUG_PHYSICS) {
        debugPhysics(world);
        world.DrawDebugData();
    }

    function processInput () {
        PIXI.keyboardManager.update();
    }

    function update () {
        world.Step(constants.FRAME_RATE, constants.VELOCITY_ITERATIONS, constants.POSITION_ITERATIONS);

        ball.render();
        paddle.render();

        bricks.forEach((brick) => {
            if (brick.isGarbage()) {
                world.DestroyBody(brick.body);
                stage.removeChild(brick.el);
            }
        });

        if (bricks.every((b) => b.isGarbage())) {
            youWin();
        }

        if (ball.dead) {
            gameOver();
        }
    }

    function draw () {
        if (constants.DEBUG_PHYSICS) {
            world.DrawDebugData();
        }
        renderer.render(stage);
    }

    function clean () {
        world.ClearForces();
    }

    function youWin () {
        MainLoop.stop();
        $('.victory').show();
    }

    function gameOver () {
        MainLoop.stop();
        $('.gameOver').show();
    }

    MainLoop.setBegin(processInput).setUpdate(update).setDraw(draw).setEnd(clean);
    MainLoop.start();
}

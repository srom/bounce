import $ from 'jquery';
import MainLoop from 'mainloop';
import Box2D from 'box2dweb';

import * as constants from './constants';
import Ball from './entity/ball';
import Paddle from './entity/paddle';
import Wall, { setWalls } from './entity/wall';
import Arrow from './entity/arrow';
import Brick, { BrickLevel1, BrickLevel2, setBricks } from './entity/brick';
import debugPhysics from './util/debug';
import { getHashValue } from './util/url';
import * as input from './util/input';

const PIXI = window.PIXI;

const FRAME_RATE = 1 / 60;

const b2World = Box2D.Dynamics.b2World;
const b2Vec2 = Box2D.Common.Math.b2Vec2;
const b2Listener = Box2D.Dynamics.b2ContactListener;

const paddleWidth = 100;
const paddleHeight = 20;
const initialPaddleX = constants.STAGE_WIDTH_PX / 2 - paddleWidth / 2;
const initialPaddleY = constants.STAGE_HEIGHT_PX - 50;

const ballRadius = 6;
const initialBallX = initialPaddleX + paddleWidth / 2;
const initialBallY = initialPaddleY - ballRadius - 4;

const initialArrowX = initialBallX + ballRadius / 2;
const initialArrowY = initialBallY - 2 * ballRadius;

const renderer = PIXI.autoDetectRenderer(constants.STAGE_WIDTH_PX, constants.STAGE_HEIGHT_PX, {
    antialias: true,
    transparent: true
});
const container = document.getElementById(constants.CONTAINER_ID);
const canvas = container.appendChild(renderer.view);
canvas.className = "canvas";

const movie = getHashValue('movie', window);

const loadAssets = () => {
    PIXI.loader.add(
        'paddle', 'resources/entities/paddle@2x.png'
    ).add(
        'brickBlue', 'resources/entities/brick-blue@2x.png'
    ).add(
        'brickGreen', 'resources/entities/brick-green@2x.png'
    ).add(
        'brickDamagedGreen', 'resources/entities/brick-damaged-green@2x.png'
    ).add(
        'arrow', 'resources/entities/arrow@2x.png'
    ).add(
        'bounceSound', 'resources/sound/bounce.wav'
    ).add(
        'gameOverSound', 'resources/sound/game-over.wav'
    ).add(
        'victorySound', 'resources/sound/victory.wav'
    ).once(
        'complete', init
    ).load();
};

let movieFrames = null;
if (movie) {
    $.getJSON('/resources/movie/movie.json').done((frames) => {
        movieFrames = frames;
        loadAssets();
    })
} else {
    loadAssets();
}

function init () {
    let frame = 0;

    const stage = new PIXI.Container();

    const world = new b2World(
        new b2Vec2(0, 0),  // gravity
        true               // allow sleep
    );

    const paddle = new Paddle(initialPaddleX, initialPaddleY, paddleWidth, paddleHeight);
    const ball = new Ball(initialBallX, initialBallY, ballRadius);
    const arrow = new Arrow(initialArrowX, initialArrowY);
    const bricks = setBricks(world);
    const walls = setWalls(world);

    paddle.createBody(world);

    paddle.addTo(stage);
    ball.addTo(stage);
    arrow.addTo(stage);
    bricks.forEach((brick) => brick.addTo(stage));
    walls.forEach((wall) => wall.addTo(stage));

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
    world.SetContactListener(listener);

    renderer.render(stage);

    const gameOverSound = PIXI.audioManager.getAudio('gameOverSound');
    const victorySound = PIXI.audioManager.getAudio('victorySound');
    const bounceSound = PIXI.audioManager.getAudio('bounceSound');

    if (constants.DEBUG_PHYSICS) {
        debugPhysics(world);
        world.DrawDebugData();
    }

    $('.volumeOn').on('click', function () {
        $(this).hide();
        $('.volumeOff').show();
        PIXI.audioManager.mute();
    });
    $('.volumeOff').on('click', function () {
        $(this).hide();
        $('.volumeOn').show();
        PIXI.audioManager.unmute();
    });
    $('.play').on('click', function () {
        $(this).hide();
        $('.pause').show();
        MainLoop.start();
    });
    $('.pause').on('click', function () {
        $(this).hide();
        $('.play').show();
        MainLoop.stop();
    });

    function processInput () {
        PIXI.keyboardManager.update();
    }

    function update () {
        if (movie) {
            updateWithMovie();
        } else {
            updateWithPhysics();
        }

        if (bricks.every((b) => b.isGarbage())) {
            youWin();
        }

        if (ball.dead) {
            gameOver();
        }
    }

    function updateWithPhysics () {
        world.Step(FRAME_RATE, constants.VELOCITY_ITERATIONS, constants.POSITION_ITERATIONS);

        ball.render();
        paddle.render(input);
        arrow.render(input);

        bricks.forEach((brick) => {
            if (brick.isGarbage()) {
                world.DestroyBody(brick.body);
                stage.removeChild(brick.el);
            }
        });

        if (arrow.ready && !ball.canMove) {
            paddle.canMove = true;
            ball.canMove = true;
            ball.createBody(world).setLinearVelocity(
                constants.VELOCITY_FACTOR * arrow.velocity.x,
                constants.VELOCITY_FACTOR * arrow.velocity.y
            );
            stage.removeChild(arrow.el);
        }
    }

    function updateWithMovie () {
        const pbWorld = movieFrames.worlds[frame];

        if (!pbWorld) {
            abort();
            return;
        }

        updateBall(pbWorld, ball);
        updatePaddle(pbWorld, paddle);
        updateArrow(pbWorld, arrow);
        updateBricks(pbWorld, bricks);

        bricks.forEach((brick) => {
            if (brick.isGarbage()) {
                bounceSound.play();
                stage.removeChild(brick.el);
            }
        });

        if (arrow.ready && !ball.canMove) {
            stage.removeChild(arrow.el);
        }

        frame++;
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
        victorySound.play();
    }

    function gameOver () {
        MainLoop.stop();
        $('.gameOver').show();
        gameOverSound.play();
    }

    function abort () {
        MainLoop.stop();
    }

    MainLoop.setBegin(processInput).setUpdate(update).setDraw(draw).setEnd(clean);
    MainLoop.start();
}

const updateBall = (world, ball) => {
    const newBall = world.ball;
    ball.el.position.x = newBall.xPx;
    ball.el.position.y = newBall.yPx;
    ball.canMove = newBall.canMove;
    ball.dead = newBall.dead;
};

const updatePaddle = (world, paddle) => {
    const newPaddle = world.paddle;
    paddle.el.position.x = newPaddle.xPx;
    paddle.el.position.y = newPaddle.yPx;
};

const updateArrow = (world, arrow) => {
    const newArrow = world.arrow;
    arrow.el.position.x = newArrow.xPx;
    arrow.el.position.y = newArrow.yPx;
    arrow.el.position.rotation = newArrow.rotation;
    arrow.ready = newArrow.ready;
};

const updateBricks = (world, bricks) => {
    const newBricks = world.bricks;
    bricks.forEach((brick, index) => {
        const newBrick = newBricks[index];
        brick.el.position.x = newBrick.xPx;
        brick.el.position.y = newBrick.yPx;
        brick.lives = newBrick.lives;
    });
};

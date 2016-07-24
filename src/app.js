import $ from 'jquery';
import MainLoop from 'mainloop';
import Box2D from 'box2dweb';
const PIXI = window.PIXI;


var b2World = Box2D.Dynamics.b2World;
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

var width = 600;
var height = 600;
var widthMeters = 10;

var renderer = PIXI.autoDetectRenderer(width, height, {
    antialias: true,
    transparent: true
});
var container = document.getElementById('bounce');
var canvas = container.appendChild(renderer.view);
canvas.className = "canvas";

var pixelsToMeters = function (pixels) {
    return pixels * widthMeters / width;
};

var metersToPixels = function (meters) {
    return meters * width / widthMeters;
};

// create the root of the scene graph
var stage = new PIXI.Container();

var fixDef = new b2FixtureDef;
fixDef.density = 1.0;
fixDef.friction = 0.0;
fixDef.restitution = 1;

var initialBallX = 470;
var initialBallY = 90;
var ballRadius = 15;

var initialPaddleX = 350;
var initialPaddleY = height - 50;
var paddleWidth = 150;
var paddleHeight = 20;

function createBall (world) {
    var ball = new PIXI.Graphics();
    ball.lineStyle(1, 0xDEFFA3, 1);
    ball.beginFill(0xFFFF0B, 0.5);
    ball.drawCircle(initialBallX, initialBallY, ballRadius);
    ball.endFill();

    // Ball body
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.x = pixelsToMeters(initialBallX);
    bodyDef.position.y = pixelsToMeters(initialBallY);
    fixDef.shape = new b2CircleShape(pixelsToMeters(ballRadius));
    var ballBody = world.CreateBody(bodyDef);
    ballBody.CreateFixture(fixDef);
    ballBody.SetBullet(true);
    var velocity = ballBody.GetLinearVelocity();
    velocity.x = pixelsToMeters(250);
    velocity.y = pixelsToMeters(200);
    ballBody.SetLinearVelocity(velocity);

    ball.body = ballBody;

    return ball;
}

function createPaddle (world) {
    var paddle = new PIXI.Graphics();
    paddle.beginFill(0x000000, 0.5);
    paddle.drawRect(initialPaddleX, initialPaddleY, paddleWidth, paddleHeight);
    paddle.endFill();

    // Paddle body
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.x = pixelsToMeters(initialPaddleX) + pixelsToMeters(paddleWidth) / 2;
    bodyDef.position.y = pixelsToMeters(initialPaddleY) + pixelsToMeters(paddleHeight) / 2;
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(pixelsToMeters(paddleWidth) / 2, pixelsToMeters(paddleHeight) / 2);
    var paddleBody = world.CreateBody(bodyDef);
    paddleBody.CreateFixture(fixDef);

    paddle.body = paddleBody;

    return paddle;
}

function createWall (world, position) {
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_staticBody;
    fixDef.shape = new b2PolygonShape();

    if (position === "top") {
        bodyDef.position.x = 0;
        bodyDef.position.y = 0;
        fixDef.shape.SetAsBox(pixelsToMeters(width), pixelsToMeters(1));
    } else if (position === "left") {
        bodyDef.position.x = 0;
        bodyDef.position.y = 0;
        fixDef.shape.SetAsBox(pixelsToMeters(1), pixelsToMeters(height));
    } else if (position === "right") {
        bodyDef.position.x = pixelsToMeters(width - 1);
        bodyDef.position.y = 0;
        fixDef.shape.SetAsBox(pixelsToMeters(1), pixelsToMeters(height));
    }

    world.CreateBody(bodyDef).CreateFixture(fixDef);
}

function debugMode (world) {
    var debugCanvas = document.createElement('canvas');
    debugCanvas.width = width;
    debugCanvas.height = height;
    debugCanvas.className = "debugCanvas";
    container.appendChild(debugCanvas);

    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(debugCanvas.getContext("2d"));
    debugDraw.SetDrawScale(metersToPixels(1.0));
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

    world.SetDebugDraw(debugDraw);
}

var world = new b2World(
    new b2Vec2(0, 0),  // gravity
    true               // allow sleep
);

var paddle = createPaddle(world);
var ball = createBall(world);
createWall(world, 'top');
createWall(world, 'left');
createWall(world, 'right');

stage.addChild(paddle);
stage.addChild(ball);

debugMode(world);

var frameRate = 1 / 60;
var velocityIterations = 8;
var positionIterations = 3;

var leftKey = PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.LEFT);
var rightKey = PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.RIGHT);

function processInput () {
    PIXI.keyboardManager.update();
}

function update () {
    world.Step(frameRate, velocityIterations, positionIterations);

    ball.position.x = metersToPixels(ball.body.GetPosition().x) - initialBallX;
    ball.position.y = metersToPixels(ball.body.GetPosition().y) - initialBallY;

    if (leftKey.isDown) {
        paddle.position.x = paddle.position.x - 3;
        paddle.body.SetPosition(
            new b2Vec2(
                pixelsToMeters(paddle.position.x + initialPaddleX) + pixelsToMeters(paddleWidth) / 2,
                paddle.body.GetPosition().y
            )
        );
    } else if (rightKey.isDown) {
        paddle.position.x = paddle.position.x + 3;
        paddle.body.SetPosition(
            new b2Vec2(
                pixelsToMeters(paddle.position.x + initialPaddleX) + pixelsToMeters(paddleWidth) / 2,
                paddle.body.GetPosition().y
            )
        );
    }
}

function draw () {
    world.DrawDebugData();
    renderer.render(stage);
}

function clean () {
    world.ClearForces();
}

MainLoop.setBegin(processInput).setUpdate(update).setDraw(draw).setEnd(clean);
MainLoop.start();

$('#stopButton').click(function () {
    MainLoop.stop();
    $('#resumeButton').show();
    $(this).hide();
});
$('#resumeButton').click(function () {
    MainLoop.start();
    $('#stopButton').show();
    $(this).hide();
});

import Box2D from 'box2dweb';

import { World } from './models/world';
import * as constants from './constants';
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

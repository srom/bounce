import Box2D from 'box2dweb';

import fixDef from './fixture';
import * as constants from '../constants';
import { pixelsToMeters, metersToPixels } from '../util/scale';
import * as input from '../util/input';
import Entity from './entity';

const PIXI = window.PIXI;

const b2BodyDef = Box2D.Dynamics.b2BodyDef;
const b2Body = Box2D.Dynamics.b2Body;
const b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;


export const BrickLevel1 = 1;
export const BrickLevel2 = 2;
export const brickWidth = 70;
export const brickHeight = 30;

export default class Brick extends Entity {

    el;
    body;

    lives = 1;
    initialLives = null;

    _garbage  = false;

    constructor (lvl, x_px, y_px, width_px, height_px, options = {}) {
        super();
        this.el = this._createBrick(lvl, x_px, y_px, width_px, height_px, options);
    }

    createBody (world) {
        const bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = pixelsToMeters(this._initialX) + pixelsToMeters(this.width) / 2;
        bodyDef.position.y = pixelsToMeters(this._initialY) + pixelsToMeters(this.height) / 2;

        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(pixelsToMeters(this.width) / 2, pixelsToMeters(this.height) / 2);

        const body = world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);

        this.body = body;

        return this;
    }

    contact () {
        this.lives--;
        if (this.lives <= 0) {
            this._garbage = true;
        } else {
            this.el.texture = PIXI.loader.resources.brickDamagedGreen.texture;
        }
    }

    isGarbage () {
        return this.lives == 0;
    }

    _createBrick = (lvl, x_px, y_px, width_px, height_px, options) => {
        let texture;
        if (lvl === BrickLevel1) {
            texture = PIXI.loader.resources.brickBlue.texture;
        } else {
            texture = PIXI.loader.resources.brickGreen.texture;
            this.lives = 2;
        }
        const brick = new PIXI.Sprite(texture);
        brick.position.x = x_px;
        brick.position.y = y_px;
        brick.height = height_px;
        brick.width = width_px;

        this.width = width_px;
        this.height = height_px;
        this._initialX = x_px;
        this._initialY = y_px;
        this.initialLives = this.lives;

        return brick;
    };
}

export function setBricks(world) {
    return [
        (new Brick(
            BrickLevel1,
            40,
            100,
            brickWidth,
            brickHeight
        )).createBody(world),
        (new Brick(
            BrickLevel2,
            40 + brickWidth + 40,
            100 + brickHeight + 30,
            brickWidth,
            brickHeight
        )).createBody(world),
        (new Brick(
            BrickLevel1,
            constants.STAGE_WIDTH_PX - brickWidth - 40,
            100,
            brickWidth,
            brickHeight
        )).createBody(world),
        (new Brick(
            BrickLevel2,
            constants.STAGE_WIDTH_PX - 2 * brickWidth - 40 - 40,
            100 + brickHeight + 30,
            brickWidth,
            brickHeight
        )).createBody(world),
        (new Brick(
            BrickLevel1,
            (constants.STAGE_WIDTH_PX - brickWidth) / 2,
            80,
            brickWidth,
            brickHeight
        )).createBody(world),
    ];
}

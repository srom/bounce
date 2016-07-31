import Box2D from 'box2dweb';

import fixDef from './fixture';
import { pixelsToMeters, metersToPixels } from '../util/scale';
import * as input from '../util/input';
import * as constants from '../constants';
import Entity from './entity';

const PIXI = window.PIXI;

const b2BodyDef = Box2D.Dynamics.b2BodyDef;
const b2Body = Box2D.Dynamics.b2Body;
const b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
const b2Vec2 = Box2D.Common.Math.b2Vec2;

export default class Paddle extends Entity {

    el;
    body;

    width;
    height;

    speed_px = 3;
    canMove = false;

    _initialX;
    _initialY;

    constructor (x_px, y_px, width_px, height_px, options = {}) {
        super();
        this.el = this._createPaddle(x_px, y_px, width_px, height_px, options);
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

    render () {
        if (!this.canMove) {
            return this;
        }

        if (input.LEFT_KEY.isDown) {
            let candidatePos_px = this.el.position.x - this.speed_px;
            if (candidatePos_px < constants.WALL_THICKNESS) {
                candidatePos_px += this.speed_px;
            }

            this.el.position.x = candidatePos_px;
            this.body.SetPosition(
                new b2Vec2(
                    pixelsToMeters(this.el.position.x) + pixelsToMeters(this.width) / 2,
                    this.body.GetPosition().y
                )
            );
        } else if (input.RIGHT_KEY.isDown) {
            let candidatePos_px = this.el.position.x + this.speed_px;
            if (candidatePos_px + this.width > constants.STAGE_WIDTH_PX - constants.WALL_THICKNESS) {
                candidatePos_px -= this.speed_px;
            }

            this.el.position.x = candidatePos_px;
            this.body.SetPosition(
                new b2Vec2(
                    pixelsToMeters(this.el.position.x) + pixelsToMeters(this.width) / 2,
                    this.body.GetPosition().y
                )
            );
        }
        return this;
    }

    _createPaddle = (x_px, y_px, width_px, height_px, options) => {
        const paddle = new PIXI.Sprite(PIXI.loader.resources.paddle.texture);
        paddle.position.x = x_px;
        paddle.position.y = y_px;
        paddle.height = height_px;
        paddle.width = width_px;

        this.width = width_px;
        this.height = height_px;
        this._initialX = x_px;
        this._initialY = y_px;

        return paddle;
    };
}

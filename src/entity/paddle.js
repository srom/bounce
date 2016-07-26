import Box2D from 'box2dweb';

import fixDef from './fixture';
import { pixelsToMeters, metersToPixels } from '../util/scale';
import * as input from '../util/input';
import Entity from './entity';

const PIXI = window.PIXI;

const DEFAULT_COLOR = 0x407394;

const b2BodyDef = Box2D.Dynamics.b2BodyDef;
const b2Body = Box2D.Dynamics.b2Body;
const b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
const b2Vec2 = Box2D.Common.Math.b2Vec2;

export default class Paddle extends Entity {

    el = undefined;
    body = undefined;

    width = undefined;
    height = undefined;

    _initialX = undefined;
    _initialY = undefined;

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

        return body;
    }

    updatePosition () {
        if (input.LEFT_KEY.isDown) {
            this.el.position.x = this.el.position.x - 3;
            this.body.SetPosition(
                new b2Vec2(
                    pixelsToMeters(this.el.position.x + this._initialX) + pixelsToMeters(this.width) / 2,
                    this.body.GetPosition().y
                )
            );
        } else if (input.RIGHT_KEY.isDown) {
            this.el.position.x = this.el.position.x + 3;
            this.body.SetPosition(
                new b2Vec2(
                    pixelsToMeters(this.el.position.x + this._initialX) + pixelsToMeters(this.width) / 2,
                    this.body.GetPosition().y
                )
            );
        }
    }

    _createPaddle = (x_px, y_px, width_px, height_px, options) => {
        const { color } = options;

        var paddle = new PIXI.Graphics();
        paddle.beginFill(color || DEFAULT_COLOR, 0.5);
        paddle.drawRect(x_px, y_px, width_px, height_px);
        paddle.endFill();

        this.width = width_px;
        this.height = height_px;
        this._initialX = x_px;
        this._initialY = y_px;

        return paddle;
    };
}

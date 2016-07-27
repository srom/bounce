import Box2D from 'box2dweb';

import fixDef from './fixture';
import { pixelsToMeters, metersToPixels } from '../util/scale';
import Entity from './entity';

const PIXI = window.PIXI;

const b2BodyDef = Box2D.Dynamics.b2BodyDef;
const b2Body = Box2D.Dynamics.b2Body;
const b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

const DEFAULT_LINE_COLOR = 0xDEFFA3;
const DEFAULT_FILL_COLOR = 0xFFFF0B;


export default class Ball extends Entity {

    el;
    body;

    radius;

    _initialX;
    _initialY;

    constructor (x_px, y_px, radius_px, options = {}) {
        super();
        this.el = this._createBall(x_px, y_px, radius_px, options);
    }

    createBody (world) {
        const bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = pixelsToMeters(this._initialX);
        bodyDef.position.y = pixelsToMeters(this._initialY);

        fixDef.shape = new b2CircleShape(pixelsToMeters(this.radius));

        const body = world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        body.SetBullet(true);

        this.body = body;

        return this;
    }

    setLinearVelocity (x_m, y_m) {
        if (!this.body) {
            console.error("Cannot set linear velocity without a body.");
            return;
        }
        const velocity = this.body.GetLinearVelocity();
        velocity.x = x_m;
        velocity.y = y_m;
        this.body.SetLinearVelocity(velocity);

        return this;
    }

    render () {
        this.el.position.x = metersToPixels(this.body.GetPosition().x) - this._initialX;
        this.el.position.y = metersToPixels(this.body.GetPosition().y) - this._initialY;

        return this;
    }

    _createBall = (x_px, y_px, radius_px, options) => {
        const { lineColor, fillColor } = options;

        var ball = new PIXI.Graphics();
        ball.lineStyle(1, lineColor || DEFAULT_LINE_COLOR, 1);
        ball.beginFill(fillColor || DEFAULT_FILL_COLOR, 0.5);
        ball.drawCircle(x_px, y_px, radius_px);
        ball.endFill();

        this.radius = radius_px;
        this._initialX = x_px;
        this._initialY = y_px;

        return ball;
    };
}

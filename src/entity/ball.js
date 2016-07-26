import Box2D from 'box2dweb';

import fixDef from './fixture';
import { pixelsToMeters, metersToPixels } from '../util/scale';

const PIXI = window.PIXI;

const b2BodyDef = Box2D.Dynamics.b2BodyDef;
const b2Body = Box2D.Dynamics.b2Body;
const b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

const DEFAULT_LINE_COLOR = 0xDEFFA3;
const DEFAULT_FILL_COLOR = 0xFFFF0B;


export default class Ball {

    el = undefined;
    body = undefined;

    radius = undefined;

    _initialX = undefined;
    _initialY = undefined;

    constructor (world, x_px, y_px, radius_px, options = {}) {
        this.el = this._createBall(x_px, y_px, radius_px, options);
        this.body = this._createBody(world);
    }

    setLinearVelocity (x_m, y_m) {
        var velocity = this.body.GetLinearVelocity();
        velocity.x = x_m;
        velocity.y = y_m;
        this.body.SetLinearVelocity(velocity);
    }

    updatePosition () {
        this.el.position.x = metersToPixels(this.body.GetPosition().x) - this._initialX;
        this.el.position.y = metersToPixels(this.body.GetPosition().y) - this._initialY;
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

    _createBody = (world) => {
        const bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = pixelsToMeters(this._initialX);
        bodyDef.position.y = pixelsToMeters(this._initialY);

        fixDef.shape = new b2CircleShape(pixelsToMeters(this.radius));

        const ballBody = world.CreateBody(bodyDef);
        ballBody.CreateFixture(fixDef);
        ballBody.SetBullet(true);

        return ballBody;
    };
}

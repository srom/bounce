import Box2D from 'box2dweb';

import fixDef from './fixture';
import { pixelsToMeters, metersToPixels } from '../util/scale';
import * as input from '../util/input';
import Entity from './entity';
import * as constants from '../constants';

const PIXI = window.PIXI;

const b2BodyDef = Box2D.Dynamics.b2BodyDef;
const b2Body = Box2D.Dynamics.b2Body;
const b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
const b2Vec2 = Box2D.Common.Math.b2Vec2;

const BALL_LINE_COLOR = 0xDEFFA3;
const BALL_FILL_COLOR = 0xFFFF0B;


export default class Ball extends Entity {

    el;
    body;

    radius;

    dead = false;
    canMove = false;
    bouncing = false;

    _initialX;
    _initialY;
    _bounceSound;

    _trapCount = 0;

    constructor (x_px, y_px, radius_px, options = {}) {
        super();
        this.el = this._createBall(x_px, y_px, radius_px, options);
        this._bounceSound = PIXI.audioManager.getAudio('bounceSound');
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

    contact () {
        this.bouncing = true;
    }

    worldPosition () {
        return {
            x: this.el.position.x + this._initialX,
            y: this.el.position.y + this._initialY
        };
    }

    moveTo (x, y) {
        this.el.position.x = x - this._initialX;
        this.el.position.y = y - this._initialY;
        this.body.SetPosition(
            new b2Vec2(
                pixelsToMeters(x),
                pixelsToMeters(y)
            )
        );
    }

    render () {
        if (this.canMove) {
            this.el.position.x = metersToPixels(this.body.GetPosition().x) - this._initialX;
            this.el.position.y = metersToPixels(this.body.GetPosition().y) - this._initialY;

            if (this.worldPosition().y - this.radius > constants.STAGE_HEIGHT_PX) {
                this.dead = true;
            }
        }

        if (this.bouncing) {
            if (!this._bounceSound) {
                console.warn("No bounce sound found");
                return;
            }
            this._bounceSound.play();
            this.bouncing = false;
        }

        this._untrap();

        return this;
    }

    _createBall = (x_px, y_px, radius_px, options) => {
        var ball = new PIXI.Graphics();
        ball.lineStyle(1, BALL_LINE_COLOR, 1);
        ball.beginFill(BALL_FILL_COLOR, 0.5);
        ball.drawCircle(x_px, y_px, radius_px);
        ball.endFill();

        this.radius = radius_px;
        this._initialX = x_px;
        this._initialY = y_px;

        return ball;
    };

    _mightBeTrapped () {
        return this.body && (this.body.GetLinearVelocity().x === 0 || this.body.GetLinearVelocity().y === 0);
    }

    _untrap = () => {
        // The ball occasionally ends up with a velocity purely vertical or horizontal, which traps the ball in
        // a fixed trajectory. I am probably doing something wrong with the physics.
        // Hack: if velocity is purely vertical or horizontal for 3 steps in a row, then manually set the linear
        // velocity over x or y to a non null value and teleport the ball so that it doesn't get stuck in the wall.
        // TODO: find a better solution.
        if (this._mightBeTrapped()) {
            this._trapCount++;
        } else {
            this._trapCount = 0;
        }

        if (this._trapCount >= 10) {
            const linearVelocity = { x: this.body.GetLinearVelocity().x, y: this.body.GetLinearVelocity().y };
            const position = { x: this.worldPosition().x, y: this.worldPosition().y };

            if (this.body.GetLinearVelocity().x === 0) {
                if (this.worldPosition().x < constants.STAGE_WIDTH_PX - this.worldPosition().x) {
                    this.moveTo(this.worldPosition().x + this.radius, this.worldPosition().y);
                    this.setLinearVelocity(linearVelocity.x + 1.5, linearVelocity.y);
                } else {
                    this.moveTo(this.worldPosition().x - this.radius, this.worldPosition().y);
                    this.setLinearVelocity(linearVelocity.x - 1.5, linearVelocity.y);
                }
            }
            if (this.body.GetLinearVelocity().y === 0) {
                if (this.worldPosition().y < constants.STAGE_HEIGHT_PX - this.worldPosition().y) {
                    this.moveTo(this.worldPosition(), this.worldPosition().y + this.radius);
                    this.setLinearVelocity(linearVelocity.x, linearVelocity.y + 1.5);
                } else {
                    this.moveTo(this.worldPosition().x, this.worldPosition().y - this.radius);
                    this.setLinearVelocity(linearVelocity.x, linearVelocity.y - 1.5);
                }
            }

            console.warn(
                "Adjusting linear velocity from", linearVelocity, "to", this.body.GetLinearVelocity(),
                "and position from", position, "to", this.worldPosition()
            );
        }

        // However this hack might teleport the ball into a brick. re-initialize the ball position in that case.
        if (isNaN(this.worldPosition().x) || isNaN(this.worldPosition().y)) {
            this.moveTo(this._initialX, this._initialY);
            this.setLinearVelocity(1.5, -1.5);
            console.warn("Reinitializing ball position");
        }
    };
}

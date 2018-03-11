import { pixelsToMeters, metersToPixels } from '../util/scale';
import * as constants from '../constants';
import { randomFloat, randomBoolean } from '../util/random';
import Entity from './entity';


export const MAX_ANGLE = 3 * Math.PI / 8;


export default class Arrow extends Entity {

    el;

    ready = false;
    velocity = { x: 0, y: 0 };

    _rotationSpeed = 0.025;
    _reversed = false;

    _initialX;
    _initialY;

    constructor(x_px, y_px) {
        super();
        this.el = this._createArrow(x_px, y_px);
    }

    render (input) {
        if (this.ready) {
            return this;
        }

        if (input.SPACE.isDown) {
            this.ready = true;
            this.velocity = {
                x: Math.cos(this.el.rotation - Math.PI  / 2),
                y: -1,
            };
            return this;
        }

        if (this._reversed) {
            if (this.el.rotation - this._rotationSpeed > -MAX_ANGLE) {
                this.el.rotation -= this._rotationSpeed;
            } else {
                this._reversed = false;
            }
        } else {
            if (this.el.rotation + this._rotationSpeed < MAX_ANGLE) {
                this.el.rotation += this._rotationSpeed;
            } else {
                this._reversed = true;
            }
        }

        return this;
    }

    _createArrow = (x_px, y_px) => {
        const arrow = {
            position: {
                x: x_px,
                y: y_px,
            }
        };

        //this._initialX = x_px;
        //this._initialY = y_px;

        arrow.rotation = randomFloat(-MAX_ANGLE, MAX_ANGLE);
        this._reversed = randomBoolean();

        return arrow;
    };
}

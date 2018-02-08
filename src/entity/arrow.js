import { pixelsToMeters, metersToPixels } from '../util/scale';
import * as constants from '../constants';
import { randomFloat, randomBoolean } from '../util/random';
import Entity from './entity';

const PIXI = window.PIXI;


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
            if (this.el.rotation - this._rotationSpeed > - 3 * Math.PI / 8) {
                this.el.rotation -= this._rotationSpeed;
            } else {
                this._reversed = false;
            }
        } else {
            if (this.el.rotation + this._rotationSpeed < 3 * Math.PI / 8) {
                this.el.rotation += this._rotationSpeed;
            } else {
                this._reversed = true;
            }
        }

        return this;
    }

    _createArrow = (x_px, y_px) => {
        const arrow = new PIXI.Sprite(PIXI.loader.resources.arrow.texture);
        arrow.position.x = x_px;
        arrow.position.y = y_px;

        arrow.anchor.x = 1;
        arrow.anchor.y = 1;

        this._initialX = x_px;
        this._initialY = y_px;

        const maxAngle = 3 * Math.PI / 8;
        arrow.rotation = randomFloat(-maxAngle, maxAngle);
        this._reversed = randomBoolean();

        return arrow;
    };
}

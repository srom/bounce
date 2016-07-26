import Box2D from 'box2dweb';

import fixDef from './fixture';
import { pixelsToMeters } from '../util/scale';
import { STAGE_WIDTH_PX, STAGE_HEIGHT_PX } from '../constants';

const b2BodyDef = Box2D.Dynamics.b2BodyDef;
const b2Body = Box2D.Dynamics.b2Body;
const b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

export default class Wall {

    el = undefined;
    body = undefined;

    thickness = undefined;

    constructor (world, thickness_px, position, options = {}) {
        this._createWall(thickness_px, position, options);
        this.body = this._createBody(world, position);
    }

    _createWall = (thickness_px, position, options) => {
        this.thickness = thickness_px;
    };

    _createBody = (world, position) => {
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape();

        if (position === "top") {
            bodyDef.position.x = 0;
            bodyDef.position.y = 0;
            fixDef.shape.SetAsBox(pixelsToMeters(STAGE_WIDTH_PX), pixelsToMeters(this.thickness));
        } else if (position === "left") {
            bodyDef.position.x = 0;
            bodyDef.position.y = 0;
            fixDef.shape.SetAsBox(pixelsToMeters(this.thickness), pixelsToMeters(STAGE_HEIGHT_PX));
        } else if (position === "right") {
            bodyDef.position.x = pixelsToMeters(STAGE_WIDTH_PX - this.thickness);
            bodyDef.position.y = 0;
            fixDef.shape.SetAsBox(pixelsToMeters(this.thickness), pixelsToMeters(STAGE_HEIGHT_PX));
        }

        const body = world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);

        return body;
    };
}

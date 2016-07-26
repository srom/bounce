import Box2D from 'box2dweb';

import * as constants from '../constants';

const b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

export default function debugPhysics (world) {
    const container = document.getElementById(constants.CONTAINER_ID);
    const debugCanvas = document.createElement('canvas');
    debugCanvas.width = constants.STAGE_WIDTH_PX;
    debugCanvas.height = constants.STAGE_HEIGHT_PX;
    debugCanvas.className = constants.DEBUG_CANVAS_CLASS;
    container.appendChild(debugCanvas);

    const debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(debugCanvas.getContext("2d"));
    debugDraw.SetDrawScale(1 / constants.RATIO);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

    world.SetDebugDraw(debugDraw);
}

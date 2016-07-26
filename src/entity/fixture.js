import Box2D from 'box2dweb';
const PIXI = window.PIXI;

const b2FixtureDef = Box2D.Dynamics.b2FixtureDef;

const fixDef = new b2FixtureDef;
fixDef.density = 1.0;
fixDef.friction = 0.0;
fixDef.restitution = 1;

export default fixDef;

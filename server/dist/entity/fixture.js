'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _box2dweb = require('box2dweb');

var _box2dweb2 = _interopRequireDefault(_box2dweb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var b2FixtureDef = _box2dweb2.default.Dynamics.b2FixtureDef;

var fixDef = new b2FixtureDef();
fixDef.density = 1.0;
fixDef.friction = 0.0;
fixDef.restitution = 1;

exports.default = fixDef;
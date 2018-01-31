'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.setWalls = setWalls;

var _box2dweb = require('box2dweb');

var _box2dweb2 = _interopRequireDefault(_box2dweb);

var _fixture = require('./fixture');

var _fixture2 = _interopRequireDefault(_fixture);

var _scale = require('../util/scale');

var _constants = require('../constants');

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var b2BodyDef = _box2dweb2.default.Dynamics.b2BodyDef;
var b2Body = _box2dweb2.default.Dynamics.b2Body;
var b2PolygonShape = _box2dweb2.default.Collision.Shapes.b2PolygonShape;

var WALL_LINE_COLOR = 0x9ECBEA;
var WALL_FILL_COLOR = 0x407394;

var Wall = function (_Entity) {
    _inherits(Wall, _Entity);

    function Wall(thickness_px, position) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, Wall);

        var _this = _possibleConstructorReturn(this, (Wall.__proto__ || Object.getPrototypeOf(Wall)).call(this));

        _initialiseProps.call(_this);

        _this.el = _this._createWall(thickness_px, position, options);
        return _this;
    }

    _createClass(Wall, [{
        key: 'createBody',
        value: function createBody(world) {
            var bodyDef = new b2BodyDef();
            bodyDef.type = b2Body.b2_staticBody;
            _fixture2.default.shape = new b2PolygonShape();

            if (this._initialPosition === "top") {
                bodyDef.position.x = 0;
                bodyDef.position.y = 0;
                _fixture2.default.shape.SetAsBox((0, _scale.pixelsToMeters)(_constants.STAGE_WIDTH_PX), (0, _scale.pixelsToMeters)(this.thickness));
            } else if (this._initialPosition === "left") {
                bodyDef.position.x = 0;
                bodyDef.position.y = 0;
                _fixture2.default.shape.SetAsBox((0, _scale.pixelsToMeters)(this.thickness), (0, _scale.pixelsToMeters)(_constants.STAGE_HEIGHT_PX));
            } else if (this._initialPosition === "right") {
                bodyDef.position.x = (0, _scale.pixelsToMeters)(_constants.STAGE_WIDTH_PX);
                bodyDef.position.y = 0;
                _fixture2.default.shape.SetAsBox((0, _scale.pixelsToMeters)(this.thickness), (0, _scale.pixelsToMeters)(_constants.STAGE_HEIGHT_PX));
            }

            var body = world.CreateBody(bodyDef);
            body.CreateFixture(_fixture2.default);

            this.body = body;

            return this;
        }
    }]);

    return Wall;
}(_entity2.default);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this._createWall = function (thickness_px, position, options) {
        _this2.thickness = thickness_px;
        _this2._initialPosition = position;

        var wall = new PIXI.Graphics();
        wall.lineStyle(1, WALL_LINE_COLOR, 1);
        wall.beginFill(WALL_FILL_COLOR, 1);

        if (_this2._initialPosition === "top") {
            wall.drawRect(0, 0, _constants.STAGE_WIDTH_PX, _this2.thickness);
        } else if (_this2._initialPosition === "left") {
            wall.drawRect(0, 0, _this2.thickness, _constants.STAGE_HEIGHT_PX);
        } else if (_this2._initialPosition === "right") {
            wall.drawRect(_constants.STAGE_WIDTH_PX - _this2.thickness, 0, _this2.thickness, _constants.STAGE_HEIGHT_PX);
        }

        wall.endFill();

        return wall;
    };
};

exports.default = Wall;
function setWalls(world) {
    return [new Wall(constants.WALL_THICKNESS, 'top').createBody(world), new Wall(constants.WALL_THICKNESS, 'left').createBody(world), new Wall(constants.WALL_THICKNESS, 'right').createBody(world)];
}
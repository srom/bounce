'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.brickHeight = exports.brickWidth = exports.BrickLevel2 = exports.BrickLevel1 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.setBricks = setBricks;

var _box2dweb = require('box2dweb');

var _box2dweb2 = _interopRequireDefault(_box2dweb);

var _fixture = require('./fixture');

var _fixture2 = _interopRequireDefault(_fixture);

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

var _scale = require('../util/scale');

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var b2BodyDef = _box2dweb2.default.Dynamics.b2BodyDef;
var b2Body = _box2dweb2.default.Dynamics.b2Body;
var b2PolygonShape = _box2dweb2.default.Collision.Shapes.b2PolygonShape;

var BrickLevel1 = exports.BrickLevel1 = 1;
var BrickLevel2 = exports.BrickLevel2 = 2;
var brickWidth = exports.brickWidth = 70;
var brickHeight = exports.brickHeight = 30;

var Brick = function (_Entity) {
    _inherits(Brick, _Entity);

    function Brick(lvl, x_px, y_px, width_px, height_px) {
        var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

        _classCallCheck(this, Brick);

        var _this = _possibleConstructorReturn(this, (Brick.__proto__ || Object.getPrototypeOf(Brick)).call(this));

        _initialiseProps.call(_this);

        _this.el = _this._createBrick(lvl, x_px, y_px, width_px, height_px, options);
        return _this;
    }

    _createClass(Brick, [{
        key: 'createBody',
        value: function createBody(world) {
            var bodyDef = new b2BodyDef();
            bodyDef.type = b2Body.b2_staticBody;
            bodyDef.position.x = (0, _scale.pixelsToMeters)(this._initialX) + (0, _scale.pixelsToMeters)(this.width) / 2;
            bodyDef.position.y = (0, _scale.pixelsToMeters)(this._initialY) + (0, _scale.pixelsToMeters)(this.height) / 2;

            _fixture2.default.shape = new b2PolygonShape();
            _fixture2.default.shape.SetAsBox((0, _scale.pixelsToMeters)(this.width) / 2, (0, _scale.pixelsToMeters)(this.height) / 2);

            var body = world.CreateBody(bodyDef);
            body.CreateFixture(_fixture2.default);

            this.body = body;

            return this;
        }
    }, {
        key: 'contact',
        value: function contact() {
            this.lives--;
        }
    }, {
        key: 'isGarbage',
        value: function isGarbage() {
            return this.lives <= 0;
        }
    }]);

    return Brick;
}(_entity2.default);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.lives = 1;

    this._createBrick = function (lvl, x_px, y_px, width_px, height_px, options) {
        //let texture;
        if (lvl === BrickLevel1) {
            //texture = PIXI.loader.resources.brickBlue.texture;
        } else {
            //texture = PIXI.loader.resources.brickGreen.texture;
            _this2.lives = 2;
        }
        //const brick = new PIXI.Sprite(texture);
        //brick.position.x = x_px;
        //brick.position.y = y_px;
        //brick.height = height_px;
        //brick.width = width_px;

        _this2.width = width_px;
        _this2.height = height_px;
        _this2._initialX = x_px;
        _this2._initialY = y_px;

        return {
            position: {
                x: x_px,
                y: y_px
            },
            width: width_px,
            height: height_px
        };
    };
};

exports.default = Brick;
function setBricks(world) {
    return [new Brick(BrickLevel1, 40, 100, brickWidth, brickHeight).createBody(world), new Brick(BrickLevel2, 40 + brickWidth + 40, 100 + brickHeight + 30, brickWidth, brickHeight).createBody(world), new Brick(BrickLevel1, constants.STAGE_WIDTH_PX - brickWidth - 40, 100, brickWidth, brickHeight).createBody(world), new Brick(BrickLevel2, constants.STAGE_WIDTH_PX - 2 * brickWidth - 40 - 40, 100 + brickHeight + 30, brickWidth, brickHeight).createBody(world), new Brick(BrickLevel1, (constants.STAGE_WIDTH_PX - brickWidth) / 2, 80, brickWidth, brickHeight).createBody(world)];
}
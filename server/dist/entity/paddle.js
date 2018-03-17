'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _box2dweb = require('box2dweb');

var _box2dweb2 = _interopRequireDefault(_box2dweb);

var _fixture = require('./fixture');

var _fixture2 = _interopRequireDefault(_fixture);

var _scale = require('../util/scale');

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

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
var b2Vec2 = _box2dweb2.default.Common.Math.b2Vec2;

var Paddle = function (_Entity) {
    _inherits(Paddle, _Entity);

    function Paddle(x_px, y_px, width_px, height_px) {
        var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

        _classCallCheck(this, Paddle);

        var _this = _possibleConstructorReturn(this, (Paddle.__proto__ || Object.getPrototypeOf(Paddle)).call(this));

        _initialiseProps.call(_this);

        _this.el = _this._createPaddle(x_px, y_px, width_px, height_px, options);
        return _this;
    }

    _createClass(Paddle, [{
        key: 'createBody',
        value: function createBody(world) {
            var worldPosition = this.worldPosition();

            var bodyDef = new b2BodyDef();
            bodyDef.type = b2Body.b2_staticBody;
            bodyDef.position.x = (0, _scale.pixelsToMeters)(worldPosition.x) + (0, _scale.pixelsToMeters)(this.width) / 2;
            bodyDef.position.y = (0, _scale.pixelsToMeters)(this._initialY) + (0, _scale.pixelsToMeters)(this.height) / 2;

            _fixture2.default.shape = new b2PolygonShape();
            _fixture2.default.shape.SetAsBox((0, _scale.pixelsToMeters)(this.width) / 2, (0, _scale.pixelsToMeters)(this.height) / 2);

            var body = world.CreateBody(bodyDef);
            body.CreateFixture(_fixture2.default);
            body.SetUserData(this);

            this.body = body;

            return this;
        }
    }, {
        key: 'worldPosition',
        value: function worldPosition() {
            return {
                x: this.el.position.x,
                y: this.el.position.y
            };
        }
    }, {
        key: 'render',
        value: function render(input) {
            if (!this.canMove) {
                return this;
            }

            if (input.LEFT_KEY.isDown) {
                var candidatePos_px = this.el.position.x - this.speed_px;
                if (candidatePos_px < constants.WALL_THICKNESS) {
                    candidatePos_px += this.speed_px;
                }

                this.el.position.x = candidatePos_px;
                this.body.SetPosition(new b2Vec2((0, _scale.pixelsToMeters)(this.el.position.x) + (0, _scale.pixelsToMeters)(this.width) / 2, this.body.GetPosition().y));
            } else if (input.RIGHT_KEY.isDown) {
                var _candidatePos_px = this.el.position.x + this.speed_px;
                if (_candidatePos_px + this.width > constants.STAGE_WIDTH_PX - constants.WALL_THICKNESS) {
                    _candidatePos_px -= this.speed_px;
                }

                this.el.position.x = _candidatePos_px;
                this.body.SetPosition(new b2Vec2((0, _scale.pixelsToMeters)(this.el.position.x) + (0, _scale.pixelsToMeters)(this.width) / 2, this.body.GetPosition().y));
            }
            return this;
        }
    }]);

    return Paddle;
}(_entity2.default);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.speed_px = 3;
    this.canMove = false;
    this._initialX = constants.STAGE_WIDTH_PX / 2 - 100 / 2;
    this._initialY = constants.STAGE_HEIGHT_PX - 50;

    this._createPaddle = function (x_px, y_px, width_px, height_px, options) {
        //const paddle = new PIXI.Sprite(PIXI.loader.resources.paddle.texture);
        //paddle.position.x = x_px;
        //paddle.position.y = y_px;
        //paddle.height = height_px;
        //paddle.width = width_px;

        _this2.width = width_px;
        _this2.height = height_px;
        //this._initialX = x_px;
        //this._initialY = y_px;

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

exports.default = Paddle;
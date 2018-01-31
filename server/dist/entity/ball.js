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

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var b2BodyDef = _box2dweb2.default.Dynamics.b2BodyDef;
var b2Body = _box2dweb2.default.Dynamics.b2Body;
var b2CircleShape = _box2dweb2.default.Collision.Shapes.b2CircleShape;
var b2Vec2 = _box2dweb2.default.Common.Math.b2Vec2;

var BALL_LINE_COLOR = 0xDEFFA3;
var BALL_FILL_COLOR = 0xFFFF0B;

var Ball = function (_Entity) {
    _inherits(Ball, _Entity);

    function Ball(x_px, y_px, radius_px) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        _classCallCheck(this, Ball);

        var _this = _possibleConstructorReturn(this, (Ball.__proto__ || Object.getPrototypeOf(Ball)).call(this));

        _initialiseProps.call(_this);

        _this.el = _this._createBall(x_px, y_px, radius_px, options);
        //this._bounceSound = PIXI.audioManager.getAudio('bounceSound');
        return _this;
    }

    _createClass(Ball, [{
        key: 'createBody',
        value: function createBody(world) {
            var bodyDef = new b2BodyDef();
            bodyDef.type = b2Body.b2_dynamicBody;
            bodyDef.position.x = (0, _scale.pixelsToMeters)(this._initialX);
            bodyDef.position.y = (0, _scale.pixelsToMeters)(this._initialY);

            _fixture2.default.shape = new b2CircleShape((0, _scale.pixelsToMeters)(this.radius));

            var body = world.CreateBody(bodyDef);
            body.CreateFixture(_fixture2.default);
            body.SetBullet(true);

            this.body = body;

            return this;
        }
    }, {
        key: 'setLinearVelocity',
        value: function setLinearVelocity(x_m, y_m) {
            if (!this.body) {
                console.error("Cannot set linear velocity without a body.");
                return;
            }
            var velocity = this.body.GetLinearVelocity();
            velocity.x = x_m;
            velocity.y = y_m;
            this.body.SetLinearVelocity(velocity);

            this._targetVelocity = { x: Math.abs(x_m), y: Math.abs(y_m) };

            return this;
        }
    }, {
        key: 'contact',
        value: function contact() {
            this.bouncing = true;
        }
    }, {
        key: 'worldPosition',
        value: function worldPosition() {
            return {
                x: this.el.position.x + this._initialX,
                y: this.el.position.y + this._initialY
            };
        }
    }, {
        key: 'moveTo',
        value: function moveTo(x, y) {
            this.el.position.x = x - this._initialX;
            this.el.position.y = y - this._initialY;
            this.body.SetPosition(new b2Vec2((0, _scale.pixelsToMeters)(x), (0, _scale.pixelsToMeters)(y)));
        }
    }, {
        key: 'render',
        value: function render(input) {
            if (this.canMove) {
                this.el.position.x = (0, _scale.metersToPixels)(this.body.GetPosition().x) - this._initialX;
                this.el.position.y = (0, _scale.metersToPixels)(this.body.GetPosition().y) - this._initialY;

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

            this._ensureConstantSpeed();

            return this;
        }
    }, {
        key: '_ensureConstantSpeed',
        value: function _ensureConstantSpeed() {
            if (!this._targetVelocity || !this.body) {
                return;
            }

            var hasChanged = false;
            var velocity = this.body.GetLinearVelocity();
            if (Math.abs(velocity.x) != this._targetVelocity.x) {
                velocity.x = Math.sign(velocity.x) * this._targetVelocity.x;
                hasChanged = true;
            }
            if (Math.abs(velocity.y) != this._targetVelocity.y) {
                velocity.y = Math.sign(velocity.y) * this._targetVelocity.y;
                hasChanged = true;
            }
            if (hasChanged) {
                this.body.SetLinearVelocity(velocity);
            }
        }
    }]);

    return Ball;
}(_entity2.default);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.dead = false;
    this.canMove = false;
    this.bouncing = false;

    this._createBall = function (x_px, y_px, radius_px, options) {
        //var ball = new PIXI.Graphics();
        //ball.lineStyle(1, BALL_LINE_COLOR, 1);
        //ball.beginFill(BALL_FILL_COLOR, 0.5);
        //ball.drawCircle(x_px, y_px, radius_px);
        //ball.endFill();

        _this2.radius = radius_px;
        _this2._initialX = x_px;
        _this2._initialY = y_px;

        return {
            position: {
                x: x_px,
                y: y_px
            }
        };
    };
};

exports.default = Ball;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scale = require('../util/scale');

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Arrow = function (_Entity) {
    _inherits(Arrow, _Entity);

    function Arrow(x_px, y_px) {
        _classCallCheck(this, Arrow);

        var _this = _possibleConstructorReturn(this, (Arrow.__proto__ || Object.getPrototypeOf(Arrow)).call(this));

        _initialiseProps.call(_this);

        _this.el = _this._createArrow(x_px, y_px);
        return _this;
    }

    _createClass(Arrow, [{
        key: 'render',
        value: function render(input) {
            if (this.ready) {
                return this;
            }

            if (input.SPACE.isDown) {
                this.ready = true;
                this.velocity = {
                    x: Math.cos(this.el.rotation - Math.PI / 2),
                    y: -1
                };
                return this;
            }

            if (this._reversed) {
                if (this.el.rotation - this._rotationSpeed > -3 * Math.PI / 8) {
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

            var deadConeRadius = 0.3;
            if (-deadConeRadius < this.el.rotation && this.el.rotation < deadConeRadius) {
                var sign = !this._reversed ? 1 : -1;
                this.el.rotation = sign * deadConeRadius;
            }

            return this;
        }
    }]);

    return Arrow;
}(_entity2.default);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.ready = false;
    this.velocity = { x: 0, y: 0 };
    this._rotationSpeed = 0.025;
    this._reversed = false;

    this._createArrow = function (x_px, y_px) {
        var arrow = {
            position: {
                x: x_px,
                y: y_px
            }
        };

        _this2._initialX = x_px;
        _this2._initialY = y_px;

        return arrow;
    };
};

exports.default = Arrow;
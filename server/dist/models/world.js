"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.Physics = exports.Request = exports.Brick = exports.Arrow = exports.Paddle = exports.Ball = exports.World = exports.Worlds = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/


var _minimal = require("protobufjs/minimal");

var $protobuf = _interopRequireWildcard(_minimal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Common aliases
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

var Worlds = exports.Worlds = $root.Worlds = function () {

    /**
     * Properties of a Worlds.
     * @exports IWorlds
     * @interface IWorlds
     * @property {Array.<IWorld>|null} [worlds] Worlds worlds
     */

    /**
     * Constructs a new Worlds.
     * @exports Worlds
     * @classdesc Represents a Worlds.
     * @implements IWorlds
     * @constructor
     * @param {IWorlds=} [properties] Properties to set
     */
    function Worlds(properties) {
        this.worlds = [];
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * Worlds worlds.
     * @member {Array.<IWorld>} worlds
     * @memberof Worlds
     * @instance
     */
    Worlds.prototype.worlds = $util.emptyArray;

    /**
     * Creates a new Worlds instance using the specified properties.
     * @function create
     * @memberof Worlds
     * @static
     * @param {IWorlds=} [properties] Properties to set
     * @returns {Worlds} Worlds instance
     */
    Worlds.create = function create(properties) {
        return new Worlds(properties);
    };

    /**
     * Encodes the specified Worlds message. Does not implicitly {@link Worlds.verify|verify} messages.
     * @function encode
     * @memberof Worlds
     * @static
     * @param {IWorlds} message Worlds message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Worlds.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.worlds != null && message.worlds.length) for (var i = 0; i < message.worlds.length; ++i) {
            $root.World.encode(message.worlds[i], writer.uint32( /* id 1, wireType 2 =*/10).fork()).ldelim();
        }return writer;
    };

    /**
     * Encodes the specified Worlds message, length delimited. Does not implicitly {@link Worlds.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Worlds
     * @static
     * @param {IWorlds} message Worlds message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Worlds.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Worlds message from the specified reader or buffer.
     * @function decode
     * @memberof Worlds
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Worlds} Worlds
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Worlds.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.Worlds();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (!(message.worlds && message.worlds.length)) message.worlds = [];
                    message.worlds.push($root.World.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a Worlds message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Worlds
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Worlds} Worlds
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Worlds.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Worlds message.
     * @function verify
     * @memberof Worlds
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Worlds.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.worlds != null && message.hasOwnProperty("worlds")) {
            if (!Array.isArray(message.worlds)) return "worlds: array expected";
            for (var i = 0; i < message.worlds.length; ++i) {
                var error = $root.World.verify(message.worlds[i]);
                if (error) return "worlds." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Worlds message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Worlds
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Worlds} Worlds
     */
    Worlds.fromObject = function fromObject(object) {
        if (object instanceof $root.Worlds) return object;
        var message = new $root.Worlds();
        if (object.worlds) {
            if (!Array.isArray(object.worlds)) throw TypeError(".Worlds.worlds: array expected");
            message.worlds = [];
            for (var i = 0; i < object.worlds.length; ++i) {
                if (_typeof(object.worlds[i]) !== "object") throw TypeError(".Worlds.worlds: object expected");
                message.worlds[i] = $root.World.fromObject(object.worlds[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Worlds message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Worlds
     * @static
     * @param {Worlds} message Worlds
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Worlds.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.arrays || options.defaults) object.worlds = [];
        if (message.worlds && message.worlds.length) {
            object.worlds = [];
            for (var j = 0; j < message.worlds.length; ++j) {
                object.worlds[j] = $root.World.toObject(message.worlds[j], options);
            }
        }
        return object;
    };

    /**
     * Converts this Worlds to JSON.
     * @function toJSON
     * @memberof Worlds
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Worlds.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Worlds;
}();

var World = exports.World = $root.World = function () {

    /**
     * Properties of a World.
     * @exports IWorld
     * @interface IWorld
     * @property {IBall|null} [ball] World ball
     * @property {IPaddle|null} [paddle] World paddle
     * @property {IArrow|null} [arrow] World arrow
     * @property {Array.<IBrick>|null} [bricks] World bricks
     * @property {Action|null} [action] World action
     * @property {number|null} [reward] World reward
     * @property {boolean|null} [won] World won
     * @property {boolean|null} [lost] World lost
     * @property {number|null} [frameNb] World frameNb
     * @property {number|null} [preFrameNb] World preFrameNb
     * @property {IRequest|null} [request] World request
     * @property {IPhysics|null} [physics] World physics
     */

    /**
     * Constructs a new World.
     * @exports World
     * @classdesc Represents a World.
     * @implements IWorld
     * @constructor
     * @param {IWorld=} [properties] Properties to set
     */
    function World(properties) {
        this.bricks = [];
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * World ball.
     * @member {IBall|null|undefined} ball
     * @memberof World
     * @instance
     */
    World.prototype.ball = null;

    /**
     * World paddle.
     * @member {IPaddle|null|undefined} paddle
     * @memberof World
     * @instance
     */
    World.prototype.paddle = null;

    /**
     * World arrow.
     * @member {IArrow|null|undefined} arrow
     * @memberof World
     * @instance
     */
    World.prototype.arrow = null;

    /**
     * World bricks.
     * @member {Array.<IBrick>} bricks
     * @memberof World
     * @instance
     */
    World.prototype.bricks = $util.emptyArray;

    /**
     * World action.
     * @member {Action} action
     * @memberof World
     * @instance
     */
    World.prototype.action = 0;

    /**
     * World reward.
     * @member {number} reward
     * @memberof World
     * @instance
     */
    World.prototype.reward = 0;

    /**
     * World won.
     * @member {boolean} won
     * @memberof World
     * @instance
     */
    World.prototype.won = false;

    /**
     * World lost.
     * @member {boolean} lost
     * @memberof World
     * @instance
     */
    World.prototype.lost = false;

    /**
     * World frameNb.
     * @member {number} frameNb
     * @memberof World
     * @instance
     */
    World.prototype.frameNb = 0;

    /**
     * World preFrameNb.
     * @member {number} preFrameNb
     * @memberof World
     * @instance
     */
    World.prototype.preFrameNb = 0;

    /**
     * World request.
     * @member {IRequest|null|undefined} request
     * @memberof World
     * @instance
     */
    World.prototype.request = null;

    /**
     * World physics.
     * @member {IPhysics|null|undefined} physics
     * @memberof World
     * @instance
     */
    World.prototype.physics = null;

    /**
     * Creates a new World instance using the specified properties.
     * @function create
     * @memberof World
     * @static
     * @param {IWorld=} [properties] Properties to set
     * @returns {World} World instance
     */
    World.create = function create(properties) {
        return new World(properties);
    };

    /**
     * Encodes the specified World message. Does not implicitly {@link World.verify|verify} messages.
     * @function encode
     * @memberof World
     * @static
     * @param {IWorld} message World message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    World.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.ball != null && message.hasOwnProperty("ball")) $root.Ball.encode(message.ball, writer.uint32( /* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.paddle != null && message.hasOwnProperty("paddle")) $root.Paddle.encode(message.paddle, writer.uint32( /* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.arrow != null && message.hasOwnProperty("arrow")) $root.Arrow.encode(message.arrow, writer.uint32( /* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.bricks != null && message.bricks.length) for (var i = 0; i < message.bricks.length; ++i) {
            $root.Brick.encode(message.bricks[i], writer.uint32( /* id 4, wireType 2 =*/34).fork()).ldelim();
        }if (message.action != null && message.hasOwnProperty("action")) writer.uint32( /* id 5, wireType 0 =*/40).int32(message.action);
        if (message.reward != null && message.hasOwnProperty("reward")) writer.uint32( /* id 6, wireType 5 =*/53).float(message.reward);
        if (message.won != null && message.hasOwnProperty("won")) writer.uint32( /* id 7, wireType 0 =*/56).bool(message.won);
        if (message.lost != null && message.hasOwnProperty("lost")) writer.uint32( /* id 8, wireType 0 =*/64).bool(message.lost);
        if (message.frameNb != null && message.hasOwnProperty("frameNb")) writer.uint32( /* id 9, wireType 0 =*/72).int32(message.frameNb);
        if (message.preFrameNb != null && message.hasOwnProperty("preFrameNb")) writer.uint32( /* id 10, wireType 0 =*/80).int32(message.preFrameNb);
        if (message.request != null && message.hasOwnProperty("request")) $root.Request.encode(message.request, writer.uint32( /* id 11, wireType 2 =*/90).fork()).ldelim();
        if (message.physics != null && message.hasOwnProperty("physics")) $root.Physics.encode(message.physics, writer.uint32( /* id 12, wireType 2 =*/98).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified World message, length delimited. Does not implicitly {@link World.verify|verify} messages.
     * @function encodeDelimited
     * @memberof World
     * @static
     * @param {IWorld} message World message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    World.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a World message from the specified reader or buffer.
     * @function decode
     * @memberof World
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {World} World
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    World.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.World();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.ball = $root.Ball.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.paddle = $root.Paddle.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.arrow = $root.Arrow.decode(reader, reader.uint32());
                    break;
                case 4:
                    if (!(message.bricks && message.bricks.length)) message.bricks = [];
                    message.bricks.push($root.Brick.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.action = reader.int32();
                    break;
                case 6:
                    message.reward = reader.float();
                    break;
                case 7:
                    message.won = reader.bool();
                    break;
                case 8:
                    message.lost = reader.bool();
                    break;
                case 9:
                    message.frameNb = reader.int32();
                    break;
                case 10:
                    message.preFrameNb = reader.int32();
                    break;
                case 11:
                    message.request = $root.Request.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.physics = $root.Physics.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a World message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof World
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {World} World
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    World.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a World message.
     * @function verify
     * @memberof World
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    World.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.ball != null && message.hasOwnProperty("ball")) {
            var error = $root.Ball.verify(message.ball);
            if (error) return "ball." + error;
        }
        if (message.paddle != null && message.hasOwnProperty("paddle")) {
            var _error = $root.Paddle.verify(message.paddle);
            if (_error) return "paddle." + _error;
        }
        if (message.arrow != null && message.hasOwnProperty("arrow")) {
            var _error2 = $root.Arrow.verify(message.arrow);
            if (_error2) return "arrow." + _error2;
        }
        if (message.bricks != null && message.hasOwnProperty("bricks")) {
            if (!Array.isArray(message.bricks)) return "bricks: array expected";
            for (var i = 0; i < message.bricks.length; ++i) {
                var _error3 = $root.Brick.verify(message.bricks[i]);
                if (_error3) return "bricks." + _error3;
            }
        }
        if (message.action != null && message.hasOwnProperty("action")) switch (message.action) {
            default:
                return "action: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
                break;
        }
        if (message.reward != null && message.hasOwnProperty("reward")) if (typeof message.reward !== "number") return "reward: number expected";
        if (message.won != null && message.hasOwnProperty("won")) if (typeof message.won !== "boolean") return "won: boolean expected";
        if (message.lost != null && message.hasOwnProperty("lost")) if (typeof message.lost !== "boolean") return "lost: boolean expected";
        if (message.frameNb != null && message.hasOwnProperty("frameNb")) if (!$util.isInteger(message.frameNb)) return "frameNb: integer expected";
        if (message.preFrameNb != null && message.hasOwnProperty("preFrameNb")) if (!$util.isInteger(message.preFrameNb)) return "preFrameNb: integer expected";
        if (message.request != null && message.hasOwnProperty("request")) {
            var _error4 = $root.Request.verify(message.request);
            if (_error4) return "request." + _error4;
        }
        if (message.physics != null && message.hasOwnProperty("physics")) {
            var _error5 = $root.Physics.verify(message.physics);
            if (_error5) return "physics." + _error5;
        }
        return null;
    };

    /**
     * Creates a World message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof World
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {World} World
     */
    World.fromObject = function fromObject(object) {
        if (object instanceof $root.World) return object;
        var message = new $root.World();
        if (object.ball != null) {
            if (_typeof(object.ball) !== "object") throw TypeError(".World.ball: object expected");
            message.ball = $root.Ball.fromObject(object.ball);
        }
        if (object.paddle != null) {
            if (_typeof(object.paddle) !== "object") throw TypeError(".World.paddle: object expected");
            message.paddle = $root.Paddle.fromObject(object.paddle);
        }
        if (object.arrow != null) {
            if (_typeof(object.arrow) !== "object") throw TypeError(".World.arrow: object expected");
            message.arrow = $root.Arrow.fromObject(object.arrow);
        }
        if (object.bricks) {
            if (!Array.isArray(object.bricks)) throw TypeError(".World.bricks: array expected");
            message.bricks = [];
            for (var i = 0; i < object.bricks.length; ++i) {
                if (_typeof(object.bricks[i]) !== "object") throw TypeError(".World.bricks: object expected");
                message.bricks[i] = $root.Brick.fromObject(object.bricks[i]);
            }
        }
        switch (object.action) {
            case "LEFT":
            case 0:
                message.action = 0;
                break;
            case "RIGHT":
            case 1:
                message.action = 1;
                break;
            case "SPACE":
            case 2:
                message.action = 2;
                break;
            case "HOLD":
            case 3:
                message.action = 3;
                break;
        }
        if (object.reward != null) message.reward = Number(object.reward);
        if (object.won != null) message.won = Boolean(object.won);
        if (object.lost != null) message.lost = Boolean(object.lost);
        if (object.frameNb != null) message.frameNb = object.frameNb | 0;
        if (object.preFrameNb != null) message.preFrameNb = object.preFrameNb | 0;
        if (object.request != null) {
            if (_typeof(object.request) !== "object") throw TypeError(".World.request: object expected");
            message.request = $root.Request.fromObject(object.request);
        }
        if (object.physics != null) {
            if (_typeof(object.physics) !== "object") throw TypeError(".World.physics: object expected");
            message.physics = $root.Physics.fromObject(object.physics);
        }
        return message;
    };

    /**
     * Creates a plain object from a World message. Also converts values to other types if specified.
     * @function toObject
     * @memberof World
     * @static
     * @param {World} message World
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    World.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.arrays || options.defaults) object.bricks = [];
        if (options.defaults) {
            object.ball = null;
            object.paddle = null;
            object.arrow = null;
            object.action = options.enums === String ? "LEFT" : 0;
            object.reward = 0;
            object.won = false;
            object.lost = false;
            object.frameNb = 0;
            object.preFrameNb = 0;
            object.request = null;
            object.physics = null;
        }
        if (message.ball != null && message.hasOwnProperty("ball")) object.ball = $root.Ball.toObject(message.ball, options);
        if (message.paddle != null && message.hasOwnProperty("paddle")) object.paddle = $root.Paddle.toObject(message.paddle, options);
        if (message.arrow != null && message.hasOwnProperty("arrow")) object.arrow = $root.Arrow.toObject(message.arrow, options);
        if (message.bricks && message.bricks.length) {
            object.bricks = [];
            for (var j = 0; j < message.bricks.length; ++j) {
                object.bricks[j] = $root.Brick.toObject(message.bricks[j], options);
            }
        }
        if (message.action != null && message.hasOwnProperty("action")) object.action = options.enums === String ? $root.Action[message.action] : message.action;
        if (message.reward != null && message.hasOwnProperty("reward")) object.reward = options.json && !isFinite(message.reward) ? String(message.reward) : message.reward;
        if (message.won != null && message.hasOwnProperty("won")) object.won = message.won;
        if (message.lost != null && message.hasOwnProperty("lost")) object.lost = message.lost;
        if (message.frameNb != null && message.hasOwnProperty("frameNb")) object.frameNb = message.frameNb;
        if (message.preFrameNb != null && message.hasOwnProperty("preFrameNb")) object.preFrameNb = message.preFrameNb;
        if (message.request != null && message.hasOwnProperty("request")) object.request = $root.Request.toObject(message.request, options);
        if (message.physics != null && message.hasOwnProperty("physics")) object.physics = $root.Physics.toObject(message.physics, options);
        return object;
    };

    /**
     * Converts this World to JSON.
     * @function toJSON
     * @memberof World
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    World.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return World;
}();

var Ball = exports.Ball = $root.Ball = function () {

    /**
     * Properties of a Ball.
     * @exports IBall
     * @interface IBall
     * @property {number|null} [xPx] Ball xPx
     * @property {number|null} [yPx] Ball yPx
     * @property {number|null} [radiusPx] Ball radiusPx
     * @property {number|null} [linearVelocityXM] Ball linearVelocityXM
     * @property {number|null} [linearVelocityYM] Ball linearVelocityYM
     * @property {boolean|null} [canMove] Ball canMove
     * @property {boolean|null} [bouncing] Ball bouncing
     * @property {boolean|null} [dead] Ball dead
     */

    /**
     * Constructs a new Ball.
     * @exports Ball
     * @classdesc Represents a Ball.
     * @implements IBall
     * @constructor
     * @param {IBall=} [properties] Properties to set
     */
    function Ball(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * Ball xPx.
     * @member {number} xPx
     * @memberof Ball
     * @instance
     */
    Ball.prototype.xPx = 0;

    /**
     * Ball yPx.
     * @member {number} yPx
     * @memberof Ball
     * @instance
     */
    Ball.prototype.yPx = 0;

    /**
     * Ball radiusPx.
     * @member {number} radiusPx
     * @memberof Ball
     * @instance
     */
    Ball.prototype.radiusPx = 0;

    /**
     * Ball linearVelocityXM.
     * @member {number} linearVelocityXM
     * @memberof Ball
     * @instance
     */
    Ball.prototype.linearVelocityXM = 0;

    /**
     * Ball linearVelocityYM.
     * @member {number} linearVelocityYM
     * @memberof Ball
     * @instance
     */
    Ball.prototype.linearVelocityYM = 0;

    /**
     * Ball canMove.
     * @member {boolean} canMove
     * @memberof Ball
     * @instance
     */
    Ball.prototype.canMove = false;

    /**
     * Ball bouncing.
     * @member {boolean} bouncing
     * @memberof Ball
     * @instance
     */
    Ball.prototype.bouncing = false;

    /**
     * Ball dead.
     * @member {boolean} dead
     * @memberof Ball
     * @instance
     */
    Ball.prototype.dead = false;

    /**
     * Creates a new Ball instance using the specified properties.
     * @function create
     * @memberof Ball
     * @static
     * @param {IBall=} [properties] Properties to set
     * @returns {Ball} Ball instance
     */
    Ball.create = function create(properties) {
        return new Ball(properties);
    };

    /**
     * Encodes the specified Ball message. Does not implicitly {@link Ball.verify|verify} messages.
     * @function encode
     * @memberof Ball
     * @static
     * @param {IBall} message Ball message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ball.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.xPx != null && message.hasOwnProperty("xPx")) writer.uint32( /* id 1, wireType 5 =*/13).float(message.xPx);
        if (message.yPx != null && message.hasOwnProperty("yPx")) writer.uint32( /* id 2, wireType 5 =*/21).float(message.yPx);
        if (message.radiusPx != null && message.hasOwnProperty("radiusPx")) writer.uint32( /* id 3, wireType 5 =*/29).float(message.radiusPx);
        if (message.linearVelocityXM != null && message.hasOwnProperty("linearVelocityXM")) writer.uint32( /* id 4, wireType 5 =*/37).float(message.linearVelocityXM);
        if (message.linearVelocityYM != null && message.hasOwnProperty("linearVelocityYM")) writer.uint32( /* id 5, wireType 5 =*/45).float(message.linearVelocityYM);
        if (message.canMove != null && message.hasOwnProperty("canMove")) writer.uint32( /* id 6, wireType 0 =*/48).bool(message.canMove);
        if (message.bouncing != null && message.hasOwnProperty("bouncing")) writer.uint32( /* id 7, wireType 0 =*/56).bool(message.bouncing);
        if (message.dead != null && message.hasOwnProperty("dead")) writer.uint32( /* id 8, wireType 0 =*/64).bool(message.dead);
        return writer;
    };

    /**
     * Encodes the specified Ball message, length delimited. Does not implicitly {@link Ball.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Ball
     * @static
     * @param {IBall} message Ball message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ball.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Ball message from the specified reader or buffer.
     * @function decode
     * @memberof Ball
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Ball} Ball
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ball.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.Ball();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.xPx = reader.float();
                    break;
                case 2:
                    message.yPx = reader.float();
                    break;
                case 3:
                    message.radiusPx = reader.float();
                    break;
                case 4:
                    message.linearVelocityXM = reader.float();
                    break;
                case 5:
                    message.linearVelocityYM = reader.float();
                    break;
                case 6:
                    message.canMove = reader.bool();
                    break;
                case 7:
                    message.bouncing = reader.bool();
                    break;
                case 8:
                    message.dead = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a Ball message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Ball
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Ball} Ball
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ball.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Ball message.
     * @function verify
     * @memberof Ball
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Ball.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.xPx != null && message.hasOwnProperty("xPx")) if (typeof message.xPx !== "number") return "xPx: number expected";
        if (message.yPx != null && message.hasOwnProperty("yPx")) if (typeof message.yPx !== "number") return "yPx: number expected";
        if (message.radiusPx != null && message.hasOwnProperty("radiusPx")) if (typeof message.radiusPx !== "number") return "radiusPx: number expected";
        if (message.linearVelocityXM != null && message.hasOwnProperty("linearVelocityXM")) if (typeof message.linearVelocityXM !== "number") return "linearVelocityXM: number expected";
        if (message.linearVelocityYM != null && message.hasOwnProperty("linearVelocityYM")) if (typeof message.linearVelocityYM !== "number") return "linearVelocityYM: number expected";
        if (message.canMove != null && message.hasOwnProperty("canMove")) if (typeof message.canMove !== "boolean") return "canMove: boolean expected";
        if (message.bouncing != null && message.hasOwnProperty("bouncing")) if (typeof message.bouncing !== "boolean") return "bouncing: boolean expected";
        if (message.dead != null && message.hasOwnProperty("dead")) if (typeof message.dead !== "boolean") return "dead: boolean expected";
        return null;
    };

    /**
     * Creates a Ball message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Ball
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Ball} Ball
     */
    Ball.fromObject = function fromObject(object) {
        if (object instanceof $root.Ball) return object;
        var message = new $root.Ball();
        if (object.xPx != null) message.xPx = Number(object.xPx);
        if (object.yPx != null) message.yPx = Number(object.yPx);
        if (object.radiusPx != null) message.radiusPx = Number(object.radiusPx);
        if (object.linearVelocityXM != null) message.linearVelocityXM = Number(object.linearVelocityXM);
        if (object.linearVelocityYM != null) message.linearVelocityYM = Number(object.linearVelocityYM);
        if (object.canMove != null) message.canMove = Boolean(object.canMove);
        if (object.bouncing != null) message.bouncing = Boolean(object.bouncing);
        if (object.dead != null) message.dead = Boolean(object.dead);
        return message;
    };

    /**
     * Creates a plain object from a Ball message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Ball
     * @static
     * @param {Ball} message Ball
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Ball.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            object.xPx = 0;
            object.yPx = 0;
            object.radiusPx = 0;
            object.linearVelocityXM = 0;
            object.linearVelocityYM = 0;
            object.canMove = false;
            object.bouncing = false;
            object.dead = false;
        }
        if (message.xPx != null && message.hasOwnProperty("xPx")) object.xPx = options.json && !isFinite(message.xPx) ? String(message.xPx) : message.xPx;
        if (message.yPx != null && message.hasOwnProperty("yPx")) object.yPx = options.json && !isFinite(message.yPx) ? String(message.yPx) : message.yPx;
        if (message.radiusPx != null && message.hasOwnProperty("radiusPx")) object.radiusPx = options.json && !isFinite(message.radiusPx) ? String(message.radiusPx) : message.radiusPx;
        if (message.linearVelocityXM != null && message.hasOwnProperty("linearVelocityXM")) object.linearVelocityXM = options.json && !isFinite(message.linearVelocityXM) ? String(message.linearVelocityXM) : message.linearVelocityXM;
        if (message.linearVelocityYM != null && message.hasOwnProperty("linearVelocityYM")) object.linearVelocityYM = options.json && !isFinite(message.linearVelocityYM) ? String(message.linearVelocityYM) : message.linearVelocityYM;
        if (message.canMove != null && message.hasOwnProperty("canMove")) object.canMove = message.canMove;
        if (message.bouncing != null && message.hasOwnProperty("bouncing")) object.bouncing = message.bouncing;
        if (message.dead != null && message.hasOwnProperty("dead")) object.dead = message.dead;
        return object;
    };

    /**
     * Converts this Ball to JSON.
     * @function toJSON
     * @memberof Ball
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Ball.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Ball;
}();

var Paddle = exports.Paddle = $root.Paddle = function () {

    /**
     * Properties of a Paddle.
     * @exports IPaddle
     * @interface IPaddle
     * @property {number|null} [xPx] Paddle xPx
     * @property {number|null} [yPx] Paddle yPx
     * @property {number|null} [widthPx] Paddle widthPx
     * @property {number|null} [heightPx] Paddle heightPx
     * @property {boolean|null} [canMove] Paddle canMove
     */

    /**
     * Constructs a new Paddle.
     * @exports Paddle
     * @classdesc Represents a Paddle.
     * @implements IPaddle
     * @constructor
     * @param {IPaddle=} [properties] Properties to set
     */
    function Paddle(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * Paddle xPx.
     * @member {number} xPx
     * @memberof Paddle
     * @instance
     */
    Paddle.prototype.xPx = 0;

    /**
     * Paddle yPx.
     * @member {number} yPx
     * @memberof Paddle
     * @instance
     */
    Paddle.prototype.yPx = 0;

    /**
     * Paddle widthPx.
     * @member {number} widthPx
     * @memberof Paddle
     * @instance
     */
    Paddle.prototype.widthPx = 0;

    /**
     * Paddle heightPx.
     * @member {number} heightPx
     * @memberof Paddle
     * @instance
     */
    Paddle.prototype.heightPx = 0;

    /**
     * Paddle canMove.
     * @member {boolean} canMove
     * @memberof Paddle
     * @instance
     */
    Paddle.prototype.canMove = false;

    /**
     * Creates a new Paddle instance using the specified properties.
     * @function create
     * @memberof Paddle
     * @static
     * @param {IPaddle=} [properties] Properties to set
     * @returns {Paddle} Paddle instance
     */
    Paddle.create = function create(properties) {
        return new Paddle(properties);
    };

    /**
     * Encodes the specified Paddle message. Does not implicitly {@link Paddle.verify|verify} messages.
     * @function encode
     * @memberof Paddle
     * @static
     * @param {IPaddle} message Paddle message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Paddle.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.xPx != null && message.hasOwnProperty("xPx")) writer.uint32( /* id 1, wireType 5 =*/13).float(message.xPx);
        if (message.yPx != null && message.hasOwnProperty("yPx")) writer.uint32( /* id 2, wireType 5 =*/21).float(message.yPx);
        if (message.widthPx != null && message.hasOwnProperty("widthPx")) writer.uint32( /* id 3, wireType 5 =*/29).float(message.widthPx);
        if (message.heightPx != null && message.hasOwnProperty("heightPx")) writer.uint32( /* id 4, wireType 5 =*/37).float(message.heightPx);
        if (message.canMove != null && message.hasOwnProperty("canMove")) writer.uint32( /* id 5, wireType 0 =*/40).bool(message.canMove);
        return writer;
    };

    /**
     * Encodes the specified Paddle message, length delimited. Does not implicitly {@link Paddle.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Paddle
     * @static
     * @param {IPaddle} message Paddle message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Paddle.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Paddle message from the specified reader or buffer.
     * @function decode
     * @memberof Paddle
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Paddle} Paddle
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Paddle.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.Paddle();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.xPx = reader.float();
                    break;
                case 2:
                    message.yPx = reader.float();
                    break;
                case 3:
                    message.widthPx = reader.float();
                    break;
                case 4:
                    message.heightPx = reader.float();
                    break;
                case 5:
                    message.canMove = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a Paddle message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Paddle
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Paddle} Paddle
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Paddle.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Paddle message.
     * @function verify
     * @memberof Paddle
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Paddle.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.xPx != null && message.hasOwnProperty("xPx")) if (typeof message.xPx !== "number") return "xPx: number expected";
        if (message.yPx != null && message.hasOwnProperty("yPx")) if (typeof message.yPx !== "number") return "yPx: number expected";
        if (message.widthPx != null && message.hasOwnProperty("widthPx")) if (typeof message.widthPx !== "number") return "widthPx: number expected";
        if (message.heightPx != null && message.hasOwnProperty("heightPx")) if (typeof message.heightPx !== "number") return "heightPx: number expected";
        if (message.canMove != null && message.hasOwnProperty("canMove")) if (typeof message.canMove !== "boolean") return "canMove: boolean expected";
        return null;
    };

    /**
     * Creates a Paddle message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Paddle
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Paddle} Paddle
     */
    Paddle.fromObject = function fromObject(object) {
        if (object instanceof $root.Paddle) return object;
        var message = new $root.Paddle();
        if (object.xPx != null) message.xPx = Number(object.xPx);
        if (object.yPx != null) message.yPx = Number(object.yPx);
        if (object.widthPx != null) message.widthPx = Number(object.widthPx);
        if (object.heightPx != null) message.heightPx = Number(object.heightPx);
        if (object.canMove != null) message.canMove = Boolean(object.canMove);
        return message;
    };

    /**
     * Creates a plain object from a Paddle message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Paddle
     * @static
     * @param {Paddle} message Paddle
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Paddle.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            object.xPx = 0;
            object.yPx = 0;
            object.widthPx = 0;
            object.heightPx = 0;
            object.canMove = false;
        }
        if (message.xPx != null && message.hasOwnProperty("xPx")) object.xPx = options.json && !isFinite(message.xPx) ? String(message.xPx) : message.xPx;
        if (message.yPx != null && message.hasOwnProperty("yPx")) object.yPx = options.json && !isFinite(message.yPx) ? String(message.yPx) : message.yPx;
        if (message.widthPx != null && message.hasOwnProperty("widthPx")) object.widthPx = options.json && !isFinite(message.widthPx) ? String(message.widthPx) : message.widthPx;
        if (message.heightPx != null && message.hasOwnProperty("heightPx")) object.heightPx = options.json && !isFinite(message.heightPx) ? String(message.heightPx) : message.heightPx;
        if (message.canMove != null && message.hasOwnProperty("canMove")) object.canMove = message.canMove;
        return object;
    };

    /**
     * Converts this Paddle to JSON.
     * @function toJSON
     * @memberof Paddle
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Paddle.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Paddle;
}();

var Arrow = exports.Arrow = $root.Arrow = function () {

    /**
     * Properties of an Arrow.
     * @exports IArrow
     * @interface IArrow
     * @property {number|null} [xPx] Arrow xPx
     * @property {number|null} [yPx] Arrow yPx
     * @property {number|null} [angularVelocityXM] Arrow angularVelocityXM
     * @property {number|null} [angularVelocityYM] Arrow angularVelocityYM
     * @property {number|null} [rotation] Arrow rotation
     * @property {boolean|null} [ready] Arrow ready
     * @property {boolean|null} [reversed] Arrow reversed
     */

    /**
     * Constructs a new Arrow.
     * @exports Arrow
     * @classdesc Represents an Arrow.
     * @implements IArrow
     * @constructor
     * @param {IArrow=} [properties] Properties to set
     */
    function Arrow(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * Arrow xPx.
     * @member {number} xPx
     * @memberof Arrow
     * @instance
     */
    Arrow.prototype.xPx = 0;

    /**
     * Arrow yPx.
     * @member {number} yPx
     * @memberof Arrow
     * @instance
     */
    Arrow.prototype.yPx = 0;

    /**
     * Arrow angularVelocityXM.
     * @member {number} angularVelocityXM
     * @memberof Arrow
     * @instance
     */
    Arrow.prototype.angularVelocityXM = 0;

    /**
     * Arrow angularVelocityYM.
     * @member {number} angularVelocityYM
     * @memberof Arrow
     * @instance
     */
    Arrow.prototype.angularVelocityYM = 0;

    /**
     * Arrow rotation.
     * @member {number} rotation
     * @memberof Arrow
     * @instance
     */
    Arrow.prototype.rotation = 0;

    /**
     * Arrow ready.
     * @member {boolean} ready
     * @memberof Arrow
     * @instance
     */
    Arrow.prototype.ready = false;

    /**
     * Arrow reversed.
     * @member {boolean} reversed
     * @memberof Arrow
     * @instance
     */
    Arrow.prototype.reversed = false;

    /**
     * Creates a new Arrow instance using the specified properties.
     * @function create
     * @memberof Arrow
     * @static
     * @param {IArrow=} [properties] Properties to set
     * @returns {Arrow} Arrow instance
     */
    Arrow.create = function create(properties) {
        return new Arrow(properties);
    };

    /**
     * Encodes the specified Arrow message. Does not implicitly {@link Arrow.verify|verify} messages.
     * @function encode
     * @memberof Arrow
     * @static
     * @param {IArrow} message Arrow message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Arrow.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.xPx != null && message.hasOwnProperty("xPx")) writer.uint32( /* id 1, wireType 5 =*/13).float(message.xPx);
        if (message.yPx != null && message.hasOwnProperty("yPx")) writer.uint32( /* id 2, wireType 5 =*/21).float(message.yPx);
        if (message.angularVelocityXM != null && message.hasOwnProperty("angularVelocityXM")) writer.uint32( /* id 3, wireType 5 =*/29).float(message.angularVelocityXM);
        if (message.angularVelocityYM != null && message.hasOwnProperty("angularVelocityYM")) writer.uint32( /* id 4, wireType 5 =*/37).float(message.angularVelocityYM);
        if (message.rotation != null && message.hasOwnProperty("rotation")) writer.uint32( /* id 5, wireType 5 =*/45).float(message.rotation);
        if (message.ready != null && message.hasOwnProperty("ready")) writer.uint32( /* id 6, wireType 0 =*/48).bool(message.ready);
        if (message.reversed != null && message.hasOwnProperty("reversed")) writer.uint32( /* id 7, wireType 0 =*/56).bool(message.reversed);
        return writer;
    };

    /**
     * Encodes the specified Arrow message, length delimited. Does not implicitly {@link Arrow.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Arrow
     * @static
     * @param {IArrow} message Arrow message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Arrow.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Arrow message from the specified reader or buffer.
     * @function decode
     * @memberof Arrow
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Arrow} Arrow
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Arrow.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.Arrow();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.xPx = reader.float();
                    break;
                case 2:
                    message.yPx = reader.float();
                    break;
                case 3:
                    message.angularVelocityXM = reader.float();
                    break;
                case 4:
                    message.angularVelocityYM = reader.float();
                    break;
                case 5:
                    message.rotation = reader.float();
                    break;
                case 6:
                    message.ready = reader.bool();
                    break;
                case 7:
                    message.reversed = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes an Arrow message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Arrow
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Arrow} Arrow
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Arrow.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Arrow message.
     * @function verify
     * @memberof Arrow
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Arrow.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.xPx != null && message.hasOwnProperty("xPx")) if (typeof message.xPx !== "number") return "xPx: number expected";
        if (message.yPx != null && message.hasOwnProperty("yPx")) if (typeof message.yPx !== "number") return "yPx: number expected";
        if (message.angularVelocityXM != null && message.hasOwnProperty("angularVelocityXM")) if (typeof message.angularVelocityXM !== "number") return "angularVelocityXM: number expected";
        if (message.angularVelocityYM != null && message.hasOwnProperty("angularVelocityYM")) if (typeof message.angularVelocityYM !== "number") return "angularVelocityYM: number expected";
        if (message.rotation != null && message.hasOwnProperty("rotation")) if (typeof message.rotation !== "number") return "rotation: number expected";
        if (message.ready != null && message.hasOwnProperty("ready")) if (typeof message.ready !== "boolean") return "ready: boolean expected";
        if (message.reversed != null && message.hasOwnProperty("reversed")) if (typeof message.reversed !== "boolean") return "reversed: boolean expected";
        return null;
    };

    /**
     * Creates an Arrow message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Arrow
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Arrow} Arrow
     */
    Arrow.fromObject = function fromObject(object) {
        if (object instanceof $root.Arrow) return object;
        var message = new $root.Arrow();
        if (object.xPx != null) message.xPx = Number(object.xPx);
        if (object.yPx != null) message.yPx = Number(object.yPx);
        if (object.angularVelocityXM != null) message.angularVelocityXM = Number(object.angularVelocityXM);
        if (object.angularVelocityYM != null) message.angularVelocityYM = Number(object.angularVelocityYM);
        if (object.rotation != null) message.rotation = Number(object.rotation);
        if (object.ready != null) message.ready = Boolean(object.ready);
        if (object.reversed != null) message.reversed = Boolean(object.reversed);
        return message;
    };

    /**
     * Creates a plain object from an Arrow message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Arrow
     * @static
     * @param {Arrow} message Arrow
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Arrow.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            object.xPx = 0;
            object.yPx = 0;
            object.angularVelocityXM = 0;
            object.angularVelocityYM = 0;
            object.rotation = 0;
            object.ready = false;
            object.reversed = false;
        }
        if (message.xPx != null && message.hasOwnProperty("xPx")) object.xPx = options.json && !isFinite(message.xPx) ? String(message.xPx) : message.xPx;
        if (message.yPx != null && message.hasOwnProperty("yPx")) object.yPx = options.json && !isFinite(message.yPx) ? String(message.yPx) : message.yPx;
        if (message.angularVelocityXM != null && message.hasOwnProperty("angularVelocityXM")) object.angularVelocityXM = options.json && !isFinite(message.angularVelocityXM) ? String(message.angularVelocityXM) : message.angularVelocityXM;
        if (message.angularVelocityYM != null && message.hasOwnProperty("angularVelocityYM")) object.angularVelocityYM = options.json && !isFinite(message.angularVelocityYM) ? String(message.angularVelocityYM) : message.angularVelocityYM;
        if (message.rotation != null && message.hasOwnProperty("rotation")) object.rotation = options.json && !isFinite(message.rotation) ? String(message.rotation) : message.rotation;
        if (message.ready != null && message.hasOwnProperty("ready")) object.ready = message.ready;
        if (message.reversed != null && message.hasOwnProperty("reversed")) object.reversed = message.reversed;
        return object;
    };

    /**
     * Converts this Arrow to JSON.
     * @function toJSON
     * @memberof Arrow
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Arrow.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Arrow;
}();

var Brick = exports.Brick = $root.Brick = function () {

    /**
     * Properties of a Brick.
     * @exports IBrick
     * @interface IBrick
     * @property {number|null} [xPx] Brick xPx
     * @property {number|null} [yPx] Brick yPx
     * @property {number|null} [widthPx] Brick widthPx
     * @property {number|null} [heightPx] Brick heightPx
     * @property {number|null} [lives] Brick lives
     */

    /**
     * Constructs a new Brick.
     * @exports Brick
     * @classdesc Represents a Brick.
     * @implements IBrick
     * @constructor
     * @param {IBrick=} [properties] Properties to set
     */
    function Brick(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * Brick xPx.
     * @member {number} xPx
     * @memberof Brick
     * @instance
     */
    Brick.prototype.xPx = 0;

    /**
     * Brick yPx.
     * @member {number} yPx
     * @memberof Brick
     * @instance
     */
    Brick.prototype.yPx = 0;

    /**
     * Brick widthPx.
     * @member {number} widthPx
     * @memberof Brick
     * @instance
     */
    Brick.prototype.widthPx = 0;

    /**
     * Brick heightPx.
     * @member {number} heightPx
     * @memberof Brick
     * @instance
     */
    Brick.prototype.heightPx = 0;

    /**
     * Brick lives.
     * @member {number} lives
     * @memberof Brick
     * @instance
     */
    Brick.prototype.lives = 0;

    /**
     * Creates a new Brick instance using the specified properties.
     * @function create
     * @memberof Brick
     * @static
     * @param {IBrick=} [properties] Properties to set
     * @returns {Brick} Brick instance
     */
    Brick.create = function create(properties) {
        return new Brick(properties);
    };

    /**
     * Encodes the specified Brick message. Does not implicitly {@link Brick.verify|verify} messages.
     * @function encode
     * @memberof Brick
     * @static
     * @param {IBrick} message Brick message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Brick.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.xPx != null && message.hasOwnProperty("xPx")) writer.uint32( /* id 1, wireType 5 =*/13).float(message.xPx);
        if (message.yPx != null && message.hasOwnProperty("yPx")) writer.uint32( /* id 2, wireType 5 =*/21).float(message.yPx);
        if (message.widthPx != null && message.hasOwnProperty("widthPx")) writer.uint32( /* id 3, wireType 5 =*/29).float(message.widthPx);
        if (message.heightPx != null && message.hasOwnProperty("heightPx")) writer.uint32( /* id 4, wireType 5 =*/37).float(message.heightPx);
        if (message.lives != null && message.hasOwnProperty("lives")) writer.uint32( /* id 5, wireType 0 =*/40).uint32(message.lives);
        return writer;
    };

    /**
     * Encodes the specified Brick message, length delimited. Does not implicitly {@link Brick.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Brick
     * @static
     * @param {IBrick} message Brick message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Brick.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Brick message from the specified reader or buffer.
     * @function decode
     * @memberof Brick
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Brick} Brick
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Brick.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.Brick();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.xPx = reader.float();
                    break;
                case 2:
                    message.yPx = reader.float();
                    break;
                case 3:
                    message.widthPx = reader.float();
                    break;
                case 4:
                    message.heightPx = reader.float();
                    break;
                case 5:
                    message.lives = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a Brick message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Brick
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Brick} Brick
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Brick.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Brick message.
     * @function verify
     * @memberof Brick
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Brick.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.xPx != null && message.hasOwnProperty("xPx")) if (typeof message.xPx !== "number") return "xPx: number expected";
        if (message.yPx != null && message.hasOwnProperty("yPx")) if (typeof message.yPx !== "number") return "yPx: number expected";
        if (message.widthPx != null && message.hasOwnProperty("widthPx")) if (typeof message.widthPx !== "number") return "widthPx: number expected";
        if (message.heightPx != null && message.hasOwnProperty("heightPx")) if (typeof message.heightPx !== "number") return "heightPx: number expected";
        if (message.lives != null && message.hasOwnProperty("lives")) if (!$util.isInteger(message.lives)) return "lives: integer expected";
        return null;
    };

    /**
     * Creates a Brick message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Brick
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Brick} Brick
     */
    Brick.fromObject = function fromObject(object) {
        if (object instanceof $root.Brick) return object;
        var message = new $root.Brick();
        if (object.xPx != null) message.xPx = Number(object.xPx);
        if (object.yPx != null) message.yPx = Number(object.yPx);
        if (object.widthPx != null) message.widthPx = Number(object.widthPx);
        if (object.heightPx != null) message.heightPx = Number(object.heightPx);
        if (object.lives != null) message.lives = object.lives >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a Brick message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Brick
     * @static
     * @param {Brick} message Brick
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Brick.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            object.xPx = 0;
            object.yPx = 0;
            object.widthPx = 0;
            object.heightPx = 0;
            object.lives = 0;
        }
        if (message.xPx != null && message.hasOwnProperty("xPx")) object.xPx = options.json && !isFinite(message.xPx) ? String(message.xPx) : message.xPx;
        if (message.yPx != null && message.hasOwnProperty("yPx")) object.yPx = options.json && !isFinite(message.yPx) ? String(message.yPx) : message.yPx;
        if (message.widthPx != null && message.hasOwnProperty("widthPx")) object.widthPx = options.json && !isFinite(message.widthPx) ? String(message.widthPx) : message.widthPx;
        if (message.heightPx != null && message.hasOwnProperty("heightPx")) object.heightPx = options.json && !isFinite(message.heightPx) ? String(message.heightPx) : message.heightPx;
        if (message.lives != null && message.hasOwnProperty("lives")) object.lives = message.lives;
        return object;
    };

    /**
     * Converts this Brick to JSON.
     * @function toJSON
     * @memberof Brick
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Brick.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Brick;
}();

/**
 * Action enum.
 * @exports Action
 * @enum {string}
 * @property {number} LEFT=0 LEFT value
 * @property {number} RIGHT=1 RIGHT value
 * @property {number} SPACE=2 SPACE value
 * @property {number} HOLD=3 HOLD value
 */
$root.Action = function () {
    var valuesById = {},
        values = Object.create(valuesById);
    values[valuesById[0] = "LEFT"] = 0;
    values[valuesById[1] = "RIGHT"] = 1;
    values[valuesById[2] = "SPACE"] = 2;
    values[valuesById[3] = "HOLD"] = 3;
    return values;
}();

var Request = exports.Request = $root.Request = function () {

    /**
     * Properties of a Request.
     * @exports IRequest
     * @interface IRequest
     * @property {number|null} [frameRate] Request frameRate
     * @property {number|null} [numEpochs] Request numEpochs
     * @property {boolean|null} [movie] Request movie
     */

    /**
     * Constructs a new Request.
     * @exports Request
     * @classdesc Represents a Request.
     * @implements IRequest
     * @constructor
     * @param {IRequest=} [properties] Properties to set
     */
    function Request(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * Request frameRate.
     * @member {number} frameRate
     * @memberof Request
     * @instance
     */
    Request.prototype.frameRate = 0;

    /**
     * Request numEpochs.
     * @member {number} numEpochs
     * @memberof Request
     * @instance
     */
    Request.prototype.numEpochs = 0;

    /**
     * Request movie.
     * @member {boolean} movie
     * @memberof Request
     * @instance
     */
    Request.prototype.movie = false;

    /**
     * Creates a new Request instance using the specified properties.
     * @function create
     * @memberof Request
     * @static
     * @param {IRequest=} [properties] Properties to set
     * @returns {Request} Request instance
     */
    Request.create = function create(properties) {
        return new Request(properties);
    };

    /**
     * Encodes the specified Request message. Does not implicitly {@link Request.verify|verify} messages.
     * @function encode
     * @memberof Request
     * @static
     * @param {IRequest} message Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Request.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.frameRate != null && message.hasOwnProperty("frameRate")) writer.uint32( /* id 1, wireType 5 =*/13).float(message.frameRate);
        if (message.numEpochs != null && message.hasOwnProperty("numEpochs")) writer.uint32( /* id 2, wireType 0 =*/16).int32(message.numEpochs);
        if (message.movie != null && message.hasOwnProperty("movie")) writer.uint32( /* id 3, wireType 0 =*/24).bool(message.movie);
        return writer;
    };

    /**
     * Encodes the specified Request message, length delimited. Does not implicitly {@link Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Request
     * @static
     * @param {IRequest} message Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Request message from the specified reader or buffer.
     * @function decode
     * @memberof Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Request} Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.Request();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.frameRate = reader.float();
                    break;
                case 2:
                    message.numEpochs = reader.int32();
                    break;
                case 3:
                    message.movie = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Request} Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Request message.
     * @function verify
     * @memberof Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Request.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.frameRate != null && message.hasOwnProperty("frameRate")) if (typeof message.frameRate !== "number") return "frameRate: number expected";
        if (message.numEpochs != null && message.hasOwnProperty("numEpochs")) if (!$util.isInteger(message.numEpochs)) return "numEpochs: integer expected";
        if (message.movie != null && message.hasOwnProperty("movie")) if (typeof message.movie !== "boolean") return "movie: boolean expected";
        return null;
    };

    /**
     * Creates a Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Request} Request
     */
    Request.fromObject = function fromObject(object) {
        if (object instanceof $root.Request) return object;
        var message = new $root.Request();
        if (object.frameRate != null) message.frameRate = Number(object.frameRate);
        if (object.numEpochs != null) message.numEpochs = object.numEpochs | 0;
        if (object.movie != null) message.movie = Boolean(object.movie);
        return message;
    };

    /**
     * Creates a plain object from a Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Request
     * @static
     * @param {Request} message Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Request.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            object.frameRate = 0;
            object.numEpochs = 0;
            object.movie = false;
        }
        if (message.frameRate != null && message.hasOwnProperty("frameRate")) object.frameRate = options.json && !isFinite(message.frameRate) ? String(message.frameRate) : message.frameRate;
        if (message.numEpochs != null && message.hasOwnProperty("numEpochs")) object.numEpochs = message.numEpochs;
        if (message.movie != null && message.hasOwnProperty("movie")) object.movie = message.movie;
        return object;
    };

    /**
     * Converts this Request to JSON.
     * @function toJSON
     * @memberof Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Request;
}();

var Physics = exports.Physics = $root.Physics = function () {

    /**
     * Properties of a Physics.
     * @exports IPhysics
     * @interface IPhysics
     * @property {string|null} [target] Physics target
     */

    /**
     * Constructs a new Physics.
     * @exports Physics
     * @classdesc Represents a Physics.
     * @implements IPhysics
     * @constructor
     * @param {IPhysics=} [properties] Properties to set
     */
    function Physics(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * Physics target.
     * @member {string} target
     * @memberof Physics
     * @instance
     */
    Physics.prototype.target = "";

    /**
     * Creates a new Physics instance using the specified properties.
     * @function create
     * @memberof Physics
     * @static
     * @param {IPhysics=} [properties] Properties to set
     * @returns {Physics} Physics instance
     */
    Physics.create = function create(properties) {
        return new Physics(properties);
    };

    /**
     * Encodes the specified Physics message. Does not implicitly {@link Physics.verify|verify} messages.
     * @function encode
     * @memberof Physics
     * @static
     * @param {IPhysics} message Physics message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Physics.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.target != null && message.hasOwnProperty("target")) writer.uint32( /* id 1, wireType 2 =*/10).string(message.target);
        return writer;
    };

    /**
     * Encodes the specified Physics message, length delimited. Does not implicitly {@link Physics.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Physics
     * @static
     * @param {IPhysics} message Physics message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Physics.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Physics message from the specified reader or buffer.
     * @function decode
     * @memberof Physics
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Physics} Physics
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Physics.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.Physics();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.target = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a Physics message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Physics
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Physics} Physics
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Physics.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Physics message.
     * @function verify
     * @memberof Physics
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Physics.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.target != null && message.hasOwnProperty("target")) if (!$util.isString(message.target)) return "target: string expected";
        return null;
    };

    /**
     * Creates a Physics message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Physics
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Physics} Physics
     */
    Physics.fromObject = function fromObject(object) {
        if (object instanceof $root.Physics) return object;
        var message = new $root.Physics();
        if (object.target != null) message.target = String(object.target);
        return message;
    };

    /**
     * Creates a plain object from a Physics message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Physics
     * @static
     * @param {Physics} message Physics
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Physics.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) object.target = "";
        if (message.target != null && message.hasOwnProperty("target")) object.target = message.target;
        return object;
    };

    /**
     * Converts this Physics to JSON.
     * @function toJSON
     * @memberof Physics
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Physics.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Physics;
}();

exports.default = $root;
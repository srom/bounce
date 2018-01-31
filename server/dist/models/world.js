'use strict';

/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.World');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.Ball');
goog.require('proto.Brick');
goog.require('proto.Paddle');

goog.forwardDeclare('proto.Action');

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.World = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.World.repeatedFields_, null);
};
goog.inherits(proto.World, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.World.displayName = 'proto.World';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.World.repeatedFields_ = [3];

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto suitable for use in Soy templates.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
   * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
   *     for transitional soy proto support: http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.World.prototype.toObject = function (opt_includeInstance) {
    return proto.World.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Whether to include the JSPB
   *     instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.World} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.World.toObject = function (includeInstance, msg) {
    var f,
        obj = {
      ball: (f = msg.getBall()) && proto.Ball.toObject(includeInstance, f),
      paddle: (f = msg.getPaddle()) && proto.Paddle.toObject(includeInstance, f),
      bricksList: jspb.Message.toObjectList(msg.getBricksList(), proto.Brick.toObject, includeInstance),
      action: jspb.Message.getFieldWithDefault(msg, 4, 0),
      won: jspb.Message.getFieldWithDefault(msg, 5, false),
      lost: jspb.Message.getFieldWithDefault(msg, 6, false)
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.World}
 */
proto.World.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.World();
  return proto.World.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.World} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.World}
 */
proto.World.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = new proto.Ball();
        reader.readMessage(value, proto.Ball.deserializeBinaryFromReader);
        msg.setBall(value);
        break;
      case 2:
        var value = new proto.Paddle();
        reader.readMessage(value, proto.Paddle.deserializeBinaryFromReader);
        msg.setPaddle(value);
        break;
      case 3:
        var value = new proto.Brick();
        reader.readMessage(value, proto.Brick.deserializeBinaryFromReader);
        msg.addBricks(value);
        break;
      case 4:
        var value = /** @type {!proto.Action} */reader.readEnum();
        msg.setAction(value);
        break;
      case 5:
        var value = /** @type {boolean} */reader.readBool();
        msg.setWon(value);
        break;
      case 6:
        var value = /** @type {boolean} */reader.readBool();
        msg.setLost(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.World.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.World.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.World} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.World.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getBall();
  if (f != null) {
    writer.writeMessage(1, f, proto.Ball.serializeBinaryToWriter);
  }
  f = message.getPaddle();
  if (f != null) {
    writer.writeMessage(2, f, proto.Paddle.serializeBinaryToWriter);
  }
  f = message.getBricksList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(3, f, proto.Brick.serializeBinaryToWriter);
  }
  f = message.getAction();
  if (f !== 0.0) {
    writer.writeEnum(4, f);
  }
  f = message.getWon();
  if (f) {
    writer.writeBool(5, f);
  }
  f = message.getLost();
  if (f) {
    writer.writeBool(6, f);
  }
};

/**
 * optional Ball ball = 1;
 * @return {?proto.Ball}
 */
proto.World.prototype.getBall = function () {
  return (/** @type{?proto.Ball} */jspb.Message.getWrapperField(this, proto.Ball, 1)
  );
};

/** @param {?proto.Ball|undefined} value */
proto.World.prototype.setBall = function (value) {
  jspb.Message.setWrapperField(this, 1, value);
};

proto.World.prototype.clearBall = function () {
  this.setBall(undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.World.prototype.hasBall = function () {
  return jspb.Message.getField(this, 1) != null;
};

/**
 * optional Paddle paddle = 2;
 * @return {?proto.Paddle}
 */
proto.World.prototype.getPaddle = function () {
  return (/** @type{?proto.Paddle} */jspb.Message.getWrapperField(this, proto.Paddle, 2)
  );
};

/** @param {?proto.Paddle|undefined} value */
proto.World.prototype.setPaddle = function (value) {
  jspb.Message.setWrapperField(this, 2, value);
};

proto.World.prototype.clearPaddle = function () {
  this.setPaddle(undefined);
};

/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.World.prototype.hasPaddle = function () {
  return jspb.Message.getField(this, 2) != null;
};

/**
 * repeated Brick bricks = 3;
 * @return {!Array.<!proto.Brick>}
 */
proto.World.prototype.getBricksList = function () {
  return (/** @type{!Array.<!proto.Brick>} */jspb.Message.getRepeatedWrapperField(this, proto.Brick, 3)
  );
};

/** @param {!Array.<!proto.Brick>} value */
proto.World.prototype.setBricksList = function (value) {
  jspb.Message.setRepeatedWrapperField(this, 3, value);
};

/**
 * @param {!proto.Brick=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Brick}
 */
proto.World.prototype.addBricks = function (opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.Brick, opt_index);
};

proto.World.prototype.clearBricksList = function () {
  this.setBricksList([]);
};

/**
 * optional Action action = 4;
 * @return {!proto.Action}
 */
proto.World.prototype.getAction = function () {
  return (/** @type {!proto.Action} */jspb.Message.getFieldWithDefault(this, 4, 0)
  );
};

/** @param {!proto.Action} value */
proto.World.prototype.setAction = function (value) {
  jspb.Message.setField(this, 4, value);
};

/**
 * optional bool won = 5;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.World.prototype.getWon = function () {
  return (/** @type {boolean} */jspb.Message.getFieldWithDefault(this, 5, false)
  );
};

/** @param {boolean} value */
proto.World.prototype.setWon = function (value) {
  jspb.Message.setField(this, 5, value);
};

/**
 * optional bool lost = 6;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.World.prototype.getLost = function () {
  return (/** @type {boolean} */jspb.Message.getFieldWithDefault(this, 6, false)
  );
};

/** @param {boolean} value */
proto.World.prototype.setLost = function (value) {
  jspb.Message.setField(this, 6, value);
};
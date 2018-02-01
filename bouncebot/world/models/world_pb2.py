# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: world.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf.internal import enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
from google.protobuf import descriptor_pb2
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='world.proto',
  package='',
  syntax='proto3',
  serialized_pb=_b('\n\x0bworld.proto\"\xdb\x01\n\x05World\x12\x13\n\x04\x62\x61ll\x18\x01 \x01(\x0b\x32\x05.Ball\x12\x17\n\x06paddle\x18\x02 \x01(\x0b\x32\x07.Paddle\x12\x15\n\x05\x61rrow\x18\x03 \x01(\x0b\x32\x06.Arrow\x12\x16\n\x06\x62ricks\x18\x04 \x03(\x0b\x32\x06.Brick\x12\x17\n\x06\x61\x63tion\x18\x05 \x01(\x0e\x32\x07.Action\x12\x0b\n\x03won\x18\x06 \x01(\x08\x12\x0c\n\x04lost\x18\x07 \x01(\x08\x12\x10\n\x08\x66rame_nb\x18\x08 \x01(\x05\x12\x14\n\x0cpre_frame_nb\x18\t \x01(\x05\x12\x19\n\x07request\x18\n \x01(\x0b\x32\x08.Request\"\xa1\x01\n\x04\x42\x61ll\x12\x0c\n\x04x_px\x18\x01 \x01(\x02\x12\x0c\n\x04y_px\x18\x02 \x01(\x02\x12\x11\n\tradius_px\x18\x03 \x01(\x02\x12\x1b\n\x13linear_velocity_x_m\x18\x04 \x01(\x02\x12\x1b\n\x13linear_velocity_y_m\x18\x05 \x01(\x02\x12\x10\n\x08\x63\x61n_move\x18\x06 \x01(\x08\x12\x10\n\x08\x62ouncing\x18\x07 \x01(\x08\x12\x0c\n\x04\x64\x65\x61\x64\x18\x08 \x01(\x08\"[\n\x06Paddle\x12\x0c\n\x04x_px\x18\x01 \x01(\x02\x12\x0c\n\x04y_px\x18\x02 \x01(\x02\x12\x10\n\x08width_px\x18\x03 \x01(\x02\x12\x11\n\theight_px\x18\x04 \x01(\x02\x12\x10\n\x08\x63\x61n_move\x18\x05 \x01(\x08\"\x92\x01\n\x05\x41rrow\x12\x0c\n\x04x_px\x18\x01 \x01(\x02\x12\x0c\n\x04y_px\x18\x02 \x01(\x02\x12\x1c\n\x14\x61ngular_velocity_x_m\x18\x03 \x01(\x02\x12\x1c\n\x14\x61ngular_velocity_y_m\x18\x04 \x01(\x02\x12\x10\n\x08rotation\x18\x05 \x01(\x02\x12\r\n\x05ready\x18\x06 \x01(\x08\x12\x10\n\x08reversed\x18\x07 \x01(\x08\"W\n\x05\x42rick\x12\x0c\n\x04x_px\x18\x01 \x01(\x02\x12\x0c\n\x04y_px\x18\x02 \x01(\x02\x12\x10\n\x08width_px\x18\x03 \x01(\x02\x12\x11\n\theight_px\x18\x04 \x01(\x02\x12\r\n\x05lives\x18\x05 \x01(\r\"1\n\x07Request\x12\x12\n\nframe_rate\x18\x01 \x01(\x02\x12\x12\n\nnum_epochs\x18\x02 \x01(\x05*2\n\x06\x41\x63tion\x12\x08\n\x04LEFT\x10\x00\x12\t\n\x05RIGHT\x10\x01\x12\t\n\x05SPACE\x10\x02\x12\x08\n\x04HOLD\x10\x03\x62\x06proto3')
)

_ACTION = _descriptor.EnumDescriptor(
  name='Action',
  full_name='Action',
  filename=None,
  file=DESCRIPTOR,
  values=[
    _descriptor.EnumValueDescriptor(
      name='LEFT', index=0, number=0,
      options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='RIGHT', index=1, number=1,
      options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='SPACE', index=2, number=2,
      options=None,
      type=None),
    _descriptor.EnumValueDescriptor(
      name='HOLD', index=3, number=3,
      options=None,
      type=None),
  ],
  containing_type=None,
  options=None,
  serialized_start=783,
  serialized_end=833,
)
_sym_db.RegisterEnumDescriptor(_ACTION)

Action = enum_type_wrapper.EnumTypeWrapper(_ACTION)
LEFT = 0
RIGHT = 1
SPACE = 2
HOLD = 3



_WORLD = _descriptor.Descriptor(
  name='World',
  full_name='World',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='ball', full_name='World.ball', index=0,
      number=1, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='paddle', full_name='World.paddle', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='arrow', full_name='World.arrow', index=2,
      number=3, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='bricks', full_name='World.bricks', index=3,
      number=4, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='action', full_name='World.action', index=4,
      number=5, type=14, cpp_type=8, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='won', full_name='World.won', index=5,
      number=6, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='lost', full_name='World.lost', index=6,
      number=7, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='frame_nb', full_name='World.frame_nb', index=7,
      number=8, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='pre_frame_nb', full_name='World.pre_frame_nb', index=8,
      number=9, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='request', full_name='World.request', index=9,
      number=10, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=16,
  serialized_end=235,
)


_BALL = _descriptor.Descriptor(
  name='Ball',
  full_name='Ball',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='x_px', full_name='Ball.x_px', index=0,
      number=1, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='y_px', full_name='Ball.y_px', index=1,
      number=2, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='radius_px', full_name='Ball.radius_px', index=2,
      number=3, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='linear_velocity_x_m', full_name='Ball.linear_velocity_x_m', index=3,
      number=4, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='linear_velocity_y_m', full_name='Ball.linear_velocity_y_m', index=4,
      number=5, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='can_move', full_name='Ball.can_move', index=5,
      number=6, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='bouncing', full_name='Ball.bouncing', index=6,
      number=7, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='dead', full_name='Ball.dead', index=7,
      number=8, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=238,
  serialized_end=399,
)


_PADDLE = _descriptor.Descriptor(
  name='Paddle',
  full_name='Paddle',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='x_px', full_name='Paddle.x_px', index=0,
      number=1, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='y_px', full_name='Paddle.y_px', index=1,
      number=2, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='width_px', full_name='Paddle.width_px', index=2,
      number=3, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='height_px', full_name='Paddle.height_px', index=3,
      number=4, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='can_move', full_name='Paddle.can_move', index=4,
      number=5, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=401,
  serialized_end=492,
)


_ARROW = _descriptor.Descriptor(
  name='Arrow',
  full_name='Arrow',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='x_px', full_name='Arrow.x_px', index=0,
      number=1, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='y_px', full_name='Arrow.y_px', index=1,
      number=2, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='angular_velocity_x_m', full_name='Arrow.angular_velocity_x_m', index=2,
      number=3, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='angular_velocity_y_m', full_name='Arrow.angular_velocity_y_m', index=3,
      number=4, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='rotation', full_name='Arrow.rotation', index=4,
      number=5, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='ready', full_name='Arrow.ready', index=5,
      number=6, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='reversed', full_name='Arrow.reversed', index=6,
      number=7, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=495,
  serialized_end=641,
)


_BRICK = _descriptor.Descriptor(
  name='Brick',
  full_name='Brick',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='x_px', full_name='Brick.x_px', index=0,
      number=1, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='y_px', full_name='Brick.y_px', index=1,
      number=2, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='width_px', full_name='Brick.width_px', index=2,
      number=3, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='height_px', full_name='Brick.height_px', index=3,
      number=4, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='lives', full_name='Brick.lives', index=4,
      number=5, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=643,
  serialized_end=730,
)


_REQUEST = _descriptor.Descriptor(
  name='Request',
  full_name='Request',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='frame_rate', full_name='Request.frame_rate', index=0,
      number=1, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='num_epochs', full_name='Request.num_epochs', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=732,
  serialized_end=781,
)

_WORLD.fields_by_name['ball'].message_type = _BALL
_WORLD.fields_by_name['paddle'].message_type = _PADDLE
_WORLD.fields_by_name['arrow'].message_type = _ARROW
_WORLD.fields_by_name['bricks'].message_type = _BRICK
_WORLD.fields_by_name['action'].enum_type = _ACTION
_WORLD.fields_by_name['request'].message_type = _REQUEST
DESCRIPTOR.message_types_by_name['World'] = _WORLD
DESCRIPTOR.message_types_by_name['Ball'] = _BALL
DESCRIPTOR.message_types_by_name['Paddle'] = _PADDLE
DESCRIPTOR.message_types_by_name['Arrow'] = _ARROW
DESCRIPTOR.message_types_by_name['Brick'] = _BRICK
DESCRIPTOR.message_types_by_name['Request'] = _REQUEST
DESCRIPTOR.enum_types_by_name['Action'] = _ACTION
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

World = _reflection.GeneratedProtocolMessageType('World', (_message.Message,), dict(
  DESCRIPTOR = _WORLD,
  __module__ = 'world_pb2'
  # @@protoc_insertion_point(class_scope:World)
  ))
_sym_db.RegisterMessage(World)

Ball = _reflection.GeneratedProtocolMessageType('Ball', (_message.Message,), dict(
  DESCRIPTOR = _BALL,
  __module__ = 'world_pb2'
  # @@protoc_insertion_point(class_scope:Ball)
  ))
_sym_db.RegisterMessage(Ball)

Paddle = _reflection.GeneratedProtocolMessageType('Paddle', (_message.Message,), dict(
  DESCRIPTOR = _PADDLE,
  __module__ = 'world_pb2'
  # @@protoc_insertion_point(class_scope:Paddle)
  ))
_sym_db.RegisterMessage(Paddle)

Arrow = _reflection.GeneratedProtocolMessageType('Arrow', (_message.Message,), dict(
  DESCRIPTOR = _ARROW,
  __module__ = 'world_pb2'
  # @@protoc_insertion_point(class_scope:Arrow)
  ))
_sym_db.RegisterMessage(Arrow)

Brick = _reflection.GeneratedProtocolMessageType('Brick', (_message.Message,), dict(
  DESCRIPTOR = _BRICK,
  __module__ = 'world_pb2'
  # @@protoc_insertion_point(class_scope:Brick)
  ))
_sym_db.RegisterMessage(Brick)

Request = _reflection.GeneratedProtocolMessageType('Request', (_message.Message,), dict(
  DESCRIPTOR = _REQUEST,
  __module__ = 'world_pb2'
  # @@protoc_insertion_point(class_scope:Request)
  ))
_sym_db.RegisterMessage(Request)


# @@protoc_insertion_point(module_scope)

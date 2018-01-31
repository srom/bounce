'use strict';

var _net = require('net');

var net = _interopRequireWildcard(_net);

var _core = require('./core');

var _world = require('./models/world');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var UNIX_SOCKET = '/tmp/bounce.sock';

var log = function log(who, what) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    console.log('[%s on %s]', who, what, args);
  };
};

var bounce_socket = function bounce_socket(socket) {

  socket.on('data', function (data) {
    // Main logic lives here.

    var inputWorld = (0, _core.parseWorld)(data);

    var outputWorld = null;
    if (!inputWorld) {
      outputWorld = (0, _core.getDefaultWorld)();
    } else {}

    socket.write(_world.World.encode(outputWorld).finish());
  });

  socket.on('error', log('socket', 'error'));
  socket.on('close', log('socket', 'close'));

  socket.pipe(socket);
};

var server = net.createServer(bounce_socket);

server.listen(UNIX_SOCKET);

server.on('listening', function () {
  var ad = server.address();
  if (typeof ad === 'string') {
    console.log('[server on listening] %s', ad);
  } else {
    console.log('[server on listening] %s:%s using %s', ad.address, ad.port, ad.family);
  }
});

server.on('connection', function (socket) {
  server.getConnections(function (err, count) {
    console.log('%d open connections!', count);
  });
});

server.on('close', function () {
  console.log('[server on close]');
});

server.on('err', function (err) {
  console.log(err);
  server.close(function () {
    console.log("shutting down the server!");
  });
});

process.on('SIGINT', function () {
  server.close(function () {
    console.log("shutting down the server!");
  });
});
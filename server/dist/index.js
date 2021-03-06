'use strict';

var _net = require('net');

var net = _interopRequireWildcard(_net);

var _core = require('./core');

var _world = require('./models/world');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var UNIX_SOCKET = '/tmp/bounce.sock';

var bounce_socket = function bounce_socket(socket) {

  socket.on('data', function (data) {
    // Main logic lives here.

    var inputWorld = (0, _core.parseWorld)(data);

    var movie = inputWorld ? inputWorld.request.movie : false;

    var output = null;
    if (!inputWorld) {
      output = (0, _core.getDefaultWorld)();
    } else {
      output = (0, _core.runMainLoop)(inputWorld);
    }

    if (movie) {
      socket.write(_world.Worlds.encode(output).finish());
    } else {
      socket.write(_world.World.encode(output).finish());
    }
  });

  socket.on('error', function () {});
  socket.on('close', function () {});

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

server.on('connection', function (socket) {});

server.on('close', function () {});

server.on('err', function (err) {
  console.log('error');
  server.close(function () {
    console.log("shutting down the server!");
  });
});

process.on('SIGINT', function () {
  server.close(function () {
    console.log("shutting down the server!");
  });
});
'use strict';

var _net = require('net');

var net = _interopRequireWildcard(_net);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var unixSocket = '/tmp/bounce.sock';

var log = function log(who, what) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    console.log('[%s on %s]', who, what, args);
  };
};

var echo = function echo(socket) {
  /**
   *  net.Socket (http://nodejs.org/api/net.html#net_class_net_socket)
   *  events: end, data, end, timeout, drain, error, close
   *  methods:
   */
  socket.on('end', function () {
    // exec'd when socket other end of connection sends FIN packet
    console.log('[socket on end]');
  });
  socket.on('data', function (data) {
    // data is a Buffer object
    console.log('[socket on data]', data);
  });
  socket.on('end', function () {
    // emitted when the other end sends a FIN packet
  });

  socket.on('timeout', log('socket', 'timeout'));

  socket.on('drain', function () {
    // emitted when the write buffer becomes empty
    console.log('[socket on drain]');
  });
  socket.on('error', log('socket', 'error'));
  socket.on('close', log('socket', 'close'));
  socket.pipe(socket);
};

/**
 *  net.Server (http://nodejs.org/api/net.html#net_class_net_server)
 *  events: listening, connections, close, err
 *  methods: listen, address, getConnections,
 */
var server = net.createServer(echo);
server.listen(unixSocket);

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
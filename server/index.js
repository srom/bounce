import * as net from 'net';

import { parseWorld, getDefaultWorld, runMainLoop } from './core';
import { World } from './models/world';


const UNIX_SOCKET = '/tmp/bounce.sock';


const log = function(who, what) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    console.log('[%s on %s]', who, what, args);
  };
};

const bounce_socket = function(socket) {

  socket.on('data', function(data) {
    // Main logic lives here.

    const inputWorld = parseWorld(data);

    let outputWorld = null;
    if (!inputWorld) {
      outputWorld = getDefaultWorld();
    } else {
      outputWorld = runMainLoop(inputWorld);
    }

    socket.write(World.encode(outputWorld).finish())
  });

  socket.on('error', log('socket', 'error'));
  socket.on('close', log('socket', 'close'));

  socket.pipe(socket);
};

const server = net.createServer(bounce_socket);

server.listen(UNIX_SOCKET);

server.on('listening', function() {
  var ad = server.address();
  if (typeof ad === 'string') {
    console.log('[server on listening] %s', ad);
  } else {
    console.log('[server on listening] %s:%s using %s', ad.address, ad.port, ad.family);
  }
});

server.on('connection', function(socket) {
  server.getConnections(function(err, count) {
    console.log('%d open connections!', count);
  });
});

server.on('close', function() { console.log('[server on close]'); });

server.on('err', function(err) {
  console.log(err);
  server.close(function() { console.log("shutting down the server!"); });
});

process.on('SIGINT', function() {
    server.close(function() { console.log("shutting down the server!"); });
});

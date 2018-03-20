import * as net from 'net';

import { parseWorld, getDefaultWorld, runMainLoop } from './core';
import { World, Worlds } from './models/world';


const UNIX_SOCKET = '/tmp/bounce.sock';


const bounce_socket = function(socket) {

  socket.on('data', function(data) {
    // Main logic lives here.

    const inputWorld = parseWorld(data);

    const movie = inputWorld ? inputWorld.request.movie : false;

    let output = null;
    if (!inputWorld) {
      output = getDefaultWorld();
    } else {
      output = runMainLoop(inputWorld);
    }

    if (movie) {
      socket.write(Worlds.encode(output).finish());
    } else {
      socket.write(World.encode(output).finish())
    }
  });

  socket.on('error', function() {});
  socket.on('close', function() {});

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

server.on('connection', function(socket) {});

server.on('close', function() {});

server.on('err', function(err) {
  console.log('error');
  server.close(function() { console.log("shutting down the server!"); });
});

process.on('SIGINT', function() {
    server.close(function() { console.log("shutting down the server!"); });
});

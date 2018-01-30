'use strict';

var http = require('http');

var options = {
  socketPath: '/tmp/bounce/server.sock',
  path: '/volumes/list'
};

var callback = function callback(res) {
  console.log('STATUS: ' + res.statusCode);
  res.setEncoding('utf8');
  res.on('data', function (data) {
    return console.log(data);
  });
  res.on('error', function (data) {
    return console.error(data);
  });
};

var clientRequest = http.request(options, callback);
clientRequest.end();
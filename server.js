const express = require('express');
const Primus = require('primus');
const http = require('http');
const app = express();

const MessageTypes = require('./shared/MessageTypes.js');
const ServerEvents = require('./server/ServerEvents.js');

// var entity = require('./shared/Entity');

const server = http.createServer(app).listen(8000, '0.0.0.0');
const primus = new Primus(server);

primus.plugin('emit', require('primus-emit'));

app.use(express.static(__dirname + '/dist'));

primus.on('connection', function connection(spark) {
  console.log('new connection');

  Object.keys(MessageTypes).forEach((type) => {
    const fn = ServerEvents[type] || function(){};
    spark.on(MessageTypes[type], fn.bind(spark));
  });

  spark.emit(MessageTypes.PLAYER_CONNECT, 'yoyoyo');
});

const express = require('express');
const Primus = require('primus');
const http = require('http');
const app = express();

const server = http.createServer(app).listen(8000, '0.0.0.0');
const primus = new Primus(server, {transformer: 'uws'});
primus.plugin('emit', require('primus-emit'));
app.use(express.static(__dirname + '/../dist'));

const Engine = require('../shared/Engine');
const Systems = require('./systems');

const engine = new Engine();
engine.systems = Systems.map(s => new s({engine, primus}));

setInterval(() => {
  engine.update();
}, 16);

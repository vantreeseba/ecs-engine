const express = require('express');
const Primus = require('primus');
const http = require('http');
const app = express();

const server = http.createServer(app).listen(8000, '0.0.0.0');
const primus = new Primus(server);
primus.plugin('emit', require('primus-emit'));
app.use(express.static(__dirname + '/../dist'));

const Systems = require('./systems');

const systems = Systems.map(s => new s({primus}));
const entities = [];

setInterval(() => {
  systems.forEach(s => s.run(entities));
}, 50);






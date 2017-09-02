const express = require('express');
const Primus = require('primus');
const http = require('http');
const app = express();

const server = http.createServer(app).listen(8000, '0.0.0.0');
const primus = new Primus(server);
primus.plugin('emit', require('primus-emit'));
app.use(express.static(__dirname + '/../dist'));

const Engine = require('../shared/Engine');
const Entity = require('../shared/Entity.js');
const Systems = require('./systems');
const Components = require('./components');

const engine = new Engine();
engine.systems = Systems.map(s => new s({primus}));

const testEntity = new Entity();
engine.entities.push(new Entity());
engine.entities[0].addComponent(new Components.position());
engine.entities[0].addComponent(new Components.physics());
engine.entities[0].components.physics.vel.x = 0.1;

setInterval(() => {
  engine.update();

  // console.log(engine.entities[0].components.position);
}, 50);






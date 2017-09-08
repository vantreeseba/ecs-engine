const Primus = require('primus');
const Engine = require('../shared/Engine');
const Systems = require('./systems');


const primus = Primus.createServer({
  port: 7780,
  transformer: 'uws',
  parser: 'msgpack',
  compression: true,
  iknowhttpsisbetter: true,
});

primus.plugin('emit', require('primus-emit'));

const engine = new Engine();
engine.systems = Systems.map(s => new s({engine, primus}));

setInterval(() => {
  engine.update();
}, 50);

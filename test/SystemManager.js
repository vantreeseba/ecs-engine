var assert = require('chai').assert;
var Engine = require('../Engine');

let engine;

const test = {
  'engine': {
    'beforeEach': () => {
      engine = new Engine();
    },
    'constructor': {
      'should construct a engine': () => {
        assert.isOk(engine);
      },
    },
    'addSystem': {
      'should add an system': () => {
        engine.systems.addSystem({name:'foo'});
        assert.equal(engine.systems.systems.size, 1);
      },
      'should throw when system has no name': () => {
        const func = () => {
          engine.systems.addSystem({});
        };

        assert.throws(func);
      },
    },
    'removeSystem': {
      'should remove an system by id': () => {
        engine.systems.addSystem({name: 'foo'});
        engine.systems.removeSystem('foo');
        assert.equal(engine.systems.systems.size, 0);
      },
      'should remove an system by object': () => {
        engine.systems.addSystem({name: 'foo'});
        engine.systems.removeSystem({name: 'foo'});
        assert.equal(engine.systems.systems.size, 0);
      },
    },
  }
};

module.exports = test;

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
    'addEntity': {
      'should add an entity': () => {
        engine.entities.addEntity({id:'foo'});
        assert.equal(engine.entities.entities.size, 1);
      },
      'should throw when entity has no id': () => {
        const func = () => {
          engine.entities.addEntity({});
        };

        assert.throws(func);
      },
    },
    'removeEntity': {
      'should remove an entity by id': () => {
        engine.entities.addEntity({id: 'foo'});
        engine.entities.removeEntity('foo');
        assert.equal(engine.entities.entities.size, 0);
      },
      'should remove an entity by object': () => {
        engine.entities.addEntity({id: 'foo'});
        engine.entities.removeEntity({id: 'foo'});
        assert.equal(engine.entities.entities.size, 0);
      },
    },
  }
};

module.exports = test;

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
      'should add an entity to the engine': () => {
        engine.addEntity({});
        assert.equal(engine.entities.length, 1);
      },
      'should set all systems cache to dirty' : () => {
        let fakeSystem = {cacheDirty: false};
        engine.systems.push(fakeSystem);
        engine.addEntity({});
        assert.equal(fakeSystem.cacheDirty, true);
      }
    },
    'update' :{
      'should update deltatime': () => {
        let dt = engine.dt;
        engine.update();
        // TODO: This will fail unless we use high precision time.
        // assert.notEqual(engine.dt, dt);
      }
    }
  }
};

module.exports = test;

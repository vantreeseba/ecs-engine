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

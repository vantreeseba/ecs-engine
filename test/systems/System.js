var assert = require('chai').assert;
var System = require('../../systems/System');

let system;

const test = {
  'System': {
    'beforeEach': () => {
      system = new System(['c1', 'c2']);
      system.update = (entities) => {};
    },
    'constructor': {
      'should construct a system': () => {
        assert.isOk(system);
      },
    },
    '_entityShouldBeUpdated': {
      'should return true when entity has components' : () => {
        const s = system._entityShouldBeUpdated({c1: {}, c2: {}});
        assert.isTrue(s);
      },
      'should return false when entity does not have components' : () => {
        const s = system._entityShouldBeUpdated({});
        assert.isFalse(s);
      }
    },
    'run': {
      'should set the entity cache to have the entities with components' : () => {
        const entities = new Map();
        entities.set('a', {c1:{}, c2:{}});
        entities.set('b', {c1:{}});

        system.run(entities, 1000);
        assert.equal(system.entityCache.length, 1);
      },
      'should set the entity cache dirty to false' : () => {
        const entities = new Map();
        entities.set('a', {c1:{}, c2:{}});
        entities.set('b', {c1:{}});

        system.run(entities, 1000);
        assert.isFalse(system.cacheDirty);
      }
    },
    'update': {
      'should throw': () => {
        // TODO: implement test for this.
      },
    },
  }
};

module.exports = test;

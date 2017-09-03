var assert = require('chai').assert;
var System = require('../../shared/systems/System');

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
        const entities = [
          {c1:{}, c2:{}},
          {c1:{}},
        ];
        system.run(entities);
        assert.equal(system.entityCache.length, 1);
      },
      'should set the entity cache dirty to false' : () => {
        const entities = [
          {c1:{}, c2:{}},
          {c1:{}},
        ];
        system.run(entities);
        assert.isFalse(system.cacheDirty);
      }
    }
  }
};

module.exports = test;

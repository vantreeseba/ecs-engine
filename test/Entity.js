var assert = require('chai').assert;
var Entity = require('../entities/Entity');

let entity;

const test = {
  'entity': {
    'beforeEach': () => {
      entity = new Entity();
    },
    'constructor': {
      'should construct a entity': () => {
        assert.isOk(entity);
      },
    },
    'addComponent': {
      'should add a property of the component type': () => {
        entity.addComponent({name: 'test', value:1});
        assert.isOk(entity.test);
      },
      'should add component object': () => {
        entity.addComponent({name: 'test', value:1});
        assert.equal(entity.test.value, 1);
      }
    },
    'removeComponent': {
      'should remove component by name': () => {
        entity.addComponent({name: 'test', value:1});
        entity.removeComponent('test');
        assert.isUndefined(entity.test);
      },
      'should remove component by ref': () => {
        var component = {name: 'test', value:1};
        entity.addComponent(component);
        entity.removeComponent(component);
        assert.isUndefined(entity.test);
      }
    }
  }
};

module.exports = test;

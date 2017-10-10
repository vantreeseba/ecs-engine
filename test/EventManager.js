var assert = require('chai').assert;
var EventManager = require('../EventManager');

let eventManager;

const test = {
  'eventManager': {
    'beforeEach': () => {
      eventManager = new EventManager();
    },
    'constructor': {
      'should construct a eventManager': () => {
        assert.isOk(eventManager);
      },
    },
    'on': {
      'should add listener of type to event listeners when none exist': () => {
        eventManager.on('test', () => {});
        assert.equal(eventManager.listeners.get('test').length, 1);
      },
      'should add listener of type to event listeners when some exist': () => {
        eventManager.on('test', () => {});
        eventManager.on('test', () => {});
        assert.equal(eventManager.listeners.get('test').length, 2);
      },
    },
    'off': {
      'should not fail when no listeners of type are defined': () => {
        eventManager.off('test', () => {});
        assert.equal(eventManager.listeners.get('test'), undefined);
      },
      'should remove listener of type from event listeners': () => {
        const listener = () => {};
        eventManager.on('test', listener);
        eventManager.off('test', listener);
        assert.equal(eventManager.listeners.get('test').length, 0);
      },
    },
    'emit': {
      'should do nothing when no listeners exist' : () => {
        eventManager.emit('test', {a:1});
      },
      'should call registered listener with data when it does exist' : () => {
        let bar = {};
        eventManager.on('test', data => Object.assign(bar, data));
        eventManager.emit('test', {a:1});
        assert.equal(bar.a, 1);
      }
    },
  }
};

module.exports = test;

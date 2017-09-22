var assert = require('chai').assert;
var Utils = require('../../utils');

const test = {
  Utils: {
    calculateRollingAverage: {
      'should return the next value in the buffer' : () => {
        // const prev = 5;
        let avg = 1;

        let nums = [];
        for(var i = 0; i < 50; i++) {
          avg = Utils.calculateRollingAverage(avg, 0, 10);
        }

        assert.isTrue(avg < 0.01);
      },
    },
  }
};

module.exports = test;

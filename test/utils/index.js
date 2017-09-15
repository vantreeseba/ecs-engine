var assert = require('chai').assert;
var Utils = require('../../../shared/utils');

const test = {
  Utils: {
    calculateRollingAverage: {
      'should return the next value in the buffer' : () => {
        // const prev = 5;
        let avg = 5;

        let nums = [];
        for(var i = 0; i < 5; i++) {
          let cur = Math.random() * 5;
          nums.push(cur);
          avg = Utils.calculateRollingAverage(avg, cur, 10);
        }
        console.log(nums, avg);
      },
    },
  }
};

module.exports = test;

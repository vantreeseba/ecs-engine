var assert = require('chai').assert;
var Vector = require('../../utils/Vector');

let vector;

const test = {
  'Vector': {
    'beforeEach': () => {
      vector = new Vector(1, 0);
    },
    'constructor': {
      'should construct a vector': () => {
        vector = new Vector();
        assert.isOk(vector);
      },
    },
    'add2':{
      'should add v2 to v1': () => {
        Vector.add2(vector, new Vector(1, 0));
        assert.deepEqual(vector, {x:2, y:0});
      }
    },
    'sub2':{
      'should sub v2 from v1': () => {
        Vector.sub2(vector, new Vector(1, 0));
        assert.deepEqual(vector, {x: 0, y:0});
      }
    },
    'scale2': {
      'should scale v1 by scalar': () => {
        Vector.scale2(vector, 0.5);
        assert.deepEqual(vector, {x: 0.5, y:0});
      }
    },
    'mag2': {
      'should return mag if no input given': () => {
        const mag = Vector.mag2(vector);
        assert.deepEqual(mag, 1);
      },
      'should set mag if input given': () => {
        const mag = Vector.mag2(vector, 0.5);
        assert.deepEqual(mag, 0.5);
      }
    },
    'limit2': {
      'should set mag if mag greater than given limit': () => {
        Vector.limit2(vector, 0.5);
        assert.deepEqual(Vector.mag2(vector), 0.5);
      },
      'should not set mag if mag less than given limit': () => {
        Vector.limit2(vector, 10);
        assert.deepEqual(Vector.mag2(vector), 1);
      }
    },
  }
};

module.exports = test;

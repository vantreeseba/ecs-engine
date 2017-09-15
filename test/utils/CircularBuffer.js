var assert = require('chai').assert;
var CircularBuffer = require('../../src/utils/CircularBuffer');

let buffer;

const test = {
  CircularBuffer: {
    beforeEach: () => {
      buffer = new CircularBuffer(4);
    },
    constructor: {
      'should construct a buffer': () => {
        assert.isOk(buffer);
      },
    },
    read: {
      'should return the next value in the buffer' : () => {
        buffer._buffer[0] = 1;
        assert.equal(1, buffer.read());
      },
      'should return the second value in the buffer when called again' : () => {
        buffer._buffer[0] = 1;
        buffer._buffer[1] = 2;
        buffer.read();
        assert.equal(2, buffer.read());
      },
      'should return the firstvalue in the buffer when called size times' : () => {
        buffer._buffer[0] = 1;
        buffer._buffer[1] = 2;

        buffer.read();
        buffer.read();
        buffer.read();
        buffer.read();

        assert.equal(1, buffer.read());
      }
    },
    write: {
      'should write a value into the buffer': () => {
        buffer.write(1);

        assert.equal(1, buffer.read());
      },
      'should write a value into the buffer when called again': () => {
        buffer.write(1);
        buffer.write(2);

        assert.equal(1, buffer.read());
        assert.equal(2, buffer.read());
      },
      'should write a value into the first buffer position when written to size times' : () => {
        buffer.write(1);
        buffer.write(1);
        buffer.write(1);
        buffer.write(1);
        buffer.write(5);

        assert.equal(5, buffer.read());
        assert.equal(1, buffer.read());
      }

    }
  }
};

module.exports = test;

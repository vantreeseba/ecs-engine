/**
 * An array with a limited amount of data (size) that wraps when you read or write past the end.
 */
class CircularBuffer {
  /**
   * @param {Number} size The size of the buffer.
   */
  constructor(size) {
    this._size = size;
    this._buffer = new Array(size);
    this._readPos = 0;
    this._writePos = 0;
  }

  /**
   * Returns the next value from the buffer.
   * @return {*}
   */
  read() {
    if(this._readPos >= this._size) {
      this._readPos = 0;
    }
    return this._buffer[this._readPos++];
  }

  /**
   * Writes a value into the next slot in the buffer.
   * @param {*} val The value to write into the buffer.
   */
  write(val) {
    if(this._writePos >= this._size) {
      this._writePos = 0;
    }
    this._buffer[this._writePos++] = val;
  }
}

module.exports = CircularBuffer;

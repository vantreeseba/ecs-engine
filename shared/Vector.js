/**
 * Vector
 */
class Vector {
  /**
   * Constructs a vector.
   * @param {number} [x=0] X value for vector.
   * @param {Number} [y=0] Y value for vector.
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Add a vector to this one.
   * @param {Vector} vec Vector to add to this vector.
   * @return {Vector} This vector.
   */
  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  /**
   * Subtract a vector from this vector.
   * @param {Vector} vec Vector to subtract from this one.
   * @return {Vector} This vector.
   */
  sub(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  /**
   * Scale this vector by a scalar.
   * @param {Number} scalar Scaler to scale vector by.
   * @return {Vector} This vector.
   */
  scale(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  /**
   * Set or get magnitude of vector.
   * @param {Number} mag Magnitude to set.
   * @return {Number} The magnitude of this vector.
   */
  mag(mag) {
    if(mag){
      this.scale(1/this.mag());
    }
    return Math.hypot(this.x, this.y);
  }

  /**
   * Set mag to input if mag is greater than input;
   * @param {Number} mag Magnitude to limit to.
   * @return {Vector} This vector.
   */
  limit(mag) {
    if(this.mag() > mag){
      this.mag(mag);
    }

    return this;
  }
}

module.exports = Vector;

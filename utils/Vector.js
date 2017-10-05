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
  // add(vec) {
  //   this.x += vec.x;
  //   this.y += vec.y;
  //   return this;
  // }

  /**
   * Subtract a vector from this vector.
   * @param {Vector} vec Vector to subtract from this one.
   * @return {Vector} This vector.
   */
  // sub(vec) {
  //   this.x -= vec.x;
  //   this.y -= vec.y;
  //   return this;
  // }

  /**
   * Scale this vector by a scalar.
   * @param {Number} scalar Scaler to scale vector by.
   * @return {Vector} This vector.
   */
  // scale(scalar) {
  //   this.x *= scalar;
  //   this.y *= scalar;
  //   return this;
  // }

  /**
   * Set or get magnitude of vector.
   * @param {Number} mag Magnitude to set.
   * @return {Number} The magnitude of this vector.
   */
  // mag(mag) {
  //   if(mag){
  //     this.scale(1/this.mag());
  //   }
  //   return Math.hypot(this.x, this.y);
  // }

  /**
   * Set mag to input if mag is greater than input;
   * @param {Number} mag Magnitude to limit to.
   * @return {Vector} This vector.
   */
  // limit(mag) {
  //   if(this.mag() > mag){
  //     this.mag(mag);
  //   }

  //   return this;
  // }

  /**
   * Add two vectors.
   *
   * @static
   * @param {Vector} v1 Vector to be added to.
   * @param {Vector} v2 Vector to add.
   * @return {Vector} v1 with v2 added.
   */
  static add2(v1, v2) {
    v1.x += v2.x;
    v1.y += v2.y;
    return v1;
  }

  /**
   * Subtract two vectors.
   *
   * @static
   * @param {Vector} v1 Vector to be subtracted from.
   * @param {Vector} v2 Vector to subtract.
   * @return {Vector} v1 with v2 subtracted.
   */
  static sub2(v1, v2) {
    v1.x -= v2.x;
    v1.y -= v2.y;
    return v1;
  }

  /**
   * Scale vector by scalar.
   *
   * @static
   * @param {Vector} v1 Vector to scale.
   * @param {Number} scalar Scalar.
   * @return {Vector} Scaled vector.
   */
  static scale2(v1, scalar) {
    v1.x *= scalar;
    v1.y *= scalar;
    return v1;
  }

  /**
   * Get or set magnitude of vector.
   * @static
   * @param {Vector} v1 Vector to get or set magntitude of.
   * @param {Number} mag Magnitude to set.
   * @return {Number} Magnitude
   */
  static mag2(v1, mag) {
    if(mag){
      Vector.scale2(v1, mag/Vector.mag2(v1));
    }
    return Math.hypot(v1.x, v1.y);
  }

  /**
   * Limit length of vector to magnitude.  If less than mag already, is unchanged.
   * @static
   * @param {Vector} v1 Vector to limit.
   * @param {Number} mag Magnitude to limit vector to.
   */
  static limit2(v1, mag) {
    if(Vector.mag2(v1) > mag) {
      Vector.mag2(v1, mag);
    }
  }
}

module.exports = Vector;

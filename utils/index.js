/**
 * @namespace Utils
 * Utility Methods
 */
class Utils {
  /**
   * Calculate a rolling avg, used for FPS/Ping.
   * @static
   * @param {Number} prev Previous Average.
   * @param {Number} current New number to add to avg.
   * @param {Number} num The number of prev samples to use to calculate.
   * @return {Number} The average.
   */
  static calculateRollingAverage(prev, current, num) {
    return ((prev * (num - 1)) + current) / num;
  }

  /**
   * Map a value from one range to another.
   * @static
   * @param {Number} val Value to map.
   * @param {Number} fMin Minimum of input range.
   * @param {Number} fMax Maximum of input range.
   * @param {Number} tMin Minimum of output range.
   * @param {Number} tMax Maximum of output range.
   * @return {Number} Mapped value.
   */
  static map(val, fMin, fMax, tMin, tMax) {
    let v;
    if (fMin > fMax) {
      v = Math.min(Math.max(val, fMax), fMin);
    } else {
      v = Math.max(Math.min(val, fMax), fMin);
    }
    return (((v - fMin) / (fMax - fMin)) * (tMax - tMin)) + tMin;
  }
}

module.exports = Utils;

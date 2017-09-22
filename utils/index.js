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
}

module.exports = Utils;

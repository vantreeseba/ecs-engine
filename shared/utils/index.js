class Utils {
  static calculateRollingAverage(prev, current, num) {
    return ((prev * (num - 1)) + current) / num;
  }
}

module.exports = Utils;

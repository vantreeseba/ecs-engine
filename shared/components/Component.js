/**
 * A Component in the ECS.
 */
class Component {
  /**
   * constructor
   */
  constructor(params) {
    this.name = this.constructor.name.toLowerCase();

    if(typeof params === 'object') {
      Object.assign(this, params);
    } else if(params) {
      this.value = params;
    }
  }
}

module.exports = Component;

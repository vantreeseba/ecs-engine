/**
 * A Component in the ECS.
 */
class Component {
  /**
   * constructor
   * @param {Object|*} params The parameters for the component.  If it's not an object, it creates
   * a property called value on the component, and assigns the value of params to it.
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

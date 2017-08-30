/**
 * Entity
 */
class Entity {
  /**
   */
  constructor() {
    // TODO: Make ids better.
    this.id = Date.now();
    this.components = {};
  }

  /**
   * Add a component to the entity.
   *
   * @param {Object} component The component to add.
   * @return {Object} This entity.
   */
  addComponent(component) {
    this.components[component.name] = component;
    return this;
  }

  /**
   * Remove a component from the entity.
   *
   * @param {*} component The component to remove.
   * @return {Object} This entity.
   */
  removeComponent(component) {
    if(typeof component === 'string') {
      delete this.components[component];
    } else {
      delete this.components[component.name];
    }

    return this;
  }
}

module.exports = Entity;

/**
 * Entity
 */
class Entity {
  /**
   */
  constructor() {
    // TODO: Make ids better.
    this.id = Date.now();
    // this.components = {};
  }

  /**
   * Add a component to the entity.
   *
   * @param {Component} component The component to add.
   * @return {Entity} This entity.
   */
  addComponent(component) {
    this[component.name] = component;
    return this;
  }

  /**
   * Remove a component from the entity.
   *
   * @param {(Component|String)} component The component to remove.
   * @return {Entity} This entity.
   */
  removeComponent(component) {
    if(typeof component === 'string') {
      delete this[component];
    } else {
      delete this[component.name];
    }

    return this;
  }
}

module.exports = Entity;

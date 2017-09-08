/**
 * A System in the ECS.
 * @type {System}
 */
class System {
  /**
   * constructor
   * @param {Array} type The component type this system acts on.
   */
  constructor(types, tickRate = 16) {
    this.name = this.constructor.name.toLowerCase();
    this.types = types;
    this.entityCache = [];
    this.cacheDirty = true;
    this.tickRate = tickRate;
    this.accum = 0;
  }

  /**
   * Check if an entity should be updated by this system.
   * @private
   * @param {Object} entity The entity to check.
   * @return {Boolean} True if the entity has all the components to be updated by this system.
   */
  _entityShouldBeUpdated(entity) {
    for(let i = 0; i < this.types.length; i += 1) {
      if(!entity[this.types[i]]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Run the system on the entities matching the type of this system.
   * @private
   * @param {Array} entities Entites to run the system on.
   */
  run(entities, dt){
    if(this.cacheDirty) {
      this.entityCache = entities.filter(e => this._entityShouldBeUpdated(e));
      this.cacheDirty = false;
    }

    this.accum += dt;

    while(this.accum >= this.tickRate) {
      console.log(this.name);
      this.update(this.entityCache);
      this.accum -= this.tickRate;
    }
  }

  /**
   * Runs the system of the entities, this should be implemented in child classes.
   * @abstract
   * @param {Array} entities Entities to be run through the system.
   */
  update() {
    throw 'Child did not implement update.';
  }
}

module.exports = System;

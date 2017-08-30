/**
 * A System in the ECS.
 */
class System {
  /**
   * constructor
   * @param {Array} type The component type this system acts on.
   */
  constructor(types) {
    this.types = types;
    this.entityCache = [];
    this.cacheDirty = true;
  }

  /**
   * Check if an entity should be updated by this system.
   *
   * @param {Object} entity The entity to check.
   * @return {Boolean} True if the entity has all the components to be updated by this system.
   */
  entityShouldBeUpdated(entity) {
    for(let i = 0; i < this.types.length; i += 1) {
      if(!entity.components[this.types[i]]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Run the system on the entities matching the type of this system.
   * @param {Array} entities Entites to run the system on.
   */
  run(entities){
    if(this.cacheDirty) {
      this.entityCache = entities.filter(this.entityShouldBeUpdated);
    }
    this.update(this.entityCache);
  }

  /**
   * Runs the system of the entities, this should be implemented in child classes.
   * @param {Array} entities Entities to be run through the system.
   */
  update() {
    throw 'Child did not implement update.';
  }
}

module.exports = System;

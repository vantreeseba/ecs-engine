/**
 * EntityManager
 */
class EntityManager {
  /**
   * constructor
   */
  constructor(engine) {
    this.engine = engine;
    this.entities = new Map();
  }

  /**
   * Add an entity.
   * @param {Entity} entity Entity to add to the engine.
   */
  addEntity(entity) {
    if(!entity.id) {
      throw new Error('Entity must have an id');
    }
    this.entities.set(entity.id, entity);
    this.engine.events.emit('entityAdded', entity);
  }

  /**
   * Remove an entity.
   * @param {Entity} entity
   */
  removeEntity(entity) {
    if(entity.id) {
      this.entities.delete(entity.id);
    } else {
      this.entities.delete(entity);
    }
    this.engine.events.emit('entityRemoved', entity);
  }
}

module.exports = EntityManager;

/**
 * SystemManager
 */
class SystemManager {
  /**
   * constructor
   */
  constructor(engine) {
    this.engine = engine;
    this.systems = new Map();
  }

  /**
   * Add an system.
   * @param {System} system System to add to the engine.
   */
  addSystem(system) {
    if(!system.name) {
      throw new Error('System must have a name.');
    }
    this.systems.set(system.name, system);
    this.engine.events.emit('systemAdded', system);
  }

  /**
   * Remove an system.
   * @param {System} system
   */
  removeSystem(system) {
    if(system.name) {
      this.systems.delete(system.name);
    } else {
      this.systems.delete(system);
    }
    this.engine.events.emit('systemRemoved', system);
  }
}

module.exports = SystemManager;

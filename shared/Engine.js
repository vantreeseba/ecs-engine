/**
 * @type {Engine}
 */
class Engine {
  /**
   * @param {Array} systems
   */
  constructor(){
    this.systems = [];
    this.entities = [];
  }

  addEntity(entity) {
    this.entities.push(entity);
    this.systems.forEach(s => s.cacheDirty = true);
  }

  /**
   * Run the systems registered in the engines on the entities.
   */
  update() {
    // console.log('engine update');
    this.systems.forEach(s => s.run(this.entities));
  }
}

module.exports = Engine;

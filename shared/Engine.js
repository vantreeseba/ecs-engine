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

  /**
   * Run the systems registered in the engines on the entities.
   */
  update() {
    this.systems.forEach(s => s.run(this.entities));
  }
}

module.exports = Engine;

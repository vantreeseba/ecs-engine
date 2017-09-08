const Utils = require('../shared/utils');

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
    this.dt = 0;
    this.prevTime = Date.now();

    this.fps = 0;
  }

  addEntity(entity) {
    this.entities.push(entity);
    this.systems.forEach(s => s.cacheDirty = true);
  }

  /**
   * Run the systems registered in the engines on the entities.
   */
  update() {
    this.dt = Date.now() - this.prevTime;
    this.prevTime = Date.now();
    this.fps = Utils.calculateRollingAverage(this.fps, 1000/this.dt, 10);

    this.systems.forEach(s => s.run(this.entities, this.dt));
  }
}

module.exports = Engine;

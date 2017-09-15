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
    this.snapshot = [];
    this.dt = 0;
    this.prevTime = Date.now();

    this.fps = 0;
  }

  addEntity(entity) {
    this.entities.push(entity);
    this.systems.forEach(s => s.cacheDirty = true);
  }

  /**
   * Check for snapshot to sync entities with.
   */
  checkSnapshot() {
    if(!this.snapshot){
      return;
    }

    let cacheDirty = false;
    this.snapshot.forEach(se => {
      let entity = this.entities.find(e => e.id === se.id);
      if (!entity) {
        this.entities.push(se);
        cacheDirty = true;
      } else {
        Object.assign(entity, se);
      }
    });

    if(cacheDirty) {
      this.systems.forEach(s => s.cacheDirty = true);
    }

    this.snapshot = [];
  }

  /**
   * Run the systems registered in the engines on the entities.
   */
  update() {
    this.dt = Date.now() - this.prevTime;
    this.prevTime = Date.now();
    this.fps = Utils.calculateRollingAverage(this.fps, 1000/this.dt, 10);

    this.systems.forEach(s => s.run(this.entities, this.dt));

    this.checkSnapshot();
  }
}

module.exports = Engine;

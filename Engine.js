const Utils = require('./utils');

/**
 * @module ecs
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

    this.debugStats = {
      fps: 0,
      systems: {},
    };
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
    this.debugStats.fps = Utils.calculateRollingAverage(this.debugStats.fps, 1000/this.dt, 10);

    this.systems.forEach(s => {
      const time = performance.now();
      s.run(this.entities, this.dt);
      if(!this.debugStats.systems[s.name]) {
        this.debugStats.systems[s.name] = {
          time: 0,
        };
      }
      let sdt = performance.now() - time;
      this.debugStats.systems[s.name].time =
        Utils.calculateRollingAverage(this.debugStats.systems[s.name].time, sdt, 10);
      this.debugStats.systems[s.name].entityCount = s.entityCache.length;
    });

    this.checkSnapshot();
  }
}

module.exports = Engine;

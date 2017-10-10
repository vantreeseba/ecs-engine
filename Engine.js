const Utils = require('./utils');
const EventManager = require('./EventManager');
const EntityManager = require('./EntityMananger');
const SystemManager = require('./SystemManager');

/**
 * @module ecs
 * @type {Engine}
 */
class Engine {
  /**
   * @param {Array} systems
   */
  constructor(){
    this.events = new EventManager(this);
    this.entities = new EntityManager(this);
    this.systems = new SystemManager(this);

    this.getTime = Date.now;
    this.dt = 0;
    this.prevTime = this.getTime();

    this.debugStats = {
      fps: 0,
      systems: {},
    };
  }

  /**
   * Run the systems registered in the engines on the entities.
   */
  update() {
    this.dt = this.getTime() - this.prevTime;
    this.prevTime = this.getTime();
    this.debugStats.fps = Utils.calculateRollingAverage(this.debugStats.fps, 1000/this.dt, 10);

    this.systems.systems.forEach((s) => this.runSystemWithLogging(s));
  }

  /**
   * Set the debug stats for runtime of a system.
   * @param {System} system The system to save stats for.
   * @param {number} time The time before the system ran.
   */
  runSystemWithLogging(system) {
    const time = this.getTime();

    system.run(this.entities, this.dt);

    if(!this.debugStats.systems[system.name]) {
      this.debugStats.systems[system.name] = {
        time: 0,
      };
    }
    let sdt = this.getTime() - time;
    this.debugStats.systems[system.name].time =
        Utils.calculateRollingAverage(this.debugStats.systems[system.name].time, sdt, 10);
    this.debugStats.systems[system.name].entityCount = system.entityCache.length;

  }
}

module.exports = Engine;

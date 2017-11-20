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
      fps5: 0,
      fps10: 0,
      fps30: 0,
      systems: {},
    };
  }

  /**
   * Run the systems registered in the engines on the entities.
   */
  update() {
    this.dt = this.getTime() - this.prevTime;
    this.prevTime = this.getTime();
    this.debugStats.fps5 = Utils.calculateRollingAverage(this.debugStats.fps5, 1000/this.dt, 5);
    this.debugStats.fps10 = Utils.calculateRollingAverage(this.debugStats.fps10, 1000/this.dt, 10);
    this.debugStats.fps30 = Utils.calculateRollingAverage(this.debugStats.fps30, 1000/this.dt, 30);

    this.systems.systems.forEach((s) => this.runSystemWithLogging(s));
  }

  /**
   * Set the debug stats for runtime of a system.
   * @param {System} system The system to save stats for.
   * @param {number} time The time before the system ran.
   */
  runSystemWithLogging(system) {
    const time = this.getTime();

    system.run(this.entities.entities, this.dt);

    if(!this.debugStats.systems[system.name]) {
      this.debugStats.systems[system.name] = {
        time: 0,
        dt: 0,
        catchupAttempts: 0,
        entityCount: 0,
      };
    }

    let stats = this.debugStats.systems[system.name];
    let sdt = this.getTime() - time;
    let cua = system.catchupAttempts;

    stats.time = Utils.calculateRollingAverage(stats.time, sdt, 10);
    stats.entityCount = system.entityCache.length;
    stats.catchupAttempts = Utils.calculateRollingAverage(stats.catchupAttempts, cua, 10);
    stats.tickRate = Math.round(1000 / system.dt);

  }
}

module.exports = Engine;

const System = require('./System');

/**
 * Phsyics system in ECS.
 * @extends {System}
 */
class Physics extends System {
  /**
   * constructor
   */
  constructor() {
    // TODO: Allow setting tick rate.
    super(['networkSync, position']);
  }

  /**
   * Run the system on the entities.
   * @param {Array} entities
   */
  update(entities) {
    let i = 0;
    let entity;
    let pys;
    let pos;
    for(; i < entities.length; i += 1) {
      entity = entities[i];
      pys = entity.components.physics;
      pos = entity.components.position;

      pys.vel.add(pys.acc);
      pys.vel.limit(pys.maxSpeed);
      pos.x += pys.vel.x;
      pos.y += pys.vel.y;
      // pos.add(pys.vel);
      pys.acc.scale(0);
    }
  }
}

module.exports = Physics;

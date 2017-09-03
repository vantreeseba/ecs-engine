const System = require('./System');
const Vector = require('../Vector');

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
    super(['position, physics']);
  }

  /**
   * Run the system on the entities.
   * @param {Array} entities
   */
  update(entities) {
    let i = 0, entity, pys, pos;

    for(; i < entities.length; i += 1) {
      entity = entities[i];
      pys = entity.physics;
      pos = entity.position;

      Vector.add2(pys.vel, pys.acc);
      Vector.limit2(pys.vel, pys.maxSpeed);
      Vector.add2(pos, pys.vel);
      Vector.scale2(pys.acc, 0);
    }
  }
}

module.exports = Physics;

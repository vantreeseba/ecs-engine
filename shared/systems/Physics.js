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
    super(['position', 'physics'], 50);
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

      // TODO: Make better friction.
      Vector.scale2(pys.vel, 0.8);
    }
  }
}

module.exports = Physics;

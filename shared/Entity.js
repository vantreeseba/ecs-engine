const PhysicsBody = require('./PhysicsBody');

/**
 * Entity
 */
class Entity extends PhysicsBody {
  /**
   */
  constructor(x = 0, y = 0) {
    super (x, y)
  }
}

module.exports = Entity;

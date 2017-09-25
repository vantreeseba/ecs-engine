const Entity = require('./Entity');
const Components = require('../components');

/**
 * An example player entity.
 * @extends {Entity}
 */
class Player extends Entity {
  /**
   * constructor
   */
  constructor() {
    super();

    this.addComponent(new Components.position());
    this.addComponent(new Components.playerControl());
    // this.addComponent(new Components.networkSync(netId));
    this.addComponent(new Components.appearance());
    // this.addComponent(new Components.physics());
  }
}

module.exports = Player;

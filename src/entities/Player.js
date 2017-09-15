const Entity = require('../Entity');
const Components = require('../components');

module.exports = class Player extends Entity {
  constructor(netId) {
    super();

    this.addComponent(new Components.position());
    this.addComponent(new Components.playerControl());
    this.addComponent(new Components.networkSync(netId));
    this.addComponent(new Components.appearance());
    this.addComponent(new Components.physics());
  }
}

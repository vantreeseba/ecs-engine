const MessageTypes = require('../shared/MessageTypes');
const Entity = require('../shared/Entity');
const Components = require('./components');

const ServerEvents = {
  PLAYER_CONNECT() {
    this.spark.emit(MessageTypes.PLAYER_CONNECT, 'yoback');

    let entity = new Entity();
    entity.addComponent(new Components.position());
    entity.addComponent(new Components.networkSync());

    this.engine.addEntity(entity);
  },

  PLAYER_DISCONNECT() {
  },

  PLAYER_INPUT_SYNC() {
  }
};

module.exports = ServerEvents;

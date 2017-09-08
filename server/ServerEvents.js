const MessageTypes = require('../shared/MessageTypes');
const Player = require('../shared/entities/Player');

const ServerEvents = {
  PLAYER_CONNECT() {
    const entity = this.engine.entities.find(x => x.networksync.netId === this.spark.id);
    if(!entity) {
      this.engine.addEntity(new Player(this.spark.id));
    }
  },

  PLAYER_DISCONNECT() {
  },

  PLAYER_INPUT_SYNC(data) {
    this.engine.systems
      .find(x => x.name === 'playercontrol')
      .setInput(this.spark.id, data);
  },
  PING() {
    this.spark.emit(MessageTypes.PONG);
  }
};

module.exports = ServerEvents;

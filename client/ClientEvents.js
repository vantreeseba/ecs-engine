const Utils = require('../shared/utils');
const MessageTypes = require('../shared/MessageTypes');

const ClientEvents = {
  PLAYER_CONNECT(data) {
  },

  PLAYER_DISCONNECT(data) {
  },

  ENTITY_SYNC(data) {
    let entity = this.engine.entities.find(e => e.id === data.id);
    if (!entity) {
      this.engine.entities.push(data);
      this.engine.systems.forEach(s => s.cacheDirty = true);
    } else {
      Object.assign(entity, data);
    }
  },
  PONG() {
    let pingTime = (Date.now() - this.engine.pingTime - 100);
    this.engine.pingTime = Date.now();
    this.engine.ping = Utils.calculateRollingAverage(this.engine.ping, pingTime, 10);
    setTimeout(() => {
      this.primus.emit(MessageTypes.PING);
    }, 100);
  }
};

module.exports = ClientEvents;

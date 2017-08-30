const MessageTypes = require('../shared/MessageTypes.js');

const ServerEvents = {
  PLAYER_CONNECT() {
    this.emit(MessageTypes.PLAYER_CONNECT, 'yoback');
  },

  PLAYER_DISCONNECT() {
  },
  PLAYER_INPUT_SYNC(data) {
    console.log(data);
  }
};

module.exports = ServerEvents;

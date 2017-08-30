const ClientEvents = {
  PLAYER_CONNECT(data) {
    console.log('PLAYER_CONNECT', data);
  },

  PLAYER_DISCONNECT(data) {
    console.log('PLAYER_DISCONNECT', data);
  }
};

module.exports = ClientEvents;

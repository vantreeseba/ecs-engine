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
      entity.position = data.position;
    }
  }
};

module.exports = ClientEvents;

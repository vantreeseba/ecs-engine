const System = require('../../shared/systems/System');
const MessageTypes = require('../../shared/MessageTypes.js');
const ServerEvents = require('../ServerEvents.js');

/**
 * Phsyics system in ECS.
 * @extends {System}
 */
class NetworkSync extends System {
  /**
   * constructor
   */
  constructor({primus}) {
    // TODO: Allow setting tick rate.
    super(['networkSync, position']);

    primus.on('connection', function connection(spark) {
      Object.keys(MessageTypes).forEach((type) => {
        const fn = ServerEvents[type] || function(){};
        spark.on(MessageTypes[type], fn.bind(spark));
      });

      spark.emit(MessageTypes.PLAYER_CONNECT, 'yoyoyo');
    });
  }

  /**
   * Run the system on the entities.
   * @param {Array} entities
   */
  update(entities) {
    let i = 0;
    let entity;
    let ns;

    for(; i < entities.length; i += 1) {
      entity = entities[i];
      ns = entity.components.networkSync;

      if(ns.new) {
        // TODO: Send entity creation message.
      }
    }
  }
}

module.exports = NetworkSync;

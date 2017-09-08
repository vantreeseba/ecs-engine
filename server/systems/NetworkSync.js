const System = require('../../shared/systems/System');
const MessageTypes = require('../../shared/MessageTypes.js');
const ServerEvents = require('../ServerEvents.js');

/**
 * Physics system in ECS.
 * @extends {System}
 */
class NetworkSync extends System {
  /**
   * constructor
   */
  constructor({engine, primus}) {
    super(['networksync'], 20);

    this.primus = primus;

    primus.on('connection', function connection(spark) {
      Object.keys(MessageTypes).forEach((type) => {
        const fn = ServerEvents[type] || function(){};
        spark.on(MessageTypes[type], fn.bind({engine, spark}));
      });
    });
  }

  /**
   * Run the system on the entities.
   * @param {Array} entities
   */
  update(entities) {
    let i = 0;
    let entity;

    for(; i < entities.length; i += 1) {
      entity = entities[i];
      this.primus.forEach((spark) => {
        spark.emit(MessageTypes.ENTITY_SYNC, entity);
      });
    }
  }
}

module.exports = NetworkSync;

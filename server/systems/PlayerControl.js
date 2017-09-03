const System = require('../../shared/systems/System');
const MessageTypes = require('../../shared/MessageTypes');

/**
 * @type {PlayerControl}
 * @extends {System}
 */
class PlayerControl extends System {
  /**
   * constructor
   */
  constructor({engine}) {
    super([]);

    this.inputs = {};
  }

  /**
   * Set server input state for a player.
   * @param {Number} id Id of player
   * @param {Object} data Key state delta.
   */
  setInput(id, data) {
    let input = this.inputs[id];
    if(!input) {
      this.inputs[id] = data;
    } else {
      Object.assign(input, data);
    }
  }

  /**
   * Run the system on the entities.
   * @param {Array} entities
   */
  update(entities) {
    let entity;
    let netId;
    let i = 0;

    for(; i < entities.length; i++) {
      entity = entities[i];
      netId = entity.networksync.netId;

      if(this.inputs[netId]) {
        if(this.inputs[netId].a){
          entity.position.x -=1;
        }
        if(this.inputs[netId].d) {
          entity.position.x +=1;
        }
        if(this.inputs[netId].w) {
          entity.position.y -=1;
        }
        if(this.inputs[netId].s) {
          entity.position.y +=1;
        }
      }
    }
  }

}

module.exports = PlayerControl;

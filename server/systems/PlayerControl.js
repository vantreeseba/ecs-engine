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
    super(['playercontrol', 'position', 'physics']);

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
      this.inputs[id] = {
        keys: data.keys || {},
        gamepad: data.gamepad || {},
      };
    } else {
      if(data.keys) {
        input.keys = Object.assign(input.keys, data.keys);
      }
      if(data.gamepad) {
        input.gamepad = Object.assign(input.gamepad, data.gamepad);
      }
    }
  }

  /**
   * Run the system on the entities.
   * @param {Array} entities
   */
  update(entities) {
    let entity;
    let netId;
    let acc;
    let i = 0;
    let input;

    for(; i < entities.length; i++) {
      entity = entities[i];
      netId = entity.networksync.netId;
      input = this.inputs[netId];
      acc = entity.physics.acc;


      if(input) {
        if(input.keys) {
          if(input.keys.a){
            acc.x -=1;
          }
          if(input.keys.d) {
            acc.x +=1;
          }
          if(input.keys.w) {
            acc.y -=1;
          }
          if(input.keys.s) {
            acc.y +=1;
          }
        }

        if(input.gamepad && input.gamepad[1]){
          acc.x += input.gamepad[1].axis_0 || 0;
          acc.y += input.gamepad[1].axis_1 || 0;
        }
      }
    }
  }

}

module.exports = PlayerControl;

const System = require('../../shared/systems/System');
const Keys = require('../Keys');
const Gamepad = require('../GamepadManager');

/**
 * @type {PlayerControl}
 * @extends {System}
 */
class PlayerControl extends System {
  /**
   * constructor
   */
  constructor() {
    super(['position']);

    this.keys = new Keys();
    this.gamepad = new Gamepad();

    this.keys.update();
    this.gamepad.update();
  }

  /**
   * Run the system on the entities.
   * @param {Array} entities
   */
  update(entities) {
    this.keys.update();
    this.gamepad.update();

    let xAxis = this.gamepad.isMoved('ps4_left_stick_x');
    let yAxis = this.gamepad.isMoved('ps4_left_stick_y');

    for(let i = 0; i < entities.length; i++) {
      entities[i].position.x += xAxis;
      entities[i].position.y += yAxis;

      if(this.keys.isDown('a')) {
        entities[i].position.x -=1;
      }
      if(this.keys.isDown('d')) {
        entities[i].position.x +=1;
      }
      if(this.keys.isDown('w')) {
        entities[i].position.y -=1;
      }
      if(this.keys.isDown('s')) {
        entities[i].position.y +=1;
      }
    }
  }

}

module.exports = PlayerControl;

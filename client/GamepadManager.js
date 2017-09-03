/**
 * A helper to manage gamepad inputs.
 */
class GamePadManager {
  /**
   * constructor
   */
  constructor() {
    this.states = {};
    this.listeners = {};
    this.axisThreshold = 0.1;
    this.delta = {
      0: {},
      1: {},
      2: {},
      3: {},
    };

    this._setupButtonMappings();

    for(var j = 0; j < 4; j += 1) {
      var controller = navigator.getGamepads()[j];
      if(controller) {
        this._setState(controller);
      }
    }
  }

  /**
   * Setup string to button mappings to make use easier.
   * @private
   */
  _setupButtonMappings() {
    this.mappings = {
      // PS4 Buttons.
      'ps4_x': {type: 'button', value: 0},
      'ps4_circle': {type: 'button', value:1},
      'ps4_square': {type: 'button', value:2},
      'ps4_triangle': {type: 'button', value:3},
      'ps4_l1': {type: 'button', value:4},
      'ps4_r1': {type: 'button', value:5},
      'ps4_l2': {type: 'button', value:6},
      'ps4_r2': {type: 'button', value:7},
      'ps4_share': {type: 'button', value:8},
      'ps4_options': {type: 'button', value:9},
      'ps4_left_stick_in': {type: 'button', value:10},
      'ps4_right_stick_in': {type: 'button', value:11},
      'ps4_dpad_up': {type: 'button', value:12},
      'ps4_dpad_down': {type: 'button', value:13},
      'ps4_dpad_left': {type: 'button', value:14},
      'ps4_dpad_right': {type: 'button', value:15},
      'ps4_ps': {type: 'button', value:16},

      // PS4 Axes.
      'ps4_left_stick_x': {type: 'axis', value:0},
      'ps4_left_stick_y': {type: 'axis', value:1},
      'ps4_right_stick_x': {type: 'axis', value:2},
      'ps4_right_stick_y': {type: 'axis', value:3},

      // Xbox Buttons.
      'xbox_a': {type: 'button', value: 0},
      'xbox_b': {type: 'button', value:1},
      'xbox_x': {type: 'button', value:2},
      'xbox_y': {type: 'button', value:3},
      'xbox_lb': {type: 'button', value:4},
      'xbox_rb': {type: 'button', value:5},
      'xbox_lt': {type: 'button', value:6},
      'xbox_rt': {type: 'button', value:7},
      'xbox_back': {type: 'button', value:8},
      'xbox_start': {type: 'button', value:9},
      'xbox_left_stick_in': {type: 'button', value:10},
      'xbox_right_stick_in': {type: 'button', value:11},
      'xbox_dpad_up': {type: 'button', value:12},
      'xbox_dpad_down': {type: 'button', value:13},
      'xbox_dpad_left': {type: 'button', value:14},
      'xbox_dpad_right': {type: 'button', value:15},

      // XBox Axes.
      'xbox_left_stick_x': {type: 'axis', value:0},
      'xbox_left_stick_y': {type: 'axis', value:1},
      'xbox_right_stick_x': {type: 'axis', value:2},
      'xbox_right_stick_y': {type: 'axis', value:3},

      // Generic Axis Mappings
      'left_stick_x': {type: 'axis', value:0},
      'left_stick_y': {type: 'axis', value:1},
      'right_stick_x': {type: 'axis', value:2},
      'right_stick_y': {type: 'axis', value:3},
    };
  }

  /**
   * Internal method for handling button events.
   * @private
   * @param {String} event Type of event.
   * @param {Number} player The gamepad that triggered the event.
   * @param {Number} button The index of the button that triggered the event.
   * @param {Number} value Value of the button press (this can be a between 0,1 for triggers).
   */
  _onButtonEvent(event, player, button, value) {
    let b = 'button_' + button;
    if(this.listeners[b] && this.listeners[b][event]) {
      this.listeners[b][event]({event, player, button, value});
    }

    switch(event) {
      case 'press': this.delta[player][b] = true; break;
      case 'hold': delete this.delta[player][b]; break;
      case 'release': this.delta[player][b] = false; break;
    }
  }

  /**
   * Internal method for handling axis events.
   * @private
   * @param {String} event Type of event.
   * @param {Number} player The gamepad that triggered the event.
   * @param {Number} axis The index of the axis that triggered the event.
   * @param {Number} value Value of the axis (this is between -1, 1).
   */
  _onAxisEvent(event, player, axis, value) {
    let a = 'axis_' + axis;
    if(this.listeners[a] && this.listeners[a][event]) {
      this.listeners[a][event]({event, player, axis, value});
    }

    switch(event) {
      case 'press': this.delta[player][a] = value; break;
      case 'hold': this.delta[player][a] = value; break;
      case 'release': this.delta[player][a] = 0; break;
    }
  }

  /**
   * Set the internal state of the gamepad.
   * @private
   * @param {Object} gamepad The gamepad.
   */
  _setState(gamepad) {
    this.states[gamepad.index] = this.states[gamepad.index] || {};
    this.states[gamepad.index].axes = gamepad.axes.map(a => a);
    this.states[gamepad.index].buttons = gamepad.buttons.map(a => a.value);
  }

  /**
   * Update the gamepad manager, this handles button/axis events, 
   * as well as updating the internal state and setting up the delta.
   */
  update() {
    let player = 0;
    let controllers = navigator.getGamepads();

    for(; player < 4; player += 1) {
      let button = 0;
      let axis = 0;
      let controller = controllers[player];

      if(!controller || !controller.connected || !this.states[player]) {
        continue;
      }

      for (; button < controller.buttons.length; button++) {
        let curVal = controller.buttons[button].value;
        let prevVal = this.states[player].buttons[button];

        if(curVal !== 0 && prevVal === 0) {
          this._onButtonEvent('press', player, button, curVal);
        }

        if(curVal !== 0 && prevVal !== 0) {
          this._onButtonEvent('hold', player, button, curVal);
        }

        if(curVal === 0 && prevVal !== 0) {
          this._onButtonEvent('release', player, button, curVal);
        }

        if(curVal === 0 && prevVal === 0) {
          delete this.delta[player]['button_' + button];
        }
      }

      for (; axis < controller.axes.length; axis++) {
        let curVal = controller.axes[axis];
        let prevVal = this.states[player].axes[axis];

        if((prevVal >= -this.axisThreshold && prevVal <= this.axisThreshold) &&
           (curVal <= -this.axisThreshold || curVal >= this.axisThreshold)) {
          this._onAxisEvent('press', player, axis, curVal);
          continue;
        }

        if(curVal <= -this.axisThreshold || curVal >= this.axisThreshold) {
          this._onAxisEvent('hold', player, axis, curVal);
          continue;
        }

        if((curVal >= -this.axisThreshold && curVal <= this.axisThreshold) &&
           (prevVal <= -this.axisThreshold || prevVal >= this.axisThreshold)) {
          this._onAxisEvent('release', player, axis, curVal);
          continue;
        }

        if(this.delta[player]['axis_' + axis] === 0) {
          delete this.delta[player]['axis_' + axis];
        }
      }

      this._setState(controller);
    }
  }

  /**
   * Set an event listender for a button or axis event.
   * @param {String} type The type of event to listen for.
   * @param {String} target The button or axis to listen to events for.
   * @param {Function} listener Called with event data when the event occurs.
   */
  on(type, target, listener) {
    if(this.mappings[target]){
      target = this.mappings[target].type + '_' + this.mappings[target].value;
    }

    if(!this.listeners[target]) {
      this.listeners[target] = {};
    }

    this.listeners[target][type] = listener;
  }

  /**
   * Remove the event listener from the button or axis.
   * @param {String} type The type of event to remove the listener for.
   * @param {String} target The button or axis to remove the listener for.
   */
  off(type, target) {
    if(this.mappings[target]){
      target = this.mappings[target].type + '_' + this.mappings[target].value;
    }

    if(!this.listeners[target] || !this.listeners[target][type]) {
      return;
    }

    this.listeners[target][type] = null;
  }

  /**
   * Check if a button is pressed or held.
   * @param {String} target The button to check if is down.
   * @param {Number} [player=-1] The gamepad to check, if -1, all are checked.
   * @return {Boolean} isDown If the button is pressed or held.
   */
  isDown(target, player = -1) {
    let buttonId = -1;

    if(this.mappings[target]) {
      buttonId = this.mappings[target].value;
    }

    if(buttonId === -1) {
      return false;
    }

    if(player !== -1) {
      return this.states[i].buttons.length && this.states[player].buttons[buttonId] > 0;
    }

    for(let i = 0; i < 4; i += 1) {
      if(this.states[i] &&
        this.states[i].buttons.length &&
        this.states[i].buttons[buttonId] !== 0) {
        return true;
      }
    }

    return false;
  }

  /**
   * Returns a number representing if an axis has moved, 0 if not, (-1,0] or [0,1) otherwise. 
   * @param {String} target
   * @param {Number} [player=-1]
   */
  isMoved(target, player = -1) {
    let buttonId = -1;

    if(this.mappings[target]) {
      buttonId = this.mappings[target].value;
    }

    if(buttonId === -1) {
      return 0;
    }

    if(player !== -1) {
      return this.states[i].axes.length && this.states[player].axes[buttonId] > 0;
    }

    for(let i = 0; i < 4; i += 1) {
      if(this.states[i] && this.states[i].axes.length &&
        (this.states[i].axes[buttonId] > this.axisThreshold ||
        this.states[i].axes[buttonId] < -this.axisThreshold)) {
        return this.states[i].axes[buttonId];
      }
    }

    return 0;
  }

  /**
   * Returns if the state of the buttons has changed since the last update.
   *
   * @param {Number} [player=-1] The gamepad to check for a delta, if -1, all are checked.
   * @return {Boolean} If there was a change since the last update in button/axis states.
   */
  hasDelta(player = -1) {
    if(player !== -1) {
      return Object.keys(this.delta[player]).length > 0;
    }

    for(let i = 0; i < 4; i +=1) {
      if(Object.keys(this.delta[i]).length > 0){
        return true;
      }
    }

    return false;

  }
}

module.exports = GamePadManager;

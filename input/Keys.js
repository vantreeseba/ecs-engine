/**
 * A helper to make testing for keypresses and etc easier.
 */
class Keys {
  /**
   * constructor
   */
  constructor() {
    this.keyState = {};
    this.lastState = {};
    this.delta = {};
    this.listeners = {
      press:{},
      hold:{},
      release:{},
    };

    document.addEventListener('keypress', (e) => {
      this.keyState[e.key] = true;
    });

    document.addEventListener('keyup', (e) => {
      this.keyState[e.key] = false;
    });
  }

  /**
   * Update the state of the keys.
   * Also triggers listeners based on state if any are set. 
   */
  update() {
    let isPressed;
    let wasPressed;
    let listener;
    let key;
    const keys = Object.keys(this.keyState);

    for(let i = 0; i < keys.length; i+= 1) {
      key = keys[i];
      isPressed = this.keyState[key] === true;
      wasPressed = this.lastState[key] === true;

      if(!wasPressed && isPressed) {
        this.lastState[key] = true;
        this.delta[key] = true;
        listener = this.listeners.press[key];
        if(listener) {
          listener();
        }
        continue;
      }

      if(wasPressed && isPressed) {
        delete this.delta[key];
        listener = this.listeners.hold[key];
        if(listener) {
          listener();
        }
        continue;
      }

      if(wasPressed && !isPressed) {
        this.lastState[key] = false;
        this.delta[key] = false;
        listener = this.listeners.release[key];
        if(listener) {
          listener();
        }
        continue;
      }

      if(!wasPressed && !isPressed) {
        delete this.delta[key];
      }
    }
  }

  /**
   * Set the event listener for a key event.
   * @param {String} type The type of event to listen for.
   * @param {String} key The key to listen to events for.
   * @param {Function} listener The handler called when this event occurs.
   */
  on(type, key, listener) {
    this.listeners[type][key] = listener;
  }

  /**
   * Remove the listener for this event for this key.
   * @param {String} type The type of event listener to remove
   * @param {String} key The key to remove the listener for
   */
  off(type, key) {
    delete this.listeners[type][key];
  }

  /**
   * Check if a key is pressed.
   * @param {String} key The key to check if is pressed.
   * @return {Boolean} isDown If the key is pressed.
   */
  isDown(key) {
    return this.keyState[key];
  }

  /**
   * Check if the keys state has changed since the last update.
   * @return {Boolean} True if keystate has changed since last update.
   */
  hasDelta() {
    return Object.keys(this.delta).length > 0;
  }
}

module.exports = Keys;

const MessageTypes = require('../shared/MessageTypes.js');
const ClientEvents = require('./ClientEvents');
const Keys = require('./Keys');
const Gamepad = require('./GamepadManager');

/**
 * Client
 */
class Client {
  /**
   * constructor
   */
  constructor() {
    this.primus = new Primus();
    this.keys = new Keys();
    this.gamepad = new Gamepad();
    this.primus.emit(MessageTypes.PLAYER_CONNECT, 'yo');

    this.init();
  }

  /**
   * Setup networking.
   */
  init() {
    const noop = (type) => {
      return () => {
        console.log(`Received message of type: ${type}. There is no handler registered for this message type.`);
      };
    };

    Object.keys(MessageTypes).forEach(type => {
      const fn = ClientEvents[type] || noop(type);
      this.primus.on(MessageTypes[type], fn.bind(this.primus));
    });
  }

  /**
   * Update loop.
   */
  update() {
    this.keys.update();
    this.gamepad.update();

    if(this.keys.hasDelta() || this.gamepad.hasDelta()) {
      this.primus.emit(MessageTypes.PLAYER_INPUT_SYNC, {
        keys: this.keys.delta,
        gamepad: this.gamepad.delta
      });
    }

    window.requestAnimationFrame(this.update.bind(this));
  }
}

var client = new Client();

client.update();

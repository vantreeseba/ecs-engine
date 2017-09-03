const MessageTypes = require('../shared/MessageTypes.js');
const ClientEvents = require('./ClientEvents');

const Entity = require('../shared/Entity.js');
const Components = require('./components');
const Systems = require('./systems');

const Engine = require('../shared/Engine.js');

/**
 * Client
 */
class Client extends Engine {
  /**
   * constructor
   */
  constructor() {
    super();

    this.primus = new Primus();
    this.primus.emit(MessageTypes.PLAYER_CONNECT, 'yo');

    this.init();
    this.systems = Object.keys(Systems).map(system => new Systems[system]({engine: this, primus: this.primus}));
  }

  /**
   * Setup networking.
   */
  init() {
    const noop = (type) => {
      return () => {
        console.log(`No handler for: ${type}.`);
      };
    };

    Object.keys(MessageTypes).forEach(type => {
      const fn = ClientEvents[type] || noop(type);
      this.primus.on(MessageTypes[type], fn.bind({engine: this, primus: this.primus}));
    });
  }

  /**
   * Update loop.
   */
  update() {
    super.update();
    window.requestAnimationFrame(this.update.bind(this));
  }
}


// TODO: Figure out where to send keystate?
// if(this.keys.hasDelta() || this.gamepad.hasDelta()) {
//   this.primus.emit(MessageTypes.PLAYER_INPUT_SYNC, {
//     keys: this.keys.delta,
//     gamepad: this.gamepad.delta
//   });
// }

module.exports = Client;

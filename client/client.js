const MessageTypes = require('../shared/MessageTypes.js');
const ClientEvents = require('./ClientEvents');
const Keys = require('./Keys');
const Gamepad = require('./GamepadManager');

const Entity = require('../shared/Entity.js');
const Components = require('./components');
const Systems = require('./systems');

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

    this.entities = [new Entity()];
    this.entities[0].addComponent(new Components.position());
    this.entities[0].addComponent(new Components.physics());


    // console.log(this.entities);
    this.systems = Object.keys(Systems).map(system => new Systems[system]());
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

    this.keys.on('press', 'a', () => {
      console.log(this.entities);
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

    this.systems.forEach(s => s.update(this.entities));

    window.requestAnimationFrame(this.update.bind(this));
  }
}

var client = new Client();

client.update();

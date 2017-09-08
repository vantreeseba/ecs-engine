const MessageTypes = require('../shared/MessageTypes.js');
const ClientEvents = require('./ClientEvents');

const Entity = require('../shared/Entity.js');
const Components = require('../shared/components');
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
    this.primus.emit(MessageTypes.PLAYER_CONNECT);

    this.debug = true;
    this.pingTime = Date.now();
    this.ping = 0;

    this.init();
    this.systems = Object.keys(Systems).map(system => new Systems[system]({
      engine: this,
      primus: this.primus,
      tickRate: 60,
    }));

    if(this.debug) {
      this.debugStats = document.createElement('div');
      let debugTitle = document.createElement('div');
      this.debugStats.style.position = 'absolute';
      this.debugStats.style.top = '100px';
      this.debugStats.style.right = '100px';

      debugTitle.innerText = 'STATS';
      this.debugStats.appendChild(debugTitle);

      this.debugFPS = document.createElement('div');
      this.debugStats.appendChild(this.debugFPS);

      this.debugPing = document.createElement('div');
      this.debugStats.appendChild(this.debugPing);

      document.body.appendChild(this.debugStats);
    }

    this.primus.emit(MessageTypes.PING);
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

    if(this.debug) {
      this.displayDebugInfo();
    }
  }

  /**
   * displayDebugInfo
   */
  displayDebugInfo() {
    this.debugFPS.innerText = `FPS: ${Math.round(this.fps)}`;
    this.debugPing.innerText = `PING: ${Math.round(this.ping)}`;
  }

  pingServer() {
  }
}

module.exports = Client;

/**
 * An event manager for passing messages between systems.
 */
class EventManager {
  /**
   */
  constructor(engine) {
    this.engine = engine;
    this.listeners = new Map();
  }

  /**
   * Emit an event of type with data.
   * @param {string} type The type of event to emit.
   * @param {Object} data The data associated with the event.
   */
  emit(type, data) {
    const listeners = this.listeners.get(type);
    if(listeners) {
      listeners.forEach(listener => listener(data));
    }
  }

  /**
   * Register a listener for an event type.
   * @param {String} type The type of the event to listen for.
   * @param {Function} listener Function called with data from any emitted events.
   */
  on(type, listener) {
    if(!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }

    this.listeners.get(type).push(listener);
  }

  /**
   * Remove an event listener.
   * @param {String} type The type of event to remove the listener for.
   * @param {Function} listener The listener to remove.
   */
  off(type, listener) {
    if(this.listeners.get(type)) {
      this.listeners.set(type, this.listeners.get(type).filter(x => x !== listener));
    }
  }
}

module.exports = EventManager;

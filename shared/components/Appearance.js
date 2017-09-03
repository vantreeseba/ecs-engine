const Component = require('./Component');

/**
 * A component representing the appearance of an entity.
 * @extends {Component}
 */
class Appearance extends Component {
  /**
   * constructor
   * @param {Number} value The appearance of this entity.
   */
  constructor() {
    super({
      r: Math.floor(Math.random() * 255),
      g: Math.floor(Math.random() * 255),
      b: Math.floor(Math.random() * 255),
    });
  }
}

module.exports = Appearance;

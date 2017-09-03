const Component = require('./Component');

/**
 * A component representing the health of an entity.
 * @extends {Component}
 */
class Health extends Component {
  /**
   * constructor
   * @param {Number} value The health of this entity.
   */
  constructor(value) {
    super(value);
  }
}

module.exports = Health;

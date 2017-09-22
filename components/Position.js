const Component = require('./Component');
const Vector = require('../utils/Vector');

/**
 * A component representing a position.
 * @extends {Component}
 */
class Position extends Component {
  /**
   * constructor
   * @param {Object} params The position of this entity.
   */
  constructor(params) {
    if(!params) {
      params = new Vector();
    }
    super(params);
  }
}

module.exports = Position;

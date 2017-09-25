const Component = require('./Component');

/**
 * A component representing a position.
 * @extends {Component}
 */
class Rotation extends Component {
  /**
   * constructor
   * @param {Object} params The position of this entity.
   */
  constructor(params) {
    if(params === undefined) {
      params = 0;
    }
    super(params);
  }
}

module.exports = Rotation;

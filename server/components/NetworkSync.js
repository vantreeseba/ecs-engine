const Component = require('./Component');

/**
 * A component representing the health of an entity.
 */
class NetworkSync extends Component {
  /**
   * constructor
   */
  constructor() {
    super();

    this.new = true;
  }
}

module.exports = NetworkSync;

const Component = require('../../shared/components/Component');

/**
 * A component representing the health of an entity.
 */
class NetworkSync extends Component {
  /**
   * constructor
   */
  constructor(id) {
    super({netId: id});
  }
}

module.exports = NetworkSync;

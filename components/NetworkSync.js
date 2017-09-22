const Component = require('./Component');

/**
 * A component representing the network id.
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

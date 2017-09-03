const Component = require('../../shared/components/Component');

/**
 * A component representing the health of an entity.
 */
module.exports = class NetworkSync extends Component {
  /**
   * constructor
   */
  constructor(id) {
    super({netId: id});
  }
}

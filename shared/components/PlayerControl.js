const Component = require('./Component');

/**
 * A component representing if entity is player controlled. 
 * @extends {Component}
 */
class PlayerControl extends Component {
  /**
   * constructor
   */
  constructor() {
    super(true);
  }
}

module.exports = PlayerControl;

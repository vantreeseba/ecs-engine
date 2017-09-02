const Component = require('./Component');

/**
 * A component representing if entity is player controlled. 
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

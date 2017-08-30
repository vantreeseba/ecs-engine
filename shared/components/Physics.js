const Component = require('./Component');
const Vector = require('../Vector');

/**
 * A component representing a position.
 */
class Physics extends Component {
  /**
   * constructor
   * @param {Object} params The position of this entity.
   */
  constructor(params) {
    super(params);

    if(!params || !params.vel) {
      this.vel = new Vector();
    }

    if(!params || !params.acc) {
      this.acc = new Vector();
    }

    if(!params || !params.maxSpeed) {
      this.maxSpeed = 1;
    }
  }
}

module.exports = Physics;

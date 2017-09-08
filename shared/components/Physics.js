const Component = require('./Component');
const Vector = require('../Vector');

/**
 * A component representing a position.
 * @extends {Component}
 */
class Physics extends Component {
  /**
   * constructor
   * @param {Object} params The position of this entity.
   */
  constructor(params) {
    super(params);

    if(!params || !params.vel) {
      this.vel = {x:0, y:0};
    }

    if(!params || !params.acc) {
      this.acc = {x:0, y:0};
    }

    if(!params || !params.maxSpeed) {
      this.maxSpeed = 0.1;
    }
  }
}

module.exports = Physics;

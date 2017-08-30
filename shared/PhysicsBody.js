const Vector = require('./Vector');

class PhysicsBody {
  constructor(x = 0, y = 0) {
    this.pos = new Vector(x, y);
    this.acc = new Vector();
    this.vel = new Vector();

    this.maxForce = 1;
    this.maxSpeed = 1;
  }

  get x() {
    return this.pos.x;
  }

  set x(x) {
    this.pos.x = x;
  }

  get y() {
    return this.pos.x;
  }

  get y() {
    this.pos.y = y;
  }

  applyForce(force) {
    this.acc.add(force.limit(this.maxForce));
  }

  update() {
    if(this.acc.mag() === 0) {
      this.vel.scale(0);
    }
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);

    this.acc.scale(0);
  }
}

module.exports = PhysicsBody;

const System = require('../../shared/systems/System');
/**
 * @type {DebugRender}
 * @extends {System}
 */
class DebugRender extends System {
  /**
   * constructor
   */
  constructor() {
    // TODO: Add appearance component.
    super(['position', 'appearance']);

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'debugRender';
    this.canvas.width = 400;
    this.canvas.height= 400;


    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * Run the system on the entities.
   * @param {Array} entities
   */
  update(entities) {
    let i = 0, entity, pos, app;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for(; i < entities.length; i += 1) {
      entity = entities[i];
      pos = entity.position;
      app = entity.appearance;

      this.ctx.fillStyle = `rgb(${app.r}, ${app.g}, ${app.b})`;
      this.ctx.fillRect(pos.x, pos.y, 10, 10);
    }
  }

}

module.exports = DebugRender;

const systems = require('../../shared/systems');
// const systems = [];
systems.push(require('./DebugRender'));
systems.push(require('./PlayerControl'));

module.exports = systems;

const systems = require('../../shared/systems');

systems.push(require('./DebugRender'));
systems.push(require('./PlayerControl'));

module.exports = systems;

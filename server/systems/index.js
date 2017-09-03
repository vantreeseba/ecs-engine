const systems = require('../../shared/systems');

systems.push(require('./NetworkSync'));
systems.push(require('./PlayerControl'));

module.exports = systems;

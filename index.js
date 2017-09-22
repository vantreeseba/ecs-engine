/** @namespace ECS **/
module.exports = {
  Engine: require('./Engine.js'),
  Entities: {
    Entity: require('./entities/Entity.js'),
  },
  Components: require('./components'),
  Systems: require('./systems'),
  Utils: require('./utils')
};

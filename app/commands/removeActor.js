import _ from 'lodash';

export default (actor, world) => {
  const actorIndex = world.actors.indexOf(actor);
  if (actorIndex === -1) {
    return;
  }
  world.actors.splice(actorIndex, 1);
};

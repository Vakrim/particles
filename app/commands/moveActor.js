import _ from 'lodash';
import removeActor from 'app/commands/removeActor';

export default (actor, step, world) => {
  const newPosition = {
    x: actor.position.x + step.x,
    y: actor.position.y + step.y,
  };
  const isOcupied = !!_.find(world.actors, { position: newPosition });
  if (isOcupied) return;
  actor.moveTo(newPosition);
  actor.changeEnergy(-1);
  if (actor.energy <= 0) {
    removeActor(actor, world);
  }
};

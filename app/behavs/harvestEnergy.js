import _ from 'lodash';
import moveActor from 'app/commands/moveActor';
import splitActor from 'app/commands/splitActor';

export default (actor, world) => {
  const actorPosition = actor.position;
  const closestEnergy = _.minBy(
    world.energies,
    energy =>
      Math.abs(energy.position.x - actorPosition.x) +
      Math.abs(energy.position.y - actorPosition.y)
  );

  if (!closestEnergy) return;

  let moveX = false,
    moveY = false,
    move;
  if (actorPosition.x < closestEnergy.position.x) {
    moveX = { x: 1, y: 0 };
  } else if (actorPosition.x > closestEnergy.position.x) {
    moveX = { x: -1, y: 0 };
  }
  if (actorPosition.y < closestEnergy.position.y) {
    moveY = { x: 0, y: 1 };
  } else if (actorPosition.y > closestEnergy.position.y) {
    moveY = { x: 0, y: -1 };
  }

  if (moveX && moveY) {
    move = Math.random() < 0.5 ? moveX : moveY;
  } else {
    move = moveX || moveY;
  }

  if (move) {
    moveActor(actor, move, world);
  } else {
    actor.changeEnergy(50);
    world.removeEnergy(closestEnergy);

    if (actor.energy > 250) {
      splitActor(actor, world);
    }
  }
};

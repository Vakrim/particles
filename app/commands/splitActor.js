import _ from 'lodash';
import Actor from 'app/actor';

export default (actor, world) => {
  actor.energy /= 2;
  world.actors.push(
    new Actor({
      position: { x: actor.position.x + 1, y: actor.position.y },
      energy: actor.energy,
      team: actor.team,
    })
  );
};

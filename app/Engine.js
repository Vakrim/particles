import Actor from 'app/actor';
import _ from 'lodash';
import harvestEnergy from 'app/behavs/harvestEnergy';
import Rx from 'rxjs/Rx';
import { createList } from 'app/helpers';

export default class Engine {
  constructor(world) {
    this.world = world;
    this.frameCount = 0;
    this.frames = new Rx.Subject();
  }

  seedWorld() {
    const actors = createList(
      30,
      i =>
        new Actor({
          position: { x: _.random(0, 50), y: _.random(0, 50) },
          team: i,
        })
    );
    this.world.addActors(...actors);
    const energies = createList(100, () => ({
      position: { x: _.random(0, 150), y: _.random(0, 150) },
    }));
    this.world.addEnergies(...energies);
  }

  step() {
    this.frameCount++;
    this.world.actors.forEach(actor => harvestEnergy(actor, this.world));
    this.frames.next(this.frameCount);

    if (this.world.energies.length < 50) {
      this.world.addEnergies({
        position: { x: _.random(0, 150), y: _.random(0, 150) },
      });
    }
  }
}

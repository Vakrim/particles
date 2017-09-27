class World {
  actors = [];
  energies = [];

  addActors(...items) {
    this.actors.push(...items);
  }

  addEnergies(...items) {
    this.energies.push(...items);
  }

  removeEnergy(energy) {
    const index = this.energies.indexOf(energy);
    this.energies.splice(index, 1);
  }
}

export default new World();

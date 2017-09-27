class Actor {
  constructor({ position, energy = 100, team }) {
    this.position = position;
    this.energy = energy;
    this.team = team;
  }

  moveTo({ x, y }) {
    this.position.x = x;
    this.position.y = y;
  }

  changeEnergy(energyChange) {
    this.energy += energyChange;
  }
}

export default Actor;

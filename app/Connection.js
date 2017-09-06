export const connections = [];

let id = 0;

export default class Connection {
  constructor(a, b) {
    this.id = id++;
    this.a = a;
    this.b = b;
    this.k = 50;
    this.rotK = 10;
    this.A2BAngle = Math.atan2(b.x - a.x, b.y - a.y) - this.a.angle;
    this.B2AAngle = Math.atan2(a.x - b.x, a.y - b.y) - this.b.angle;
    connections.push(this);
  }

  stepLinearSpring(t) {
    const distance =
      ((this.a.x - this.b.x) ** 2 + (this.a.y - this.b.y) ** 2) ** 0.5;
    const force = (distance - 10) * this.k;
    const forceX = (this.b.x - this.a.x) * force / distance;
    const forceY = (this.b.y - this.a.y) * force / distance;
    this.a.applyForce(forceX, forceY, t);
    this.b.applyForce(-forceX, -forceY, t);
  }

  stepSpiralSpring(t) {
    const distance =
      ((this.a.x - this.b.x) ** 2 + (this.a.y - this.b.y) ** 2) ** 0.5;
    const currentA2BDiff = normalizeAngle(
      this.A2BAngle - Math.atan2(this.b.x - this.a.x, this.b.y - this.a.y) + this.a.angle
    );
    this.id == 0 && console.log(currentA2BDiff);
    this.a.applyTorque(currentA2BDiff * this.rotK, t);
    this.b.applyForce(
      (this.a.y - this.b.y) * currentA2BDiff * this.rotK / distance ** 2,
      -(this.a.x - this.b.x) * currentA2BDiff * this.rotK / distance ** 2,
      t
    );

    const currentB2ADiff = normalizeAngle(
      this.B2AAngle - Math.atan2(this.a.x - this.b.x, this.a.y - this.b.y) + this.b.angle
    );
    this.b.applyTorque(currentB2ADiff * this.rotK, t);
    this.a.applyForce(
      (this.b.y - this.a.y) * currentB2ADiff * this.rotK / distance ** 2,
      -(this.b.x - this.a.x) * currentB2ADiff * this.rotK / distance ** 2,
      t
    );
  }

  step(t) {
    this.stepLinearSpring(t);
    this.stepSpiralSpring(t);
  }
}

const normalizeAngle = angle => {
  while (angle < -Math.PI) angle += Math.PI * 2;
  while (angle > Math.PI) angle -= Math.PI * 2;
  return angle;
};

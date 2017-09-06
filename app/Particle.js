export const particles = [];

export default class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;
    this.angularVelocity = 0;
    this.mass = 1;
    this.momentOfInertia = this.mass;
    particles.push(this);
  }

  initRender(PIXI, app) {
    this.ren = new PIXI.Graphics();
    app.stage.addChild(this.ren);
    this.ren.lineStyle(0);
    this.ren.beginFill(0xffff0b, 0.5);
    this.ren.drawCircle(0, 0, 5);
    this.ren.endFill();
    this.ren.lineStyle(2, 0x000000).moveTo(0,0).lineTo(0, -10);
  }

  step(t) {
    // this.vy += t * 10;
    this.x += this.vx * t;
    this.y += this.vy * t;
    this.angle += this.angularVelocity * t;

    this.vx *= 0.98;
    this.vy *= 0.98;
    this.angularVelocity *= 0.98;

    if (this.y > 500) {
      this.y = 500;
      this.vy *= -0.5;
    } else if (this.y < 0) {
      this.y = 0;
      this.vy *= -0.5;
    }

    if (this.x > 500) {
      this.x = 500;
      this.vx *= -0.5;
    } else if (this.x < 0) {
      this.x = 0;
      this.vx *= -0.5;
    }
  }

  applyForce(fx, fy, t) {
    this.vx += fx / this.mass * t;
    this.vy += fy / this.mass * t;
  }

  applyTorque(torque, t) {
    this.angularVelocity += torque / this.momentOfInertia * t;
  }

  render() {
    this.ren.x = this.x;
    this.ren.y = this.y;
    this.ren.rotation = this.angle;
  }
}

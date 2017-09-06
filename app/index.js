import Particle, { particles } from './Particle';
import Connection, { connections } from './Connection';
import 'pixi.js';

var app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const PARTICLES_COUNT = 10;

for (let i = 0; i < PARTICLES_COUNT; i++) {
  let p = new Particle(50 + i * 10, 50);
  p.initRender(PIXI, app);
}
for (let i = 0; i < PARTICLES_COUNT - 1; i++) {
  new Connection(particles[i], particles[i + 1]);
}
particles[1].vy = 4;


app.ticker.add(function() {
  particles.forEach(particle => particle.step(1 / 60));
  connections.forEach(conn => conn.step(1 / 60));
  particles.forEach(particle => particle.render());
});

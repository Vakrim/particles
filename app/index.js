import world from 'app/world';
import Engine from 'app/Engine';
import Render from 'app/render';
import 'app/network';

const engine = new Engine(world);
engine.seedWorld();

window.world = world;
let running = true;

let n = 0;
const step = () => {
  n++;
  engine.step();
  if (running) {
    setTimeout(step);
  }
};
step();

const frame = () => {
  if (n) {
    Render.render(world);
    n = 0;
  }
  requestAnimationFrame(frame);
};

document.addEventListener('keydown', e => {
  if (e.key === 's') {
    if (running) {
      running = false;
    } else {
      running = true;
      step();
    }
  }
});

frame();

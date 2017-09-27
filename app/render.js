const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.display = 'block';
canvas.style.background = '#000000';
document.body.style.margin = 0;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const TS = 5;

class Render {
  render(world) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    world.actors.forEach(actor => {
      ctx.fillRect(actor.position.x * TS, actor.position.y * TS, TS, TS);
    });

    ctx.fillStyle = '#ffff00';
    world.energies.forEach(actor => {
      ctx.fillRect(actor.position.x * TS, actor.position.y * TS, TS, TS);
    });
  }
}

export default new Render();

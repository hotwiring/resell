const canvas = document.getElementById("fire-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 10,
    size: Math.random() * 5 + 2,
    speedY: Math.random() * 2 + 1,
    alpha: 1
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.y -= p.speedY;
    p.alpha -= 0.01;
    if (p.alpha <= 0) particles[i] = createParticle();

    ctx.fillStyle = `rgba(255, 100, 0, ${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
}

for (let i = 0; i < 100; i++) {
  particles.push(createParticle());
}
draw();

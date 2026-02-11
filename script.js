// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let bullets = [];
let targets = [];
let score = 0;
// Create player
const player = {
 x: canvas.width / 2,
 y: canvas.height - 50,
 width: 50,
 height: 50,
};
// Create targets
function spawnTarget() {
 const target = {
   x: Math.random() * canvas.width,
   y: -50,
   width: 50,
   height: 50,
   speed: Math.random() * 2 + 1,
 };
 targets.push(target);
}
// Shoot bullets
function shootBullet() {
 bullets.push({ x: player.x + player.width / 2, y: player.y, speed: -5 });
}
// Update game objects
function update() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 // Draw player
 ctx.fillStyle = 'blue';
 ctx.fillRect(player.x, player.y, player.width, player.height);
 // Draw bullets
 bullets.forEach((bullet, index) => {
   bullet.y += bullet.speed;
   ctx.fillStyle = 'red';
   ctx.fillRect(bullet.x, bullet.y, 5, 10);
   // Remove off-screen bullets
   if (bullet.y < -10) bullets.splice(index, 1);
 });
 // Draw targets
 targets.forEach((target, index) => {
   target.y += target.speed;
   ctx.fillStyle = 'green';
   ctx.fillRect(target.x, target.y, target.width, target.height);
   // Check collision with bullets
   bullets.forEach((bullet, bIndex) => {
     if (
       bullet.x > target.x &&
       bullet.x < target.x + target.width &&
       bullet.y > target.y &&
       bullet.y < target.y + target.height
     ) {
       targets.splice(index, 1);
       bullets.splice(bIndex, 1);
       score++;
     }
   });
   // Remove off-screen targets
   if (target.y > canvas.height) targets.splice(index, 1);
 });
 // Display score
 ctx.fillStyle = 'white';
 ctx.font = '20px Arial';
 ctx.fillText(`Score: ${score}`, 10, 30);
 requestAnimationFrame(update);
}
// Handle controls
window.addEventListener('keydown', (e) => {
 if (e.key === 'ArrowLeft' && player.x > 0) player.x -= 20;
 if (e.key === 'ArrowRight' && player.x + player.width < canvas.width)
   player.x += 20;
});
window.addEventListener('click', shootBullet);
// Spawn targets periodically
setInterval(spawnTarget, 1000);
// Start game loop
update();
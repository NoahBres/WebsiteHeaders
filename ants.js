const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let branches = [];
let mouseX = 0;
let mouseY = 0;

let randomBranches = [];
let randomX = 0;
let randomY = 0;

const timeBetweenChoosey = 3000;

const tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';

class Branch {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.life = 500;
		this.angle = Math.random() * 360;
	}
	
	tick(ctx) {
		this.life--;
		
		ctx.beginPath();
		ctx.strokeStyle = "#87b5ff";
		
		ctx.moveTo(this.x, this.y);
		
		this.angle += Math.random() - .5;
		this.x += Math.cos(this.angle);
		this.y += Math.sin(this.angle);
		
		ctx.lineTo(this.x, this.y);
		
		ctx.stroke();
		ctx.closePath();
	}
}

function loop() {
	if(branches.length < 500)
		branches.push(new Branch(mouseX, mouseY));
	
	if(randomBranches.length < 300)
		randomBranches.push(new Branch(randomX, randomY));

	branches.forEach((b) => {
		if(b.life <= 0) {
			branches.shift();
		}
		
		b.tick(ctx);
	});
	
	randomBranches.forEach((b) => {
		if(b.life <= 0) {
			randomBranches.shift();
		}
		
		b.tick(ctx);
	});

	ctx.fillStyle = "rgba(0, 0, 50, 0.1)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function init() {
	resizeCanvas();
	
	chooseRandomAnts();
	setInterval(loop, 1000 / 60);
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function mouseMove(e) {
	if(e.touches) {
		e.preventDefault();
		e = e.touches[0];
	}
	
	mouseX = e.clientX;
	mouseY = e.clientY;
}

function chooseRandomAnts() {
	randomX = Math.random() * canvas.width;
	randomY = Math.random() * canvas.height;

	setTimeout(chooseRandomAnts, timeBetweenChoosey);
}

window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('mousemove', mouseMove, false);

init();
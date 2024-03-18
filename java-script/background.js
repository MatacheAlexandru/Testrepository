const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let w, h, particles;
let particleDistance = 50;
let mouse = {
    x: undefined,
    y: undefined,
    radius: 200,
};

let lastMouseMoveTime = Date.now();
const mouseStillDelay =300;
0
function init() {
    resizeReset();
    animationLoop();
}

function resizeReset() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

    particles = [];
    for (let y = (((h - particleDistance) % particleDistance) + particleDistance) / 2; y < h; y += particleDistance) {
        for (let x = (((w - particleDistance) % particleDistance) + particleDistance) / 2; x < w; x += particleDistance) {
            particles.push(new Particle(x, y));
        }
    }
}

function animationLoop() {
    ctx.clearRect(0, 0, w, h);
    drawScene();
    requestAnimationFrame(animationLoop);
}

function drawScene() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    drawLine();
}

function drawLine() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < particleDistance * 0) {
                opacity = 1 - distance / (particleDistance * 0);
                ctx.strokeStyle = "rgba(255,255,0," + opacity + ")";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function mousemove(e) {
    lastMouseMoveTime = Date.now();
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function mouseout() {
    mouse.x = undefined;
    mouse.y = undefined;
}

function isMouseMoving() {
    // Verificăm dacă a trecut timpul de mouse-nemișcat
    return Date.now() - lastMouseMoveTime < mouseStillDelay;
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 50;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speed = Math.random() * 800 + 30;
    }
    draw() {
        ctx.fillStyle = "rgba(255,165,0,1)";
        ctx.beginPath();
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        if (isMouseMoving()) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let maxDistance = mouse.radius;

            let force = (maxDistance - distance) / maxDistance; // 0 ~ 1
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let directionX = forceDirectionX * force * this.speed;
            let directionY = forceDirectionY * force * this.speed;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 4;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 4;
                }
            }
        } else {
            // Dacă mouse-ul este nemișcat, anulăm influența sa asupra particulei
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 15;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 15;
            }
        }
    }
}

init();
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);




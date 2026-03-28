const config = {
    password: "noreen",
    letter: "Happy Birthday,\n\nI wanted to create something as unique and beautiful as you are. Even though we are miles apart, you are always the first thing on my mind.\n\nThank you for being my constant. I love you more than words can say.\n\nForever yours,\nYour Sharique ❤️"
};

// 1. Scene Transitions
window.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro-screen');
    const lock = document.getElementById('lock-screen');
    const main = document.getElementById('main-experience');

    // After Intro animation ends (4s), show Lock Screen
    setTimeout(() => {
        intro.classList.add('hidden');
        lock.classList.remove('hidden');
    }, 4500);

    // Password Logic
    const unlockBtn = document.getElementById('unlockBtn');
    const passInput = document.getElementById('passwordInput');
    const errorMsg = document.getElementById('error-msg');

    unlockBtn.addEventListener('click', () => {
        if (passInput.value.toLowerCase() === config.password) {
            lock.classList.add('hidden');
            main.classList.remove('hidden');
            startExperience();
        } else {
            errorMsg.innerText = "That's not it, my love. Try again? ❤️";
            passInput.value = "";
        }
    });
});

// 2. The Experience (Particles + Typewriter)
function startExperience() {
    initParticles();
    typeWriter();
}

function typeWriter() {
    const element = document.getElementById('typewriter-text');
    let i = 0;
    function type() {
        if (i < config.letter.length) {
            element.innerHTML += config.letter.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();
}

// 3. Canvas Particles (Floating Glows)
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 60;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(255, 182, 193, ${Math.random() * 0.5})`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "white";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

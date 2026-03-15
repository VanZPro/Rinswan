// ===== DOM Elements =====
const screens = document.querySelectorAll('.screen');
const btnOpen = document.getElementById('btnOpen');
const btnNext = document.getElementById('btnNext');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const heartsContainer = document.getElementById('heartsContainer');
const sparklesContainer = document.getElementById('sparklesContainer');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const dateText = document.getElementById('dateText');

// ===== State =====
let musicPlaying = false;
let noClickCount = 0;

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    createSparkles();
    setDate();

    // Also click envelope to open
    document.getElementById('envelope').addEventListener('click', () => {
        btnOpen.click();
    });
});

function showScreen(screenId) {
    // Remove active from all screens
    screens.forEach(s => {
        s.classList.remove('active');
    });

    // Show the target screen
    const target = document.getElementById(screenId);
    target.classList.add('active');

    // Trigger story card animations
    if (screenId === 'screen-story') {
        setTimeout(() => animateStoryCards(), 200);
    }

    // Trigger petals on confession screen
    if (screenId === 'screen-confession') {
        createRosePetals();
    }

    // Trigger fireworks on yes screen
    if (screenId === 'screen-yes') {
        startCelebration();
    }
}

// ===== Button Handlers =====
btnOpen.addEventListener('click', () => {
    showScreen('screen-story');
    tryPlayMusic();
});

btnNext.addEventListener('click', () => {
    showScreen('screen-confession');
});

btnYes.addEventListener('click', () => {
    showScreen('screen-yes');
});

// ===== No Button Easter Egg =====
btnNo.addEventListener('click', () => {
    noClickCount++;

    const messages = [
        'Yakin nih? 🥺',
        'Coba pikir lagi ya... 💭',
        'Aku serius loh... 😢',
        'Pleasee... 🥹',
        'Satu kesempatan lagi? 🙏',
        'Aku ga bisa tanpa kamu... 💔',
        'Tolong jangan gitu... 😭',
        'Aku tunggu sampai kapanpun... ⏳'
    ];

    // Change button text
    const msgIndex = Math.min(noClickCount - 1, messages.length - 1);
    btnNo.querySelector('span:last-child').textContent = messages[msgIndex];

    // Make yes button bigger
    const currentScale = 1 + (noClickCount * 0.15);
    btnYes.style.transform = `scale(${currentScale})`;

    // Make no button smaller
    const noScale = Math.max(0.5, 1 - (noClickCount * 0.1));
    btnNo.style.transform = `scale(${noScale})`;
    btnNo.style.opacity = Math.max(0.3, 1 - (noClickCount * 0.15));

    // Move the no button randomly after 3 clicks
    if (noClickCount >= 3) {
        btnNo.classList.add('running');
        const maxX = window.innerWidth * 0.3;
        const maxY = 50;
        const randX = (Math.random() - 0.5) * maxX;
        const randY = (Math.random() - 0.5) * maxY;
        btnNo.style.transform = `scale(${noScale}) translate(${randX}px, ${randY}px)`;
    }

    // After too many clicks, just accept
    if (noClickCount >= 8) {
        btnNo.style.display = 'none';
        btnYes.style.transform = 'scale(1.3)';
    }
});

// ===== Floating Hearts =====
function createFloatingHearts() {
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '♥', '🤍', '💜'];
    const count = 20;

    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (12 + Math.random() * 20) + 'px';
        heart.style.animationDuration = (8 + Math.random() * 12) + 's';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heart.style.opacity = 0.1 + Math.random() * 0.3;
        heartsContainer.appendChild(heart);
    }
}

// ===== Sparkles =====
function createSparkles() {
    const count = 40;

    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDuration = (2 + Math.random() * 3) + 's';
        sparkle.style.animationDelay = Math.random() * 5 + 's';
        sparkle.style.width = sparkle.style.height = (2 + Math.random() * 3) + 'px';
        sparklesContainer.appendChild(sparkle);
    }
}

// ===== Story Card Animations =====
function animateStoryCards() {
    const cards = document.querySelectorAll('.story-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 300 + index * 400);
    });
}

// ===== Rose Petals =====
function createRosePetals() {
    const container = document.getElementById('rosePetals');
    const colors = ['#ff6b9d', '#e84393', '#c94b7c', '#ffd6e0', '#a855f7'];

    for (let i = 0; i < 30; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.background = colors[Math.floor(Math.random() * colors.length)];
        petal.style.width = (10 + Math.random() * 15) + 'px';
        petal.style.height = (10 + Math.random() * 15) + 'px';
        petal.style.animationDuration = (4 + Math.random() * 6) + 's';
        petal.style.animationDelay = Math.random() * 8 + 's';
        petal.style.opacity = 0.2 + Math.random() * 0.4;
        container.appendChild(petal);
    }
}

// ===== Celebration =====
function startCelebration() {
    createFireworks();
    createConfetti();

    // Continuous fireworks
    setInterval(() => {
        createFireworks();
    }, 2000);

    setInterval(() => {
        createConfetti();
    }, 3000);
}

function createFireworks() {
    const container = document.getElementById('fireworksContainer');
    const colors = ['#ff6b9d', '#a855f7', '#f39c12', '#e84393', '#ff9ff3', '#ffd6e0', '#00d2d3'];

    for (let fw = 0; fw < 3; fw++) {
        const centerX = Math.random() * window.innerWidth;
        const centerY = Math.random() * window.innerHeight * 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.background = color;
            particle.style.boxShadow = `0 0 6px ${color}`;

            const angle = (Math.PI * 2 / 20) * i;
            const distance = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance + 30; // gravity

            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.animationDelay = (fw * 0.5) + 's';

            container.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 2000 + fw * 500);
        }
    }
}

function createConfetti() {
    const container = document.getElementById('fireworksContainer');
    const colors = ['#ff6b9d', '#a855f7', '#f39c12', '#e84393', '#ff9ff3', '#00d2d3', '#feca57', '#ff6348'];

    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (5 + Math.random() * 10) + 'px';
        confetti.style.height = (5 + Math.random() * 10) + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// ===== Music =====
function tryPlayMusic() {
    bgMusic.volume = 0.3;
    bgMusic.play().then(() => {
        musicPlaying = true;
        musicToggle.classList.add('playing');
    }).catch(() => {
        // Autoplay was prevented
    });
}

musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicPlaying = false;
        musicToggle.classList.remove('playing');
        musicToggle.textContent = '🔇';
    } else {
        bgMusic.play().then(() => {
            musicPlaying = true;
            musicToggle.classList.add('playing');
            musicToggle.textContent = '🎵';
        });
    }
});

// ===== Set Date =====
function setDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formatted = now.toLocaleDateString('id-ID', options);
    dateText.textContent = `📅 ${formatted} — Hari dimana kita resmi bersama 💑`;
}

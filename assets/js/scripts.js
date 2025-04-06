// This file contains JavaScript code for interactive features of the website, such as form validation, animations, or dynamic content loading.

document.addEventListener('DOMContentLoaded', function() {
    // Example of a simple form validation
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            if (!name || !email) {
                event.preventDefault();
                alert('Please fill in all fields.');
            }
        });
    }

    // Example of a simple animation on scroll
    const elements = document.querySelectorAll('.fade-in');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    elements.forEach(element => {
        observer.observe(element);
    });

    const fallingLettersContainer = document.getElementById('falling-letters');
    const letters = 'CORDERLL'; // Allowed letters
    const maxFallingObjects = 50; // Limit the number of falling objects
    let currentFallingObjects = 0;

    // Initialize Matter.js
    const { Engine, Render, Runner, Bodies, Composite, World, Events } = Matter;

    // Create the physics engine
    const engine = Engine.create();
    const world = engine.world;

    // Create the renderer
    const render = Render.create({
        element: fallingLettersContainer,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: 'white', // Clean white background
        },
    });

    Render.run(render);

    // Create the runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Function to create a falling letter
    const createFallingLetter = () => {
        if (currentFallingObjects >= maxFallingObjects) return; // Limit the number of objects

        const x = Math.random() * window.innerWidth; // Random x position
        const letter = letters[Math.floor(Math.random() * letters.length)]; // Random letter

        // Create an HTML element for the letter
        const letterElement = document.createElement('span');
        letterElement.textContent = letter;
        letterElement.className = 'falling-letter';
        letterElement.style.left = `${x}px`; // Set random horizontal position
        letterElement.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random fall duration
        fallingLettersContainer.appendChild(letterElement);

        currentFallingObjects++;

        // Remove the letter after the animation ends
        letterElement.addEventListener('animationend', () => {
            fallingLettersContainer.removeChild(letterElement);
            currentFallingObjects--;
        });
    };

    // Create letters at intervals
    setInterval(createFallingLetter, 200);

    // Handle window resize
    window.addEventListener('resize', () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
    });
});

const createBlackParticles = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return; // Exit if the container doesn't exist

    const canvas = document.createElement('canvas');
    canvas.id = `${containerId}-particle-canvas`;
    container.appendChild(canvas); // Add canvas to the specified container
    const ctx = canvas.getContext('2d');

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const particles = Array(100).fill().map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1,
        color: 'rgba(0, 0, 0, 0.8)', // Black particles with slight transparency
    }));

    const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
    };

    const updateParticles = () => {
        particles.forEach((p) => {
            p.x += p.dx;
            p.y += p.dy;

            // Bounce particles off edges
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });
    };

    const animateParticles = () => {
        drawParticles();
        updateParticles();
        requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });
};

// Scroll Reveal Animation
const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        revealElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on page load
};

// Initialize animations and particles on specific pages
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.id === 'about-page') {
        createBlackParticles('about-container');
    }
    if (document.body.id === 'projects-page') {
        createBlackParticles('projects-container');
    }

    initScrollReveal(); // Initialize scroll reveal animations
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about-section');

    const revealOnScroll = () => {
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                section.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on page load
});

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.display = 'none';
    }, 3000);
});
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#00d4ff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00d4ff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Smooth scrolling for navigation links
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Close mobile navigation after selecting an item
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Mobile navigation toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('open');
        const expanded = navLinks.classList.contains('active');
        navToggle.setAttribute('aria-expanded', expanded.toString());
    });
}

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// 3D Mouse Model using Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

const mouseContainer = document.getElementById('mouse-3d');

function resizeRenderer() {
    const rect = mouseContainer.getBoundingClientRect();
    const width = Math.max(300, Math.min(420, rect.width));
    const height = Math.round(width * 0.75);
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

resizeRenderer();
mouseContainer.appendChild(renderer.domElement);
window.addEventListener('resize', () => {
    resizeRenderer();
});

// Create mouse geometry (simplified)
const mouseGeometry = new THREE.Group();

// Main body
const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.7, 2, 8);
const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 100 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
mouseGeometry.add(body);

// Top part
const topGeometry = new THREE.CylinderGeometry(0.6, 0.5, 0.5, 8);
const topMaterial = new THREE.MeshPhongMaterial({ color: 0x222222, shininess: 100 });
const top = new THREE.Mesh(topGeometry, topMaterial);
top.position.y = 0.75;
mouseGeometry.add(top);

// Buttons
const buttonGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.3);
const buttonMaterial = new THREE.MeshPhongMaterial({ color: 0xff006e, shininess: 100 });

const leftButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
leftButton.position.set(-0.2, 0.9, 0.2);
mouseGeometry.add(leftButton);

const rightButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
rightButton.position.set(0.2, 0.9, 0.2);
mouseGeometry.add(rightButton);

// Scroll wheel
const wheelGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.1, 8);
const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x666666, shininess: 100 });
const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
wheel.rotation.z = Math.PI / 2;
wheel.position.set(0, 0.9, 0.3);
mouseGeometry.add(wheel);

// RGB lights
const lightGeometry = new THREE.SphereGeometry(0.02, 8, 8);
const lightMaterial = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
const lights = [];
for (let i = 0; i < 5; i++) {
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(
        (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 1.2
    );
    lights.push(light);
    mouseGeometry.add(light);
}

scene.add(mouseGeometry);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0x00d4ff, 0.5);
pointLight.position.set(-1, -1, 1);
scene.add(pointLight);

camera.position.z = 5;

// Drag to rotate
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

const toRadians = (angle) => angle * (Math.PI / 180);

const onPointerDown = (event) => {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
};

const onPointerMove = (event) => {
    if (!isDragging) return;

    const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    };

    const rotationSpeed = 0.5;
    mouseGeometry.rotation.y += toRadians(deltaMove.x * rotationSpeed);
    mouseGeometry.rotation.x += toRadians(deltaMove.y * rotationSpeed);

    previousMousePosition = { x: event.clientX, y: event.clientY };
};

const onPointerUp = () => {
    isDragging = false;
};

renderer.domElement.addEventListener('pointerdown', onPointerDown);
window.addEventListener('pointermove', onPointerMove);
window.addEventListener('pointerup', onPointerUp);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
        mouseGeometry.rotation.y += 0.005;
    }

    // Animate RGB lights
    lights.forEach((light, index) => {
        light.material.color.setHSL((Date.now() * 0.001 + index * 0.2) % 1, 1, 0.5);
    });

    renderer.render(scene, camera);
}
animate();

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(item);
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const hero3d = document.querySelector('.hero-3d');
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero3d.style.transform = `translateY(${scrolled * -0.3}px)`;
});

// Simulate loading for reviews
setTimeout(() => {
    document.querySelectorAll('.review-item .loading').forEach(skeleton => {
        skeleton.style.display = 'none';
    });
    document.querySelectorAll('.review-item .review-content').forEach(content => {
        content.classList.remove('hidden');
    });
}, 2000); // 2 seconds loading simulation

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        item.classList.toggle('open');
    });
});

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
});
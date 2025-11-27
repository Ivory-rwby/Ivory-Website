// White Rose Website - Anime.js Animations with Error Handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with error handling
    try {
        // Check if Anime.js is loaded, if not, wait for fallback
        if (typeof anime === 'undefined') {
            console.warn('Anime.js not loaded yet, waiting for fallback...');
            window.addEventListener('load', function() {
                if (typeof anime !== 'undefined') {
                    initAllAnimations();
                } else {
                    initWithoutAnimations();
                }
            });
        } else {
            initAllAnimations();
        }
    } catch (error) {
        console.error('Error initializing animations:', error);
        initWithoutAnimations();
    }
});

function initAllAnimations() {
    // Initialize all animations
    initRoseAnimations();
    initHeroAnimations();
    initScrollAnimations();
    initNavigationAnimations();
    initGalleryAnimations();
    initFormAnimations();
    initParticleAnimations();
}

function initWithoutAnimations() {
    console.log('Initializing without animations - basic functionality only');
    // Fallback functionality when Anime.js is not available
    initBasicNavigation();
    initBasicFormHandling();
}

// Rose Petal Animations
function initRoseAnimations() {
    const petals = document.querySelectorAll('.rose-petal');
    const center = document.querySelector('.rose-center');

    if (!petals.length || !center) return;

    // Gentle floating animation for petals
    petals.forEach((petal, index) => {
        anime({
            targets: petal,
            translateY: [
                { value: -10, duration: 2000 },
                { value: 10, duration: 2000 }
            ],
            rotate: [
                { value: index * 90 + 5, duration: 3000 },
                { value: index * 90 - 5, duration: 3000 }
            ],
            easing: 'easeInOutSine',
            direction: 'alternate',
            loop: true,
            delay: index * 200
        });
    });

    // Center glow animation
    anime({
        targets: center,
        scale: [
            { value: 1.2, duration: 2000 },
            { value: 1, duration: 2000 }
        ],
        opacity: [
            { value: 0.8, duration: 2000 },
            { value: 1, duration: 2000 }
        ],
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
    });
}

// Hero Section Animations
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const roseContainer = document.querySelector('.rose-container');

    if (!heroTitle || !heroSubtitle || !roseContainer) return;

    // Staggered entrance animation
    anime.timeline()
        .add({
            targets: roseContainer,
            scale: [0, 1],
            opacity: [0, 1],
            duration: 1500,
            easing: 'easeOutElastic(1, .8)',
            delay: 500
        })
        .add({
            targets: heroTitle,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
        }, '-=800')
        .add({
            targets: heroSubtitle,
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        }, '-=600');

    // Title hover effect
    heroTitle.addEventListener('mouseenter', () => {
        anime({
            targets: heroTitle,
            scale: 1.05,
            duration: 300,
            easing: 'easeOutExpo'
        });
    });

    heroTitle.addEventListener('mouseleave', () => {
        anime({
            targets: heroTitle,
            scale: 1,
            duration: 300,
            easing: 'easeOutExpo'
        });
    });
}

// Scroll-triggered Animations
function initScrollAnimations() {
    // About cards animation
    const aboutCards = document.querySelectorAll('.about-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const delay = card.getAttribute('data-aos-delay') || 0;

                anime({
                    targets: card,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutExpo',
                    delay: parseInt(delay)
                });

                // Card hover effects
                card.addEventListener('mouseenter', () => {
                    anime({
                        targets: card,
                        translateY: -10,
                        scale: 1.02,
                        duration: 300,
                        easing: 'easeOutExpo'
                    });
                });

                card.addEventListener('mouseleave', () => {
                    anime({
                        targets: card,
                        translateY: 0,
                        scale: 1,
                        duration: 300,
                        easing: 'easeOutExpo'
                    });
                });

                observer.unobserve(card);
            }
        });
    }, observerOptions);

    aboutCards.forEach(card => {
        observer.observe(card);
    });

    // Section titles animation
    const sectionTitles = document.querySelectorAll('.section-title');

    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    scale: [0.8, 1],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeOutElastic(1, .8)'
                });
                titleObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });
}

// Navigation Animations
function initNavigationAnimations() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link,
                translateY: -2,
                duration: 200,
                easing: 'easeOutExpo'
            });
        });

        link.addEventListener('mouseleave', () => {
            anime({
                targets: link,
                translateY: 0,
                duration: 200,
                easing: 'easeOutExpo'
            });
        });
    });

    // Smooth scrolling for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (typeof anime !== 'undefined') {
                anime({
                    targets: 'html, body',
                    scrollTop: targetSection.offsetTop - 80,
                    duration: 1000,
                    easing: 'easeInOutExpo'
                });
            } else {
                // Fallback for smooth scrolling
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Gallery Animations
function initGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Tilt effect on hover
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            anime({
                targets: item,
                rotateY: 5,
                rotateX: 5,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutExpo'
            });
        });

        item.addEventListener('mouseleave', () => {
            anime({
                targets: item,
                rotateY: 0,
                rotateX: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutExpo'
            });
        });

        // Intersection observer for gallery items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: item,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo',
                        delay: Math.random() * 200
                    });
                    observer.unobserve(item);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(item);
    });
}

// Form Animations
function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-input');
    const submitBtn = document.querySelector('.submit-btn');
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (!form) return;

    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: input,
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutExpo'
                });
            }
        });

        input.addEventListener('blur', () => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: input,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutExpo'
                });
            }
        });
    });

    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', () => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: submitBtn,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutExpo'
                });
            }
        });

        submitBtn.addEventListener('mouseleave', () => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: submitBtn,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutExpo'
                });
            }
        });
    }

    // Form submission handling
    form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    // Basic validation
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    if (!name || !email || !message) {
        showFormStatus('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showFormStatus('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
        showFormStatus('Thank you for your message! We will get back to you soon.', 'success');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }, 2000);
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';

    // Hide after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Particle Animations
function initParticleAnimations() {
    const particles = document.querySelectorAll('.floating-particle');

    particles.forEach((particle, index) => {
        if (typeof anime === 'undefined') return;

        // Random floating animation
        anime({
            targets: particle,
            translateY: [
                { value: -window.innerHeight, duration: 0 },
                { value: 0, duration: 8000 }
            ],
            translateX: [
                { value: anime.random(-50, 50), duration: 8000 }
            ],
            opacity: [
                { value: [0, 1], duration: 1000 },
                { value: 0, duration: 1000, delay: 7000 }
            ],
            easing: 'easeInOutSine',
            delay: index * 1000,
            loop: true
        });
    });
}

// Basic navigation fallback
function initBasicNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Basic form handling fallback
function initBasicFormHandling() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;

    if (scrolled > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 105, 180, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;

    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    const body = document.body;

    if (typeof anime !== 'undefined') {
        anime({
            targets: body,
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
        });
    } else {
        body.style.opacity = '1';
    }
});

// Mouse move effect for rose container
document.addEventListener('mousemove', (e) => {
    const roseContainer = document.querySelector('.rose-container');
    if (!roseContainer || typeof anime === 'undefined') return;

    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    anime({
        targets: roseContainer,
        rotateY: (mouseX - 0.5) * 10,
        rotateX: -(mouseY - 0.5) * 10,
        duration: 1000,
        easing: 'easeOutExpo'
    });
});

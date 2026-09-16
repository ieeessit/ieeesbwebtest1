// script.js
// New version with Header/Footer loading AND Gallery functions.

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize quantum light blue background & ambient animations across all pages
    initQuantumBackground();

    // Get the name of the current page (e.g., "about.html")
    const path = window.location.pathname;
    const activePage = path.split('/').pop();

    // Load the header and footer
    loadHeader(activePage);
    loadFooter();

    // Set up the mobile menu (it must run *after* the header is loaded)
    setupMobileMenu();
    
    // Set up the scroll animations
    setupScrollAnimations();

    // --- NEW: Run gallery setup only if we are on the gallery page ---
    // (It checks by looking for the .gallery-grid element)
    if (document.querySelector('.gallery-grid')) {
        setupGalleryFilter();
        setupLightbox();
    }
});


/**
 * -----------------------------------------------------------------
 * LOAD HEADER
 * -----------------------------------------------------------------
 * Injects the header HTML.
 * To edit your menu, edit the HTML string in this function.
 */
function loadHeader(activePage) {
    const headerHTML = `
    <header class="navbar">
        <a href="index.html" class="logo">
            <img src="images/SB.png" alt="IEEE SSIT SB Logo">
            <span>IEEE SSIT SB</span>
        </a>
        <div class="hamburger"><i class="fas fa-bars"></i></div>
        <ul class="nav-links">
            <li><a href="index.html" class="${(activePage === 'index.html' || activePage === '') ? 'active' : ''}">Home</a></li>
            <li><a href="about.html" class="${activePage === 'about.html' ? 'active' : ''}">About</a></li>
            <li><a href="events.html" class="${activePage === 'events.html' ? 'active' : ''}">Events</a></li>
            <li><a href="gallery.html" class="${activePage === 'gallery.html' ? 'active' : ''}">Gallery</a></li>
            <li><a href="team.html" class="${activePage === 'team.html' ? 'active' : ''}">Our Team</a></li>
            <li><a href="contact.html" class="${activePage === 'contact.html' ? 'active' : ''}">Contact Us</a></li>
            <li><a href="report.html" class="${activePage === 'report.html' ? 'active' : ''}">Report</a></li>
        </ul>
    </header>
    `;
    document.getElementById('header-placeholder').innerHTML = headerHTML;
}


/**
 * -----------------------------------------------------------------
 * LOAD FOOTER
 * -----------------------------------------------------------------
 * Injects the footer HTML.
 * To edit your footer, edit the HTML string in this function.
 */
function loadFooter() {
    const footerHTML = `
    <footer class="footer">
        <div class="footer-content">
            <div class="social-links">
                <a href="#"><i class="fab fa-linkedin"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-github"></i></a>
                <a href="mailto:ieee@ssit.edu.in"><i class="fas fa-envelope"></i></a>
            </div>
            <p>© 2025 IEEE SSIT SB. All Rights Reserved.</p>
            <p class="credit">Website Developer: Rishi Ijjanthkar</p>
        </div>
    </footer>
    `;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;
}


/**
 * -----------------------------------------------------------------
 * MOBILE MENU
 * -----------------------------------------------------------------
 * This adds the click event to the hamburger icon.
 */
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}


/**
 * -----------------------------------------------------------------
 * SCROLL ANIMATIONS
 * -----------------------------------------------------------------
 * This makes elements with class "hidden" fade in.
 */
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
}


/**
 * -----------------------------------------------------------------
 * NEW: GALLERY FILTER
 * -----------------------------------------------------------------
 * Handles clicking the filter buttons.
 */
function setupGalleryFilter() {
    const filterContainer = document.querySelector('.filter-buttons');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!filterContainer) return; // Exit if no filter buttons on page

    filterContainer.addEventListener('click', (e) => {
        // Only run if a button is clicked
        if (e.target.tagName !== 'BUTTON') return;

        // Remove active class from all buttons
        filterContainer.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('active');
        });
        // Add active class to the clicked button
        e.target.classList.add('active');

        const filter = e.target.dataset.filter;

        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
}


/**
 * -----------------------------------------------------------------
 * NEW: GALLERY LIGHTBOX
 * -----------------------------------------------------------------
 * Handles clicking on an image to enlarge it.
 */
function setupLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-image');
    const captionText = document.getElementById('lightbox-caption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const span = document.querySelector('.lightbox-close');

    if (!modal) return; // Exit if no lightbox on page

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            modal.style.display = "block";
            modalImg.src = img.src;
            captionText.innerHTML = img.alt; // Uses the 'alt' text as a caption
        });
    });

    // Close lightbox when clicking 'x'
    span.onclick = () => {
        modal.style.display = "none";
    }

    // Close lightbox when clicking on the background
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    }
}


/**
 * -----------------------------------------------------------------
 * QUANTUM BACKGROUND ANIMATION SYSTEM
 * -----------------------------------------------------------------
 * Generates an ambient light blue gradient backdrop with fluid quantum smoke,
 * flowing wave ribbons, and gentle drifting quantum nodes across all pages.
 */
function initQuantumBackground() {
    // Inject ambient CSS blur layer if not already present
    if (!document.querySelector('.quantum-ambient-layer')) {
        const ambientLayer = document.createElement('div');
        ambientLayer.className = 'quantum-ambient-layer';
        ambientLayer.innerHTML = `
            <div class="quantum-orb quantum-orb-1"></div>
            <div class="quantum-orb quantum-orb-2"></div>
            <div class="quantum-orb quantum-orb-3"></div>
        `;
        document.body.prepend(ambientLayer);
    }

    // Inject canvas if not already present
    let canvas = document.getElementById('quantum-bg-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'quantum-bg-canvas';
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle debounced resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initElements();
        }, 150);
    });

    // Quantum nodes / fuzzy particles
    const particleCount = Math.min(32, Math.max(16, Math.floor(window.innerWidth / 50)));
    let particles = [];

    // Ambient smoke cloud nodes
    const smokePuffCount = 6;
    let smokePuffs = [];

    function initElements() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                radius: Math.random() * 2.5 + 1.5,
                alpha: Math.random() * 0.4 + 0.2,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulseOffset: Math.random() * Math.PI * 2
            });
        }

        smokePuffs = [];
        for (let i = 0; i < smokePuffCount; i++) {
            smokePuffs.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 220 + 200,
                baseRadius: Math.random() * 220 + 200,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                angle: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.003,
                hue: 195 + Math.random() * 25 // 195 - 220 light cyan/blue
            });
        }
    }

    initElements();

    let time = 0;
    let isVisible = true;

    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
        if (isVisible) requestAnimationFrame(render);
    });

    function render() {
        if (!isVisible) return;
        time += 0.015;

        ctx.clearRect(0, 0, width, height);

        // --- 1. Fluid Ambient Smoke Clouds ---
        smokePuffs.forEach(puff => {
            puff.x += puff.vx;
            puff.y += puff.vy;
            puff.angle += puff.rotSpeed;

            // Bounce off edges gently
            if (puff.x < -puff.radius) puff.x = width + puff.radius;
            if (puff.x > width + puff.radius) puff.x = -puff.radius;
            if (puff.y < -puff.radius) puff.y = height + puff.radius;
            if (puff.y > height + puff.radius) puff.y = -puff.radius;

            const currentRadius = puff.baseRadius + Math.sin(time * 0.8 + puff.angle) * 35;

            const gradient = ctx.createRadialGradient(
                puff.x, puff.y, 0,
                puff.x, puff.y, currentRadius
            );
            gradient.addColorStop(0, `hsla(${puff.hue}, 85%, 75%, 0.16)`);
            gradient.addColorStop(0.5, `hsla(${puff.hue}, 80%, 70%, 0.08)`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.save();
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(puff.x, puff.y, currentRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        // --- 2. Flowing Quantum Wave Ribbons ---
        const waveCount = 3;
        for (let w = 0; w < waveCount; w++) {
            ctx.save();
            ctx.beginPath();
            const yBase = height * (0.3 + w * 0.25);
            const amplitude = 35 + w * 15;
            const frequency = 0.0018 + w * 0.0008;
            const phase = time * (0.6 + w * 0.2);

            ctx.moveTo(0, yBase + Math.sin(phase) * amplitude);
            for (let x = 0; x <= width; x += 25) {
                const y = yBase + Math.sin(x * frequency + phase) * amplitude + Math.cos((x * 0.003) - phase * 0.5) * 15;
                ctx.lineTo(x, y);
            }

            ctx.strokeStyle = `rgba(14, 165, 233, ${0.08 + w * 0.04})`;
            ctx.lineWidth = 1.8 + w;
            ctx.stroke();
            ctx.restore();
        }

        // --- 3. Quantum Nodes & Proximity Connectors ---
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            const currentAlpha = p.alpha + Math.sin(time * 2 + p.pulseOffset) * 0.15;

            // Draw particle
            ctx.save();
            ctx.fillStyle = `rgba(14, 165, 233, ${Math.max(0.1, currentAlpha)})`;
            ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Connect nearby nodes
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 140;

                if (dist < maxDist) {
                    const lineAlpha = (1 - dist / maxDist) * 0.18;
                    ctx.save();
                    ctx.strokeStyle = `rgba(14, 165, 233, ${lineAlpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
// script.js
// New version with Header/Footer loading AND Gallery functions.

document.addEventListener('DOMContentLoaded', () => {
    
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
            <img src="images/IEEE5.jpg" alt="IEEE SSIT SB Logo">
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
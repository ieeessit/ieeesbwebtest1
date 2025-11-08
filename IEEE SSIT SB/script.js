// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Scroll Animations ---
    // This makes elements with the class 'hidden' fade in as they appear
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                // Optional: remove 'show' to re-animate every time
                // entry.target.classList.remove('show');
            }
        });
    });

    // Find all elements with the 'hidden' class and observe them
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Mobile Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Active Page Link Highlighter ---
    // This highlights the current page in the navbar
    const activePage = window.location.pathname;
    const navLinksAnchors = document.querySelectorAll('.nav-links a');
    
    navLinksAnchors.forEach(link => {
        // Use link.getAttribute('href') to match the file name
        if (link.getAttribute('href') === activePage.split('/').pop()) {
            link.classList.add('active');
        }
    });

});
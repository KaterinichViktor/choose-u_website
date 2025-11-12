// Navigation Component
// Handles mobile menu, dropdowns, and smooth scrolling

function initNavigation() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('open');
        });
    }

    // Desktop Dropdowns
    const desktopDropdowns = document.querySelectorAll('.desktop-nav .nav-dropdown');
    desktopDropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-button');
        
        button?.addEventListener('click', function(e) {
            e.stopPropagation();
            // Close other dropdowns
            desktopDropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('open');
                }
            });
            // Toggle current dropdown
            dropdown.classList.toggle('open');
        });
    });

    // Mobile Dropdowns
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    mobileDropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.mobile-dropdown-button');
        
        button?.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        desktopDropdowns.forEach(dropdown => dropdown.classList.remove('open'));
    });

    // Close mobile menu when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            mobileNav?.classList.remove('open');
            mobileMenuToggle?.classList.remove('active');
            // Close all mobile dropdowns
            mobileDropdowns.forEach(dropdown => dropdown.classList.remove('open'));
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    if (mobileNav?.classList.contains('open')) {
                        mobileNav.classList.remove('open');
                        mobileMenuToggle?.classList.remove('active');
                    }
                }
            }
        });
    });

    console.log('Navigation initialized');
}

// For non-module usage
if (typeof window !== 'undefined' && !window.navigationInitialized) {
    document.addEventListener('DOMContentLoaded', initNavigation);
    window.navigationInitialized = true;
}


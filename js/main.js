// Main JavaScript Entry Point
// All component modules are loaded separately via script tags
// This file initializes any global functionality

console.log('Website JavaScript loaded');

// Show loading spinner immediately
if (window.showSpinner) {
    showSpinner('Loading...');
}

// Optional: Add global utilities or helpers here
window.app = {
    version: '1.0.0',
    initialized: false
};

// Hide loading spinner when page is fully loaded
window.addEventListener('load', function() {
    // Small delay to ensure smooth transition
    setTimeout(() => {
        if (window.hideSpinner) {
            hideSpinner();
        }
        window.app.initialized = true;
        console.log('All components initialized successfully');
    }, 300);
});

// Main JavaScript Entry Point
// All component modules are loaded separately via script tags
// This file initializes any global functionality

console.log('Website JavaScript loaded');

// Optional: Add global utilities or helpers here
window.app = {
    version: '1.0.0',
    initialized: false
};

document.addEventListener('DOMContentLoaded', function() {
    window.app.initialized = true;
    console.log('All components initialized successfully');
});

// Theme Switcher Component
// Handles color theme switching and persistence

function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const currentTheme = localStorage.getItem('theme') || 'theme1';
    
    // Apply saved theme on page load
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update active button
    themeButtons.forEach(btn => {
        if (btn.getAttribute('data-theme') === currentTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Theme button click handlers
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Update document theme
            document.documentElement.setAttribute('data-theme', theme);
            
            // Save to localStorage
            localStorage.setItem('theme', theme);
            
            // Update active state
            themeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            console.log('Theme changed to:', theme);
        });
    });
    
    console.log('Theme switcher initialized');
}

// For non-module usage
if (typeof window !== 'undefined' && !window.themeSwitcherInitialized) {
    document.addEventListener('DOMContentLoaded', initThemeSwitcher);
    window.themeSwitcherInitialized = true;
}


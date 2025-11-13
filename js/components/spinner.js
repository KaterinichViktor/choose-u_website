// Spinner Component - Bars Loading Animation
// Simple methods to show/hide loading spinner

(function() {
    'use strict';
    
    let spinnerOverlay = null;
    
    // Create spinner overlay
    function createSpinnerOverlay() {
        if (!spinnerOverlay) {
            spinnerOverlay = document.createElement('div');
            spinnerOverlay.id = 'global-spinner-overlay';
            spinnerOverlay.className = 'spinner-overlay hidden';
            spinnerOverlay.innerHTML = `
                <div class="spinner-wrapper">
                    <div class="spinner-bars large">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                    <span class="spinner-text" id="spinner-text">Loading...</span>
                </div>
            `;
            document.body.appendChild(spinnerOverlay);
        }
        
        return spinnerOverlay;
    }
    
    // Show spinner overlay
    function showSpinner(text = 'Loading...', type = 'dark') {
        const overlay = createSpinnerOverlay();
        const textElement = document.getElementById('spinner-text');
        
        if (textElement && text) {
            textElement.textContent = text;
            textElement.style.display = 'block';
        } else if (textElement && !text) {
            textElement.style.display = 'none';
        }
        
        // Set overlay type (dark or light)
        if (type === 'light') {
            overlay.classList.add('light');
        } else {
            overlay.classList.remove('light');
        }
        
        overlay.classList.remove('hidden');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    // Hide spinner overlay
    function hideSpinner() {
        if (spinnerOverlay) {
            spinnerOverlay.classList.add('hidden');
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    // Show spinner during async operation
    async function withSpinner(asyncFunction, text = 'Loading...') {
        showSpinner(text);
        
        try {
            const result = await asyncFunction();
            hideSpinner();
            return result;
        } catch (error) {
            hideSpinner();
            throw error;
        }
    }
    
    // Expose to global scope
    window.Spinner = {
        show: showSpinner,
        hide: hideSpinner,
        withSpinner: withSpinner
    };
    
    // Convenience global functions
    window.showSpinner = showSpinner;
    window.hideSpinner = hideSpinner;
    
    console.log('Bars Spinner initialized');
    
})();

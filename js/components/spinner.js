// Spinner Component Helper
// Easy methods to show/hide loading spinners

(function() {
    'use strict';
    
    // Create spinner overlay if it doesn't exist
    function createSpinnerOverlay() {
        let overlay = document.getElementById('global-spinner-overlay');
        
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'global-spinner-overlay';
            overlay.className = 'spinner-overlay hidden';
            overlay.innerHTML = `
                <div class="spinner-wrapper">
                    <span class="loader large"></span>
                    <span class="spinner-text" id="spinner-text">Loading...</span>
                </div>
            `;
            document.body.appendChild(overlay);
        }
        
        return overlay;
    }
    
    // Show spinner overlay
    function showSpinner(text = 'Loading...', type = 'dark') {
        const overlay = createSpinnerOverlay();
        const textElement = document.getElementById('spinner-text');
        
        if (textElement) {
            textElement.textContent = text;
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
        const overlay = document.getElementById('global-spinner-overlay');
        
        if (overlay) {
            overlay.classList.add('hidden');
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    // Show spinner for a specific duration
    function showSpinnerFor(duration = 2000, text = 'Loading...') {
        showSpinner(text);
        
        return new Promise((resolve) => {
            setTimeout(() => {
                hideSpinner();
                resolve();
            }, duration);
        });
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
    
    // Add inline spinner to element
    function addInlineSpinner(element, type = 'circle', position = 'before') {
        if (!element) return;
        
        // Store original content
        element.dataset.originalContent = element.innerHTML;
        
        let spinnerHTML = '';
        
        switch(type) {
            case 'circle':
            case 'loader':
                spinnerHTML = '<span class="loader small"></span>';
                break;
            case 'dots':
                spinnerHTML = `<span class="spinner-dots small">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </span>`;
                break;
            case 'pulse':
                spinnerHTML = '<span class="spinner-pulse small"></span>';
                break;
            default:
                spinnerHTML = '<span class="loader small"></span>';
        }
        
        if (position === 'before') {
            element.innerHTML = `<span class="btn-spinner">${spinnerHTML}${element.innerHTML}</span>`;
        } else if (position === 'after') {
            element.innerHTML = `<span class="btn-spinner">${element.innerHTML}${spinnerHTML}</span>`;
        } else {
            element.innerHTML = spinnerHTML;
        }
        
        // Disable if it's a button
        if (element.tagName === 'BUTTON') {
            element.disabled = true;
        }
    }
    
    // Remove inline spinner from element
    function removeInlineSpinner(element) {
        if (!element) return;
        
        // Restore original content
        if (element.dataset.originalContent) {
            element.innerHTML = element.dataset.originalContent;
            delete element.dataset.originalContent;
        }
        
        // Re-enable if it's a button
        if (element.tagName === 'BUTTON') {
            element.disabled = false;
        }
    }
    
    // Show spinner in specific container
    function showSpinnerInContainer(containerId, type = 'circle', size = '', text = '') {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const spinnerContainer = document.createElement('div');
        spinnerContainer.className = 'spinner-container';
        spinnerContainer.dataset.spinnerId = 'inline-spinner';
        
        let spinnerHTML = '';
        const sizeClass = size ? ` ${size}` : '';
        
        switch(type) {
            case 'circle':
            case 'loader':
                spinnerHTML = `<span class="loader${sizeClass}"></span>`;
                break;
            case 'dual':
                spinnerHTML = `<div class="spinner-dual${sizeClass}"></div>`;
                break;
            case 'dots':
                spinnerHTML = `<div class="spinner-dots${sizeClass}">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>`;
                break;
            case 'pulse':
                spinnerHTML = `<div class="spinner-pulse${sizeClass}"></div>`;
                break;
            case 'gradient':
                spinnerHTML = `<div class="spinner-gradient${sizeClass}"></div>`;
                break;
            default:
                spinnerHTML = `<span class="loader${sizeClass}"></span>`;
        }
        
        if (text) {
            spinnerContainer.innerHTML = `
                <div class="spinner-wrapper">
                    ${spinnerHTML}
                    <span class="spinner-text">${text}</span>
                </div>
            `;
        } else {
            spinnerContainer.innerHTML = spinnerHTML;
        }
        
        container.appendChild(spinnerContainer);
    }
    
    // Hide spinner in specific container
    function hideSpinnerInContainer(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const spinner = container.querySelector('[data-spinner-id="inline-spinner"]');
        if (spinner) {
            spinner.remove();
        }
    }
    
    // Update progress bar
    function updateProgressBar(elementId, percentage) {
        const progressBar = document.getElementById(elementId);
        if (progressBar) {
            progressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
        }
    }
    
    // Simulate loading with progress
    function simulateProgress(elementId, duration = 3000, onComplete) {
        const progressBar = document.getElementById(elementId);
        if (!progressBar) return;
        
        let progress = 0;
        const step = 100 / (duration / 50);
        
        const interval = setInterval(() => {
            progress += step;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                if (onComplete) onComplete();
            }
            
            updateProgressBar(elementId, progress);
        }, 50);
        
        return interval;
    }
    
    // Expose to global scope
    window.Spinner = {
        show: showSpinner,
        hide: hideSpinner,
        showFor: showSpinnerFor,
        withSpinner: withSpinner,
        addInline: addInlineSpinner,
        removeInline: removeInlineSpinner,
        showInContainer: showSpinnerInContainer,
        hideInContainer: hideSpinnerInContainer,
        updateProgress: updateProgressBar,
        simulateProgress: simulateProgress
    };
    
    // Convenience global functions
    window.showSpinner = showSpinner;
    window.hideSpinner = hideSpinner;
    
    console.log('Spinner component initialized');
    
})();


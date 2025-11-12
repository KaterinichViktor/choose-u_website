// Carousel Continuous Mode
// Handles infinite smooth scrolling carousel

function initCarouselContinuous() {
    const track = document.querySelector('.carousel-track');
    const originalCards = Array.from(track?.children || []);
    
    if (!track || originalCards.length === 0) {
        console.log('Carousel elements not found');
        return;
    }

    let continuousScrollPosition = 0;
    let animationFrameId;
    let isUserInteracting = false;
    
    // Configuration
    const CONTINUOUS_SCROLL_SPEED = 0.5; // pixels per frame (adjust for speed: 0.3=slow, 1.0=fast)
    
    // Duplicate cards for seamless infinite loop
    function duplicateCards() {
        // Clone all cards twice for smooth infinite scroll
        const firstClone = track.cloneNode(true);
        const secondClone = track.cloneNode(true);
        
        Array.from(firstClone.children).forEach(card => {
            track.appendChild(card);
        });
        
        console.log('Cards duplicated. Total visible:', track.children.length);
    }
    
    // Continuous scroll animation
    function continuousScroll() {
        if (!isUserInteracting) {
            continuousScrollPosition += CONTINUOUS_SCROLL_SPEED;
            
            // Calculate total width of all original cards + gaps
            const cardWidth = originalCards[0].offsetWidth;
            const gap = 20;
            const totalWidth = (cardWidth + gap) * originalCards.length;
            
            // Loop back to start when we've scrolled through all original cards
            if (continuousScrollPosition >= totalWidth) {
                continuousScrollPosition = 0;
            }
            
            track.style.transform = `translateX(-${continuousScrollPosition}px)`;
        }
        
        animationFrameId = requestAnimationFrame(continuousScroll);
    }
    
    // Start continuous scroll
    function startScroll() {
        stopScroll();
        animationFrameId = requestAnimationFrame(continuousScroll);
        console.log('Continuous scroll started');
    }
    
    // Stop scroll
    function stopScroll() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }
    
    // Pause on hover
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => {
            isUserInteracting = true;
        });
        
        carouselWrapper.addEventListener('mouseleave', () => {
            isUserInteracting = false;
        });
    }
    
    // Touch/Drag support (pause on touch)
    track.addEventListener('touchstart', () => {
        isUserInteracting = true;
    });
    
    track.addEventListener('touchend', () => {
        // Resume after a short delay
        setTimeout(() => {
            isUserInteracting = false;
        }, 2000);
    });
    
    // Mouse drag support
    let isDragging = false;
    
    track.addEventListener('mousedown', () => {
        isDragging = true;
        isUserInteracting = true;
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            setTimeout(() => {
                isUserInteracting = false;
            }, 2000);
        }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reset position on resize to avoid layout issues
            continuousScrollPosition = 0;
            track.style.transform = 'translateX(0)';
        }, 250);
    });
    
    // Initialize
    track.style.transition = 'none'; // Remove snap transitions
    duplicateCards();
    startScroll();
    
    console.log('Carousel (Continuous) initialized with', originalCards.length, 'original cards');
}

// Auto-initialize
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initCarouselContinuous);
}

// Expose for manual initialization
window.initCarouselContinuous = initCarouselContinuous;


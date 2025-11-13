// Carousel Continuous Mode
// Handles infinite smooth scrolling carousel

function initCarouselContinuous() {
    const track = document.querySelector('.carousel-track');
    const originalCards = Array.from(track?.children || []);
    
    if (!track || originalCards.length === 0) {
        console.log('Carousel elements not found');
        return;
    }

    let currentPosition = 0;
    let animationFrameId;
    let isUserInteracting = false;
    let cardWidth = 0;
    let gap = 20;
    let setWidth = 0;
    
    // Configuration
    const CONTINUOUS_SCROLL_SPEED = 0.5; // pixels per frame
    
    // Duplicate cards for seamless infinite loop (3 sets total: prev + current + next)
    function setupInfiniteLoop() {
        // Clear existing duplicates
        track.innerHTML = '';
        
        // Create 3 complete sets of cards for seamless looping
        // This creates: [Set 1] [Set 2] [Set 3] and we start viewing Set 2
        // When scrolling right past Set 2, we loop back to start of Set 2
        // When scrolling left past Set 2, we loop forward to end of Set 2
        for (let i = 0; i < 3; i++) {
            originalCards.forEach(card => {
                const clone = card.cloneNode(true);
                track.appendChild(clone);
            });
        }
        
        // Calculate dimensions
        const allCards = Array.from(track.children);
        cardWidth = allCards[0].offsetWidth;
        setWidth = (cardWidth + gap) * originalCards.length;
        
        // Start in the middle set (Set 2)
        currentPosition = setWidth;
        track.style.transform = `translateX(-${currentPosition}px)`;
        
        console.log('Infinite loop setup: 3 sets,', originalCards.length, 'cards each, setWidth:', setWidth);
    }
    
    // Continuous scroll animation
    function continuousScroll() {
        if (!isUserInteracting) {
            currentPosition += CONTINUOUS_SCROLL_SPEED;
            
            // Seamless infinite loop logic:
            // We have 3 identical sets: [Set1][Set2][Set3]
            // We always stay in Set2 (middle), and instantly loop back when we reach boundaries
            // This creates the illusion of infinite scrolling
            
            // When we scroll past the end of Set 2, loop back to the start of Set 2
            if (currentPosition >= setWidth * 2) {
                currentPosition = currentPosition - setWidth;
            }
            // When we scroll before the start of Set 2, loop forward to Set 2 end
            else if (currentPosition < setWidth) {
                currentPosition = currentPosition + setWidth;
            }
            
            track.style.transform = `translateX(-${currentPosition}px)`;
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
    let resumeTimeout;
    
    function pauseScroll() {
        isUserInteracting = true;
        clearTimeout(resumeTimeout);
    }
    
    function resumeScroll(delay = 0) {
        clearTimeout(resumeTimeout);
        if (delay > 0) {
            resumeTimeout = setTimeout(() => {
                isUserInteracting = false;
            }, delay);
        } else {
            isUserInteracting = false;
        }
    }
    
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => {
            pauseScroll();
        });
        
        carouselWrapper.addEventListener('mouseleave', () => {
            resumeScroll(1500); // Resume after 1.5 seconds
        });
    }
    
    // Touch/Drag support (pause on touch)
    track.addEventListener('touchstart', () => {
        pauseScroll();
    });
    
    track.addEventListener('touchend', () => {
        resumeScroll(2000); // Resume after 2 seconds
    });
    
    // Mouse drag support
    let isDragging = false;
    
    track.addEventListener('mousedown', () => {
        isDragging = true;
        pauseScroll();
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            resumeScroll(2000); // Resume after 2 seconds
        }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate and reset to middle set
            setupInfiniteLoop();
        }, 250);
    });
    
    // Manual navigation buttons
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    
    function manualScroll(direction) {
        const scrollAmount = cardWidth + gap;
        
        // Pause auto-scroll
        pauseScroll();
        
        // Calculate target position
        let targetPosition = currentPosition;
        if (direction === 'next') {
            targetPosition += scrollAmount;
        } else {
            targetPosition -= scrollAmount;
        }
        
        // Apply smooth transition
        track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
        currentPosition = targetPosition;
        track.style.transform = `translateX(-${currentPosition}px)`;
        
        // After transition, check if we need to loop and remove transition
        setTimeout(() => {
            track.style.transition = 'none';
            
            // Loop check: if we're beyond boundaries, instantly jump to equivalent position
            if (currentPosition >= setWidth * 2) {
                currentPosition -= setWidth;
                track.style.transform = `translateX(-${currentPosition}px)`;
            } else if (currentPosition < setWidth) {
                currentPosition += setWidth;
                track.style.transform = `translateX(-${currentPosition}px)`;
            }
            
            // Resume auto-scroll after delay
            resumeScroll(3000); // 3 seconds after button click
        }, 400); // Match transition duration
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => manualScroll('prev'));
        // Pause on button hover
        prevBtn.addEventListener('mouseenter', () => pauseScroll());
        prevBtn.addEventListener('mouseleave', () => resumeScroll(1500));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => manualScroll('next'));
        // Pause on button hover
        nextBtn.addEventListener('mouseenter', () => pauseScroll());
        nextBtn.addEventListener('mouseleave', () => resumeScroll(1500));
    }
    
    // Initialize
    track.style.transition = 'none'; // Remove snap transitions
    setupInfiniteLoop();
    startScroll();
    
    console.log('Carousel (Continuous) initialized with', originalCards.length, 'original cards');
}

// Auto-initialize
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initCarouselContinuous);
}

// Expose for manual initialization
window.initCarouselContinuous = initCarouselContinuous;


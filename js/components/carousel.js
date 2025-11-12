// Carousel Component
// Handles card carousel with auto-scroll and manual navigation

function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(track?.children || []);
    const prevButton = document.querySelector('.carousel-btn-prev');
    const nextButton = document.querySelector('.carousel-btn-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (!track || cards.length === 0) {
        console.log('Carousel elements not found');
        return;
    }

    let currentIndex = 0;
    let autoScrollInterval;
    let isUserInteracting = false;
    let continuousScrollPosition = 0;
    
    // Configuration
    const SCROLL_MODE = carouselContainer?.getAttribute('data-scroll-mode') || 'pagination'; // 'pagination' or 'continuous'
    const AUTO_SCROLL_DELAY = 3000; // 4 seconds (for pagination mode)
    const CONTINUOUS_SCROLL_SPEED = 0.5; // pixels per frame (for continuous mode)
    const USER_INTERACTION_TIMEOUT = 3000; // 8 seconds before resuming auto-scroll
    
    // Get card width including gap
    function getCardWidth() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 20; // Match CSS gap
        return cardWidth + gap;
    }
    
    // Get visible cards count based on screen width
    function getVisibleCards() {
        const containerWidth = track.parentElement.offsetWidth;
        const cardWidth = cards[0].offsetWidth;
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    
    // Calculate max index
    function getMaxIndex() {
        const visibleCards = getVisibleCards();
        return Math.max(0, cards.length - visibleCards);
    }
    
    // Update carousel position
    function updateCarousel(animate = true) {
        if (SCROLL_MODE === 'continuous') {
            // Continuous scroll doesn't use this function
            return;
        }
        
        const cardWidth = getCardWidth();
        const offset = currentIndex * cardWidth;
        
        if (!animate) {
            track.style.transition = 'none';
        }
        
        track.style.transform = `translateX(-${offset}px)`;
        
        if (!animate) {
            // Re-enable transition after a frame
            requestAnimationFrame(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
            });
        }
        
        // Update indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Update button states
        if (prevButton) {
            prevButton.disabled = currentIndex === 0;
        }
        if (nextButton) {
            nextButton.disabled = currentIndex >= getMaxIndex();
        }
    }
    
    // Initialize indicators based on actual page count
    function initializeIndicators() {
        if (SCROLL_MODE === 'continuous') {
            // Hide indicators in continuous mode
            if (indicatorsContainer) {
                indicatorsContainer.style.display = 'none';
            }
            return;
        }
        
        const maxIndex = getMaxIndex();
        const pageCount = maxIndex + 1;
        
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = '';
            
            for (let i = 0; i < pageCount; i++) {
                const indicator = document.createElement('button');
                indicator.className = 'indicator';
                if (i === 0) indicator.classList.add('active');
                indicator.setAttribute('data-slide', i);
                indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
                indicator.addEventListener('click', () => {
                    handleUserInteraction();
                    goToSlide(i);
                });
                indicatorsContainer.appendChild(indicator);
            }
        }
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
        updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
        if (currentIndex < getMaxIndex()) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = getMaxIndex(); // Loop to end
        }
        updateCarousel();
    }
    
    // Continuous scroll animation
    function continuousScroll() {
        if (!isUserInteracting) {
            continuousScrollPosition += CONTINUOUS_SCROLL_SPEED;
            
            // Calculate total width of all original cards + gaps (not including duplicates)
            const cardWidth = cards[0].offsetWidth;
            const gap = 20;
            const totalWidth = (cardWidth + gap) * cards.length;
            
            // Loop back to start when we've scrolled through all original cards
            if (continuousScrollPosition >= totalWidth) {
                continuousScrollPosition = 0;
            }
            
            track.style.transform = `translateX(-${continuousScrollPosition}px)`;
        }
        
        autoScrollInterval = requestAnimationFrame(continuousScroll);
    }
    
    // Start auto-scroll
    function startAutoScroll() {
        stopAutoScroll(); // Clear any existing interval/animation
        
        console.log('Starting auto-scroll in', SCROLL_MODE, 'mode');
        
        if (SCROLL_MODE === 'continuous') {
            console.log('Starting continuous scroll animation...');
            // Start continuous scroll using requestAnimationFrame
            autoScrollInterval = requestAnimationFrame(continuousScroll);
        } else {
            console.log('Starting pagination scroll with', AUTO_SCROLL_DELAY, 'ms delay');
            // Start pagination scroll using setInterval
            autoScrollInterval = setInterval(() => {
                if (!isUserInteracting) {
                    nextSlide();
                }
            }, AUTO_SCROLL_DELAY);
        }
    }
    
    // Stop auto-scroll
    function stopAutoScroll() {
        if (autoScrollInterval) {
            if (SCROLL_MODE === 'continuous') {
                cancelAnimationFrame(autoScrollInterval);
            } else {
                clearInterval(autoScrollInterval);
            }
            autoScrollInterval = null;
        }
    }
    
    // Handle user interaction
    function handleUserInteraction() {
        isUserInteracting = true;
        stopAutoScroll();
        
        // Resume auto-scroll after timeout
        setTimeout(() => {
            isUserInteracting = false;
            startAutoScroll();
        }, USER_INTERACTION_TIMEOUT);
    }
    
    // Event Listeners (only for pagination mode)
    
    if (SCROLL_MODE === 'pagination') {
        // Previous button
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                handleUserInteraction();
                prevSlide();
            });
        }
        
        // Next button
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                handleUserInteraction();
                nextSlide();
            });
        }
        
        // Indicators are initialized dynamically in initializeIndicators()
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
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        handleUserInteraction();
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next
                nextSlide();
            } else {
                // Swipe right - previous
                prevSlide();
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            handleUserInteraction();
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            handleUserInteraction();
            nextSlide();
        }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate position without animation
            currentIndex = Math.min(currentIndex, getMaxIndex());
            updateCarousel(false);
        }, 250);
    });
    
    // Initialize
    console.log('Initializing carousel in', SCROLL_MODE, 'mode');
    console.log('Container element:', carouselContainer);
    console.log('Data attribute:', carouselContainer?.getAttribute('data-scroll-mode'));
    
    if (SCROLL_MODE === 'continuous') {
        console.log('Setting up continuous scroll mode...');
        // Duplicate cards for seamless loop
        const originalCards = Array.from(track.children);
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
        track.style.transition = 'none';
        console.log('Cards duplicated. Total cards now:', track.children.length);
    } else {
        console.log('Setting up pagination mode...');
        initializeIndicators();
        updateCarousel(false);
    }
    
    startAutoScroll();
    
    console.log('Carousel initialized with', cards.length, 'original cards in', SCROLL_MODE, 'mode');
}

// Auto-initialize with delay to ensure mode is set
if (typeof window !== 'undefined' && !window.carouselInitialized) {
    document.addEventListener('DOMContentLoaded', () => {
        // Small delay to ensure data-scroll-mode is set from localStorage
        setTimeout(initCarousel, 10);
    });
    window.carouselInitialized = true;
}

// Expose for manual initialization
window.initCarousel = initCarousel;


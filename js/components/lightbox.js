/**
 * Lightbox Component
 * Displays images and PDFs in a full-screen overlay with navigation
 */

class Lightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        if (!this.lightbox) {
            console.error('Lightbox element not found');
            return;
        }

        // Get all lightbox elements
        this.backdrop = this.lightbox.querySelector('.lightbox-backdrop');
        this.closeBtn = this.lightbox.querySelector('.lightbox-close');
        this.prevBtn = this.lightbox.querySelector('.lightbox-prev');
        this.nextBtn = this.lightbox.querySelector('.lightbox-next');
        this.image = this.lightbox.querySelector('.lightbox-image');
        this.pdf = this.lightbox.querySelector('.lightbox-pdf');
        this.counter = this.lightbox.querySelector('.lightbox-counter');
        this.thumbnails = this.lightbox.querySelector('.lightbox-thumbnails');
        this.mediaContainer = this.lightbox.querySelector('.lightbox-media');
        this.galleries = {};

        // State
        this.items = [];
        this.currentIndex = 0;
        this.isOpen = false;

        // Initialize
        this.init();
    }

    init() {
        // Close on backdrop click
        this.backdrop.addEventListener('click', () => this.close());

        // Close on close button click
        this.closeBtn.addEventListener('click', () => this.close());

        // Close when clicking outside media/content areas
        this.lightbox.addEventListener('click', (e) => {
            if (!this.isOpen) return;

            const clickedInsideMedia = this.mediaContainer && this.mediaContainer.contains(e.target);
            const clickedThumbnail = e.target.closest('.lightbox-thumbnails');
            const clickedControl = e.target.closest('.lightbox-prev, .lightbox-next, .lightbox-close');

            if (!clickedInsideMedia && !clickedThumbnail && !clickedControl) {
                this.close();
            }
        });

        // Navigation
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;

            if (e.key === 'Escape') {
                this.close();
            } else if (e.key === 'ArrowLeft') {
                this.prev();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });

        // Initialize gallery images
        this.initGalleries();
        this.initGalleryTriggers();

        // Initialize PDF buttons
        this.initPDFButtons();
    }

    initGalleries() {
        // Find all images with data-lightbox attribute
        const galleries = {};

        document.querySelectorAll('[data-lightbox]').forEach((element) => {
            const galleryName = element.getAttribute('data-lightbox');
            const index = parseInt(element.getAttribute('data-index') || '0');

            if (!galleries[galleryName]) {
                galleries[galleryName] = [];
            }

            // Store gallery info
            galleries[galleryName][index] = {
                type: 'image',
                src: element.src || element.getAttribute('data-src'),
                alt: element.alt || '',
            };

            // Add click handler
            element.addEventListener('click', (e) => {
                e.preventDefault();
                this.openGallery(galleries[galleryName], index);
            });

            // Add cursor pointer
            element.style.cursor = 'pointer';
        });

        this.galleries = galleries;
    }

    initGalleryTriggers() {
        document.querySelectorAll('[data-lightbox-trigger]').forEach((element) => {
            const galleryName = element.getAttribute('data-lightbox-trigger');
            if (!galleryName) return;

            if ((!this.galleries[galleryName] || !this.galleries[galleryName].length) && element.getAttribute('data-lightbox-items')) {
                const parsedItems = this.parseGalleryItems(element.getAttribute('data-lightbox-items'));
                if (parsedItems.length) {
                    this.galleries[galleryName] = parsedItems;
                }
            }

            const galleryItems = this.galleries[galleryName];
            if (!galleryItems || !galleryItems.length) {
                console.warn(`[Lightbox] Gallery "${galleryName}" has no items. Add thumbnails or data-lightbox-items.`);
                return;
            }

            element.addEventListener('click', (e) => {
                e.preventDefault();
                const startAttr = element.getAttribute('data-lightbox-start');
                let startIndex = parseInt(startAttr, 10);
                if (!Number.isFinite(startIndex)) startIndex = 0;
                startIndex = Math.min(Math.max(startIndex, 0), galleryItems.length - 1);
                this.openGallery(galleryItems, startIndex);
            });

            element.style.cursor = 'pointer';
        });
    }

    initPDFButtons() {
        // Find all buttons/elements with data-lightbox-pdf attribute
        document.querySelectorAll('[data-lightbox-pdf]').forEach((element) => {
            const pdfSrc = element.getAttribute('data-lightbox-pdf');

            element.addEventListener('click', (e) => {
                e.preventDefault();
                this.openPDF(pdfSrc);
            });

            // Add cursor pointer
            element.style.cursor = 'pointer';
        });
    }

    openGallery(items, startIndex = 0) {
        this.items = items;
        this.currentIndex = startIndex;
        this.open();
        this.renderThumbnails();
        this.showItem();
    }

    openPDF(src) {
        this.items = [{
            type: 'pdf',
            src: src,
            alt: 'PDF Document'
        }];
        this.currentIndex = 0;
        this.open();
        this.renderThumbnails();
        this.showItem();
    }

    open() {
        this.isOpen = true;
        this.lightbox.classList.add('active');
        this.lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    close() {
        this.isOpen = false;
        this.lightbox.classList.remove('active');
        this.lightbox.classList.remove('is-pdf');
        this.lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scrolling

        // Clear media after animation
        setTimeout(() => {
            this.image.style.display = 'none';
            this.image.src = '';
            this.pdf.style.display = 'none';
            this.pdf.src = '';
            this.thumbnails.innerHTML = '';
            this.thumbnails.classList.remove('has-items');
        }, 300);
    }

    showItem() {
        const item = this.items[this.currentIndex];

        if (item.type === 'image') {
            this.lightbox.classList.remove('is-pdf');
            // Show image
            this.image.src = item.src;
            this.image.alt = item.alt;
            this.image.style.display = 'block';
            this.pdf.style.display = 'none';
        } else if (item.type === 'pdf') {
            this.lightbox.classList.add('is-pdf');
            // Show PDF
            this.pdf.src = item.src;
            this.pdf.style.display = 'block';
            this.image.style.display = 'none';
        }

        // Update navigation buttons
        this.updateNavigation();

        // Update counter
        this.updateCounter();

        // Update thumbnail active state
        this.updateThumbnailActive();
    }

    updateNavigation() {
        // Hide prev button on first item
        if (this.currentIndex === 0 || this.items.length <= 1) {
            this.prevBtn.classList.add('hidden');
        } else {
            this.prevBtn.classList.remove('hidden');
        }

        // Hide next button on last item
        if (this.currentIndex === this.items.length - 1 || this.items.length <= 1) {
            this.nextBtn.classList.add('hidden');
        } else {
            this.nextBtn.classList.remove('hidden');
        }
    }

    updateCounter() {
        // Only show counter for galleries with multiple items
        if (this.items.length > 1) {
            this.counter.textContent = `${this.currentIndex + 1} / ${this.items.length}`;
        } else {
            this.counter.textContent = '';
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.showItem();
        }
    }

    next() {
        if (this.currentIndex < this.items.length - 1) {
            this.currentIndex++;
            this.showItem();
        }
    }

    renderThumbnails() {
        // Clear existing thumbnails
        this.thumbnails.innerHTML = '';

        // Only show thumbnails if there are multiple items
        if (this.items.length <= 1) {
            this.thumbnails.classList.remove('has-items');
            return;
        }

        this.thumbnails.classList.add('has-items');

        // Create thumbnails for each item
        this.items.forEach((item, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'lightbox-thumbnail';
            thumb.dataset.index = index;

            const img = document.createElement('img');
            img.src = item.thumbnail || item.src;
            img.alt = item.alt || `Page ${index + 1}`;

            const number = document.createElement('div');
            number.className = 'lightbox-thumbnail-number';
            number.textContent = index + 1;

            thumb.appendChild(img);
            thumb.appendChild(number);

            // Click handler to jump to this item
            thumb.addEventListener('click', () => {
                this.currentIndex = index;
                this.showItem();
            });

            this.thumbnails.appendChild(thumb);
        });

        // Mark first thumbnail as active
        this.updateThumbnailActive();
    }

    updateThumbnailActive() {
        const thumbs = this.thumbnails.querySelectorAll('.lightbox-thumbnail');
        thumbs.forEach((thumb, index) => {
            if (index === this.currentIndex) {
                thumb.classList.add('active');
                // Scroll thumbnail into view
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    parseGalleryItems(itemsAttr = '') {
        if (!itemsAttr) return [];

        const trimmed = itemsAttr.trim();
        if (!trimmed) return [];

        try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed) && parsed.length) {
                return parsed
                    .map((entry) => {
                        if (typeof entry === 'string') {
                            return { type: 'image', src: entry, alt: '' };
                        }
                        if (entry && typeof entry === 'object' && entry.src) {
                            return {
                                type: entry.type === 'pdf' ? 'pdf' : 'image',
                                src: entry.src,
                                alt: entry.alt || '',
                            };
                        }
                        return null;
                    })
                    .filter(Boolean);
            }
        } catch (error) {
            // Fallback to comma-separated list
        }

        return trimmed
            .split(',')
            .map((src) => src.trim())
            .filter(Boolean)
            .map((src) => ({ type: 'image', src, alt: '' }));
    }
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.lightbox = new Lightbox();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Lightbox;
}


# Carousel Components Documentation

## 📦 Overview
Two separate carousel implementations showcasing areas of work:

1. **Pagination Mode** - Slide-by-slide navigation with buttons and indicators
2. **Continuous Mode** - Infinite smooth scroll (ticker style)

## 📁 File Structure

```
components/
├── carousel-pagination.html    # Pagination mode demo
├── carousel-continuous.html    # Continuous mode demo
└── carousel-README.md          # This file

css/components/
├── carousel-pagination.css     # Pagination styling
└── carousel-continuous.css     # Continuous styling

js/components/
├── carousel-pagination.js      # Pagination logic
└── carousel-continuous.js      # Continuous logic
```

## 🎯 Which One to Use?

### Use **Pagination Mode** when:
- Users need to browse cards interactively
- Content requires focused reading
- You want user control (buttons, dots, keyboard)
- Each card has detailed information
- **Best for**: Features, testimonials, portfolios

### Use **Continuous Mode** when:
- You want ambient/background animation
- Content is repetitive or decorative
- Space is limited (no buttons needed)
- You want constant motion (ticker effect)
- **Best for**: Partners logos, certifications, ongoing showcase

---

## 🎨 Pagination Mode

### Features
✅ Previous/Next buttons  
✅ Dot indicators (dynamic count)  
✅ Keyboard navigation (arrow keys)  
✅ Touch swipe support  
✅ Auto-advance every 4 seconds  
✅ Pause on hover/interaction  
✅ Responsive (3/2/1 cards visible)  

### Quick Start

**HTML:**
```html
<link rel="stylesheet" href="/css/components/carousel-pagination.css">

<section class="carousel-section">
    <div class="carousel-container">
        <div class="carousel-wrapper">
            <button class="carousel-btn carousel-btn-prev">←</button>
            
            <div class="carousel-track-container">
                <div class="carousel-track">
                    <!-- Your cards here -->
                </div>
            </div>
            
            <button class="carousel-btn carousel-btn-next">→</button>
        </div>
        <div class="carousel-indicators"></div>
    </div>
</section>

<script src="/js/components/carousel-pagination.js"></script>
```

### Configuration
Edit in `js/components/carousel-pagination.js`:

```javascript
const AUTO_SCROLL_DELAY = 4000; // milliseconds between slides
const USER_INTERACTION_TIMEOUT = 8000; // pause duration after interaction
```

### Card Structure
```html
<div class="carousel-card">
    <div class="card-icon">
        <!-- SVG icon -->
    </div>
    <h3 class="card-title">Title</h3>
    <p class="card-description">Description</p>
    <a href="#" class="card-link">Learn more →</a>
</div>
```

---

## 🔄 Continuous Mode

### Features
✅ Infinite smooth scrolling  
✅ No buttons/indicators (clean UI)  
✅ Pause on hover  
✅ Automatic card duplication  
✅ Seamless loop  
✅ Lightweight and performant  

### Quick Start

**HTML:**
```html
<link rel="stylesheet" href="/css/components/carousel-continuous.css">

<section class="carousel-section">
    <div class="carousel-container">
        <div class="carousel-wrapper">
            <div class="carousel-track-container">
                <div class="carousel-track">
                    <!-- Your cards here -->
                </div>
            </div>
        </div>
    </div>
</section>

<script src="/js/components/carousel-continuous.js"></script>
```

### Configuration
Edit in `js/components/carousel-continuous.js`:

```javascript
const CONTINUOUS_SCROLL_SPEED = 0.5; // pixels per frame

// Speed examples:
// 0.3 = very slow (relaxed)
// 0.5 = default (smooth)
// 1.0 = fast (dynamic)
// 2.0 = very fast (energetic)
```

### Card Structure
Same as pagination mode, but simpler HTML (no buttons/indicators needed).

---

## 📱 Responsive Behavior

### Pagination Mode
| Screen | Cards Visible | Buttons | Indicators |
|--------|---------------|---------|------------|
| Desktop (>1024px) | 3 | 50px | Dynamic |
| Tablet (768-1024px) | 2 | 50px | Dynamic |
| Mobile (<768px) | 1 | 40px | Dynamic |

### Continuous Mode
| Screen | Cards Visible | Scroll Speed |
|--------|---------------|--------------|
| Desktop (>1024px) | 3 | Same |
| Tablet (768-1024px) | 2 | Same |
| Mobile (<768px) | 1 | Same |

---

## 🎨 Card Structure (Both Modes)

```html
<div class="carousel-card">
    <!-- Icon -->
    <div class="card-icon">
        <svg><!-- 40x40 icon --></svg>
    </div>
    
    <!-- Content -->
    <h3 class="card-title">Card Title</h3>
    <p class="card-description">Card description (2-3 lines recommended)</p>
    <a href="#" class="card-link">Learn more →</a>
</div>
```

---

## 🎯 Customization

### Colors
Both modes use CSS variables from your theme:
```css
--primary-color    /* Buttons, icons, links */
--text-color       /* Card titles */
--text-light       /* Card descriptions */
--bg-color         /* Card background */
--bg-light         /* Icon background */
--border-color     /* Card borders */
--shadow           /* Card shadow */
--shadow-lg        /* Hover shadow */
```

### Card Sizing
**Desktop (3 cards):**
```css
.carousel-card {
    min-width: calc(33.333% - 14px);
}
```

**Tablet (2 cards):**
```css
@media (max-width: 1024px) {
    .carousel-card {
        min-width: calc(50% - 10px);
    }
}
```

**Mobile (1 card):**
```css
@media (max-width: 768px) {
    .carousel-card {
        min-width: 100%;
    }
}
```

---

## 🚀 Integration Examples

### Add to index.html (Pagination)
```html
<!-- In <head> -->
<link rel="stylesheet" href="/css/components/carousel-pagination.css">

<!-- In <body> where you want the carousel -->
<section class="carousel-section">
    <!-- Copy structure from carousel-pagination.html -->
</section>

<!-- Before </body> -->
<script src="/js/components/carousel-pagination.js"></script>
```

### Add to index.html (Continuous)
```html
<!-- In <head> -->
<link rel="stylesheet" href="/css/components/carousel-continuous.css">

<!-- In <body> where you want the carousel -->
<section class="carousel-section">
    <!-- Copy structure from carousel-continuous.html -->
</section>

<!-- Before </body> -->
<script src="/js/components/carousel-continuous.js"></script>
```

---

## 💡 Best Practices

### Content
- Keep titles under 20 characters
- Descriptions should be 2-3 lines max
- Use consistent icon style (all outline or all filled)
- Test readability on mobile

### Performance
- Limit to 6-10 cards for best performance
- Use optimized SVG icons (inline, not external files)
- Avoid heavy images inside cards

### Accessibility
- Include proper aria-labels on buttons
- Ensure good color contrast (WCAG AA minimum)
- Test keyboard navigation (pagination mode)
- Consider prefers-reduced-motion for animations

### UX
- **Pagination**: Good for 3-8 cards
- **Continuous**: Good for 6+ cards (needs duplication)
- Don't mix both modes on same page
- Match carousel style to overall page design

---

## 🐛 Troubleshooting

### Pagination Mode

**Indicators show wrong count:**
- Check console for card count calculation
- Verify responsive breakpoints match CSS
- Window resize will recalculate

**Cards don't snap correctly:**
- Ensure `.carousel-track` has `display: flex`
- Check gap value matches JS (20px)
- Verify card widths are consistent

**Auto-scroll not working:**
- Check console for errors
- Verify `initCarouselPagination()` is called
- Ensure no JS conflicts with other components

### Continuous Mode

**Scroll is choppy:**
- Reduce `CONTINUOUS_SCROLL_SPEED` value
- Check for CSS `transition` on `.carousel-track` (should be `none`)
- Verify `requestAnimationFrame` is supported

**Cards don't duplicate:**
- Check console logs for duplication confirmation
- Ensure original cards exist before duplication
- Verify DOM structure is correct

**Scroll doesn't pause on hover:**
- Check if `.carousel-wrapper` exists
- Verify event listeners are attached
- Check for conflicting CSS

---

## 📊 Comparison Table

| Feature | Pagination | Continuous |
|---------|------------|------------|
| **Navigation** | Buttons + Dots | None |
| **Auto-scroll** | Snap to slides | Smooth flow |
| **User Control** | High | Low |
| **Complexity** | Medium | Simple |
| **File Size** | ~6KB CSS + ~9KB JS | ~4KB CSS + ~5KB JS |
| **Best For** | Interactive | Ambient |
| **Accessibility** | Excellent | Good |

---

## 🎓 Example Use Cases

### Pagination Mode
- Service offerings
- Team member profiles
- Customer testimonials
- Product features
- Case studies

### Continuous Mode
- Partner/sponsor logos
- Certifications/awards
- Social media feed
- Recent projects
- Stats/achievements

---

## 📞 Support

Check the demo files:
- `components/carousel-pagination.html`
- `components/carousel-continuous.html`

Both include working examples with 6 sample cards!


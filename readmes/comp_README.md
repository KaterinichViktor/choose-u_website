# Carousel Component Documentation

## 📦 Overview
A responsive card carousel showcasing areas of work with automatic scrolling and manual navigation controls.

## ✨ Features
- **Two Scroll Modes**:
  - **Pagination Mode** - Slide-by-slide navigation (default)
  - **Continuous Mode** - Smooth infinite loop scroll
- **Auto-scroll** - Automatically advances (pagination) or scrolls slowly (continuous)
- **Manual Navigation** - Previous/Next buttons on sides (pagination mode only)
- **Dot Indicators** - Click to jump to specific slides (pagination mode only)
- **Touch/Swipe Support** - Swipe on mobile devices
- **Keyboard Navigation** - Arrow keys to navigate (pagination mode)
- **Responsive** - Adapts to all screen sizes:
  - Desktop: 3 cards visible
  - Tablet: 2 cards visible
  - Mobile: 1 card visible
- **Pause on Hover** - Auto-scroll pauses when hovering
- **Smooth Animations** - Elegant transitions
- **Smart Indicators** - Shows only the correct number of pages

## 📁 Files
```
components/
└── carousel.html          # Demo page with full component

css/components/
└── carousel.css          # Carousel styling

js/components/
└── carousel.js           # Carousel functionality
```

## 🚀 How to Use

### Method 1: Copy HTML Structure
Copy the carousel section from `carousel.html`:

```html
<section class="carousel-section">
    <!-- Add data-scroll-mode attribute: 'pagination' or 'continuous' -->
    <div class="carousel-container" data-scroll-mode="pagination">
        <!-- Carousel content here -->
    </div>
</section>
```

### Method 2: Include Required Files
Add to your page `<head>`:
```html
<link rel="stylesheet" href="/css/components/carousel.css">
```

Add before closing `</body>`:
```html
<script src="/js/components/carousel.js"></script>
```

### Choosing Scroll Mode

**Pagination Mode (default):**
```html
<div class="carousel-container" data-scroll-mode="pagination">
```
- Shows navigation buttons
- Shows dot indicators
- Snaps to cards
- Best for featured content

**Continuous Scroll Mode:**
```html
<div class="carousel-container" data-scroll-mode="continuous">
```
- Infinite smooth scroll
- No buttons or indicators
- Constant slow movement
- Best for background/ambient display

## 🎨 Customization

### Scroll Speed

**Pagination Mode** - Edit in `js/components/carousel.js`:
```javascript
const AUTO_SCROLL_DELAY = 4000; // milliseconds (default: 4 seconds)
```

**Continuous Mode** - Edit in `js/components/carousel.js`:
```javascript
const CONTINUOUS_SCROLL_SPEED = 0.5; // pixels per frame (default: 0.5)
```
- Lower value = slower scroll
- Higher value = faster scroll
- Try 0.3 for very slow, 1.0 for faster

### Cards Per View
Automatically responsive, but can adjust breakpoints in `css/components/carousel.css`:
```css
@media (max-width: 1024px) {
    .carousel-card {
        min-width: calc(50% - 10px); /* 2 cards */
    }
}
```

### Card Content
Each card has:
- **Icon** - SVG icon (40x40)
- **Title** - Main heading
- **Description** - Supporting text
- **Link** - Call-to-action

### Colors
Uses CSS variables from theme system:
- `--primary-color` - Buttons, icons
- `--text-color` - Card titles
- `--text-light` - Card descriptions
- `--bg-color` - Card background
- `--border-color` - Card borders

## 🎯 Card Structure

```html
<div class="carousel-card">
    <div class="card-icon">
        <!-- SVG icon here -->
    </div>
    <h3 class="card-title">Card Title</h3>
    <p class="card-description">Card description text</p>
    <a href="#" class="card-link">Learn more →</a>
</div>
```

## 🔧 Adding/Removing Cards

### Add a Card
1. Copy existing card structure
2. Paste inside `.carousel-track`
3. Update content (icon, title, description, link)
4. Add new indicator button if needed

### Remove a Card
1. Delete card HTML
2. Update indicator buttons to match new count

## ⌨️ Controls

- **Arrow Buttons** - Navigate prev/next
- **Dot Indicators** - Jump to specific slide
- **Arrow Keys** - Keyboard navigation
- **Swipe** - Touch gesture on mobile
- **Hover** - Pause auto-scroll

## 📱 Responsive Breakpoints

| Screen Size | Cards Visible | Button Size |
|------------|---------------|-------------|
| Desktop (>1024px) | 3 | 50px |
| Tablet (768-1024px) | 2 | 50px |
| Mobile (<768px) | 1 | 40px |
| Small Mobile (<480px) | 1 | 35px |

## 🎬 Behavior

### Pagination Mode
1. **Page Load** - Shows first slide, starts auto-scroll
2. **User Interaction** - Pauses auto-scroll for 8 seconds
3. **Hover** - Pauses while hovering
4. **End of Track** - Loops back to beginning
5. **Resize** - Recalculates layout without animation
6. **Indicators** - Dynamically generated based on visible cards

### Continuous Mode
1. **Page Load** - Starts smooth continuous scroll
2. **Hover** - Pauses scroll
3. **Infinite Loop** - Seamlessly duplicates cards for endless scroll
4. **No Buttons** - Navigation controls hidden
5. **No Indicators** - Dot navigation hidden

## 🎨 Example: 6 Work Areas

The demo includes:
1. Psychological Support
2. Family Support
3. Career Training
4. Housing Assistance
5. Educational Programs
6. Health & Wellness

## 💡 Tips

- Keep card content concise (2-3 lines for description)
- Use consistent icon style (outline or filled)
- Test on mobile devices for swipe functionality
- **Use pagination mode** for interactive browsing
- **Use continuous mode** for ambient/background display
- Adjust scroll speed based on content length and reading time
- Use high-contrast colors for accessibility
- Continuous mode works great for ticker/showcase displays
- Pagination mode is better for detailed card content

## 🔄 Integration Example

To add to index.html:
```html
<!-- After section-3 -->
<section class="carousel-section">
    <!-- Copy carousel structure from carousel.html -->
</section>
```

Don't forget to include CSS and JS files!


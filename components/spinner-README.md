# Spinner Component - Usage Guide

## 🎯 Overview
The spinner component is now **fully integrated** into your website. You can use it anywhere on your site!

## ✅ What's Integrated

- **CSS**: Automatically loaded via `/css/styles.css`
- **JavaScript**: Loaded globally in `index.html`
- **Global Functions**: Available everywhere on your site

---

## 🚀 Quick Start

### 1. Simple Full-Page Loading

```javascript
// Show spinner
showSpinner();

// Hide spinner after operation
hideSpinner();
```

### Simple HTML Usage

```html
<!-- Super simple loader -->
<span class="loader"></span>

<!-- With sizes -->
<span class="loader small"></span>
<span class="loader"></span>
<span class="loader large"></span>
```

### 2. Show Spinner During Async Operation

```javascript
// Automatic show/hide
async function loadData() {
    await Spinner.withSpinner(async () => {
        const response = await fetch('/api/data');
        return await response.json();
    }, 'Loading data...');
}
```

### 3. Show Spinner for Specific Duration

```javascript
// Show for 2 seconds
Spinner.showFor(2000, 'Processing...');
```

### 4. Button with Spinner

```html
<button id="submitBtn" onclick="handleSubmit()">Submit</button>

<script>
async function handleSubmit() {
    const btn = document.getElementById('submitBtn');
    
    // Add spinner to button
    Spinner.addInline(btn, 'circle', 'before');
    
    // Do async work
    await someAsyncOperation();
    
    // Remove spinner
    Spinner.removeInline(btn);
}
</script>
```

### 5. Inline Spinner in Container

```html
<div id="contentArea">
    <!-- Content will be replaced with spinner -->
</div>

<script>
// Show spinner
Spinner.showInContainer('contentArea', 'dots', 'large', 'Loading content...');

// Hide spinner when done
Spinner.hideInContainer('contentArea');
</script>
```

---

## 🎨 Available Spinner Types

| Type | Class | Visual | Best For |
|------|-------|--------|----------|
| Simple Loader | `.loader` or `.spinner-circle` | ⭕ Super simple rotating circle | General loading (recommended) |
| Dual Ring | `.spinner-dual` | ⭕⭕ Two rotating rings | Complex operations |
| Bouncing Dots | `.spinner-dots` | ● ● ● Bouncing dots | Minimal, elegant |
| Pulse | `.spinner-pulse` | ⬤ Pulsing circle | Subtle loading |
| Bars | `.spinner-bars` | \|\|\|\|\| Animated bars | Audio/data processing |
| Ring | `.spinner-ring` | ⭕ Multi-ring spinner | Heavy operations |
| Gradient | `.spinner-gradient` | 🌈 Gradient circle | Modern, colorful |

---

## 📏 Size Options

```html
<!-- Small (24px) -->
<span class="loader small"></span>

<!-- Medium (48px - default) -->
<span class="loader"></span>

<!-- Large (80px) -->
<span class="loader large"></span>
```

**JavaScript:**
```javascript
// Use 'loader' or 'circle' - they're the same
Spinner.showInContainer('myDiv', 'loader', 'small');
Spinner.showInContainer('myDiv', 'loader');
Spinner.showInContainer('myDiv', 'loader', 'large');
```

---

## 💡 Common Use Cases

### Example 1: Form Submission

```javascript
document.getElementById('myForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    showSpinner('Submitting form...');
    
    try {
        const formData = new FormData(e.target);
        const response = await fetch('/api/submit', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Form submitted successfully!');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        hideSpinner();
    }
});
```

### Example 2: Load More Button

```html
<button id="loadMoreBtn" onclick="loadMore()">Load More</button>

<script>
async function loadMore() {
    const btn = document.getElementById('loadMoreBtn');
    const originalText = btn.textContent;
    
    // Add inline spinner
    Spinner.addInline(btn, 'dots', 'replace');
    
    try {
        await fetch('/api/more-items');
        // Update UI with new items
    } finally {
        Spinner.removeInline(btn);
    }
}
</script>
```

### Example 3: Page Load

```javascript
// In your main.js or at the top of your page
window.addEventListener('DOMContentLoaded', async () => {
    showSpinner('Loading page...');
    
    // Load initial data
    await Promise.all([
        loadUserData(),
        loadSettings(),
        loadContent()
    ]);
    
    hideSpinner();
});
```

### Example 4: Section Loading

```html
<section id="dynamicSection">
    <!-- Content loaded dynamically -->
</section>

<script>
async function loadSection() {
    const section = document.getElementById('dynamicSection');
    
    // Show spinner in section
    Spinner.showInContainer('dynamicSection', 'gradient', '', 'Loading...');
    
    try {
        const html = await fetchSectionContent();
        section.innerHTML = html;
    } finally {
        Spinner.hideInContainer('dynamicSection');
    }
}
</script>
```

### Example 5: Progress Bar

```html
<div class="progress-bar-container">
    <div id="uploadProgress" class="progress-bar" style="width: 0%;"></div>
</div>

<script>
async function uploadFile(file) {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            const percentage = (e.loaded / e.total) * 100;
            Spinner.updateProgress('uploadProgress', percentage);
        }
    });
    
    // Upload logic...
}
</script>
```

---

## 🎛️ API Reference

### Global Functions

```javascript
// Simple show/hide
showSpinner(text?: string, type?: 'dark' | 'light')
hideSpinner()

// Spinner object methods
Spinner.show(text, type)           // Show full-page overlay
Spinner.hide()                     // Hide overlay
Spinner.showFor(duration, text)    // Show for X milliseconds
Spinner.withSpinner(asyncFn, text) // Auto show/hide during async operation

// Inline spinners
Spinner.addInline(element, type, position)
// type: 'loader', 'circle', 'dots', 'pulse', 'dual', 'gradient'
// position: 'before', 'after', 'replace'

Spinner.removeInline(element)

// Container spinners
Spinner.showInContainer(containerId, type, size, text)
Spinner.hideInContainer(containerId)

// Progress bars
Spinner.updateProgress(elementId, percentage)
Spinner.simulateProgress(elementId, duration, onComplete)
```

---

## 🎨 Styling

### Custom Colors

The spinners use your theme's CSS variables:
- `--primary-color` - Main spinner color
- `--accent-color` - Secondary color (dual ring, gradient)
- `--bg-color` - Background
- `--text-color` - Text color

### Custom Size

Add custom CSS:
```css
.spinner-circle.custom-size {
    width: 100px;
    height: 100px;
    border-width: 8px;
}
```

---

## ⚡ Best Practices

1. **Always Hide Spinner**: Use `try/finally` to ensure spinners are hidden even if errors occur
2. **Meaningful Text**: Use descriptive loading messages
3. **Appropriate Type**: Match spinner to operation (dots for quick, circle for long)
4. **Don't Overuse**: Too many spinners can annoy users
5. **Progress Bars**: Use for operations with known duration/progress

---

## 🔧 Troubleshooting

### Spinner Not Showing?

1. Check browser console for errors
2. Verify `/css/components/spinner.css` is loaded
3. Verify `/js/components/spinner.js` is loaded
4. Check for CSS conflicts with `z-index`

### Spinner Won't Hide?

1. Make sure you're calling `hideSpinner()` or `Spinner.hide()`
2. Check browser console for JavaScript errors
3. Verify the element ID is correct (for container spinners)

### Body Still Scrolls?

The overlay automatically prevents scrolling. If it doesn't work:
```javascript
// Manual override
document.body.style.overflow = 'hidden'; // Disable scroll
document.body.style.overflow = '';        // Enable scroll
```

---

## 📖 Examples

See live examples:
- Open `/components/spinner.html` in your browser
- View 7 different spinner styles
- Test all sizes and configurations
- Copy code snippets directly

---

## 🎯 Integration Checklist

✅ CSS imported in `css/styles.css`  
✅ JavaScript loaded in `index.html`  
✅ Global functions available  
✅ Works with all themes  
✅ Responsive on all devices  

---

## 🚀 Ready to Use!

The spinner is now available **everywhere** on your site. Just call:

```javascript
showSpinner('Loading...');
```

That's it! 🎉


# JavaScript Structure Documentation

## 📁 Directory Structure

```
js/
├── main.js                      # Entry point - global initialization
├── translations.json            # Language translation data
├── components/                  # Reusable UI components
│   ├── theme-switcher.js       # Color theme switching
│   ├── language-switcher.js    # Multi-language support
│   └── navigation.js           # Mobile menu & smooth scroll
└── utils/                       # Utility functions (empty for now)
```

## 📦 Component Modules

### 1. **theme-switcher.js**
Handles color theme switching between 4 palettes.

**Features:**
- Loads saved theme from localStorage
- Updates CSS variables via `data-theme` attribute
- Persists theme choice across page reloads
- Smooth transitions between themes

**Functions:**
- `initThemeSwitcher()` - Initialize theme system

---

### 2. **language-switcher.js**
Manages multi-language content translation.

**Features:**
- Loads translations from `translations.json`
- Updates all elements with `data-i18n` attributes
- Handles desktop and mobile language dropdowns
- Saves language preference to localStorage
- Supports HTML content (e.g., `<br>` tags)

**Functions:**
- `initLanguageSwitcher()` - Initialize language system
- `changeLanguage(lang, animate)` - Switch to specified language

**Language Codes:**
- `en` - English
- `ua` - Ukrainian

---

### 3. **navigation.js**
Controls navigation behavior and interactions.

**Features:**
- Mobile menu toggle
- Smooth scrolling for anchor links
- Auto-close mobile menu on resize to desktop
- Close menu after navigation

**Functions:**
- `initNavigation()` - Initialize navigation system

---

### 4. **main.js**
Entry point and global configuration.

**Purpose:**
- Initialize global app object
- Log initialization status
- Can add global utilities/helpers

---

## 🚀 Usage

### Loading in HTML
Scripts are loaded in the correct order at the end of `<body>`:

```html
<script src="/js/components/theme-switcher.js"></script>
<script src="/js/components/language-switcher.js"></script>
<script src="/js/components/navigation.js"></script>
<script src="/js/main.js"></script>
```

### Module Support
Each component can be used as:
1. **Standalone script** (current) - auto-initializes on DOMContentLoaded
2. **ES6 module** - exports `init*` functions for manual initialization

---

## 🔧 Adding New Components

### Step 1: Create Component File
```javascript
// js/components/my-component.js

export function initMyComponent() {
    // Your component logic here
    console.log('My component initialized');
}

// Auto-initialize for non-module usage
if (typeof window !== 'undefined' && !window.myComponentInitialized) {
    document.addEventListener('DOMContentLoaded', initMyComponent);
    window.myComponentInitialized = true;
}
```

### Step 2: Add Script to HTML
```html
<script src="/js/components/my-component.js"></script>
```

---

## 💾 Data Storage

### LocalStorage Keys
- `theme` - Selected color theme (theme1-4)
- `language` - Selected language (en, ua)

### Clear Storage
```javascript
localStorage.removeItem('theme');
localStorage.removeItem('language');
```

---

## 🔍 Debugging

### Check Initialization
```javascript
console.log(window.app.initialized);  // Should be true
console.log(window.themeSwitcherInitialized);
console.log(window.languageSwitcherInitialized);
console.log(window.navigationInitialized);
```

### Common Issues
1. **Scripts not loading** - Check file paths in HTML
2. **Styles not applying** - Ensure CSS is loaded before JS
3. **Translations not working** - Check `translations.json` path

---

## 📝 Best Practices

1. **Keep components independent** - Each should work standalone
2. **Use meaningful names** - Clear function and file names
3. **Add console logs** - For debugging and initialization tracking
4. **Handle errors gracefully** - Check if elements exist before using them
5. **Document your code** - Add comments for complex logic

---

## 🎯 Future Enhancements

Possible additions to `utils/` folder:
- `utils/storage.js` - LocalStorage helpers
- `utils/api.js` - API call utilities
- `utils/validation.js` - Form validation
- `utils/animations.js` - Reusable animations
- `utils/helpers.js` - General helper functions


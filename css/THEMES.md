# Theme System Documentation

## 🎨 Overview
The website now has a **4-theme color system** that users can switch between in real-time. All colors are defined using CSS variables, making it easy to maintain and extend.

## 🌈 Available Themes

### Theme 1 - Default Blue (Professional)
- **Primary:** `#2563eb` - Bright blue
- **Secondary:** `#64748b` - Slate gray
- **Accent:** `#0ea5e9` - Sky blue
- **Best for:** Corporate, professional, tech websites

### Theme 2 - Warm Earth (Cozy & Welcoming)
- **Primary:** `#9F8772` - Warm brown
- **Secondary:** `#C8DBBE` - Soft green
- **Accent:** `#665A48` - Dark brown
- **Best for:** Organic, natural, wellness websites

### Theme 3 - Ocean Blue (Calm & Serene)
- **Primary:** `#89A8B2` - Ocean blue
- **Secondary:** `#B3C8CF` - Light blue
- **Accent:** `#E5E1DA` - Cream
- **Best for:** Health, spa, relaxation websites

### Theme 4 - Dark Green (Strong & Grounded)
- **Primary:** `#3F4E4F` - Dark teal
- **Secondary:** `#A27B5C` - Taupe
- **Accent:** `#DCD7C9` - Light beige
- **Best for:** Military, outdoor, rugged websites

## 🔧 How It Works

### CSS Variables
All themes use the same CSS variable names:
```css
--primary-color
--secondary-color
--accent-color
--text-color
--text-light
--bg-color
--bg-light
--border-color
--shadow
--shadow-lg
--transition
```

### Theme Selection
Themes are applied using the `data-theme` attribute on the `<html>` element:
```html
<html data-theme="theme1">  <!-- Default Blue -->
<html data-theme="theme2">  <!-- Warm Earth -->
<html data-theme="theme3">  <!-- Ocean Blue -->
<html data-theme="theme4">  <!-- Dark Green -->
```

### JavaScript Control
The theme is saved to `localStorage` and persists across page reloads:
```javascript
localStorage.setItem('theme', 'theme2');  // Save theme
const theme = localStorage.getItem('theme');  // Load theme
```

## 🎯 Usage in CSS

### Always use CSS variables for colors:
```css
/* ✅ GOOD */
.my-element {
    color: var(--text-color);
    background-color: var(--primary-color);
    border-color: var(--border-color);
}

/* ❌ BAD */
.my-element {
    color: #333333;
    background-color: #2563eb;
    border-color: #e2e8f0;
}
```

## 📦 Adding New Themes

1. Add theme to `css/main.css`:
```css
[data-theme="theme5"] {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ... other variables */
}
```

2. Add button to theme switcher in `index.html`:
```html
<button class="theme-btn" data-theme="theme5" title="Your Theme"></button>
```

3. Add gradient to `css/components/theme-switcher.css`:
```css
.theme-btn[data-theme="theme5"] {
    background: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

## 🚀 Features

- **Instant switching:** Changes apply immediately
- **Persistent:** Theme choice saved in localStorage
- **Smooth transitions:** 0.3s ease animations
- **Accessible:** Full ARIA labels and keyboard support
- **Responsive:** Works on all screen sizes

## 💡 Best Practices

1. **Always use CSS variables** for colors
2. **Test all themes** when adding new components
3. **Maintain contrast ratios** for accessibility
4. **Keep theme colors consistent** with brand identity
5. **Document color meanings** for each theme


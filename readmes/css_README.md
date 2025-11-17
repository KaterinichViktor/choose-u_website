# CSS Structure Documentation

## 📁 Directory Structure

```
css/
├── styles.css              # Main CSS file (imports all others)
├── main.css                # Base/global styles
├── components/             # Reusable component styles
│   ├── header.css
│   └── footer.css
└── pages/                  # Page-specific styles
    └── index.css
```

## 🎯 How It Works

### Single Import in HTML
Instead of multiple `<link>` tags, you only need one:

```html
<link rel="stylesheet" href="/css/styles.css">
```

### styles.css - Central Import Hub
The `styles.css` file imports all CSS modules:
- Base styles (main.css)
- Components (header, footer, etc.)
- Page-specific styles

### Adding New Components
1. Create new file in `components/` folder (e.g., `navbar.css`)
2. Add import to `styles.css`:
   ```css
   @import url('components/navbar.css');
   ```

### Adding New Pages
1. Create new file in `pages/` folder (e.g., `about.css`)
2. Add import to `styles.css`:
   ```css
   @import url('pages/about.css');
   ```

## ✅ Benefits

- **Single Stylesheet Link**: Only one `<link>` tag needed in HTML
- **Modular**: Components and pages are separated
- **Maintainable**: Easy to find and update specific styles
- **Scalable**: Simple to add new components or pages
- **Clean HTML**: No inline styles, all styling in CSS files

## 📝 Notes

- All inline styles have been moved to appropriate CSS files
- Components (header, footer) are reusable across pages
- Page-specific styles (index.css) contain unique layouts for that page
- Base styles (main.css) contain global typography, colors, and utilities


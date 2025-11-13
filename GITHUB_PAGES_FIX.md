# GitHub Pages Fix - Path Updates

## Issue
The website broke when hosting on GitHub Pages because all paths were absolute (starting with `/`), which don't work when the site is served from a subdirectory like `username.github.io/repository-name/`.

## Solution
Converted all absolute paths to relative paths.

## Files Changed

### 1. `index.html`
- Changed all CSS/JS imports from `/css/` and `/js/` to `./css/` and `./js/`
- Changed all image sources from `/public/` to `./public/`
- Changed all internal links from `/index.html` to `./index.html`
- Changed all component links from `/components/` to `./components/`

### 2. Component HTML Files (in `components/` folder)
Files updated:
- `spinner.html`
- `carousel-continuous.html`
- `carousel-pagination.html`
- `carousel.html`
- `carousel-index.html`

Changes:
- CSS imports: `/css/` → `../css/`
- JS imports: `/js/` → `../js/`

### 3. `js/components/language-switcher.js`
- Added smart path detection for translations.json
- Uses `./js/translations.json` for root pages
- Uses `../js/translations.json` for component pages
- Code:
  ```javascript
  const translationsPath = window.location.pathname.includes('/components/') 
      ? '../js/translations.json' 
      : './js/translations.json';
  ```

## Path Reference Guide

### From root directory (`index.html`):
- CSS: `./css/styles.css`
- JS: `./js/main.js`
- Images: `./public/images/...`
- Links: `./index.html`, `./components/spinner.html`

### From `components/` directory:
- CSS: `../css/main.css`
- JS: `../js/components/spinner.js`
- Images: `../public/images/...`
- Links: `../index.html`

## Testing
After these changes, the site should work correctly on:
- ✅ Local file system
- ✅ Local development server
- ✅ GitHub Pages (username.github.io/repo-name/)
- ✅ GitHub Pages (custom domain)

## Deployment Checklist
1. ✅ All paths are relative
2. ✅ Translations JSON path is dynamic
3. ✅ All component pages use `../` for parent directory
4. ✅ All root pages use `./` for current directory
5. ✅ No hardcoded `/` paths remain

## Notes
- The `.` prefix (e.g., `./css/`) explicitly means "current directory" and is more reliable than omitting it
- The `..` prefix means "parent directory"
- GitHub Pages is case-sensitive (unlike Windows), so ensure all file names match exactly


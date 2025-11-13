// Language Switcher Component
// Handles multi-language support with translations

function initLanguageSwitcher() {
    // Language code mapping - CONTROL LANGUAGE DISPLAY TEXT HERE
    const langDisplayCodes = {
        'en': 'EN',
        'ua': 'UA'
    };

    // Translation system
    let translations = {};
    let currentLang = localStorage.getItem('language') || 'ua'; // Default to Ukrainian

    // Load translations from JSON file
    // Determine the correct path based on current page location
    const translationsPath = window.location.pathname.includes('/components/') 
        ? '../js/translations.json' 
        : './js/translations.json';
    
    fetch(translationsPath)
        .then(response => response.json())
        .then(data => {
            translations = data;
            // Set initial language
            changeLanguage(currentLang, false); // false = don't animate on page load
            
            // Signal that translations are ready
            window.translationsReady = true;
            document.dispatchEvent(new Event('translationsLoaded'));
            console.log('Translations loaded for language:', currentLang);
        })
        .catch(error => console.error('Error loading translations:', error));

    // Function to change language
    function changeLanguage(lang, animate = true) {
        if (!translations[lang]) {
            console.error('Language not found:', lang);
            return;
        }

        currentLang = lang;
        localStorage.setItem('language', lang);

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key] !== undefined) {
                // Check if the element should use innerHTML (for HTML content like <br>)
                if (translations[lang][key].includes('<br>')) {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }

                // Add animation class if needed
                if (animate) {
                    element.classList.add('lang-switch-animation');
                    setTimeout(() => element.classList.remove('lang-switch-animation'), 300);
                }
            }
        });

        // Update active state in dropdowns
        document.querySelectorAll('.dropdown-item, .mobile-dropdown-item').forEach(item => {
            if (item.getAttribute('data-lang') === lang) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update language button display
        const langButtons = document.querySelectorAll('.current-lang');
        langButtons.forEach(btn => {
            btn.textContent = langDisplayCodes[lang] || lang.toUpperCase();
        });
    }
    
    // Expose changeLanguage globally for carousel reinit
    window.updateTranslations = function() {
        if (currentLang && translations[currentLang]) {
            changeLanguage(currentLang, false);
        }
    };

    // Language Dropdown - Desktop
    const langDropdown = document.getElementById('langDropdown');
    const langButton = document.getElementById('langButton');
    
    if (langButton) {
        langButton.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('open');
        });
    }

    // Language Dropdown Items - Desktop
    const langItems = document.querySelectorAll('#langDropdown .dropdown-item');
    langItems.forEach(item => {
        item.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            
            // Change language using the translation system
            changeLanguage(selectedLang);
            
            // Close dropdown
            langDropdown.classList.remove('open');
        });
    });

    // Mobile Language Dropdown
    const mobileLangDropdown = document.getElementById('mobileLangDropdown');
    const mobileLangButton = mobileLangDropdown?.querySelector('.mobile-dropdown-button');
    
    // Mobile dropdown toggle is handled by navigation.js
    // We just need to handle the language item clicks
    
    // Mobile Language Dropdown Items
    const mobileLangItems = document.querySelectorAll('#mobileLangDropdown .mobile-dropdown-item');
    mobileLangItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const selectedLang = this.getAttribute('data-lang');
            console.log('Mobile language clicked:', selectedLang);
            
            // Change language using the translation system
            changeLanguage(selectedLang);
            
            // Close dropdown
            if (mobileLangDropdown) {
                mobileLangDropdown.classList.remove('open');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (langDropdown && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('open');
        }
        if (mobileLangDropdown && !mobileLangDropdown.contains(e.target)) {
            mobileLangDropdown.classList.remove('open');
        }
    });

    console.log('Language switcher initialized');
}

// For non-module usage
if (typeof window !== 'undefined' && !window.languageSwitcherInitialized) {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
    window.languageSwitcherInitialized = true;
}


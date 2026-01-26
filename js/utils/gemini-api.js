// Google Translate API Utility Functions

// Get Tagline Suggestions (Keep Gemini for this, or use pre-made list)
async function getSuggestions() {
    const title = document.getElementById('app-title').value;
    
    if (!title) {
        alert('Please enter an app title first');
        return;
    }

    const btn = document.getElementById('suggest-btn');
    btn.innerHTML = '<i data-lucide="loader-2" class="w-3 h-3 animate-spin"></i> Loading...';
    btn.disabled = true;

    // Predefined suggestion templates
    const suggestionTemplates = [
        `Transform Your ${title} Experience`,
        `${title} - Made Simple`,
        `Unlock the Power of ${title}`,
        `Your Ultimate ${title} Solution`,
        `${title}: Fast, Easy, Powerful`,
        `Experience ${title} Like Never Before`,
        `${title} - Your Daily Essential`,
        `Elevate Your Life with ${title}`,
        `${title}: Innovation Meets Simplicity`,
        `Join Millions Using ${title}`,
        `${title} - The Smart Choice`,
        `Discover ${title} Today`,
        `${title}: Where Quality Meets Performance`,
        `Get More with ${title}`,
        `${title} - Trusted by Experts`,
        `Master ${title} in Minutes`,
        `${title}: Your Success Partner`,
        `Revolutionize Your Workflow with ${title}`,
        `${title} - Built for You`,
        `The Future of ${title} is Here`
    ];

    try {
        displaySuggestions(suggestionTemplates);
    } finally {
        btn.innerHTML = '<i data-lucide="sparkles" class="w-3 h-3"></i> Get Suggestions';
        btn.disabled = false;
        lucide.createIcons();
    }
}

// Display Suggestions
function displaySuggestions(suggestions) {
    const container = document.getElementById('suggestions-container');
    if (!container || suggestions.length === 0) return;

    const suggestionClass = isDarkMode 
        ? 'bg-[#0a0c10] border-slate-800 hover:bg-blue-600/10 hover:border-blue-600/40' 
        : 'bg-slate-50 border-slate-100 hover:bg-blue-50 hover:border-blue-200';

    container.innerHTML = `
        <div class="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-2">
            ${suggestions.map((s, idx) => `
                <button 
                    onclick="selectSuggestion('${s.replace(/'/g, "\\'")}')"
                    class="text-left p-3 rounded-xl text-xs font-semibold transition-all border ${suggestionClass}"
                >
                    ${s}
                </button>
            `).join('')}
        </div>
    `;
}

// Select Suggestion
function selectSuggestion(text) {
    document.getElementById('app-tagline').value = text;
    updateAdData('tagline', text);
}

// Translate Tagline using Google Translate API (Free Method)
async function translateTagline() {
    const tagline = document.getElementById('app-tagline').value;
    const languageSelect = document.getElementById('language-select');
    const targetLang = languageSelect.value; // This is the language code

    if (!tagline) {
        alert('Please enter a tagline first');
        return;
    }

    if (targetLang === 'en') {
        alert('Already in English');
        return;
    }

    const btn = document.getElementById('translate-btn');
    btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i>';
    btn.disabled = true;

    try {
        // Using Google Translate's public API endpoint
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(tagline)}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data[0] && data[0][0]) {
            const translated = data[0][0][0];
            document.getElementById('app-tagline').value = translated;
            updateAdData('tagline', translated);
        }

    } catch (error) {
        console.error('Translation Error:', error);
        alert('Translation failed. Please try again.');
    } finally {
        btn.innerHTML = '<i data-lucide="globe" class="w-5 h-5"></i>';
        btn.disabled = false;
        lucide.createIcons();
    }
}

// Filter Languages (Search functionality)
function filterLanguages(searchTerm) {
    const select = document.getElementById('language-select');
    const options = select.querySelectorAll('option');
    
    searchTerm = searchTerm.toLowerCase();
    
    options.forEach(option => {
        const langName = option.textContent.toLowerCase();
        const langCode = option.value.toLowerCase();
        
        if (langName.includes(searchTerm) || langCode.includes(searchTerm)) {
            option.style.display = '';
        } else {
            option.style.display = 'none';
        }
    });
}

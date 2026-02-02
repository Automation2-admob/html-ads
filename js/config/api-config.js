// API Configuration
const API_CONFIG = {
    GEMINI_API_KEY: '', // Add your Gemini API key here or use environment variable
    GEMINI_ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent',
    MAX_SUGGESTIONS: 20,
    TIMEOUT: 30000 // 30 seconds
};

// Get API Key (supports multiple methods)
function getApiKey() {
    // Method 1: From config
    if (API_CONFIG.GEMINI_API_KEY) {
        return API_CONFIG.GEMINI_API_KEY;
    }
    
    // Method 2: From URL parameter (for testing)
    const urlParams = new URLSearchParams(window.location.search);
    const urlKey = urlParams.get('api_key');
    if (urlKey) {
        return urlKey;
    }
    
    // Method 3: From localStorage (user can save it)
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
        return savedKey;
    }
    
    return null;
}

// Save API Key
function saveApiKey(key) {
    localStorage.setItem('gemini_api_key', key);
    API_CONFIG.GEMINI_API_KEY = key;
}

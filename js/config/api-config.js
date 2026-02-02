// API Configuration
const API_CONFIG = {
    // Gemini API (for translations/suggestions)
    GEMINI_API_KEY: '', // Add your Gemini API key here
    GEMINI_ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent',
    MAX_SUGGESTIONS: 20,
    TIMEOUT: 30000,
    
    // Google Sheets API (NEW)
    GOOGLE_SHEETS_API_KEY: 'AIzaSyB9fncYmb5P5o0I0VnLaXOZakkO5B6czKU', // Add your Google Sheets API key here
    GOOGLE_SHEET_ID: '1sNwdJm4n5KN0hCJDhIrho3vPmN3tdPv0Q4dMtsbN2B4', // Add your Google Sheet ID here
    SHEET_RANGE: 'Sheet1!A:B' // Adjust to your sheet name and range
};

// Get API Keys (supports multiple methods)
function getApiKey() {
    if (API_CONFIG.GEMINI_API_KEY) {
        return API_CONFIG.GEMINI_API_KEY;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const urlKey = urlParams.get('api_key');
    if (urlKey) {
        return urlKey;
    }
    
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
        return savedKey;
    }
    
    return null;
}

// Get Google Sheets API Key
function getSheetsApiKey() {
    if (API_CONFIG.GOOGLE_SHEETS_API_KEY) {
        return API_CONFIG.GOOGLE_SHEETS_API_KEY;
    }
    
    const savedKey = localStorage.getItem('sheets_api_key');
    if (savedKey) {
        return savedKey;
    }
    
    return null;
}

// Save API Keys
function saveApiKey(key) {
    localStorage.setItem('gemini_api_key', key);
    API_CONFIG.GEMINI_API_KEY = key;
}

function saveSheetsApiKey(key) {
    localStorage.setItem('sheets_api_key', key);
    API_CONFIG.GOOGLE_SHEETS_API_KEY = key;
}

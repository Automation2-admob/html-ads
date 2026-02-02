// API Configuration
// Actual keys are in api-keys.js (not committed to GitHub)
const API_CONFIG = {
    // Gemini API
    GEMINI_API_KEY: (typeof LOCAL_API_KEYS !== 'undefined' && LOCAL_API_KEYS.GEMINI_API_KEY) || '',
    GEMINI_ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent',
    MAX_SUGGESTIONS: 20,
    TIMEOUT: 30000,
    
    // Google Sheets API
    GOOGLE_SHEETS_API_KEY: (typeof LOCAL_API_KEYS !== 'undefined' && LOCAL_API_KEYS.GOOGLE_SHEETS_API_KEY) || '',
    GOOGLE_SHEET_ID: (typeof LOCAL_API_KEYS !== 'undefined' && LOCAL_API_KEYS.GOOGLE_SHEET_ID) || '',
    SHEET_RANGE: 'Sheet1!A:B' // Adjust to your sheet name and range
};

// Get Gemini API Key
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

// Get Google Sheet ID
function getSheetId() {
    if (API_CONFIG.GOOGLE_SHEET_ID) {
        return API_CONFIG.GOOGLE_SHEET_ID;
    }
    
    const savedId = localStorage.getItem('sheet_id');
    if (savedId) {
        return savedId;
    }
    
    return null;
}

// Save API Keys (Optional - for user input)
function saveApiKey(key) {
    localStorage.setItem('gemini_api_key', key);
    API_CONFIG.GEMINI_API_KEY = key;
}

function saveSheetsApiKey(key) {
    localStorage.setItem('sheets_api_key', key);
    API_CONFIG.GOOGLE_SHEETS_API_KEY = key;
}

function saveSheetId(id) {
    localStorage.setItem('sheet_id', id);
    API_CONFIG.GOOGLE_SHEET_ID = id;
}

// Google Sheets Integration

let appsCache = null;

// Fetch Apps from Google Sheets
async function fetchAppsFromSheet() {
    const apiKey = getSheetsApiKey();
    const sheetId = getSheetId();
    const range = API_CONFIG.SHEET_RANGE;

    if (!apiKey || !sheetId) {
        console.warn('Google Sheets API not configured');
        return [];
    }

    // Return cached data if available
    if (appsCache) {
        return appsCache;
    }

    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if (data.values && data.values.length > 1) {
            // Skip header row and map data
            const apps = data.values.slice(1).map(row => ({
                name: row[0] || '',
                package: row[1] || ''
            })).filter(app => app.name); // Filter out empty rows

            appsCache = apps;
            return apps;
        }

        return [];
    } catch (error) {
        console.error('Error fetching from Google Sheets:', error);
        return [];
    }
}

// Clear cache (call this if you want to refresh data)
function clearAppsCache() {
    appsCache = null;
}

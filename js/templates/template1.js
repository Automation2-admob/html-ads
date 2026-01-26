async function generateTemplate1HTML() {
    return `<!doctype html>
<html lang="en" style="height: 100%;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${adData.title} - Store Style Ad</title>
    
    <script src="https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        #app-title, #app-tagline, .rating-text, .text-xs, #btn-text {
            color: #FFFFFF !important;
            opacity: 1 !important;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            height: 100%; 
            font-family: 'Space Grotesk', sans-serif; 
            overflow: hidden;
            background: #0f0f23;
        }

        #ad-container {
            height: 100%; width: 100%;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            padding: 24px; position: relative;
            background: radial-gradient(circle at top, #1a1a3e 0%, #0f0f23 100%);
        }

        .app-identity {
            display: flex; flex-direction: column;
            align-items: center; text-align: center;
            margin-bottom: 30px;
            animation: fadeIn 0.8s ease-out;
        }

        .app-logo {
            width: 100px; height: 100px;
            border-radius: 22px;
            margin-bottom: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            border: 2px solid rgba(255,255,255,0.1);
        }

        .rating-container {
            display: flex; align-items: center;
            gap: 8px; margin-bottom: 8px;
        }

        .stars { color: #FFD700; font-size: 18px; }

        h1 { font-size: 26px; font-weight: 700; margin-bottom: 4px; }
        p.tagline { font-size: 14px; opacity: 0.9; color: #FFFFFF; }

        .store-badges {
            display: flex; gap: 10px; margin: 20px 0;
        }
        .badge {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            padding: 6px 12px; border-radius: 8px;
            font-size: 12px; font-weight: 500;
            color: white; border: 1px solid rgba(255,255,255,0.1);
        }

        .download-btn {
            position: relative;
            padding: 16px 48px;
            border-radius: 50px;
            display: flex; align-items: center; gap: 10px;
            text-decoration: none; border: none;
            cursor: pointer; font-family: inherit;
            background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
            animation: pulse-button 2s infinite;
        }

        @keyframes pulse-button {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .particle { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: #8b5cf6; opacity: 0.3; }
    </style>
</head>
<body>
    <div id="ad-container">
        <div class="particle" style="top: 15%; left: 10%;"></div>
        <div class="particle" style="top: 25%; right: 15%;"></div>
        <div class="particle" style="bottom: 20%; left: 20%;"></div>

        <div class="app-identity">
            <img class="app-logo" src="icon.png" alt="Logo" loading="lazy">
            
            <div class="rating-container">
                <div class="stars">★★★★★</div>
                <span class="rating-text" style="font-size: 14px; font-weight: bold;">4.8</span>
            </div>

            <h1 id="app-title">${adData.title}</h1>
            <p id="app-tagline" class="tagline">${adData.tagline}</p>
        </div>

        <div class="store-badges">
            <div class="badge">#1 Trending</div>
            <div class="badge">FREE</div>
            <div class="badge">1M+ Downloads</div>
        </div>

        <button onclick="ExitApi.exit()" class="download-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
            <span id="btn-text" style="font-size: 18px; font-weight: 700;">DOWNLOAD FREE</span>
        </button>

        <p class="text-xs mt-3" style="opacity: 0.6 !important;">Fast & Secure Installation</p>
    </div>
</body>
</html>`;
}

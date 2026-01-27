async function generateTemplate1HTML() {
    const topLabel = adData.showAdLabels ? 'ADVERTISEMENT' : '';
    const bottomLabel = adData.showAdLabels ? 'PROMOTED APP CONTENT' : '';
    
    return `<!doctype html>
<html lang="en" style="height: 100%;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${adData.title} - Store Style Ad</title>
    
    <script src="https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        #app-title, #app-tagline, .rating-text, .text-xs, #btn-text, .ad-label {
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
            background: radial-gradient(circle at center, #1a1a3e 0%, #0f0f23 100%);
        }

        .ad-label {
            position: absolute;
            top: 15px;
            font-size: 10px;
            letter-spacing: 2px;
            opacity: 0.5 !important;
            font-weight: 700;
        }

        .app-identity {
            display: flex; flex-direction: column;
            align-items: center; text-align: center;
            margin-bottom: 25px;
            animation: fadeIn 0.8s ease-out;
            z-index: 10;
        }

        .app-logo {
            width: 90px; height: 90px;
            border-radius: 20px;
            margin-bottom: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.6);
            border: 1px solid rgba(255,255,255,0.1);
        }

        .rating-container {
            display: flex; align-items: center;
            gap: 8px; margin-bottom: 10px;
            background: rgba(255, 255, 255, 0.05);
            padding: 4px 12px;
            border-radius: 20px;
        }

        .stars { color: #FFD700; font-size: 16px; }

        h1 { font-size: 24px; font-weight: 700; margin-bottom: 6px; line-height: 1.2; }
        p.tagline { font-size: 14px; opacity: 0.8 !important; color: #FFFFFF; }

        .store-badges {
            display: flex; gap: 8px; margin: 20px 0;
            z-index: 10;
        }
        .badge {
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(10px);
            padding: 6px 12px; border-radius: 6px;
            font-size: 11px; font-weight: 600;
            color: white; border: 1px solid rgba(255,255,255,0.1);
        }

        .download-btn {
            position: relative;
            padding: 16px 50px;
            border-radius: 4px;
            display: flex; align-items: center; gap: 10px;
            text-decoration: none; border: none;
            cursor: pointer; font-family: inherit;
            background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
            box-shadow: 0 8px 30px rgba(139, 92, 246, 0.4);
            transition: transform 0.2s;
            overflow: hidden;
            z-index: 10;
        }

        .download-btn:active { transform: scale(0.96); }

        .btn-shimmer {
            position: absolute;
            top: 0; left: -150%; width: 50%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
            transform: skewX(-25deg);
            animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
            0% { left: -150%; }
            35% { left: 150%; }
            100% { left: 150%; }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .particle { 
            position: absolute; 
            border-radius: 50%; 
            background: #8b5cf6; 
            opacity: 0.2; 
            filter: blur(40px);
        }

        .bottom-label {
            font-size: 11px;
            opacity: 0.5 !important;
            font-weight: 600;
            margin-top: 12px;
            color: #FFFFFF !important;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <div id="ad-container">
        ${topLabel ? `<div class="ad-label">${topLabel}</div>` : ''}
        
        <div class="particle" style="width:200px; height:200px; top: -50px; left: -50px;"></div>
        <div class="particle" style="width:250px; height:250px; bottom: -50px; right: -50px; background: #06b6d4;"></div>

        <div class="app-identity">
            <img class="app-logo" src="icon.png" alt="Logo" loading="lazy">
            
            <div class="rating-container">
                <div class="stars">★★★★★</div>
                <span class="rating-text" style="font-size: 13px; font-weight: bold;">4.8 Rating</span>
            </div>

            <h1 id="app-title">${adData.title}</h1>
            <p id="app-tagline" class="tagline">${adData.tagline}</p>
        </div>

        <div class="store-badges">
            <div class="badge">TOP TRENDING</div>
            <div class="badge">FREE INSTALL</div>
            <div class="badge">1M+ USERS</div>
        </div>

        <button onclick="ExitApi.exit()" class="download-btn">
            <div class="btn-shimmer"></div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
            <span id="btn-text" style="font-size: 17px; font-weight: 800; letter-spacing: 0.5px;">INSTALL NOW</span>
        </button>

        ${bottomLabel ? `<p class="bottom-label">${bottomLabel}</p>` : ''}
    </div>

    <script type="text/javascript">
        window.addEventListener('load', function() {
            console.log("Ad Ready");
        });
    </script>
</body>
</html>`;
}

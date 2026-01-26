async function generateTemplate5HTML() {
    return `<!doctype html>
<html lang="en" style="height: 100%;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${adData.title} - Minimal Blur Ad</title>
    
    <script src="https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&display=swap" rel="stylesheet">
    
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body { 
            height: 100%; 
            font-family: 'Space Grotesk', sans-serif; 
            overflow: hidden;
            background-color: #000;
        }

        #ad-container {
            height: 100%; width: 100%;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            position: relative;
            overflow: hidden;
        }

        .bg-wrapper {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 1;
            transform: scale(1.1);
        }

        .bg-image {
            width: 100%; height: 100%;
            object-fit: cover;
            filter: blur(20px) brightness(0.4);
            animation: slowPan 20s infinite alternate ease-in-out;
        }

        @keyframes slowPan {
            from { transform: scale(1); }
            to { transform: scale(1.15) translate(5px, 5px); }
        }

        .content-wrapper {
            position: relative;
            z-index: 10;
            width: 90%;
            max-width: 320px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            animation: fadeIn 0.8s ease-out;
        }

        .app-logo {
            width: 90px; height: 90px;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.6);
            object-fit: cover;
            margin-bottom: 20px;
            border: 1px solid rgba(255,255,255,0.1);
        }

        #app-title { 
            font-size: 32px; 
            font-weight: 800; 
            color: #FFFFFF !important;
            line-height: 1.1; 
            margin-bottom: 30px;
            text-shadow: 0 4px 15px rgba(0,0,0,0.8);
            text-transform: uppercase;
            letter-spacing: -1px;
        }

        .cta-button {
            position: relative;
            width: 100%;
            background: #FFFFFF;
            padding: 18px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            overflow: hidden;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 12px 30px rgba(0,0,0,0.4);
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .cta-button:active { transform: scale(0.96); }

        .btn-text {
            color: #000000; 
            font-size: 20px; 
            font-weight: 800;
            letter-spacing: 0.5px; 
            text-transform: uppercase;
        }

        .btn-highlight {
            position: absolute;
            top: 0; left: -150%; width: 60%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
            transform: skewX(-25deg);
            animation: highlightMove 3s infinite;
        }

        @keyframes highlightMove {
            0% { left: -150%; }
            35% { left: 150%; }
            100% { left: 150%; }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .tap-hint {
            color: rgba(255,255,255,0.4);
            font-size: 11px;
            margin-top: 15px;
            letter-spacing: 1px;
            font-weight: 500;
        }
    </style>
</head>
<body>

    <div id="ad-container">
        <div class="bg-wrapper">
            <img class="bg-image" src="feature_1_image.png" alt="App Scene" loading="lazy">
        </div>

        <div class="content-wrapper">
            <img class="app-logo" src="icon.png" alt="App Logo" loading="lazy">
            
            <h1 id="app-title">${adData.title}</h1>

            <button class="cta-button" onclick="ExitApi.exit()">
                <div class="btn-highlight"></div>
                <span class="btn-text">Download The App</span>
            </button>
            
            <p class="tap-hint">SECURE INSTALLATION</p>
        </div>
    </div>

</body>
</html>`;
}

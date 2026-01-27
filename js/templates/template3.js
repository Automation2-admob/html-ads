async function generateTemplate3HTML() {
    // Get feature names or use defaults
    const feature1 = adData.feature1 || 'Video Downloading';
    const feature2 = adData.feature2 || 'Multi Platform Support';
    const feature3 = adData.feature3 || 'HD Video Playback';
    
    // Ad labels
    const topLabel = adData.showAdLabels ? 'ADVERTISEMENT' : '';
    const bottomLabel = adData.showAdLabels ? 'PROMOTED APP CONTENT' : '';
    
    return `<!doctype html>
<html lang="en" style="height: 100%;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${adData.title} - Premium Cards Ad</title>
    
    <script src="https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&display=swap" rel="stylesheet">
    
    <style>
        h1, p, .card span, .btn-text, .ad-label {
            color: #FFFFFF !important;
            opacity: 1 !important;
            text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            height: 100%; 
            font-family: 'Space Grotesk', sans-serif; 
            background: radial-gradient(circle at center, #1a1a3e 0%, #0f0f23 100%);
            overflow: hidden;
        }

        #ad-container {
            height: 100%; width: 100%;
            display: flex; flex-direction: column;
            align-items: center; justify-content: space-between;
            padding: 40px 20px;
            position: relative;
        }

        .ad-label {
            position: absolute;
            top: 15px;
            font-size: 10px;
            letter-spacing: 2px;
            opacity: 0.6 !important;
            font-weight: 700;
            text-transform: uppercase;
        }

        .header { text-align: center; animation: fadeInDown 0.8s ease-out; z-index: 10; }
        h1 { font-size: 26px; font-weight: 800; margin-bottom: 4px; letter-spacing: -0.5px; line-height: 1.2; }
        .header p { font-size: 14px; opacity: 0.8 !important; color: #cbd5e1; }

        .feature-stage {
            position: relative; width: 100%; height: 260px;
            display: flex; align-items: center; justify-content: center;
            z-index: 5;
        }

        .card {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 20px;
            width: 160px;
            display: flex; flex-direction: column;
            align-items: center;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 15px 35px rgba(0,0,0,0.4);
        }

        .card img { 
            width: 64px; 
            height: 64px; 
            border-radius: 14px; 
            margin-bottom: 12px; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.3); 
            object-fit: cover;
        }
        
        .card span { font-size: 13px; font-weight: 700; text-align: center; line-height: 1.2; }

        .card.active { transform: scale(1.15) translateY(0); opacity: 1; z-index: 10; border-color: #8b5cf6; box-shadow: 0 20px 50px rgba(139, 92, 246, 0.3); }
        .card.left { transform: scale(0.8) translateX(-115px); opacity: 0.4; z-index: 5; }
        .card.right { transform: scale(0.8) translateX(115px); opacity: 0.4; z-index: 5; }

        .cta-container { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 12px; z-index: 10; }
        
        .download-btn {
            position: relative;
            background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
            border: none;
            padding: 16px 50px; 
            border-radius: 4px;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
            overflow: hidden;
            transition: transform 0.2s;
        }
        .download-btn:active { transform: scale(0.96); }

        .btn-text { font-size: 18px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }

        .btn-shimmer {
            position: absolute;
            top: 0; left: -150%; width: 50%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent);
            transform: skewX(-25deg);
            animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
            0% { left: -150%; }
            35% { left: 150%; }
            100% { left: 150%; }
        }

        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .particle-glow { position: absolute; border-radius: 50%; background: #8b5cf6; opacity: 0.15; filter: blur(60px); z-index: 0; }
    </style>
</head>
<body>

    <div id="ad-container">
        ${topLabel ? `<div class="ad-label">${topLabel}</div>` : ''}
        
        <div class="particle-glow" style="width: 200px; height: 200px; top: 10%; left: -50px;"></div>
        <div class="particle-glow" style="width: 250px; height: 250px; bottom: 10%; right: -50px; background: #6366f1;"></div>

        <div class="header">
            <h1 id="app-name">${adData.title}</h1>
            <p id="app-tagline">${adData.tagline}</p>
        </div>

        <div class="feature-stage">
            <div class="card left" id="c0">
                <img src="feature_1_image.png" alt="Feature 1" loading="lazy">
                <span>${feature1}</span>
            </div>
            <div class="card active" id="c1">
                <img src="feature_2_image.png" alt="Feature 2" loading="lazy">
                <span>${feature2}</span>
            </div>
            <div class="card right" id="c2">
                <img src="feature_3_image.png" alt="Feature 3" loading="lazy">
                <span>${feature3}</span>
            </div>
        </div>

        <div class="cta-container">
            <button class="download-btn" onclick="ExitApi.exit()">
                <div class="btn-shimmer"></div>
                <span class="btn-text">INSTALL NOW</span>
            </button>
            ${bottomLabel ? `<p style="font-size: 11px; opacity: 0.5; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">${bottomLabel}</p>` : ''}
        </div>
    </div>

    <script>
        let step = 0;
        const cards = [document.getElementById('c0'), document.getElementById('c1'), document.getElementById('c2')];
        
        function rotate() {
            step = (step + 1) % 3;
            cards.forEach((card, i) => {
                card.classList.remove('active', 'left', 'right');
                let pos = (i - step + 3) % 3;
                if (pos === 1) card.classList.add('active');
                else if (pos === 0) card.classList.add('left');
                else card.classList.add('right');
            });
        }

        setInterval(rotate, 2500);
    </script>
</body>
</html>`;
}

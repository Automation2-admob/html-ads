async function generateTemplate3HTML() {
    return `<!doctype html>
<html lang="en" style="height: 100%;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${adData.title} - Premium Cards Ad</title>
    
    <script src="https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
    
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            height: 100%; 
            font-family: 'Space Grotesk', sans-serif; 
            background: radial-gradient(circle at center, #1a1a3e 0%, #0f0f23 100%);
            color: #FFFFFF;
            overflow: hidden;
        }

        #ad-container {
            height: 100%; width: 100%;
            display: flex; flex-direction: column;
            align-items: center; justify-content: space-between;
            padding: 40px 20px;
        }

        .header { text-align: center; animation: fadeInDown 0.8s ease-out; }
        h1 { font-size: 28px; font-weight: 700; margin-bottom: 4px; letter-spacing: -0.5px; }
        p { font-size: 14px; opacity: 0.9; color: #cbd5e1; }

        .feature-stage {
            position: relative; width: 100%; height: 260px;
            display: flex; align-items: center; justify-content: center;
        }

        .card {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 20px;
            width: 160px;
            display: flex; flex-direction: column;
            align-items: center;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .card img { width: 60px; height: 60px; border-radius: 12px; margin-bottom: 12px; }
        .card span { font-size: 13px; font-weight: 700; text-align: center; }

        .card.active { transform: scale(1.15) translateY(0); opacity: 1; z-index: 10; border-color: #8b5cf6; }
        .card.left { transform: scale(0.8) translateX(-110px); opacity: 0.5; z-index: 5; }
        .card.right { transform: scale(0.8) translateX(110px); opacity: 0.5; z-index: 5; }

        .cta-container { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        
        .download-btn {
            background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
            color: white; border: none;
            padding: 16px 48px; border-radius: 50px;
            font-size: 18px; font-weight: 700;
            cursor: pointer;
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
            animation: pulse-glow 2s infinite;
        }

        @keyframes pulse-glow {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(139, 92, 246, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
        }

        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>

    <div id="ad-container">
        <div class="header">
            <h1 id="app-name">${adData.title}</h1>
            <p id="app-tagline">${adData.tagline}</p>
        </div>

        <div class="feature-stage">
            <div class="card left" id="c0">
                <img src="feature_1_image.png" alt="F1" loading="lazy">
                <span>Real-Time Scan</span>
            </div>
            <div class="card active" id="c1">
                <img src="feature_2_image.png" alt="F2" loading="lazy">
                <span>Video Effects</span>
            </div>
            <div class="card right" id="c2">
                <img src="feature_3_image.png" alt="F3" loading="lazy">
                <span>Easy Sharing</span>
            </div>
        </div>

        <div class="cta-container">
            <button class="download-btn" onclick="ExitApi.exit()">
                DOWNLOAD FREE
            </button>
            <p style="font-size: 11px; opacity: 0.6;">Available on Play Store</p>
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

async function generateTemplate4HTML() {
    return `<!doctype html>
<html lang="en" style="height: 100%;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${adData.title} - 3D Scan Pane Ad</title>
    
    <script src="https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;800&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --bg-top: #2e0249;
            --bg-bottom: #000000;
            --accent-neon: #ff00ff;
            --secondary-neon: #00d4ff;
            --pure-white: #FFFFFF;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body { 
            height: 100%; 
            font-family: 'Space Grotesk', sans-serif; 
            overflow: hidden;
            background-color: var(--bg-bottom);
        }

        #ad-container {
            height: 100%; width: 100%;
            display: flex; flex-direction: column;
            align-items: center; justify-content: space-between;
            padding: 35px 20px;
            background: radial-gradient(circle at 50% 50%, #3a035a 0%, #000000 100%);
            position: relative;
        }

        .header { text-align: center; z-index: 100; }
        #app-title { 
            font-size: 38px; 
            font-weight: 800; 
            background: linear-gradient(180deg, #FFFFFF 20%, var(--secondary-neon) 60%, var(--accent-neon) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            letter-spacing: -2px;
            transform: skewX(-5deg);
            filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.4));
            margin-bottom: 5px;
            display: inline-block;
        }

        .feature-stage {
            flex: 1;
            display: flex; align-items: center; justify-content: center;
            perspective: 2000px;
            width: 100%;
        }

        .scan-pane {
            width: 220px;
            height: 340px;
            position: relative;
            transform-style: preserve-3d;
            animation: paneRotate 8s ease-in-out infinite;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(139, 92, 246, 0.2);
        }

        .scan-pane img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.9;
        }

        .scan-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(to right, transparent, var(--secondary-neon), var(--accent-neon), var(--secondary-neon), transparent);
            box-shadow: 0 0 20px var(--secondary-neon), 0 0 40px var(--accent-neon);
            z-index: 10;
            animation: moveScan 4s ease-in-out infinite;
        }

        .ui-element {
            position: absolute;
            z-index: 20;
            color: white;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.8;
        }

        .ui-top { top: 15px; left: 15px; }
        .ui-bottom { bottom: 15px; right: 15px; color: var(--accent-neon); }

        .sparkle {
            position: absolute;
            width: 30px; height: 30px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            animation: sparkleFloat 4s ease-in-out infinite;
            z-index: 5;
        }

        @keyframes sparkleFloat {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
            50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
        }

        .cta-container { width: 100%; display: flex; flex-direction: column; align-items: center; z-index: 100; }
        
        .start-now-btn {
            position: relative;
            background: linear-gradient(135deg, var(--accent-neon) 0%, #a100ff 100%);
            padding: 12px 42px;
            border-radius: 4px; 
            border: none;
            cursor: pointer;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(255, 0, 255, 0.4);
            transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .start-now-btn:active { transform: scale(0.95); }

        .btn-text { 
            font-size: 16px;
            font-weight: 800; 
            color: var(--pure-white) !important;
            letter-spacing: 1.5px;
            text-transform: uppercase;
        }

        .glow-sweep {
            position: absolute;
            top: -50%; left: -100%;
            width: 60%; height: 200%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
            transform: rotate(35deg);
            animation: shimmerEffect 2.5s infinite;
        }

        @keyframes paneRotate {
            0%, 100% { transform: rotateY(-15deg) rotateX(10deg); }
            50% { transform: rotateY(15deg) rotateX(-5deg) scale(1.02); }
        }

        @keyframes moveScan {
            0%, 100% { top: 0%; opacity: 0; }
            50% { top: 100%; opacity: 1; }
        }

        @keyframes shimmerEffect {
            0% { left: -130%; }
            45% { left: 130%; }
            100% { left: 130%; }
        }

        .bg-orb {
            position: absolute;
            border-radius: 50%;
            background: var(--accent-neon);
            filter: blur(80px);
            opacity: 0.12;
            z-index: 0;
        }
    </style>
</head>
<body>

    <div id="ad-container">
        <div class="bg-orb" style="width:200px; height:200px; top:15%; right:5%;"></div>
        <div class="bg-orb" style="width:250px; height:250px; bottom:10%; left:-5%; background: var(--secondary-neon);"></div>

        <div class="header">
            <h1 id="app-title">${adData.title}</h1>
        </div>

        <div class="feature-stage">
            <div class="sparkle" style="top: 20%; left: 10%;">✨</div>
            <div class="sparkle" style="bottom: 25%; right: 10%; animation-delay: 1s;">📸</div>
            
            <div class="scan-pane">
                <div class="ui-element ui-top">REC ●</div>
                <div class="scan-line"></div>
                <img src="feature_1_image.png" alt="Scan Preview" loading="lazy">
                <div class="ui-element ui-bottom">LIVE</div>
            </div>
        </div>

        <div class="cta-container">
            <button class="start-now-btn" onclick="ExitApi.exit()">
                <div class="glow-sweep"></div>
                <span class="btn-text">START NOW</span>
            </button>
            <p style="color:white; font-size: 11px; margin-top: 14px; opacity: 0.8; letter-spacing: 1px; font-weight: 500;">INSTALL FREE</p>
        </div>
    </div>

</body>
</html>`;
}

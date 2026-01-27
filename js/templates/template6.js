async function generateTemplate6HTML() {
    const topLabel = adData.showAdLabels ? 'ADVERTISEMENT' : '';
    const bottomLabel = adData.showAdLabels ? 'PROMOTED APP CONTENT' : '';
    
    return `<!doctype html>
<html lang="en" style="height: 100%;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${adData.title} - Video Scan Ad</title>
    
    <script src="https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;800&display=swap" rel="stylesheet">
    
    <style>
        :root {
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
            font-size: 36px; 
            font-weight: 800; 
            background: linear-gradient(180deg, #FFFFFF 20%, var(--secondary-neon) 60%, var(--accent-neon) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            letter-spacing: -1px;
            filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.4));
            margin-bottom: 5px;
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
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        }

        .scan-pane video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .audio-toggle {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 32px;
            height: 32px;
            background: rgba(0,0,0,0.6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 30;
            cursor: pointer;
            color: white;
        }

        .scan-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(to right, transparent, var(--secondary-neon), var(--accent-neon), var(--secondary-neon), transparent);
            box-shadow: 0 0 15px var(--secondary-neon);
            z-index: 10;
            animation: moveScan 4s linear infinite;
        }

        .cta-container { width: 100%; display: flex; flex-direction: column; align-items: center; z-index: 100; }
        
        .start-now-btn {
            position: relative;
            background: linear-gradient(135deg, var(--accent-neon) 0%, #a100ff 100%);
            padding: 14px 48px;
            border-radius: 4px; 
            border: none;
            cursor: pointer;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(255, 0, 255, 0.4);
        }

        .btn-text { 
            font-size: 18px;
            font-weight: 800; 
            color: var(--pure-white) !important;
            letter-spacing: 1px;
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
            0%, 100% { transform: rotateY(-10deg) rotateX(5deg); }
            50% { transform: rotateY(10deg) rotateX(-5deg); }
        }

        @keyframes moveScan {
            0% { top: 0%; }
            100% { top: 100%; }
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
            <div class="scan-pane">
                <div class="scan-line"></div>
                <div class="audio-toggle" onclick="toggleAudio(event)">
                <svg id="mute-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM3 9v6h4l5 5V4L7 9H3z"/>
                </svg>
            </div>

            <video id="ad-video" autoplay muted loop playsinline poster="feature_1_image.png">
                <source src="app_preview.mp4" type="video/mp4">
                <img src="feature_1_image.png" alt="Ad Preview" loading="lazy">
            </video>
        </div>
    </div>

    <div class="cta-container">
        <button class="start-now-btn" onclick="ExitApi.exit()">
            <div class="glow-sweep"></div>
            <span class="btn-text">Install App</span>
        </button>
        ${bottomLabel ? `<p style="color:white; font-size: 10px; margin-top: 10px; opacity: 0.6; text-transform: uppercase;">${bottomLabel}</p>` : ''}
    </div>
</div>

<script>
    function toggleAudio(e) {
        e.stopPropagation();
        const video = document.getElementById('ad-video');
        const icon = document.getElementById('mute-icon');
        if (video.muted) {
            video.muted = false;
            icon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
        } else {
            video.muted = true;
            icon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
        }
    }
</script>
</body>
</html>`;
}

async function generateTemplate2HTML() {
    // Get feature names or use defaults
    const feature1 = adData.feature1 || 'Real-Time Scan';
    const feature2 = adData.feature2 || 'Video Effects';
    const feature3 = adData.feature3 || 'Easy Sharing';
    
    // Ad labels
    const topLabel = adData.showAdLabels ? adData.topLabel : '';
    const bottomLabel = adData.showAdLabels ? adData.bottomLabel : '';
    
    return `<!doctype html>
<html lang="en" style="height: 100%;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${adData.title} - Feature Orbit Ad</title>
    
    <script src="https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        #app-title, #app-tagline, .feature-text, .text-xs, #btn-text, .ad-label {
            color: #FFFFFF !important;
            opacity: 1 !important;
            text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            height: 100%; 
            font-family: 'Space Grotesk', sans-serif; 
            overflow: hidden;
            background: #0f0f23;
        }

        #ad-container {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 16px;
            position: relative;
            overflow: hidden;
            background: radial-gradient(circle at center, #1a1a3e 0%, #0f0f23 100%);
        }

        .ad-label {
            position: absolute;
            top: 12px;
            font-size: 10px;
            letter-spacing: 2px;
            opacity: 0.6 !important;
            font-weight: 700;
            text-transform: uppercase;
        }

        .text-center { text-align: center; }
        .mb-4 { margin-bottom: 16px; }
        .mb-6 { margin-bottom: 24px; }
        .mt-3 { margin-top: 12px; }
        .font-bold { font-weight: 800; }
        .text-2xl { font-size: 1.6rem; line-height: 1.2; }
        .text-sm { font-size: 0.875rem; opacity: 0.9 !important; }
        .text-xs { font-size: 0.75rem; font-weight: 600; }

        .feature-orbit { position: relative; width: 280px; height: 280px; z-index: 10; }
        .feature-circle {
            position: absolute;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            cursor: pointer;
            text-align: center;
            padding: 12px;
        }
        .feature-circle.active { width: 140px; height: 140px; top: 0; left: 50%; transform: translateX(-50%); z-index: 30; box-shadow: 0 20px 60px rgba(139, 92, 246, 0.4); }
        .feature-circle.left { width: 100px; height: 100px; bottom: 20px; left: 10px; z-index: 20; opacity: 0.7; }
        .feature-circle.right { width: 100px; height: 100px; bottom: 20px; right: 10px; z-index: 20; opacity: 0.7; }
        
        .feature-icon { width: 70px; height: 70px; object-fit: cover; border-radius: 12px; margin-bottom: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
        .feature-circle.left .feature-icon, .feature-circle.right .feature-icon { width: 50px; height: 50px; }
        
        .feature-text { font-size: 0.75rem; font-weight: 700; line-height: 1.2; }
        .feature-circle.left .feature-text, .feature-circle.right .feature-text { font-size: 0.6rem; }
        
        .glow-ring { position: absolute; top: -8px; left: -8px; right: -8px; bottom: -8px; border-radius: 50%; border: 2px solid rgba(139, 92, 246, 0.3); animation: pulse-ring 2s ease-in-out infinite; }
        @keyframes pulse-ring { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 0.2; } }

        .download-btn {
            position: relative;
            padding: 14px 44px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
            border: none;
            cursor: pointer;
            font-family: inherit;
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            overflow: hidden;
            z-index: 10;
            background: linear-gradient(135deg, #8b5cf6, #6366f1);
            color: white;
        }
        .download-btn:active { transform: scale(0.96); }

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

        .particle-glow { position: absolute; border-radius: 50%; background: #8b5cf6; opacity: 0.15; filter: blur(50px); z-index: 0; }

        .progress-dots { display: flex; gap: 8px; justify-content: center; }
        .progress-dot { width: 8px; height: 8px; border-radius: 50%; transition: all 0.3s ease; cursor: pointer; background: rgba(255,255,255,0.2); }
        .progress-dot.active { width: 24px; border-radius: 4px; background: #FFFFFF; }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>
    <div id="ad-container">
        ${topLabel ? `<div class="ad-label">${topLabel}</div>` : ''}
        
        <div class="particle-glow" style="width: 200px; height: 200px; top: -50px; left: -50px;"></div>
        <div class="particle-glow" style="width: 250px; height: 250px; bottom: -50px; right: -50px; background: #06b6d4;"></div>

        <div class="text-center mb-4" style="animation: fadeIn 0.8s ease-out;">
            <h1 id="app-title" class="text-2xl font-bold">${adData.title}</h1>
            <p id="app-tagline" class="text-sm">${adData.tagline}</p>
        </div>

        <div class="feature-orbit mb-6">
            <div class="feature-circle" id="feature-0" data-index="0">
                <div class="glow-ring"></div>
                <img class="feature-icon" id="feature-img-0" src="feature_1_image.png" alt="Feature 1" loading="lazy"> 
                <span class="feature-text" id="feature-text-0">${feature1}</span>
            </div>
            <div class="feature-circle" id="feature-1" data-index="1">
                <div class="glow-ring"></div>
                <img class="feature-icon" id="feature-img-1" src="feature_2_image.png" alt="Feature 2" loading="lazy"> 
                <span class="feature-text" id="feature-text-1">${feature2}</span>
            </div>
            <div class="feature-circle" id="feature-2" data-index="2">
                <div class="glow-ring"></div>
                <img class="feature-icon" id="feature-img-2" src="feature_3_image.png" alt="Feature 3" loading="lazy"> 
                <span class="feature-text" id="feature-text-2">${feature3}</span>
            </div>
        </div>

        <div class="progress-dots mb-6">
            <div class="progress-dot" data-index="0"></div>
            <div class="progress-dot" data-index="1"></div>
            <div class="progress-dot" data-index="2"></div>
        </div>

        <button onclick="ExitApi.exit()" class="download-btn">
            <div class="btn-shimmer"></div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
            <span id="btn-text" class="font-bold" style="font-size: 17px; letter-spacing: 0.5px;">INSTALL NOW</span>
        </button>

        ${bottomLabel ? `<p class="text-xs mt-3" style="opacity: 0.5 !important;">${bottomLabel}</p>` : ''}
    </div>

    <script type="text/javascript">
        let activeIndex = 0;
        let autoRotateInterval;

        function updateFeaturePositions() {
            const circles = document.querySelectorAll('.feature-circle');
            const dots = document.querySelectorAll('.progress-dot');
            circles.forEach((circle, i) => {
                circle.classList.remove('active', 'left', 'right');
                if (i === activeIndex) circle.classList.add('active');
                else if (i === (activeIndex + 2) % 3) circle.classList.add('left');
                else circle.classList.add('right');
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === activeIndex);
            });
        }

        function rotateFeatures() {
            activeIndex = (activeIndex + 1) % 3;
            updateFeaturePositions();
        }

        function startAutoRotate() {
            if (autoRotateInterval) clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(rotateFeatures, 3000);
        }

        document.querySelectorAll('.feature-circle, .progress-dot').forEach(el => {
            el.addEventListener('click', () => {
                activeIndex = parseInt(el.dataset.index);
                updateFeaturePositions();
                startAutoRotate();
            });
        });

        window.addEventListener('load', () => {
            updateFeaturePositions();
            startAutoRotate();
        });
    </script>
</body>
</html>`;
}

// ZIP Generation Utility using JSZip - Only User Files

async function generateZip() {
    if (!selectedTemplate) {
        alert('No template selected');
        return;
    }

    const inputs = selectedTemplate.inputs;

    // Validate required inputs
    if (inputs.title && !adData.title) {
        alert('Please enter app title');
        return;
    }
    if (inputs.tagline && !adData.tagline) {
        alert('Please enter tagline');
        return;
    }
    if (inputs.icon && !adData.icon) {
        alert('Please upload app icon');
        return;
    }
    if (inputs.images > 0 && adData.images.length !== inputs.images) {
        alert(`Please upload exactly ${inputs.images} image${inputs.images > 1 ? 's' : ''}`);
        return;
    }
    if (inputs.videos > 0 && adData.videos.length === 0) {
        alert('Please upload a video');
        return;
    }

    const btn = document.getElementById('export-btn');
    btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Processing...';
    btn.disabled = true;

    try {
        showProgress();
        const zip = new JSZip();

        updateProgress(10, 'Generating HTML...');

        // Generate HTML based on selected template
        const htmlContent = await generateTemplateHTML(selectedTemplate.id);
        zip.file('index.html', htmlContent);

        updateProgress(30, 'Adding assets...');

        // Add icon if required
        if (inputs.icon && adData.icon) {
            const iconBlob = await fetch(adData.icon.url).then(r => r.blob());
            zip.file('icon.png', iconBlob);
        }

        // Add images if required
        if (inputs.images > 0) {
            for (let i = 0; i < adData.images.length; i++) {
                const img = adData.images[i];
                const blob = await fetch(img.url).then(r => r.blob());
                zip.file(`feature_${i + 1}_image.png`, blob);
            }
        }

        updateProgress(60, 'Adding videos...');

        // Add videos if required
        if (inputs.videos > 0 && adData.videos.length > 0) {
            const vid = adData.videos[0];
            const blob = await fetch(vid.url).then(r => r.blob());
            zip.file('app_preview.mp4', blob);
        }

        updateProgress(80, 'Creating manifest...');

        // Add manifest.json
        const manifest = {
            name: adData.title,
            tagline: adData.tagline || '',
            language: adData.language,
            template: selectedTemplate.name,
            templateId: selectedTemplate.id,
            generated: new Date().toISOString(),
            assets: {
                icon: inputs.icon ? 'icon.png' : null,
                images: inputs.images > 0 ? Array.from({ length: inputs.images }, (_, i) => `feature_${i + 1}_image.png`) : [],
                videos: inputs.videos > 0 ? ['app_preview.mp4'] : []
            }
        };
        zip.file('manifest.json', JSON.stringify(manifest, null, 2));

        updateProgress(95, 'Finalizing ZIP...');

        // Generate ZIP file
        const content = await zip.generateAsync({
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 9 }
        });

        updateProgress(100, 'Download started!');

        // Download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = `${adData.title.replace(/\s+/g, '-').toLowerCase()}-ad-package.zip`;
        link.click();

        setTimeout(() => {
            btn.innerHTML = '<i data-lucide="check-circle" class="w-5 h-5"></i> Done!';
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="download" class="w-5 h-5"></i> Generate ZIP';
                btn.disabled = false;
                hideProgress();
                lucide.createIcons();
            }, 2000);
        }, 500);

    } catch (error) {
        console.error('ZIP Generation Error:', error);
        alert('Failed to generate ZIP. Please try again.');
        btn.innerHTML = '<i data-lucide="download" class="w-5 h-5"></i> Generate ZIP';
        btn.disabled = false;
        hideProgress();
        lucide.createIcons();
    }
}

// Progress Display
function showProgress() {
    const container = document.getElementById('progress-container');
    container.innerHTML = `
        <div class="space-y-4 animate-in">
            <div class="flex justify-between items-end">
                <span class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500" id="progress-label">Processing Assets</span>
                <span class="text-2xl font-black text-blue-600 tracking-tighter" id="progress-percent">0%</span>
            </div>
            <div class="w-full h-4 rounded-full overflow-hidden p-1 ${isDarkMode ? 'bg-slate-900' : 'bg-white shadow-inner'}">
                <div id="progress-bar" class="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-300 relative" style="width: 0%">
                    <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
            </div>
        </div>
    `;
}

function updateProgress(percent, label) {
    const bar = document.getElementById('progress-bar');
    const percentText = document.getElementById('progress-percent');
    const labelText = document.getElementById('progress-label');

    if (bar) bar.style.width = `${percent}%`;
    if (percentText) percentText.textContent = `${percent}%`;
    if (labelText) labelText.textContent = label;
}

function hideProgress() {
    const container = document.getElementById('progress-container');
    container.innerHTML = '';
}

// Generate Template HTML
async function generateTemplateHTML(templateId) {
    switch (templateId) {
        case 1: return await generateTemplate1HTML();
        case 2: return await generateTemplate2HTML();
        case 3: return await generateTemplate3HTML();
        case 4: return await generateTemplate4HTML();
        case 5: return await generateTemplate5HTML();
        case 6: return await generateTemplate6HTML();
        default: return '';
    }
}

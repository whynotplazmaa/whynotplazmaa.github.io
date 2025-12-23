// Configuration
const username = 'whynotplazmaa';
const repo = '3ds';
const folderPath = 'tweaks'; // Must exist in your repo

async function fetchTweaks() {
    const apiUrl = `api.github.com{username}/${repo}/contents/${folderPath}`;
    const listContainer = document.getElementById('tweak-list');
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch tweaks');
        
        const files = await response.json();
        const tweakFiles = files.filter(file => file.type === 'file');

        if (tweakFiles.length === 0) {
            listContainer.innerHTML = '<p>No tweaks found in the tweaks/ folder yet!</p>';
            return;
        }

        listContainer.innerHTML = tweakFiles.map(file => `
            <div class="tweak-card-item">
                <h3>${file.name}</h3>
                <span class="version">Version: 1.0</span>
                <p class="description">A custom 3DS tweak file for ${repo}.</p>
                <a href="${file.download_url}" class="get-btn" download>GET deb</a>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error:', error);
        listContainer.innerHTML = `<p>Error loading tweaks. Make sure the folder <b>/tweaks</b> exists!</p>`;
    }
}

window.onload = fetchTweaks;

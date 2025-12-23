// Configuration
const username = 'whynotplazmaa';
const repo = '3ds';
const folderPath = 'tweaks'; // The folder where you'll put your files

async function fetchTweaks() {
    const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${folderPath}`;
    const listContainer = document.getElementById('tweak-list');
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch tweaks');
        
        const files = await response.json();
        
        // Filter out non-files (like subfolders) if necessary
        const tweakFiles = files.filter(file => file.type === 'file');

        if (tweakFiles.length === 0) {
            listContainer.innerHTML = '<p>No tweaks found in the tweaks/ folder yet!</p>';
            return;
        }

        listContainer.innerHTML = tweakFiles.map(file => `
            <div class="tweak-card">
                <h3>${file.name}</h3>
                <p>Custom 3DS tweak file: ${file.name.split('.').pop().toUpperCase()}</p>
                <a href="${file.download_url}" class="download-btn" download>Download Tweak</a>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error:', error);
        listContainer.innerHTML = `<p>Error loading tweaks. Make sure the folder <b>/tweaks</b> exists in your repo!</p>`;
    }
}

// Run on page load
window.onload = fetchTweaks;

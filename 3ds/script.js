// Change this to your actual GitHub Pages or Repo URL
const REPO_URL = "./"; 

async function loadRepo() {
    try {
        // Fetch and parse Release file for repo info
        const releaseRes = await fetch(REPO_URL + "Release");
        const releaseText = await releaseRes.text();
        // Assuming releaseData is an array, take the first element for details
        const releaseData = parseControlFile(releaseText)[0]; 
        document.getElementById('repo-title').innerText = releaseData.Label || "My Tweak Repo";
        document.getElementById('repo-desc').innerText = releaseData.Description || "";

        // Fetch and parse Packages file for tweaks
        const packagesRes = await fetch(REPO_URL + "Packages");
        const packagesText = await packagesRes.text();
        const tweaks = parseControlFile(packagesText);
        displayTweaks(tweaks);
    } catch (e) {
        console.error("Error loading repo:", e);
    }
}

// Simple parser for Debian control files (Release/Packages)
function parseControlFile(text) {
    return text.trim().split('\n\n').map(block => {
        let obj = {};
        block.split('\n').forEach(line => {
            const [key, ...val] = line.split(': ');
            if (key && val) obj[key.trim()] = val.join(': ').trim();
        });
        return obj;
    });
}

function displayTweaks(tweaks) {
    const list = document.getElementById('tweak-list');
    list.innerHTML = tweaks.map(t => `
        <div class="card tweak-card">
            <h3>${t.Name || t.Package}</h3>
            <p>Version: ${t.Version}</p>
            <p>${t.Description || "No description available."}</p>
            <a href="${REPO_URL}${t.Filename}" class="btn-get">GET .3dsx</a>
        </div>
    `).join('');
}

function searchTweaks() {
    let filter = document.getElementById('search').value.toLowerCase();
    let cards = document.querySelectorAll('.tweak-card');
    cards.forEach(card => {
        let text = card.innerText.toLowerCase();
        card.style.display = text.includes(filter) ? "" : "none";
    });
}

window.onload = loadRepo;

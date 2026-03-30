function updateTime() {
    const now = new Date();
    const h = now.getHours() % 12 || 12;
    const m = String(now.getMinutes()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    document.getElementById('clock').innerText = `${h}:${m} ${ampm}`;
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('date').innerText = now.toLocaleDateString('en-US', options).toUpperCase();
}
setInterval(updateTime, 1000);
updateTime();

const mainUI = document.getElementById('main-ui');
const viewContainer = document.getElementById('view-container');
const frame = document.getElementById('browser-frame');
const urlDisplay = document.getElementById('current-url-display');
const webLanding = document.getElementById('web-section-landing');

function closeChangelog() {
    document.getElementById('changelog-overlay').classList.add('hidden');
}

function launch(url, title) {
    mainUI.classList.add('hidden');
    webLanding.classList.add('hidden');
    frame.classList.remove('hidden');
    setTimeout(() => {
        viewContainer.classList.remove('hidden');
        urlDisplay.innerText = title;
        frame.src = url;
    }, 200);
}

function closeView() {
    viewContainer.classList.add('hidden');
    setTimeout(() => {
        mainUI.classList.remove('hidden');
        frame.src = "about:blank";
    }, 100);
}

function reloadFrame() {
    const current = frame.src;
    frame.src = "";
    setTimeout(() => frame.src = current, 50);
}

function openSettings() { document.getElementById('settings-view').classList.remove('hidden'); }
function closeSettings() { document.getElementById('settings-view').classList.add('hidden'); }
function openDiscordModal() { document.getElementById('discord-modal').classList.remove('hidden'); }
function closeDiscordModal() { document.getElementById('discord-modal').classList.add('hidden'); }

// 4. Reulus Web Section Logic
function openWebSection() {
    mainUI.classList.add('hidden');
    viewContainer.classList.remove('hidden');
    frame.classList.add('hidden'); // Hide iframe to show landing
    webLanding.classList.remove('hidden');
    urlDisplay.innerText = "Reulus Web";
}

document.getElementById('web-section-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let val = e.target.value;
        webLanding.classList.add('hidden');
        frame.classList.remove('hidden');
        launch(val.includes('.') ? (val.startsWith('http') ? val : 'https://' + val) : `https://www.bing.com/search?q=${val}`, 'Web View');
    }
});

document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let val = e.target.value;
        launch(val.includes('.') ? (val.startsWith('http') ? val : 'https://' + val) : `https://www.bing.com/search?q=${val}`, 'Search');
    }
});

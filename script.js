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

// Requirement: Close changelog and show main UI
function closeChangelog() {
    const overlay = document.getElementById('changelog-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 400);
}

function launch(url, title) {
    mainUI.classList.add('hidden');
    setTimeout(() => {
        viewContainer.classList.remove('hidden');
        urlDisplay.innerText = title;
        frame.src = url;
    }, 300);
}

function closeView() {
    viewContainer.classList.add('hidden');
    setTimeout(() => {
        mainUI.classList.remove('hidden');
        frame.src = "";
    }, 100);
}

function reloadFrame() {
    const currentSrc = frame.src;
    frame.src = '';
    frame.src = currentSrc;
}

function openDiscordModal() { document.getElementById('discord-modal').classList.remove('hidden'); }
function closeDiscordModal() { document.getElementById('discord-modal').classList.add('hidden'); }
function openSettings() { document.getElementById('settings-view').classList.remove('hidden'); }
function closeSettings() { document.getElementById('settings-view').classList.add('hidden'); }

function openWebSection() {
    launch('about:blank', 'Reulus Web');
}

document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let val = e.target.value;
        if (val.includes('.') && !val.includes(' ')) {
            launch(val.startsWith('http') ? val : 'https://' + val, 'Web View');
        } else {
            launch(`https://www.google.com/search?q=${encodeURIComponent(val)}`, 'Search');
        }
    }
});

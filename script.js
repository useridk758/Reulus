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

function launch(url, title) {
    mainUI.classList.add('hidden');
    viewContainer.classList.remove('hidden');
    urlDisplay.innerText = title;
    frame.src = url;
}

function closeView() {
    viewContainer.classList.add('hidden');
    mainUI.classList.remove('hidden');
    frame.src = "";
}

function reloadFrame() {
    frame.contentWindow.location.reload();
}

function openSettings() {
    document.getElementById('settings-view').classList.remove('hidden');
}

function closeSettings() {
    document.getElementById('settings-view').classList.add('hidden');
}

function openWebSection() {
    // Requirements: Hides bottom buttons, adds navigator bar
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

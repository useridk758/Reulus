function updateTime() {
    const now = new Date();
    const h = now.getHours() % 12 || 12;
    const m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').innerText = `${h}:${m}`;
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('date').innerText = now.toLocaleDateString('en-US', options).toUpperCase();
}
setInterval(updateTime, 1000);
updateTime();

const mainUI = document.getElementById('main-ui');
const viewContainer = document.getElementById('view-container');
const frame = document.getElementById('browser-frame');
const urlDisplay = document.getElementById('current-url-display');
const chatView = document.getElementById('chat-maintenance');
const webView = document.getElementById('web-section-landing');

// OPERATIONAL LAUNCHER (Fixes Black Screen by forcing embed-compatible URLs)
function launch(url, title) {
    mainUI.classList.add('hidden');
    chatView.classList.add('hidden');
    webView.classList.add('hidden');
    frame.classList.remove('hidden');

    setTimeout(() => {
        viewContainer.classList.add('active');
        urlDisplay.innerText = title.toUpperCase();
        
        // Anti-Black Screen Logic
        let finalUrl = url;
        if (url.includes("google.com") && !url.includes("igu=1")) finalUrl += "?igu=1";
        
        frame.src = finalUrl;
    }, 100);
}

function closeView() {
    viewContainer.classList.remove('active');
    setTimeout(() => {
        mainUI.classList.remove('hidden');
        frame.src = "about:blank";
    }, 300);
}

function reloadFrame() {
    const s = frame.src; frame.src = "";
    setTimeout(() => frame.src = s, 50);
}

// Operational Bottom Middle Buttons
function openChat() {
    mainUI.classList.add('hidden');
    frame.classList.add('hidden');
    webView.classList.add('hidden');
    chatView.classList.remove('hidden');
    viewContainer.classList.add('active');
    urlDisplay.innerText = "CHATROOM";
}

function openWebSection() {
    mainUI.classList.add('hidden');
    frame.classList.add('hidden');
    chatView.classList.add('hidden');
    webView.classList.remove('hidden');
    viewContainer.classList.add('active');
    urlDisplay.innerText = "REULUS WEB";
}

function openSettings() { document.getElementById('settings-view').classList.add('active'); }
function closeSettings() { document.getElementById('settings-view').classList.remove('active'); }

// Search logic
document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let val = e.target.value;
        let url = val.includes('.') ? (val.startsWith('http') ? val : 'https://' + val) : `https://www.bing.com/search?q=${encodeURIComponent(val)}`;
        launch(url, 'Search');
    }
});

document.getElementById('web-section-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        webView.classList.add('hidden');
        frame.classList.remove('hidden');
        let val = e.target.value;
        let url = val.includes('.') ? (val.startsWith('http') ? val : 'https://' + val) : `https://www.bing.com/search?q=${encodeURIComponent(val)}`;
        launch(url, 'Web View');
    }
});

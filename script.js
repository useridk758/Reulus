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

// 5. BLACK SCREEN BYPASS + NAVIGATOR FIX
function launch(url, title) {
    // 10. Smooth fade transitions
    mainUI.classList.add('hidden');
    chatView.classList.add('hidden');
    webView.classList.add('hidden');
    frame.classList.remove('hidden');

    setTimeout(() => {
        viewContainer.classList.add('active');
        urlDisplay.innerText = title.toUpperCase();
        
        // Anti-Black Screen Mirroring
        let target = url;
        if(url.includes("google.com")) target = "https://www.google.com/search?igu=1";
        
        frame.src = target;
    }, 200);
}

function closeView() {
    viewContainer.classList.remove('active');
    setTimeout(() => {
        mainUI.classList.remove('hidden');
        frame.src = "about:blank";
    }, 400);
}

function reloadFrame() {
    const s = frame.src; frame.src = "";
    setTimeout(() => frame.src = s, 50);
}

// 7. Dock Buttons Operational
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

// 3. Bing Search for words
function doSearch(q) {
    if(!q) return;
    let url = q.includes('.') ? (q.startsWith('http') ? q : 'https://' + q) : `https://www.bing.com/search?q=${encodeURIComponent(q)}`;
    launch(url, 'Search Results');
}

document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') doSearch(e.target.value);
});

document.getElementById('web-section-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        webView.classList.add('hidden');
        frame.classList.remove('hidden');
        doSearch(e.target.value);
    }
});

// Wallpaper
document.getElementById('wallpaper-input').onchange = (e) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
        document.getElementById('bg-layer').style.backgroundImage = `url(${ev.target.result})`;
        closeSettings();
    };
    reader.readAsDataURL(e.target.files[0]);
};

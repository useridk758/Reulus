// Time Engine
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

// UI Elements
const mainUI = document.getElementById('main-ui');
const viewContainer = document.getElementById('view-container');
const frame = document.getElementById('browser-frame');
const urlDisplay = document.getElementById('current-url-display');
const chatOverlay = document.getElementById('chat-maintenance');
const webOverlay = document.getElementById('web-section-landing');

// 5. THE FIX: Operational Launcher
function launch(url, title) {
    // 10. Smooth fade outs
    mainUI.classList.add('hidden');
    chatOverlay.classList.add('hidden');
    webOverlay.classList.add('hidden');
    frame.classList.remove('hidden');

    setTimeout(() => {
        viewContainer.classList.add('active');
        urlDisplay.innerText = title.toUpperCase();
        
        // Anti-Black Screen Logic: Force special embed modes for common blockers
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
    const s = frame.src;
    frame.src = "about:blank";
    setTimeout(() => frame.src = s, 100);
}

// 7. Dock Controls - All Operational
function openChat() {
    mainUI.classList.add('hidden');
    frame.classList.add('hidden');
    webOverlay.classList.add('hidden');
    chatOverlay.classList.remove('hidden');
    viewContainer.classList.add('active');
    urlDisplay.innerText = "CHATROOM";
}

function openWebSection() {
    mainUI.classList.add('hidden');
    frame.classList.add('hidden');
    chatOverlay.classList.add('hidden');
    webOverlay.classList.remove('hidden');
    viewContainer.classList.add('active');
    urlDisplay.innerText = "WEB PORTAL";
}

function openSettings() { document.getElementById('settings-view').classList.add('active'); }
function closeSettings() { document.getElementById('settings-view').classList.remove('active'); }

// 3. & 4. Search Handler
function handleSearch(query) {
    if(!query) return;
    // Check if it's a URL or a word
    const isUrl = query.includes('.') && !query.includes(' ');
    let finalUrl = isUrl ? 
        (query.startsWith('http') ? query : 'https://' + query) : 
        `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
    
    launch(finalUrl, "Search Results");
}

document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch(e.target.value);
});

document.getElementById('web-section-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        webOverlay.classList.add('hidden');
        frame.classList.remove('hidden');
        handleSearch(e.target.value);
    }
});

// Wallpaper Logic
document.getElementById('wallpaper-input').onchange = (e) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
        document.getElementById('bg-layer').style.backgroundImage = `url(${ev.target.result})`;
        closeSettings();
    };
    reader.readAsDataURL(e.target.files[0]);
};

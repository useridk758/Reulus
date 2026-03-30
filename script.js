// Time & Date Engine
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

// 5. BLACK SCREEN FIX: MIRROR LOGIC
function launch(url, title) {
    mainUI.classList.add('hidden');
    chatView.classList.add('hidden');
    webView.classList.add('hidden');
    frame.classList.remove('hidden');

    // Force fade-in transition
    setTimeout(() => {
        viewContainer.classList.add('active');
        urlDisplay.innerText = title.toUpperCase();
        
        let finalUrl = url;
        // If it's a "big" site, we use a mobile mirror or igu mode to prevent black screen
        if(url.includes("google.com")) finalUrl = "https://www.google.com/search?igu=1";
        if(url.includes("bing.com")) finalUrl = "https://www.bing.com";
        
        frame.src = finalUrl;
    }, 150);
}

function closeView() {
    viewContainer.classList.remove('active');
    setTimeout(() => {
        mainUI.classList.remove('hidden');
        frame.src = "about:blank";
    }, 400);
}

function reloadFrame() {
    const current = frame.src;
    frame.src = "about:blank";
    setTimeout(() => frame.src = current, 50);
}

// 7. All Dock Buttons Operational
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

// 3. Search Logic: Use Bing for words, URLs for links
function performSearch(query) {
    let url;
    const isUrl = query.includes('.') && !query.includes(' ');
    
    if (isUrl) {
        url = query.startsWith('http') ? query : 'https://' + query;
    } else {
        // Force Bing Search for words
        url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
    }
    launch(url, 'Search Results');
}

document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch(e.target.value);
});

document.getElementById('web-section-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        webView.classList.add('hidden');
        frame.classList.remove('hidden');
        performSearch(e.target.value);
    }
});

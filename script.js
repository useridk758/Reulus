function updateTime() {
    const now = new Date();
    const h = now.getHours() % 12 || 12;
    const m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').innerText = `${h}:${m}`;
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('date').innerText = now.toLocaleDateString('en-US', options).toUpperCase();
}
setInterval(updateTime, 1000); updateTime();

const mainUI = document.getElementById('main-ui');
const viewContainer = document.getElementById('view-container');
const frame = document.getElementById('browser-frame');
const urlDisplay = document.getElementById('current-url-display');
const chatOverlay = document.getElementById('chat-maintenance');
const webOverlay = document.getElementById('web-section-landing');

function launch(url, title) {
    mainUI.classList.add('hidden');
    chatOverlay.classList.add('hidden');
    webOverlay.classList.add('hidden');
    frame.classList.remove('hidden');

    setTimeout(() => {
        viewContainer.classList.add('active');
        urlDisplay.innerText = title.toUpperCase();
        
        let target = url;
        // Fix for Google black screen
        if(url.includes("google.com") && !url.includes("igu=1")) target = "https://www.google.com/search?igu=1";
        
        frame.src = target;
    }, 200);
}

function aprilFools() {
    alert("SYSTEM ALERT: We have a new owner!");
    launch('https://sites.google.com/view/apriltoday', 'New Management');
}

function closeView() {
    viewContainer.classList.remove('active');
    setTimeout(() => {
        mainUI.classList.remove('hidden');
        frame.src = "about:blank";
    }, 400);
}

function reloadFrame() {
    const s = frame.src; frame.src = "about:blank";
    setTimeout(() => frame.src = s, 100);
}

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

function handleSearch(query) {
    if(!query) return;
    const isUrl = query.includes('.') && !query.includes(' ');
    let finalUrl = isUrl ? (query.startsWith('http') ? query : 'https://' + query) : `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
    launch(finalUrl, "Search Results");
}

document.getElementById('search-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(e.target.value); });
document.getElementById('web-section-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { webOverlay.classList.add('hidden'); frame.classList.remove('hidden'); handleSearch(e.target.value); }
});

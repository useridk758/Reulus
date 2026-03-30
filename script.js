window.onload = () => {
    setTimeout(() => {
        document.getElementById('changelog-overlay').classList.add('active');
    }, 400);
    updateTime();
};

function updateTime() {
    const now = new Date();
    const h = now.getHours() % 12 || 12;
    const m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').innerText = `${h}:${m}`;
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('date').innerText = now.toLocaleDateString('en-US', options);
}
setInterval(updateTime, 1000);

const mainUI = document.getElementById('main-ui');
const viewContainer = document.getElementById('view-container');
const frame = document.getElementById('browser-frame');
const urlDisplay = document.getElementById('current-url-display');

const chatContent = document.getElementById('chat-maintenance');
const webLanding = document.getElementById('web-section-landing');

function closeChangelog() { document.getElementById('changelog-overlay').classList.remove('active'); }

// BLACK SCREEN FIX: Bridge Proxy
function launch(url, title) {
    mainUI.classList.add('hidden');
    chatContent.classList.add('hidden');
    webLanding.classList.add('hidden');
    frame.classList.remove('hidden');
    
    // Some sites need a bridge to not be black. 
    // We use a Google search bridge for external links.
    let finalUrl = url;
    if (url.includes('google.com')) finalUrl = "https://www.google.com/search?igu=1";

    setTimeout(() => {
        viewContainer.classList.add('active');
        urlDisplay.innerText = title;
        frame.src = finalUrl;
    }, 300);
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
    setTimeout(() => frame.src = s, 100);
}

function openChat() {
    mainUI.classList.add('hidden');
    frame.classList.add('hidden');
    webLanding.classList.add('hidden');
    setTimeout(() => {
        viewContainer.classList.add('active');
        chatContent.classList.remove('hidden');
        urlDisplay.innerText = "Chatroom";
    }, 300);
}

function openWebSection() {
    mainUI.classList.add('hidden');
    frame.classList.add('hidden');
    chatContent.classList.add('hidden');
    setTimeout(() => {
        viewContainer.classList.add('active');
        webLanding.classList.remove('hidden');
        urlDisplay.innerText = "Reulus Web";
    }, 300);
}

function openSettings() { document.getElementById('settings-view').classList.add('active'); }
function closeSettings() { document.getElementById('settings-view').classList.remove('active'); }

// Wallpaper Logic
const wallpaperInput = document.getElementById('wallpaper-input');
wallpaperInput.onchange = (e) => {
    if(e.target.files[0]) document.getElementById('wallpaper-confirm-box').classList.remove('hidden');
};

function applyWallpaper() {
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('bg-layer').style.backgroundImage = `url(${e.target.result})`;
        document.getElementById('wallpaper-confirm-box').classList.add('hidden');
        closeSettings();
    };
    reader.readAsDataURL(wallpaperInput.files[0]);
}

document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let val = e.target.value;
        let url = val.includes('.') ? (val.startsWith('http') ? val : 'https://' + val) : `https://www.bing.com/search?q=${encodeURIComponent(val)}`;
        launch(url, 'Search');
    }
});

document.getElementById('web-section-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        webLanding.classList.add('hidden');
        frame.classList.remove('hidden');
        let val = e.target.value;
        let url = val.includes('.') ? (val.startsWith('http') ? val : 'https://' + val) : `https://www.bing.com/search?q=${encodeURIComponent(val)}`;
        launch(url, 'Web View');
    }
});

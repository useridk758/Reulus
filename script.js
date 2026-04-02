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

// FIXING BLACK SCREEN: Use a proxy for blocked sites
function launch(url, title) {
    mainUI.classList.add('hidden');
    viewContainer.classList.add('active');
    urlDisplay.innerText = title.toUpperCase();
    
    let finalUrl = url;
    
    // Check if site is known to block iframes
    if(url.includes("google.com") || url.includes("tiktok.com") || url.includes("roblox.com")) {
        // This is a public proxy to help bypass headers for your demo
        finalUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);
    }
    
    frame.src = finalUrl;
}

function aprilFools() {
    alert("SYSTEM ALERT: We have a new owner!");
    window.open('https://sites.google.com/view/apriltoday', '_blank');
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

// Search Engine Logic
document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let val = e.target.value;
        if (!val) return;
        let url = val.includes('.') ? (val.startsWith('http') ? val : 'https://' + val) : `https://www.bing.com/search?q=${encodeURIComponent(val)}`;
        launch(url, 'Search Results');
    }
});

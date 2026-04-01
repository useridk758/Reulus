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

// PROXY LAUNCHER: This forces websites to load inside your frame
function launch(url, title) {
    mainUI.classList.add('hidden');
    
    // Using a Public CORS Proxy to bypass the "Black Screen" (X-Frame-Options)
    // Note: Some sites (like TikTok) are extremely tough, but this works for 90% of web content
    let finalUrl = url;
    if (!url.includes("google.com/search?igu=1")) {
        finalUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);
    }

    setTimeout(() => {
        viewContainer.classList.add('active');
        urlDisplay.innerText = title.toUpperCase();
        frame.src = finalUrl;
    }, 200);
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

document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let val = e.target.value;
        if(!val) return;
        let url = val.includes('.') ? (val.startsWith('http') ? val : 'https://' + val) : `https://www.bing.com/search?q=${encodeURIComponent(val)}`;
        launch(url, "Search Results");
    }
});

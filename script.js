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

// FIXING BLACK SCREEN FOR DEMO
function launch(url, title) {
    mainUI.classList.add('hidden');
    viewContainer.classList.add('active');
    urlDisplay.innerText = title.toUpperCase();
    
    let target = url;
    
    // Most sites block iframes. For your demo, Bing and Wikipedia are the most stable.
    // If a site is known to block, we use a proxy wrapper to force it to show up.
    if(url.includes("bing.com") || url.includes("wikipedia.org")) {
        target = url;
    } else {
        // Using a proxy to strip security headers that cause blackness
        target = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    }
    
    frame.src = target;
}

function aprilFools() {
    alert("SYSTEM ALERT: We have a new owner!");
    // Per your request, this opens in a new tab to avoid frame issues
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
        if (!val) return;
        let url = val.includes('.') ? (val.startsWith('http') ? val : 'https://' + val) : `https://www.bing.com/search?q=${encodeURIComponent(val)}`;
        launch(url, 'Search Results');
    }
});

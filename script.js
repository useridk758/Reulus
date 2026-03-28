function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).replace(' ', '');
    document.getElementById('clock').innerText = timeString;
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('date').innerText = now.toLocaleDateString('en-US', dateOptions).toUpperCase();
}
setInterval(updateTime, 1000);
updateTime();

const dashboard = document.getElementById('dashboard');
const webView = document.getElementById('web-view-container');
const frame = document.getElementById('web-frame');
const urlDisplay = document.getElementById('current-url');

// This function opens the site INSIDE your page
function proxyLaunch(url) {
    dashboard.classList.add('hidden');
    webView.classList.remove('hidden');
    frame.src = url;
    urlDisplay.innerText = url;
}

function closeSite() {
    webView.classList.add('hidden');
    dashboard.classList.remove('hidden');
    frame.src = "";
}

document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let query = e.target.value;
        let targetUrl = "";
        if (query.includes('.') && !query.includes(' ')) {
            targetUrl = query.startsWith('http') ? query : 'https://' + query;
        } else {
            targetUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
        }
        proxyLaunch(targetUrl);
    }
});

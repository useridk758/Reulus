// Live Clock
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

// NO BLACK SCREEN: Opens in a new tab for 100% reliability during recording
function openSecure(url) {
    window.open(url, '_blank');
}

// April Fools Logic
function aprilFools() {
    alert("WE HAVE A NEW OWNER!");
    window.open('https://sites.google.com/view/apriltoday', '_blank');
}

// Search Logic
document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let query = e.target.value;
        if (!query) return;
        
        let url;
        if (query.includes('.') && !query.includes(' ')) {
            url = query.startsWith('http') ? query : 'https://' + query;
        } else {
            url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
        }
        openSecure(url);
    }
});

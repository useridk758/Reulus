// Clock Engine
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
const urlLabel = document.getElementById('current-url-display');

// Launch Function
function launch(url, title) {
    mainUI.classList.add('hidden');
    urlLabel.innerText = title.toUpperCase();
    viewContainer.classList.remove('hidden');
    
    setTimeout(() => {
        viewContainer.classList.add('active');
        
        // Bing Embed Hack to avoid black screen
        let finalUrl = url;
        if(url.includes("google.com")) finalUrl = "https://www.google.com/search?igu=1";
        
        frame.src = finalUrl;
    }, 50);
}

// Operational Heart
function heartMessage() {
    alert("Aw, thank you for joining the Reulus Family! ❤️");
}

function closeView() {
    viewContainer.classList.remove('active');
    setTimeout(() => {
        viewContainer.classList.add('hidden');
        mainUI.classList.remove('hidden');
        frame.src = "about:blank";
    }, 600);
}

function reloadFrame() {
    const current = frame.src;
    frame.src = "about:blank";
    setTimeout(() => { frame.src = current; }, 100);
}

// Search Logic
document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const input = e.target.value.trim();
        if (!input) return;

        let targetUrl;
        if (input.includes('.') && !input.includes(' ')) {
            targetUrl = input.startsWith('http') ? input : 'https://' + input;
        } else {
            targetUrl = `https://www.bing.com/search?q=${encodeURIComponent(input)}`;
        }
        launch(targetUrl, 'Bing Search');
    }
});

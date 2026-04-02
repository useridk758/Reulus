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

// UI Elements
const mainUI = document.getElementById('main-ui');
const viewContainer = document.getElementById('view-container');
const frame = document.getElementById('browser-frame');
const urlLabel = document.getElementById('current-url-display');

/**
 * 4 & 5. Launch Function
 * Opens the Navigator shell and loads the content.
 */
function launch(url, title) {
    // Transition UI Out
    mainUI.classList.add('hidden');
    
    // Setup Navigator
    urlLabel.innerText = title.toUpperCase();
    viewContainer.classList.remove('hidden');
    
    // Small timeout to allow CSS to catch up for the slide-up effect
    setTimeout(() => {
        viewContainer.classList.add('active');
        
        // Handle iframe security blocks for the demo
        let finalUrl = url;
        if(url.includes("google.com")) finalUrl = "https://www.google.com/search?igu=1";
        
        frame.src = finalUrl;
    }, 50);
}

/**
 * Navigation Controls
 */
function closeView() {
    viewContainer.classList.remove('active');
    setTimeout(() => {
        viewContainer.classList.add('hidden');
        mainUI.classList.remove('hidden');
        frame.src = "about:blank"; // Clear frame to save memory
    }, 600);
}

function reloadFrame() {
    const current = frame.src;
    frame.src = "about:blank";
    setTimeout(() => { frame.src = current; }, 100);
}

/**
 * 3. Search Logic
 */
document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const input = e.target.value.trim();
        if (!input) return;

        let targetUrl;
        // Check if it's a link or a word
        if (input.includes('.') && !input.includes(' ')) {
            targetUrl = input.startsWith('http') ? input : 'https://' + input;
        } else {
            // Force Bing for searches
            targetUrl = `https://www.bing.com/search?q=${encodeURIComponent(input)}`;
        }
        launch(targetUrl, 'Search Results');
    }
});

/**
 * April Fools Button Logic
 */
function aprilFools() {
    alert("SYSTEM NOTICE: Ownership has been transferred to AprilToday Corp.");
    window.open('https://sites.google.com/view/apriltoday', '_blank');
}

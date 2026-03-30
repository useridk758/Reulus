window.onload = () => {
    // Smooth fade in of the What's New screen
    setTimeout(() => {
        document.getElementById('changelog-overlay').classList.add('active');
    }, 500);
    updateTime();
};

function updateTime() {
    const now = new Date();
    const h = now.getHours() % 12 || 12;
    const m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').innerText = `${h}:${m}`;
    
    // Proper Date Formatting
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    document.getElementById('date').innerText = now.toLocaleDateString('en-US', options).toUpperCase();
}
setInterval(updateTime, 1000);

const mainUI = document.getElementById('main-ui');
const viewContainer = document.getElementById('view-container');
const frame = document.getElementById('browser-frame');
const urlDisplay = document.getElementById('current-url-display');

function closeChangelog() {
    document.getElementById('changelog-overlay').classList.remove('active');
}

// Fixed Launch Logic to prevent black screen
function launch(url, title) {
    mainUI.classList.add('hidden');
    // Set a timeout to allow the main UI to fade out first
    setTimeout(() => {
        viewContainer.classList.add('active');
        urlDisplay.innerText = title;
        frame.src = url;
    }, 400);
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

function openSettings() { document.getElementById('settings-view').classList.add('active'); }
function closeSettings() { document.getElementById('settings-view').classList.remove('active'); }

function openMaintenance() { alert("Chatroom Under Maintenance."); }

// Wallpaper Logic
const wallpaperInput = document.getElementById('wallpaper-input');
wallpaperInput.onchange = (e) => {
    const file = e.target.files[0];
    if(file) document.getElementById('wallpaper-confirm-box').classList.remove('hidden');
};

function applyWallpaper() {
    const file = wallpaperInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('bg-layer').style.backgroundImage = `url(${e.target.result})`;
        document.getElementById('wallpaper-confirm-box').classList.add('hidden');
        closeSettings();
    };
    reader.readAsDataURL(file);
}

document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let val = e.target.value;
        // Logic to help prevent blank screen by searching Bing if not a URL
        let url = val.includes('.') ? (val.startsWith('http') ? val : 'https://' + val) : `https://www.bing.com/search?q=${encodeURIComponent(val)}`;
        launch(url, 'Web View');
    }
});

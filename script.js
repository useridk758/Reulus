window.onload = () => {
    setTimeout(() => {
        document.getElementById('changelog-overlay').classList.add('active');
    }, 400);
    updateTime();
};

function updateTime() {
    const now = new Date();
    // Clock
    const h = now.getHours() % 12 || 12;
    const m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').innerText = `${h}:${m}`;
    
    // Fixed Date Engine
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    document.getElementById('date').innerText = now.toLocaleDateString('en-US', options);
}
setInterval(updateTime, 1000);

const mainUI = document.getElementById('main-ui');
const viewContainer = document.getElementById('view-container');
const frame = document.getElementById('browser-frame');
const urlDisplay = document.getElementById('current-url-display');

function closeChangelog() { document.getElementById('changelog-overlay').classList.remove('active'); }

function launch(url, title) {
    mainUI.classList.add('hidden');
    setTimeout(() => {
        viewContainer.classList.add('active');
        urlDisplay.innerText = title;
        frame.src = url;
    }, 300);
}

function closeView() {
    viewContainer.classList.remove('active');
    setTimeout(() => {
        mainUI.classList.remove('hidden');
        frame.src = "about:blank";
    }, 300);
}

function reloadFrame() {
    const s = frame.src; frame.src = "";
    setTimeout(() => frame.src = s, 50);
}

function openSettings() { document.getElementById('settings-view').classList.add('active'); }
function closeSettings() { document.getElementById('settings-view').classList.remove('active'); }

function openChatMaintenance() { 
    // Reusing a modal or alerting for maintenance
    alert("Chatroom is currently under maintenance."); 
}

// Wallpaper Logic
const wallpaperInput = document.getElementById('wallpaper-input');
const confirmBox = document.getElementById('wallpaper-confirm-box');
let selectedFile = null;

wallpaperInput.onchange = (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
        document.getElementById('file-name-display').innerText = selectedFile.name;
        confirmBox.classList.remove('hidden');
    }
};

function applyWallpaper() {
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('bg-layer').style.backgroundImage = `url(${e.target.result})`;
        confirmBox.classList.add('hidden');
        closeSettings();
    };
    reader.readAsDataURL(selectedFile);
}

function openWebSection() {
    launch('about:blank', 'Reulus Web');
    document.getElementById('web-section-landing').classList.remove('hidden');
}

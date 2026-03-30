// On Load: Smooth Fade In for Changelog
window.onload = () => {
    setTimeout(() => {
        document.getElementById('changelog-overlay').classList.add('active');
    }, 500);
};

function updateTime() {
    const now = new Date();
    const h = now.getHours() % 12 || 12;
    const m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').innerText = `${h}:${m}`;
}
setInterval(updateTime, 1000);
updateTime();

const mainUI = document.getElementById('main-ui');
const viewContainer = document.getElementById('view-container');
const frame = document.getElementById('browser-frame');
const urlDisplay = document.getElementById('current-url-display');

function closeChangelog() {
    const el = document.getElementById('changelog-overlay');
    el.classList.remove('active');
}

// 6. Smooth Launch
function launch(url, title) {
    mainUI.classList.add('hidden');
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
    const s = frame.src; frame.src = ""; 
    setTimeout(() => frame.src = s, 100);
}

function openSettings() { document.getElementById('settings-view').classList.add('active'); }
function closeSettings() { document.getElementById('settings-view').classList.remove('active'); }

function openChatMaintenance() { document.getElementById('chat-modal').classList.add('active'); }
function closeChatMaintenance() { document.getElementById('chat-modal').classList.remove('active'); }

// 7. Wallpaper Magic Logic
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
    mainUI.classList.add('hidden');
    setTimeout(() => {
        viewContainer.classList.add('active');
        document.getElementById('web-section-landing').classList.remove('hidden');
        frame.classList.add('hidden');
        urlDisplay.innerText = "Reulus Web";
    }, 400);
}

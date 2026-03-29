function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    document.getElementById('clock').innerText = `${displayHours}:${minutes} ${ampm}`;
    
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('date').innerText = now.toLocaleDateString('en-US', options).toUpperCase();
}

setInterval(updateTime, 1000);
updateTime();

const mainUI = document.getElementById('main-ui');
const viewContainer = document.getElementById('view-container');
const frame = document.getElementById('browser-frame');
const urlDisplay = document.getElementById('current-url');

function launch(url) {
    if(!url) return;
    mainUI.style.transform = "scale(0.9)";
    setTimeout(() => {
        mainUI.classList.add('hidden');
        viewContainer.classList.remove('hidden');
        urlDisplay.innerText = url;
        frame.src = url;
    }, 200);
}

function closeView() {
    viewContainer.classList.add('hidden');
    mainUI.classList.remove('hidden');
    mainUI.style.transform = "scale(1)";
    frame.src = "";
}

document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let val = e.target.value;
        if (val.includes('.') && !val.includes(' ')) {
            if (!val.startsWith('http')) val = 'https://' + val;
            launch(val);
        } else {
            launch(`https://www.google.com/search?q=${encodeURIComponent(val)}`);
        }
    }
});

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).replace(' ', '');
    document.getElementById('clock').innerText = timeString;
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('date').innerText = now.toLocaleDateString('en-US', dateOptions).toUpperCase();
}
setInterval(updateTime, 1000);
updateTime();

const mainUI = document.getElementById('main-ui');
const viewContainer = document.getElementById('view-container');
const frame = document.getElementById('browser-frame');
const urlDisplay = document.getElementById('current-url');

function launch(url) {
    mainUI.classList.add('hidden');
    viewContainer.classList.remove('hidden');
    urlDisplay.innerText = url;
    frame.src = url;
}

function closeView() {
    viewContainer.classList.add('hidden');
    mainUI.classList.remove('hidden');
    frame.src = "";
}

document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let query = e.target.value;
        if (query.includes('.') && !query.includes(' ')) {
            if (!query.startsWith('http')) query = 'https://' + query;
            launch(query);
        } else {
            launch(`https://www.bing.com/search?q=${encodeURIComponent(query)}`);
        }
    }
});

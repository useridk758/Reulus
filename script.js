function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    
    document.getElementById('clock').textContent = `${hours}:${minutes} ${ampm}`;
    
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', options).toUpperCase();
}

setInterval(updateClock, 1000);
updateClock();

function launch(url) {
    window.location.href = url;
}

document.getElementById('url-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let val = this.value;
        if (!val.startsWith('http')) val = 'https://www.google.com/search?q=' + val;
        launch(val);
    }
});

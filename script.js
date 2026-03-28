function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    }).replace(' ', '');
    
    document.getElementById('clock').innerText = timeString;

    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('date').innerText = now.toLocaleDateString('en-US', dateOptions).toUpperCase();
}

setInterval(updateTime, 1000);
updateTime();

// Search logic
document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value;
        if (query.includes('.') && !query.includes(' ')) {
            window.location.href = query.startsWith('http') ? query : 'https://' + query;
        } else {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }
});

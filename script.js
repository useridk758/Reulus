const input = document.getElementById('url-input');
const btn = document.getElementById('go-btn');

function launch(url) {
    if (!url) return;
    // Note: Since GitHub Pages is static, you'd usually point this 
    // to a service like Ultraviolet or a similar web-worker script.
    window.location.href = url; 
}

btn.addEventListener('click', () => {
    let url = input.value.trim();
    if (!url.startsWith('http')) url = 'https://' + url;
    launch(url);
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btn.click();
});

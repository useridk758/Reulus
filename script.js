document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('action-btn');

    btn.addEventListener('click', () => {
        alert('System online and layout fixed!');
        console.log("Button clicked successfully.");
    });
});

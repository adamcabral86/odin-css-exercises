document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('myButton');
    if (button) {
        button.addEventListener('click', () => {
            // Using console.log instead of alert for better development experience
            console.log('JavaScript is running and button was clicked!');
        });
    }
});

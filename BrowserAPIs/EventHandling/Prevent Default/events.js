var div = document.querySelector('div');
var button = document.querySelector('a');

div.addEventListener('click', () => {
    console.log('Div clicked!');
});
// Event Bubbling -> child to parent

button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevents the default action (navigation)
    console.log('Button clicked!');
});
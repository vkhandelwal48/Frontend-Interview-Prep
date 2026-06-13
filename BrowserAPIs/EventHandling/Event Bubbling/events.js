var div = document.querySelector('div');
var button = document.querySelector('button');

div.addEventListener('click', () => {
    console.log('Div clicked!');
});
// Event Bubbling -> child to parent

button.addEventListener('click', (event) => {
    event.stopPropagation(); // Stops the event from bubbling up to parent elements
    console.log('Button clicked!');
});
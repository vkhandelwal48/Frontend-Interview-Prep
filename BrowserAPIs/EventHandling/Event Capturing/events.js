var div = document.querySelector('div');
var button = document.querySelector('button');

div.addEventListener('click', () => {
    console.log('Div clicked!');
}, true);
// Event Capturing -> parent to child

button.addEventListener('click', (event) => {
    event.stopPropagation(); // Stops the event from capturing down to child elements
    console.log('Button clicked!');
});
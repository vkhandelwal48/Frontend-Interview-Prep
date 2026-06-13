var div = document.querySelector('div');
var button = document.querySelector('button');

div.addEventListener('click', () => {
    console.log('Div clicked!');
});
// Event Bubbling -> child to parent

button.addEventListener('click', () => {
    console.log('Button clicked!');
});

button.addEventListener('click', (event) => {
    event.stopImmediatePropagation(); // Stops the event from bubbling up to parent elements
    console.log('Button1 clicked!');
});
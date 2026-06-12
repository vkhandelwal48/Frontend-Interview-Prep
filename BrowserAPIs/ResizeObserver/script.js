const box = document.querySelector('.box');
const container = document.querySelector('.container');
const observer = new ResizeObserver((entries) => {
  const boxElement = entries[0]
  const isSmall = boxElement.contentRect.width < 300;
  boxElement.target.style.backgroundColor = isSmall ? 'red' : 'green';
});
observer.observe(box);
observer.observe(container);

// target: box
// contentRect: DOMRectReadOnly {x: 0, y: 0, width: 200, height: 200, top: 0, …}

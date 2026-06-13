const logs = document.getElementById('logs');
const replyBtn = document.getElementById('replyBtn');

function log(text) {
  const li = document.createElement('li');
  li.textContent = text;
  logs.appendChild(li);
}

replyBtn.addEventListener('click', () => {
  if (window.opener && !window.opener.closed) {
    window.opener.postMessage(
      {
        source: 'child',
        text: 'Hello from child',
        sentAt: Date.now(),
      },
      location.origin
    );
  }
});

window.addEventListener('message', (event) => {
  if (event.origin !== location.origin) {
    return;
  }

  log(`Child received: ${JSON.stringify(event.data)}`);
});

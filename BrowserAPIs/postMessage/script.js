let childWindow = null;

const status = document.getElementById('status');
const logs = document.getElementById('logs');
const openChildBtn = document.getElementById('openChildBtn');
const sendBtn = document.getElementById('sendBtn');

function log(text) {
  const li = document.createElement('li');
  li.textContent = text;
  logs.appendChild(li);
}

openChildBtn.addEventListener('click', () => {
  childWindow = window.open('child.html', '_blank', 'width=420,height=480');
  status.textContent = childWindow ? 'Child opened.' : 'Popup blocked.';
});

sendBtn.addEventListener('click', () => {
  if (!childWindow || childWindow.closed) {
    status.textContent = 'Open child first.';
    return;
  }

  const message = {
    source: 'parent',
    text: 'Hello from parent',
    sentAt: Date.now(),
  };

  childWindow.postMessage(message, location.origin);
  log(`Parent sent: ${JSON.stringify(message)}`);
});

window.addEventListener('message', (event) => {
  if (event.origin !== location.origin) {
    return;
  }

  log(`Parent received: ${JSON.stringify(event.data)}`);
});

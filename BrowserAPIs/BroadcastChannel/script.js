const channel = new BroadcastChannel('frontend-prep-channel');
const messages = document.getElementById('messages');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(text) {
  const li = document.createElement('li');
  li.textContent = text;
  messages.appendChild(li);
}

channel.onmessage = (event) => {
  addMessage(`Received: ${event.data}`);
};

sendBtn.addEventListener('click', () => {
  const value = input.value.trim();
  if (!value) {
    return;
  }

  channel.postMessage(value);
  addMessage(`Sent: ${value}`);
  input.value = '';
});

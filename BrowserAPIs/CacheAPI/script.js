const CACHE_NAME = 'frontend-prep-cache-v1';
const CACHE_KEY = '/sample-api-response';

const status = document.getElementById('status');
const output = document.getElementById('output');
const cacheBtn = document.getElementById('cacheBtn');
const readBtn = document.getElementById('readBtn');
const deleteBtn = document.getElementById('deleteBtn');

function setStatus(text) {
  status.textContent = `Status: ${text}`;
}

function isCacheSupported() {
  return typeof caches !== 'undefined';
}

cacheBtn.addEventListener('click', async () => {
  if (!isCacheSupported()) {
    setStatus('Cache API not supported in this context/browser.');
    return;
  }

  const cache = await caches.open(CACHE_NAME);
  const body = JSON.stringify({
    message: 'Cached at runtime',
    time: new Date().toISOString(),
  });

  const response = new Response(body, {
    headers: { 'Content-Type': 'application/json' },
  });

  await cache.put(CACHE_KEY, response);
  setStatus('response cached');
});

readBtn.addEventListener('click', async () => {
  if (!isCacheSupported()) {
    setStatus('Cache API not supported in this context/browser.');
    return;
  }

  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(CACHE_KEY);

  if (!response) {
    output.textContent = 'No cached response found.';
    return;
  }

  output.textContent = await response.text();
  setStatus('cache hit');
});

deleteBtn.addEventListener('click', async () => {
  if (!isCacheSupported()) {
    setStatus('Cache API not supported in this context/browser.');
    return;
  }

  await caches.delete(CACHE_NAME);
  output.textContent = '';
  setStatus('cache deleted');
});

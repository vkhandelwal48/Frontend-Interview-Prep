const DB_NAME = 'frontend-prep-db';
const STORE_NAME = 'notes';

const noteInput = document.getElementById('noteInput');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const notesList = document.getElementById('notesList');

let db;

function openDB() {
  const request = indexedDB.open(DB_NAME, 1);

  request.onupgradeneeded = (event) => {
    const database = event.target.result;
    if (!database.objectStoreNames.contains(STORE_NAME)) {
      database.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    renderNotes();
  };

  request.onerror = () => {
    console.error('IndexedDB failed to open.');
  };
}

function renderNotes() {
  notesList.textContent = '';

  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const request = store.getAll();

  request.onsuccess = () => {
    request.result.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item.text;
      notesList.appendChild(li);
    });
  };
}

addBtn.addEventListener('click', () => {
  const text = noteInput.value.trim();
  if (!text || !db) {
    return;
  }

  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).add({ text });

  tx.oncomplete = () => {
    noteInput.value = '';
    renderNotes();
  };
});

clearBtn.addEventListener('click', () => {
  if (!db) {
    return;
  }

  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).clear();

  tx.oncomplete = renderNotes;
});

openDB();

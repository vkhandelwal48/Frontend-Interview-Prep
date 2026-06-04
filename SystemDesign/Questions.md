# Frontend System Design — Interview Questions & Answers

---

## Table of Contents

1. [Design an Autocomplete / Typeahead Search](#1-design-an-autocomplete--typeahead-search)
2. [Design an Infinite Scroll News Feed](#2-design-an-infinite-scroll-news-feed)
3. [Design a Real-Time Chat Application](#3-design-a-real-time-chat-application)
4. [Design a Notification System](#4-design-a-notification-system)
5. [Design a File Uploader with Progress](#5-design-a-file-uploader-with-progress)
6. [Design a Google Docs-like Collaborative Editor](#6-design-a-google-docs-like-collaborative-editor)
7. [Design a Video Streaming UI (YouTube/Netflix)](#7-design-a-video-streaming-ui-youtubeNetflix)
8. [Design a Frontend Monitoring System](#8-design-a-frontend-monitoring-system)
9. [Design a Micro-Frontend Architecture](#9-design-a-micro-frontend-architecture)
10. [Design a Rate Limiter on the Client Side](#10-design-a-rate-limiter-on-the-client-side)

---

## Framework for Answering Any Frontend System Design Question

Always structure your answer around these pillars:

```
1. Clarify Requirements    → Functional + Non-functional
2. Component Architecture  → Break UI into components/modules
3. Data Flow               → API contracts, state management
4. Performance             → Lazy load, pagination, caching, memoization
5. Networking              → Protocol choice, error handling, retries
6. Accessibility           → ARIA, keyboard nav, screen readers
7. Security                → XSS, CSRF, input sanitization
8. Testing                 → Unit, integration, E2E considerations
9. Trade-offs              → Explicitly state what you chose and why
```

---

## 1. Design an Autocomplete / Typeahead Search

### Functional Requirements
- User types in a search box and sees suggestions after a short delay
- Suggestions come from an API
- Clicking/pressing Enter navigates to that result

### Non-Functional Requirements
- Fast, low-latency UI (< 100ms perceived)
- Minimal API calls
- Accessible via keyboard

### Component Breakdown
```
<SearchBox>
  ├── <Input />
  └── <SuggestionDropdown>
        └── <SuggestionItem /> × n
```

### Key Design Decisions

#### 1. Debouncing API Calls
```js
// Fire API only after user stops typing for 300ms
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const fetchSuggestions = debounce(async (query) => {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  setSuggestions(data);
}, 300);
```

#### 2. Caching Previous Results
```js
const cache = new Map();

async function getSuggestions(query) {
  if (cache.has(query)) return cache.get(query);
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  cache.set(query, data);
  return data;
}
```

#### 3. Race Condition — Stale Responses
```js
// Use AbortController to cancel previous in-flight request
let controller;

async function fetchSuggestions(query) {
  if (controller) controller.abort();
  controller = new AbortController();
  try {
    const res = await fetch(`/api/search?q=${query}`, {
      signal: controller.signal,
    });
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') return; // stale request, ignore
    throw err;
  }
}
```

#### 4. Keyboard Navigation
- Track `activeIndex` in state
- `ArrowDown` → increment index, `ArrowUp` → decrement, `Enter` → select, `Escape` → close
- Use `aria-activedescendant`, `role="listbox"`, `role="option"` for accessibility

#### 5. Minimum Query Length
- Only fire API for queries with 2+ characters to avoid noise

### Performance Optimizations
- Virtualize the dropdown list if suggestions can be > 50 (react-window)
- Memoize `<SuggestionItem>` with `React.memo`
- Use `useDeferredValue` (React 18) to keep input responsive while suggestions load

### Trade-offs
| Decision | Alternative | Why Chosen |
|---|---|---|
| Debounce 300ms | Throttle | Debounce fires after pause, better UX for search |
| Client-side Map cache | No cache | Reduces redundant API calls for same prefix |
| AbortController | Ignore stale | Prevents showing wrong results |

---

## 2. Design an Infinite Scroll News Feed

### Functional Requirements
- Load 20 items at a time
- Automatically fetch more as user scrolls near the bottom
- Show loading skeleton while fetching
- Handle errors gracefully

### Non-Functional Requirements
- Smooth scrolling, no layout shift
- Memory-efficient (don't keep all DOM nodes)
- Works on mobile

### Approach: Intersection Observer (preferred over scroll events)

```js
const observerRef = useRef(null);
const sentinelRef = useRef(null); // empty div at bottom of list

useEffect(() => {
  observerRef.current = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        fetchNextPage();
      }
    },
    { threshold: 0.1 }
  );

  if (sentinelRef.current) {
    observerRef.current.observe(sentinelRef.current);
  }

  return () => observerRef.current?.disconnect();
}, [hasMore, isLoading]);
```

### Why Intersection Observer over scroll event?
- No main thread scroll listener → no jank
- Browser-native, efficient
- No need to calculate `scrollTop + clientHeight >= scrollHeight`

### Virtualization (for very long lists)
- After 200+ items, DOM nodes become expensive
- Use `react-window` or `react-virtual` to only render visible rows
- Maintain `scrollTop` position when new items load to prevent layout shift

### API / Cursor-based Pagination
```
GET /api/feed?cursor=<lastItemId>&limit=20
Response: { items: [...], nextCursor: "xyz", hasMore: true }
```
- Prefer **cursor-based** over offset-based: stable results even if new items are inserted

### State Management
```js
const [items, setItems] = useState([]);
const [cursor, setCursor] = useState(null);
const [hasMore, setHasMore] = useState(true);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
```

### Error Handling
- Show "Retry" button on fetch failure
- Don't lose already-loaded items on error

### Performance
- Memoize each feed item with `React.memo` + stable `key` (item ID, not index)
- Avoid re-rendering entire list on new page load (append, not replace)
- Debounce re-observation after DOM update

---

## 3. Design a Real-Time Chat Application

### Functional Requirements
- Send and receive messages in real-time
- Show message history on load
- Online/offline status indicator
- Typing indicator

### Non-Functional Requirements
- Low latency (< 200ms)
- Handle reconnections gracefully
- Work on slow networks

### Protocol Choice

| Protocol | Use Case |
|---|---|
| **WebSocket** | Full-duplex, persistent, best for chat |
| **Server-Sent Events (SSE)** | Server → client only (notifications, feeds) |
| **Long Polling** | Fallback when WebSocket not available |
| **HTTP Polling** | Simple but wasteful, avoid for chat |

**Choice: WebSocket**

### WebSocket Connection Management
```js
class ChatSocket {
  constructor(url) {
    this.url = url;
    this.reconnectDelay = 1000;
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => { this.reconnectDelay = 1000; };
    this.ws.onmessage = (e) => this.onMessage(JSON.parse(e.data));
    this.ws.onclose = () => this.reconnect();
    this.ws.onerror = (e) => console.error('WS error', e);
  }

  reconnect() {
    setTimeout(() => {
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000); // exponential backoff
      this.connect();
    }, this.reconnectDelay);
  }

  send(payload) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(payload));
    }
  }
}
```

### Message State
```js
// Optimistic UI — add message immediately, reconcile on server ack
function sendMessage(text) {
  const tempId = `temp-${Date.now()}`;
  dispatch({ type: 'ADD_MESSAGE', payload: { id: tempId, text, status: 'sending' } });

  socket.send({ type: 'SEND_MESSAGE', text });
  // On server ack: replace tempId with real ID, set status 'sent'
  // On failure: set status 'failed', show retry
}
```

### Typing Indicator
```js
// Debounce the "user is typing" event — don't spam server
const sendTyping = debounce(() => {
  socket.send({ type: 'TYPING', roomId });
}, 500);
```

### Message Virtualization
- Use `react-window` for long chat history
- Scroll to bottom on new message (but NOT if user has scrolled up — check position first)

### Security
- Sanitize all message content before rendering (prevent XSS via injected HTML)
- Use `textContent` not `innerHTML` for user messages, or a whitelist sanitizer (DOMPurify)
- Authenticate WebSocket connection with a short-lived token in the URL or first message

---

## 4. Design a Notification System

### Functional Requirements
- Show real-time push notifications (badge + dropdown)
- Mark individual / all as read
- Persist notifications across sessions
- Different notification types (info, warning, success, error)

### Delivery Mechanism
- **WebSocket** — best for real-time, already connected apps
- **Server-Sent Events (SSE)** — simpler, server → client only, good choice for notifications

```js
// SSE connection
const eventSource = new EventSource('/api/notifications/stream');
eventSource.onmessage = (e) => {
  const notification = JSON.parse(e.data);
  dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
};
eventSource.onerror = () => {
  // Browser auto-reconnects SSE
};
```

### State Shape
```js
{
  notifications: [
    { id: '1', type: 'info', message: '...', read: false, timestamp: '...' },
    { id: '2', type: 'success', message: '...', read: true, timestamp: '...' },
  ],
  unreadCount: 1,
}
```

### Badge Count
- Computed from `notifications.filter(n => !n.read).length`
- Update browser tab title: `document.title = \`(\${unreadCount}) MyApp\``

### Mark as Read
- Optimistic update locally first
- Sync to server in background (PATCH /api/notifications/:id)
- On failure, rollback

### Notification Permission (Browser Push)
```js
async function requestPushPermission() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    // Register service worker + subscribe to push
  }
}
```

### Performance
- Limit dropdown to last 50 notifications, "View All" links to a page
- Virtualize the full notifications page

---

## 5. Design a File Uploader with Progress

### Functional Requirements
- Single and multi-file upload
- Show upload progress per file
- Support drag-and-drop
- Cancel in-progress upload
- Retry on failure

### Key APIs
- `<input type="file" multiple />` or Drag-and-Drop API
- `XMLHttpRequest` (for progress events) or `fetch` with `ReadableStream`
- `AbortController` for cancellation

### Upload with Progress
```js
function uploadFile(file, onProgress, signal) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText));
      else reject(new Error(`Upload failed: ${xhr.status}`));
    };

    xhr.onerror = () => reject(new Error('Network error'));

    signal?.addEventListener('abort', () => {
      xhr.abort();
      reject(new DOMException('Upload aborted', 'AbortError'));
    });

    xhr.open('POST', '/api/upload');
    const formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
  });
}
```
> Note: `fetch` does NOT natively support upload progress (no `onprogress`). Use XHR for progress tracking.

### State Per File
```js
{
  id: 'uuid',
  file: File,
  status: 'idle' | 'uploading' | 'success' | 'error',
  progress: 0-100,
  error: null | string,
  abortController: AbortController,
}
```

### Large File — Chunked Upload
- Split file into chunks: `file.slice(start, end)`
- Upload chunks in parallel (e.g., 3 at a time)
- Server reassembles chunks
- On failure, retry only the failed chunk

### Drag and Drop
```js
function onDrop(e) {
  e.preventDefault();
  const files = [...e.dataTransfer.files];
  handleFiles(files);
}
```

### Security
- Validate file type (MIME type + extension) on client AND server
- Never trust client-side validation alone
- Set max file size limit on both client and server

---

## 6. Design a Google Docs-like Collaborative Editor

### Functional Requirements
- Multiple users edit the same document simultaneously
- Changes appear in real-time for all users
- Show who is editing (cursors/presence)
- Undo/Redo per user

### The Core Problem: Conflict Resolution

#### Option A: Operational Transformation (OT)
- Used by Google Docs
- Transform concurrent operations so they remain consistent
- Complex to implement

#### Option B: CRDTs (Conflict-free Replicated Data Types)
- Used by Figma, Linear
- Each character gets a unique ID; ordering is deterministic
- Simpler conflict resolution, better offline support

### Simplified Approach (Interview Level)
```
Client A types 'x' at position 5
Client B types 'y' at position 5 (simultaneously)

Without OT: Result is unpredictable
With OT: Server transforms ops so both end up with the same document
```

### Architecture
```
Browser ←──WebSocket──→ Collaboration Server
                              │
                        Operation Log (DB)
```

1. User types → local change applied immediately (optimistic)
2. Change sent to server as an operation `{ type: 'insert', pos: 5, char: 'x', userId, timestamp }`
3. Server applies OT, broadcasts transformed op to all other clients
4. Clients apply the transformed op

### Presence (Live Cursors)
- Each client broadcasts cursor position periodically (throttled, ~100ms)
- Other clients show colored cursor overlays
- Clean up presence on disconnect (TTL or explicit leave event)

### Performance
- Batch small operations before sending (e.g., collect keystrokes for 50ms)
- Compress operation payloads
- Use `requestAnimationFrame` for cursor position updates

---

## 7. Design a Video Streaming UI (YouTube/Netflix)

### Functional Requirements
- Play/pause, seek, volume, fullscreen
- Adaptive bitrate based on network speed
- Autoplay next video
- Progress/watch history

### Key Technology: HLS / DASH (Adaptive Bitrate Streaming)
- Video is split into small segments (2-10s each)
- Multiple quality variants (360p, 720p, 1080p, 4K)
- Player picks quality based on available bandwidth
- Library: `hls.js` for HLS, `dash.js` for MPEG-DASH

```js
import Hls from 'hls.js';

const hls = new Hls();
hls.loadSource('https://cdn.example.com/video/manifest.m3u8');
hls.attachMedia(videoElement);
hls.on(Hls.Events.MANIFEST_PARSED, () => videoElement.play());
```

### Performance Optimizations
- **Lazy load** the video player (don't load until user interacts or video is near viewport)
- Use `IntersectionObserver` to autoplay when in viewport, pause when out
- **Thumbnail previews**: generate sprite sheet on server, show on hover over seekbar
- Preload next video metadata (`<link rel="prefetch">`) but NOT the video itself

### Buffering Strategy
- Show skeleton/spinner on buffer underrun
- Monitor `video.buffered` and `video.readyState` to know buffer state
- Pre-buffer a few seconds ahead

### Security
- Use **signed URLs** for video segments (short TTL)
- DRM (Widevine, FairPlay) for protected content
- Never expose raw CDN paths without auth

---

## 8. Design a Frontend Monitoring System

### What to Monitor
| Metric | Tool/API |
|---|---|
| **Core Web Vitals** (LCP, INP, CLS) | `web-vitals` library / PerformanceObserver |
| **JS Errors** | `window.onerror`, `unhandledrejection` |
| **Network failures** | Fetch/XHR interceptor |
| **User sessions / clicks** | Custom event tracking |
| **Resource timing** | `PerformanceResourceTiming` API |

### Core Web Vitals Collection
```js
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP((metric) => sendToAnalytics({ name: 'LCP', value: metric.value }));
onINP((metric) => sendToAnalytics({ name: 'INP', value: metric.value }));
onCLS((metric) => sendToAnalytics({ name: 'CLS', value: metric.value }));
```

### Error Tracking
```js
window.addEventListener('error', (e) => {
  sendToAnalytics({
    type: 'js_error',
    message: e.message,
    filename: e.filename,
    line: e.lineno,
    stack: e.error?.stack,
    userAgent: navigator.userAgent,
    url: window.location.href,
  });
});

window.addEventListener('unhandledrejection', (e) => {
  sendToAnalytics({ type: 'promise_rejection', reason: String(e.reason) });
});
```

### Batching & Sending
```js
// Don't send every event individually — batch and flush
const queue = [];

function sendToAnalytics(data) {
  queue.push({ ...data, timestamp: Date.now() });
  if (queue.length >= 10) flush();
}

// Use sendBeacon for end-of-session data (doesn't block page unload)
function flush() {
  const payload = JSON.stringify(queue.splice(0));
  navigator.sendBeacon('/api/analytics', payload);
}

window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') flush();
});
```

### Source Maps
- Upload source maps to your monitoring service (Sentry)
- Map minified stack traces back to original source
- Never serve source maps publicly in production

---

## 9. Design a Micro-Frontend Architecture

### What Problem Does It Solve?
- Large frontend monolith → multiple teams, slow deploys, tight coupling
- Micro-frontends: each team owns a slice of the UI, deploys independently

### Integration Strategies

#### 1. Module Federation (Webpack 5) — Most Common
```js
// Shell app (host) webpack config
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    cart: 'cart@https://cart.example.com/remoteEntry.js',
    catalog: 'catalog@https://catalog.example.com/remoteEntry.js',
  },
});

// Usage in shell
const CartApp = React.lazy(() => import('cart/CartApp'));
```

#### 2. iframes
- Strong isolation, but poor UX (scroll, sizing, cross-frame communication via `postMessage`)
- Use only for truly isolated third-party widgets

#### 3. Web Components
- Framework-agnostic, encapsulated via Shadow DOM
- Good for design system components shared across teams

### Shared Dependencies
- Share React, ReactDOM via Module Federation `shared` config to avoid loading twice
```js
shared: {
  react: { singleton: true, requiredVersion: '^18.0.0' },
  'react-dom': { singleton: true },
}
```

### Cross-App Communication
- **Custom events** (`CustomEvent` on `window`) — simple, decoupled
- **Shared state store** (e.g., shared Redux store) — more coupling
- **URL / query params** — for navigation state

### Trade-offs
| Benefit | Cost |
|---|---|
| Independent deployments | Increased complexity |
| Team autonomy | Shared dependency conflicts |
| Fault isolation | Harder to maintain consistency |
| Tech stack flexibility | Bundle size risk if not sharing deps |

---

## 10. Design a Rate Limiter on the Client Side

### Use Cases
- Prevent users from spamming API calls (submit button, search)
- Protect against accidental DoS from buggy retry loops
- Throttle analytics/logging calls

### Token Bucket Algorithm
```js
class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;       // max tokens
    this.tokens = capacity;         // current tokens
    this.refillRate = refillRate;   // tokens per second
    this.lastRefill = Date.now();
  }

  refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000; // seconds
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }

  consume(tokens = 1) {
    this.refill();
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true; // allowed
    }
    return false; // rate limited
  }
}

// Usage
const limiter = new TokenBucket(5, 1); // 5 capacity, refill 1/sec

async function onSubmit() {
  if (!limiter.consume()) {
    showToast('Too many requests. Please wait.');
    return;
  }
  await submitForm();
}
```

### Sliding Window (Simpler)
```js
class SlidingWindowRateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.timestamps = [];
  }

  isAllowed() {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < this.windowMs);
    if (this.timestamps.length < this.limit) {
      this.timestamps.push(now);
      return true;
    }
    return false;
  }
}

const limiter = new SlidingWindowRateLimiter(3, 5000); // 3 calls per 5 seconds
```

### Important Note
> Client-side rate limiting is a UX convenience, NOT a security measure. Always enforce rate limiting server-side as well. A malicious user can bypass any client-side check.

---

## Quick Reference — Common Trade-offs to Know

| Scenario | Option A | Option B | Guidance |
|---|---|---|---|
| Real-time updates | WebSocket | SSE | WebSocket for bidirectional; SSE for server-push only |
| Pagination | Offset-based | Cursor-based | Cursor for stable results with live data |
| Search throttling | Debounce | Throttle | Debounce for search (fire after pause) |
| Long lists | DOM virtualization | Pagination | Virtualize for UX; paginate for simplicity |
| State in URL | Query params | Local state | URL for shareable/bookmarkable state |
| Caching | In-memory Map | Service Worker | In-memory for session; SW for offline |
| Error recovery | Retry with backoff | Show error + manual retry | Exponential backoff for transient errors |
| Auth tokens | localStorage | HttpOnly cookie | HttpOnly cookie (not accessible to JS, safer against XSS) |

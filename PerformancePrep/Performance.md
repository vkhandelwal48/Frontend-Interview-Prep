# Performance Optimization — Comprehensive Coverage

## 1. Core Web Vitals (LCP, FID, CLS)

### What are Core Web Vitals?
Core Web Vitals are three key metrics that measure real user experience on web pages. Google uses them as ranking factors.

### 1.1 LCP (Largest Contentful Paint)

**Definition:** Time it takes for the largest visible content element to render.

**Good Target:** < 2.5 seconds
**Needs Improvement:** 2.5s - 4.0s
**Poor:** > 4.0s

**Elements measured:**
- `<img>` elements
- `<image>` inside `<svg>`
- `<video>` elements with poster image
- Elements with background image via CSS
- Text blocks containing text nodes

**How to measure:**
```javascript
// Using PerformanceObserver API
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('LCP:', entry.renderTime || entry.loadTime);
  }
});

observer.observe({ type: 'largest-contentful-paint', buffered: true });
```

**How to optimize LCP:**

```javascript
// 1. Lazy load images/videos
<img loading="lazy" src="image.jpg" />
<img loading="eager" src="hero.jpg" />  // Critical images

// 2. Use responsive images
<picture>
  <source srcset="large.jpg 1024w" media="(min-width: 1024px)" />
  <source srcset="medium.jpg 768w" media="(min-width: 768px)" />
  <img src="small.jpg" alt="Image" />
</picture>

// 3. Optimize font loading
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;  // Show fallback immediately
}

// 4. Minimize CSS/JS for initial render
// Code split and defer non-critical JS
<script async src="analytics.js"></script>
<script defer src="interactive.js"></script>

// 5. Preload critical resources
<link rel="preload" as="image" href="hero.jpg" />
<link rel="preload" as="font" href="font.woff2" type="font/woff2" />
<link rel="preload" as="script" href="critical.js" />
```

### 1.2 FID (First Input Delay) — Now INP (Interaction to Next Paint)

**Definition:** Time from user input to browser response. (FID deprecated, replaced by INP in 2024)

**Good Target (INP):** < 200 milliseconds
**Needs Improvement:** 200ms - 500ms
**Poor:** > 500ms

**How to measure:**
```javascript
// INP (Interaction to Next Paint)
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('INP:', entry.duration);
  }
});

observer.observe({ type: 'interaction', buffered: true });
```

**How to optimize INP:**

```javascript
// 1. Break up long tasks (> 50ms)
function heavyComputation() {
  // Instead of one 200ms task...
  // Split into multiple smaller tasks
  setTimeout(() => {
    processChunk1();
  }, 0);
  
  setTimeout(() => {
    processChunk2();
  }, 0);
  
  setTimeout(() => {
    processChunk3();
  }, 0);
}

// 2. Use requestIdleCallback for background work
requestIdleCallback(() => {
  // Low-priority work like analytics
  trackUserBehavior();
});

// 3. Defer expensive operations
const handleClick = (e) => {
  // Respond immediately to user
  updateUI();
  
  // Do heavy work after
  setTimeout(() => {
    expensiveCalculation();
  }, 0);
};

// 4. Use Web Workers for CPU-intensive work
const worker = new Worker('worker.js');
worker.postMessage({ data: largeDataset });
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};
```

### 1.3 CLS (Cumulative Layout Shift)

**Definition:** Unexpected layout shifts that occur during page load.

**Good Target:** < 0.1
**Needs Improvement:** 0.1 - 0.25
**Poor:** > 0.25

**How to measure:**
```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {  // Ignore user-initiated shifts
      console.log('CLS:', entry.value);
    }
  }
});

observer.observe({ type: 'layout-shift', buffered: true });
```

**Common causes & fixes:**

```html
<!-- BAD: Image without dimensions causes layout shift -->
<img src="image.jpg" />

<!-- GOOD: Reserve space for image -->
<img src="image.jpg" width="800" height="600" />

<!-- GOOD: Use aspect ratio -->
<img 
  src="image.jpg" 
  style="aspect-ratio: 16/9;" 
  width="800" 
/>

<!-- BAD: Ad inserted dynamically -->
<div id="ad-container"></div>

<!-- GOOD: Reserve space for ad -->
<div id="ad-container" style="height: 250px;"></div>

<!-- BAD: Font loads late, causes text shift -->
<p style="font-family: CustomFont;">Text</p>

<!-- GOOD: Use font-display: swap -->
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2');
  font-display: swap;
}
```

---

## 2. Bundle Analysis & Tree Shaking

### 2.1 Bundle Analysis

Identify what's taking up space in your bundle.

**Webpack Bundle Analyzer:**
```javascript
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: true,
      statsOptions: {
        source: false,
        modules: true
      }
    })
  ]
};
```

**Vite Bundle Visualizer:**
```javascript
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ]
};
```

**Finding problems:**
- 📦 Large libraries (lodash, moment.js)
- 🐛 Duplicate dependencies (multiple versions)
- 🎨 Unused CSS frameworks
- 📚 Large polyfills

### 2.2 Tree Shaking

Remove unused code from bundle.

```javascript
// lodash.js
export function map(arr, fn) { /* ... */ }
export function filter(arr, fn) { /* ... */ }
export function reduce(arr, fn) { /* ... */ }

// ❌ BAD: Imports everything (treeshaking disabled)
import lodash from 'lodash';
lodash.map([1,2,3], x => x * 2);

// ✅ GOOD: Only imports used functions (tree-shaken)
import { map } from 'lodash-es';
map([1,2,3], x => x * 2);

// For libraries to support tree-shaking:
// - Use ES modules (not CommonJS)
// - Package.json: "type": "module" or ".mjs" files
// - Provide "export" field with ESM entry point
```

**Webpack tree shaking:**
```javascript
// webpack.config.js
module.exports = {
  mode: 'production',  // Enables tree shaking
  optimization: {
    usedExports: true,
    sideEffects: false  // Tell webpack no side effects
  }
};
```

**package.json for libraries:**
```json
{
  "name": "my-library",
  "main": "dist/index.cjs",
  "module": "dist/index.esm.js",
  "exports": {
    "import": "./dist/index.esm.js",
    "require": "./dist/index.cjs"
  },
  "sideEffects": false,
  "type": "module"
}
```

---

## 3. Code Splitting (Advanced)

### Route-based vs Component-based

```javascript
// Route-based splitting (best for initial load)
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

// Component-based splitting (for heavy components)
const Editor = lazy(() => import('./components/Editor'));
const Modal = lazy(() => import('./components/Modal'));

// Dynamic chunk names
const Editor = lazy(() => 
  import(/* webpackChunkName: "editor" */ './components/Editor')
);

// Prefetch - load in background (lower priority)
const Editor = lazy(() => 
  import(/* webpackPrefetch: true */ './components/Editor')
);

// Preload - load as high priority
const Critical = lazy(() => 
  import(/* webpackPreload: true */ './components/Critical')
);
```

---

## 4. Lazy Loading & Dynamic Import (Comprehensive)

```javascript
// Image lazy loading (native)
<img loading="lazy" src="image.jpg" alt="Image" />

// Component lazy loading
const HeavyList = lazy(() => import('./HeavyList'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyList />
    </Suspense>
  );
}

// Progressive loading
function App() {
  const [showEditor, setShowEditor] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowEditor(true)}>
        Open Editor
      </button>
      
      {showEditor && (
        <Suspense fallback={<div>Loading...</div>}>
          <Editor />
        </Suspense>
      )}
    </>
  );
}

// Dynamic import with error handling
async function loadModule() {
  try {
    const module = await import('./heavy-module');
    return module.default;
  } catch (error) {
    console.error('Failed to load module:', error);
    // Return fallback or null
  }
}

// Conditional imports
async function initializeApp() {
  if (isProd) {
    await import('./analytics');
  }
  if (hasRichEditor) {
    await import('./editor-bundle');
  }
}
```

---

## 5. Image Optimization

### Image Formats & Compression

```html
<!-- Modern formats (WebP, AVIF) with fallbacks -->
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Image" />
</picture>

<!-- Responsive images -->
<img 
  srcset="
    small.jpg 480w,
    medium.jpg 768w,
    large.jpg 1200w
  "
  sizes="
    (max-width: 600px) 100vw,
    (max-width: 1200px) 50vw,
    calc(100vw - 300px)
  "
  src="medium.jpg"
  alt="Image"
/>

<!-- SVG for icons/graphics -->
<svg width="24" height="24" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" />
</svg>
```

**JavaScript lazy loading:**
```javascript
function ImageLazyLoader() {
  useEffect(() => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'  // Start loading 50px before visible
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }, []);
  
  return (
    <img 
      data-src="actual-image.jpg" 
      src="placeholder.jpg" 
      alt="Image"
      className="lazy-image"
    />
  );
}
```

---

## 6. Memory Leaks Detection & Profiling

### Common Memory Leak Patterns

```javascript
// ❌ LEAK: Event listener not removed
function attachListener() {
  element.addEventListener('click', expensiveHandler);
  // Never removed, stays in memory even if element is deleted
}

// ✅ FIX: Remove listener on cleanup
function useClickHandler(element) {
  useEffect(() => {
    element.addEventListener('click', handler);
    return () => element.removeEventListener('click', handler);
  }, [element]);
}

// ❌ LEAK: Global variable
var globalData = []; // Grows indefinitely
function processData(data) {
  globalData.push(data);
}

// ✅ FIX: Use local scope
function processData(data) {
  let localData = [];
  localData.push(data);
  return localData;
}

// ❌ LEAK: Detached DOM nodes with listeners
function removeElement() {
  const el = document.getElementById('modal');
  el.addEventListener('click', handler);
  document.body.removeChild(el);  // Element removed but listener retained
}

// ✅ FIX: Remove listener before removing element
function removeElement() {
  const el = document.getElementById('modal');
  el.removeEventListener('click', handler);
  document.body.removeChild(el);
}

// ❌ LEAK: Circular references
const obj1 = { ref: null };
const obj2 = { ref: obj1 };
obj1.ref = obj2;  // Circular reference, hard to garbage collect

// ✅ FIX: Use WeakMap for associations
const metadata = new WeakMap();
metadata.set(obj1, { data: 'value' });  // Doesn't prevent GC
```

### Profiling Memory

```javascript
// Using Chrome DevTools
// 1. Open DevTools > Memory tab
// 2. Take heap snapshot
// 3. Perform actions
// 4. Take another snapshot
// 5. Compare snapshots

// Programmatic profiling
function profileMemory() {
  if (performance.memory) {
    console.log('Used:', Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB');
    console.log('Total:', Math.round(performance.memory.totalJSHeapSize / 1048576) + 'MB');
    console.log('Limit:', Math.round(performance.memory.jsHeapSizeLimit / 1048576) + 'MB');
  }
}

// Monitor memory growth
let previousMemory = 0;
setInterval(() => {
  profileMemory();
  const current = performance.memory.usedJSHeapSize;
  const delta = current - previousMemory;
  
  if (delta > 10000000) {  // > 10MB growth
    console.warn('Memory leak detected!', delta);
  }
  previousMemory = current;
}, 5000);
```

---

## 7. Rendering Performance (Optimization Patterns)

### Avoiding Layout Thrashing

```javascript
// ❌ BAD: Forces multiple reflows
for (let i = 0; i < 100; i++) {
  element.style.width = element.offsetWidth + 10 + 'px';  // Read + Write = reflow
}

// ✅ GOOD: Batch reads, then writes
let width = element.offsetWidth;
for (let i = 0; i < 100; i++) {
  width += 10;
}
element.style.width = width + 'px';

// ✅ BETTER: Use CSS for animations
element.style.animation = 'slideIn 1s ease-out';

@keyframes slideIn {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}
```

### React Performance Optimization

```javascript
// Memoization prevents unnecessary re-renders
const List = memo(({ items }) => {
  return items.map(item => <Item key={item.id} item={item} />);
});

// useMemo for expensive calculations
function Component({ data }) {
  const sorted = useMemo(() => {
    return data.sort((a, b) => a.value - b.value);
  }, [data]);
  
  return <div>{sorted.map(item => /* ... */)}</div>;
}

// useCallback prevents function recreation
function Component() {
  const handleClick = useCallback(() => {
    doSomething();
  }, []);  // Only recreated if dependencies change
  
  return <Button onClick={handleClick} />;
}
```

---

## 8. Caching Strategies

### HTTP Caching

```javascript
// Browser caching headers
res.set('Cache-Control', 'public, max-age=31536000');  // 1 year for assets

// Immutable assets (fingerprinted)
res.set('Cache-Control', 'public, max-age=31536000, immutable');

// No cache, revalidate on each request
res.set('Cache-Control', 'no-cache, must-revalidate');

// Only cache in browser (not CDN)
res.set('Cache-Control', 'private, max-age=3600');

// Weak revalidation (ETag)
res.set('ETag', '"33a64df551425fcc55e4d42a148795d9f25f89d4"');

// Versioning for cache busting
// main.js → main.abc123.js (content hash in filename)
<script src="main.abc123.js"></script>
```

### Service Worker Caching

```javascript
// service-worker.js
const CACHE_VERSION = 'v1';

// Install: cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/app.js'
      ]);
    })
  );
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

---

## 9. Virtualization (Long Lists)

### Virtual Scrolling Pattern

```javascript
function VirtualizedList({ items }) {
  const [scrollTop, setScrollTop] = useState(0);
  const itemHeight = 50;  // Fixed height per item
  const containerHeight = 500;  // Visible area
  
  // Calculate visible range
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const endIndex = startIndex + visibleCount;
  
  // Only render visible items
  const visibleItems = items.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * itemHeight;
  
  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, i) => (
            <div
              key={startIndex + i}
              style={{ height: itemHeight }}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Using react-window library:**
```javascript
import { FixedSizeList as List } from 'react-window';

function VirtualList({ items }) {
  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index].content}
        </div>
      )}
    </List>
  );
}
```

---

## 10. Performance Monitoring Dashboard

```javascript
// Collect all Web Vitals
function collectVitals() {
  const vitals = {};
  
  // LCP
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    vitals.lcp = lastEntry.renderTime || lastEntry.loadTime;
  });
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  
  // INP
  const inpObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      vitals.inp = Math.max(vitals.inp || 0, entry.duration);
    }
  });
  inpObserver.observe({ type: 'interaction', buffered: true });
  
  // CLS
  let cls = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        cls += entry.value;
      }
    }
    vitals.cls = cls;
  });
  clsObserver.observe({ type: 'layout-shift', buffered: true });
  
  // Navigation metrics
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0];
    vitals.fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime;
    vitals.domInteractive = navigation.domInteractive;
    vitals.loadComplete = navigation.loadEventEnd;
  });
  
  return vitals;
}

// Send to analytics
function reportVitals() {
  const vitals = collectVitals();
  fetch('/api/vitals', {
    method: 'POST',
    body: JSON.stringify(vitals)
  });
}
```

---

## Performance Checklist

- ✅ LCP < 2.5s (preload critical resources, optimize images)
- ✅ INP < 200ms (break long tasks, defer non-critical work)
- ✅ CLS < 0.1 (reserve space, avoid unsized media)
- ✅ Bundle < 50KB (tree shake, code split)
- ✅ Images optimized (WebP/AVIF, lazy load, responsive)
- ✅ Cache headers set (versioning, immutable assets)
- ✅ No memory leaks (remove listeners, clear timers)
- ✅ Virtual scroll for lists (1000+ items)
- ✅ React: memo, useMemo, useCallback
- ✅ Monitor performance (Web Vitals, user timing)

---

## Interview Tips

**When asked about Core Web Vitals:**
- Explain LCP, INP, CLS metrics and targets
- Discuss optimization strategies for each
- Know how to measure (PerformanceObserver API)

**When asked about optimization:**
- Start with profiling (find bottlenecks first)
- Discuss code splitting and lazy loading
- Mention caching strategies
- Explain virtualization for large lists

**When asked about memory leaks:**
- Discuss common patterns (listeners, circular refs)
- Know how to detect (DevTools heap snapshots)
- Discuss prevention best practices

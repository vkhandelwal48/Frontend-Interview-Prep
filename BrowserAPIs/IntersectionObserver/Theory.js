// IntersectionObserver API — Efficient Visibility Detection

// ─────────────────────────────────────────────
// What is IntersectionObserver?
// ─────────────────────────────────────────────
// IntersectionObserver is a browser API that efficiently detects when an element 
// enters or leaves the viewport (or a specified container).
// It runs asynchronously on the compositor thread, avoiding expensive synchronous 
// layout calculations (unlike getBoundingClientRect() polling).
// Perfect for: lazy loading, infinite scroll, analytics tracking, visibility-based play/pause.

// ─────────────────────────────────────────────
// Basic Syntax
// ─────────────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log(`${entry.target} is visible`);
      }
    });
  },
  {
    // Options
    root: null,           // viewport (null = window)
    rootMargin: '0px',    // expand/shrink detection area
    threshold: 0.5,       // 50% visibility triggers callback
  }
);

// Start observing
observer.observe(document.querySelector('.lazy-image'));

// Stop observing a specific element
observer.unobserve(element);

// Clear all observations
observer.disconnect();

// ─────────────────────────────────────────────
// IntersectionObserverEntry Properties
// ─────────────────────────────────────────────
// entry.target                — the element being observed
// entry.isIntersecting        — boolean: is it currently visible?
// entry.intersectionRatio     — 0 to 1: what percentage is visible
// entry.boundingClientRect    — the element's rect in viewport coords
// entry.intersectionRect      — the visible portion's rect
// entry.rootBounds            — the root container's rect (or viewport)
// entry.time                  — timestamp of observation

// ─────────────────────────────────────────────
// Options: threshold
// ─────────────────────────────────────────────
// threshold: 0        → callback fires as soon as 1px enters viewport
// threshold: 0.5      → callback fires when 50% is visible
// threshold: 1.0      → callback fires only when entire element is visible
// threshold: [0, 0.5, 1]  → callback fires at each milestone (multi-threshold)

const multiThreshold = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio === 0) console.log('Fully hidden');
    if (entry.intersectionRatio > 0 && entry.intersectionRatio < 1) console.log('Partially visible');
    if (entry.intersectionRatio === 1) console.log('Fully visible');
  });
}, { threshold: [0, 0.25, 0.5, 0.75, 1] });

// ─────────────────────────────────────────────
// Options: rootMargin
// ─────────────────────────────────────────────
// rootMargin allows you to expand or shrink the detection area BEFORE the callback fires.
// Like CSS margin: top right bottom left (or shorthand).

// Trigger 100px BEFORE element reaches viewport (for preload):
const preloadObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Image is 100px away from viewport, but we want to start loading now
      const img = entry.target;
      img.src = img.dataset.src; // start loading
    }
  });
}, { rootMargin: '100px' });

// Trigger 100px AFTER element enters viewport (for lazy analytics):
const analyticsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      trackViewEvent(entry.target.id);
    }
  });
}, { rootMargin: '100px 0px -100px 0px' }); // top right bottom left

// ─────────────────────────────────────────────
// Options: root
// ─────────────────────────────────────────────
// Observe visibility within a specific container (not just the viewport).
// root must be an ancestor of the observed element.

const scrollContainer = document.querySelector('.scrollable-div');
const containerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(`${entry.target} is visible in container`);
    }
  });
}, { root: scrollContainer, threshold: 0.5 });

containerObserver.observe(document.querySelector('.item-in-container'));

// ─────────────────────────────────────────────
// Use Case 1: Lazy Loading Images
// ─────────────────────────────────────────────
// <img data-src="image.jpg" src="placeholder.jpg" class="lazy-img">

const lazyImageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;        // Load the real image
      img.classList.add('loaded');       // Optional: fade-in effect
      observer.unobserve(img);           // Stop watching this image
    }
  });
}, { rootMargin: '50px' }); // Start loading 50px before it enters viewport

document.querySelectorAll('.lazy-img').forEach(img => {
  lazyImageObserver.observe(img);
});

// ─────────────────────────────────────────────
// Use Case 2: Infinite Scroll / Load More
// ─────────────────────────────────────────────
// Observe the "load more" sentinel element at the bottom of the list.
// When it becomes visible, fetch the next page.

const loadMoreObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('User scrolled near bottom, loading more items...');
      fetchNextPage();
      // Re-observe the new last element (or same logic for paginated load)
    }
  });
}, { rootMargin: '100px' }); // Trigger 100px before the end

const sentinel = document.querySelector('#load-more-sentinel');
loadMoreObserver.observe(sentinel);

async function fetchNextPage() {
  const newItems = await fetch('/api/items?page=2').then(r => r.json());
  newItems.forEach(item => {
    const el = document.createElement('div');
    el.textContent = item.name;
    document.querySelector('.items-list').appendChild(el);
  });
}

// ─────────────────────────────────────────────
// Use Case 3: Tracking Element Visibility for Analytics
// ─────────────────────────────────────────────
const analyticsIntersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
      // Element is >50% visible, log to analytics
      logEvent({
        element: entry.target.id,
        timeVisible: entry.time,
        ratio: entry.intersectionRatio,
      });
      // Optionally stop tracking once logged
      analyticsIntersectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-track]').forEach(el => {
  analyticsIntersectionObserver.observe(el);
});

// ─────────────────────────────────────────────
// Use Case 4: Pause/Resume Video or Animation
// ─────────────────────────────────────────────
const mediaObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.play();        // Resume video/animation
    } else {
      entry.target.pause();       // Pause when off-screen
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('video').forEach(video => {
  mediaObserver.observe(video);
});

// ─────────────────────────────────────────────
// Use Case 5: Highlight Navigation Items Based on Section Visibility
// ─────────────────────────────────────────────
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Highlight the corresponding nav item
      const navItem = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
      if (navItem) navItem.classList.add('active');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
  sectionObserver.observe(section);
});

// ─────────────────────────────────────────────
// Performance Considerations
// ─────────────────────────────────────────────
// ✅ FAST: IntersectionObserver uses requestIdleCallback internally
//          No layout thrashing, batched updates, runs on compositor thread
// ❌ SLOW: getBoundingClientRect() polling in scroll event handlers
//          Forces synchronous layout recalculation on every scroll

// DON'T do this:
// window.addEventListener('scroll', () => {
//   document.querySelectorAll('.item').forEach(item => {
//     const rect = item.getBoundingClientRect();
//     if (rect.top < window.innerHeight) {
//       // Load item
//     }
//   });
// });

// DO this:
// Use IntersectionObserver instead (as shown above)

// ─────────────────────────────────────────────
// Edge Cases & Gotchas
// ─────────────────────────────────────────────

// 1) Root Element Must Be an Ancestor
// ❌ This will fail silently (root is not an ancestor of target):
// const wrongObserver = new IntersectionObserver(callback, {
//   root: document.querySelector('.sidebar'),
// });
// wrongObserver.observe(document.querySelector('.main')); // Wrong!

// ✅ Correct: root is an ancestor of the element being observed
// const correctObserver = new IntersectionObserver(callback, {
//   root: document.querySelector('.container'),
// });
// correctObserver.observe(document.querySelector('.container .item'));

// 2) Threshold Must Be 0–1 (not percentage)
// ❌ Wrong:
// threshold: 50  // This is treated as 1 (fully visible)

// ✅ Correct:
// threshold: 0.5  // 50% visibility

// 3) Unobserve Before Removing from DOM
// When you remove an element from the DOM, unobserve it first to avoid memory leaks:
// ✅ Good:
// element.addEventListener('click', () => {
//   observer.unobserve(element);
//   element.remove();
// });

// ❌ Bad (observer may hold a reference and prevent GC):
// element.remove();

// 4) Multiple Observers on Same Elements
// You can (and should) use separate observers for different purposes:
const imageObserver = new IntersectionObserver(loadImage);
const analyticsObserver = new IntersectionObserver(trackAnalytics);

const element = document.querySelector('.card');
imageObserver.observe(element);
analyticsObserver.observe(element);

// 5) IntersectionObserver Fires Immediately on observe()
// If an element is already in the viewport when you call observe(),
// the callback fires immediately:
const observer = new IntersectionObserver((entries) => {
  console.log('Callback fired!');
});

const alreadyVisibleElement = document.querySelector('.visible');
observer.observe(alreadyVisibleElement); // Callback fires immediately if element is visible

// 6) Native Support (works in all modern browsers, IE 11 needs polyfill)
// Check support:
if ('IntersectionObserver' in window) {
  console.log('IntersectionObserver supported');
} else {
  console.log('Use a polyfill');
}

// ─────────────────────────────────────────────
// Interview Questions
// ─────────────────────────────────────────────

// Q: What is the difference between IntersectionObserver and getBoundingClientRect() polling?
// A: IntersectionObserver is asynchronous and efficient (runs on compositor thread).
//    getBoundingClientRect() polling is synchronous and causes layout thrashing on every scroll.
//    IntersectionObserver is always preferred for performance.

// Q: How do you load images only when they're 100px away from the viewport?
// A: Use rootMargin: '100px' to expand the detection area 100px beyond the viewport boundaries.

// Q: What happens if you observe an element that's already visible?
// A: The callback fires immediately on observe() call, in the next microtask batch.

// Q: Can you observe elements across multiple containers?
// A: Yes, each IntersectionObserver instance can observe multiple elements,
//    but all must be within the same root container (if specified).

// Q: How do you prevent memory leaks when elements are dynamically removed?
// A: Call observer.unobserve(element) before removing the element from the DOM.
//    Alternatively, use observer.disconnect() when the observer is no longer needed.

// Q: What values can threshold be?
// A: 0 to 1 (representing 0% to 100% visibility).
//    Can be a single number or an array of numbers for multi-step detection.

// Q: How is rootMargin different from CSS margin?
// A: rootMargin expands/shrinks the detection boundary BEFORE checking visibility.
//    It doesn't affect the element's layout or appearance—only when the callback fires.
//    Format: 'top right bottom left' (same as CSS margin).

// Q: What happens if root is not an ancestor of the target?
// A: The observer will silently treat it as if root: null (use viewport instead).
//    No error is thrown, but the observer won't work as intended.

// ─────────────────────────────────────────────
// Real-World Pattern: Smart Image Loading with Error Handling
// ─────────────────────────────────────────────
class LazyImageLoader {
  constructor(options = {}) {
    this.loadedImages = new WeakSet();
    this.failedImages = new WeakSet();
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        rootMargin: options.rootMargin || '50px',
        threshold: options.threshold || 0,
      }
    );
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.loadedImages.has(entry.target)) {
        this.loadImage(entry.target);
      }
    });
  }

  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;

    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = src;
      img.classList.add('loaded');
      this.loadedImages.add(img);
      this.observer.unobserve(img);
    };

    tempImg.onerror = () => {
      img.classList.add('error');
      this.failedImages.add(img);
    };

    tempImg.src = src;
  }

  observe(selector) {
    document.querySelectorAll(selector).forEach(img => {
      this.observer.observe(img);
    });
  }

  disconnect() {
    this.observer.disconnect();
  }
}

// Usage:
// const loader = new LazyImageLoader({ rootMargin: '100px' });
// loader.observe('.lazy-img');

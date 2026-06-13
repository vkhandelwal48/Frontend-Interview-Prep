const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
    entries.forEach((entry) => {
        console.log(`Type: ${entry.entryType}, Name: ${entry.name}, Duration: ${entry.duration}`);
    });
    if (observer.droppedEntriesCount > 0) {
        console.warn(`Dropped ${observer.droppedEntriesCount} entries`);
    }
});

observer.observe({ 
  entryTypes: ['paint', 'navigation', 'resource', 'element', 'event', 'largest-contentful-paint', 'layout-shift'],
  buffered: true 
});

// If buffered is set to true, the observer will also receive entries that were recorded before the observer was created.
// There also a storage limit for the number of entries that can be buffered. If the limit is exceeded, the oldest entries
// will be dropped. The default limit is 10,000 entries, but it can be increased by setting the performanceObserver.bufferedEntryLimit property.

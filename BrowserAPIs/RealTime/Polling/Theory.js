// Polling — Repeated Client-Initiated Requests for Real-Time Data

// ─────────────────────────────────────────────
// What is Polling?
// ─────────────────────────────────────────────
// Polling is the simplest technique for getting near-real-time data from a server.
// The client repeatedly sends HTTP requests on a fixed interval to check for updates.
// Every request is independent — there is no persistent connection.

// ─────────────────────────────────────────────
// Short Polling
// ─────────────────────────────────────────────
// The client sends a request every N milliseconds regardless of whether new data exists.
// The server responds immediately (with data or an empty/unchanged response).

// Basic implementation:
function startShortPolling(url, intervalMs) {
  setInterval(async () => {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Polled data:", data);
  }, intervalMs);
}

// Pros:
//  ✅ Simple to implement — just fetch() inside setInterval
//  ✅ Works with any HTTP server, no special server support needed
//  ✅ Stateless — each request is independent
//  ✅ Easy to debug with regular browser DevTools network tab

// Cons:
//  ❌ Wastes bandwidth — sends requests even when nothing changed
//  ❌ High server load at scale (many clients × many requests per minute)
//  ❌ Latency = up to one full interval (e.g. 5 s interval → up to 5 s delay)
//  ❌ Not truly real-time

// When to use:
//  - Simple dashboards, infrequent updates (e.g. every 30 s)
//  - When you can't use WebSockets or SSE (strict firewalls, legacy infra)
//  - Quick prototypes

// ─────────────────────────────────────────────
// Long Polling
// ─────────────────────────────────────────────
// A smarter variant: the client sends a request and the SERVER holds it open
// until new data is available (or a timeout occurs).
// Once the response arrives, the client immediately sends the next request.
// This mimics a push model while still using plain HTTP.

// Client-side implementation:
async function longPoll(url) {
  while (true) {
    try {
      const res = await fetch(url);          // server holds until data or timeout
      const data = await res.json();
      console.log("Long-poll data:", data);
      // immediately re-issue the request
    } catch (err) {
      console.error("Long-poll error:", err);
      await new Promise(r => setTimeout(r, 2000)); // back-off before retry
    }
  }
}

// Server-side pattern (Node.js / Express pseudo-code):
//
// const waitingClients = [];
//
// app.get('/long-poll', (req, res) => {
//   waitingClients.push(res);       // hold the response object
//   req.on('close', () => {
//     waitingClients.splice(waitingClients.indexOf(res), 1); // cleanup on disconnect
//   });
// });
//
// function pushUpdate(data) {
//   while (waitingClients.length) {
//     const res = waitingClients.pop();
//     res.json(data);               // resolve all held responses
//   }
// }

// Pros:
//  ✅ Lower latency than short polling — event is pushed as soon as it occurs
//  ✅ Fewer wasted requests (no response until data is ready)
//  ✅ Works through most firewalls/proxies (plain HTTP)

// Cons:
//  ❌ Server must hold open connections — consumes server threads/memory
//  ❌ More complex server logic than short polling
//  ❌ Each new event requires a full request/response round-trip overhead
//  ❌ Difficult to scale horizontally (need shared state across servers)

// ─────────────────────────────────────────────
// Short Polling vs Long Polling vs SSE vs WebSockets
// ─────────────────────────────────────────────
//
// Technique        | Direction    | Connection  | Latency   | Complexity
// ─────────────────|─────────────|─────────────|───────────|───────────
// Short Polling    | client→srv  | new each    | interval  | very low
// Long Polling     | client→srv  | held open   | ~instant  | medium
// SSE              | srv→client  | persistent  | ~instant  | low
// WebSockets       | bidirectional| persistent | ~instant  | medium-high

// ─────────────────────────────────────────────
// Interview Questions
// ─────────────────────────────────────────────

// Q: What is the difference between short polling and long polling?
// A: Short polling sends requests on a fixed timer and the server responds immediately.
//    Long polling holds the request open on the server until data is ready,
//    reducing wasted requests and latency.

// Q: When would you choose polling over WebSockets?
// A: When updates are infrequent (e.g. every 30+ seconds), when the infrastructure
//    does not support persistent connections, or when simplicity outweighs efficiency.

// Q: What are the risks of a very short polling interval?
// A: Excessive HTTP overhead — each request carries full headers, a TCP handshake
//    cost, and server processing. At scale this can overwhelm both the server and
//    the client's battery/CPU.

// Q: How do you prevent a polling loop from running after a component unmounts (React)?
// A: Store the interval ID and clear it in the cleanup function of useEffect:
//
//    useEffect(() => {
//      const id = setInterval(fetchData, 5000);
//      return () => clearInterval(id);
//    }, []);

// SSE — Server-Sent Events

// ─────────────────────────────────────────────
// What is SSE?
// ─────────────────────────────────────────────
// SSE is a browser API (EventSource) that opens a persistent, one-way HTTP connection
// from the SERVER to the CLIENT.
// Once open, the server can push an unlimited stream of text events at any time.
// The client never sends data back over this connection — it is unidirectional.

// Contrast with WebSockets:
//  SSE  → server pushes only, over HTTP/1.1 or HTTP/2, text only
//  WS   → bidirectional, custom protocol (ws://), binary or text

// ─────────────────────────────────────────────
// The EventSource API (Browser / Client Side)
// ─────────────────────────────────────────────
const evtSource = new EventSource("/stream"); // opens persistent GET request

// Default message event:
evtSource.onmessage = (event) => {
  console.log("Received:", event.data); // always a string
};

// Named custom events (server sends: event: stockUpdate):
evtSource.addEventListener("stockUpdate", (event) => {
  const payload = JSON.parse(event.data);
  console.log("Stock update:", payload);
});

// Error / reconnect handling:
evtSource.onerror = (err) => {
  console.error("SSE error:", err);
  // Browser automatically reconnects after a short delay by default
};

// Close the connection:
evtSource.close();

// ─────────────────────────────────────────────
// SSE Wire Format (what the server sends)
// ─────────────────────────────────────────────
// Content-Type MUST be "text/event-stream"
// Each field is on its own line, terminated by "\n\n" to end the event block.
//
// Simple message:
//   data: Hello world\n\n
//
// Named event:
//   event: stockUpdate\n
//   data: {"ticker":"AAPL","price":192.5}\n\n
//
// With an ID (used for reconnect — Last-Event-ID header):
//   id: 42\n
//   data: some payload\n\n
//
// Comment / heartbeat (keeps connection alive through proxies):
//   : ping\n\n
//
// Retry hint (milliseconds):
//   retry: 3000\n\n

// ─────────────────────────────────────────────
// Server-Side Implementation (Node.js / Express)
// ─────────────────────────────────────────────
//
// app.get('/stream', (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   res.flushHeaders(); // flush to open the stream
//
//   let id = 0;
//   const timer = setInterval(() => {
//     id++;
//     const payload = JSON.stringify({ time: Date.now() });
//     res.write(`id: ${id}\n`);
//     res.write(`event: tick\n`);
//     res.write(`data: ${payload}\n\n`);
//   }, 1000);
//
//   req.on('close', () => {
//     clearInterval(timer);   // client disconnected — stop sending
//     res.end();
//   });
// });

// ─────────────────────────────────────────────
// Automatic Reconnection
// ─────────────────────────────────────────────
// If the connection drops, the browser automatically reconnects.
// It sends the "Last-Event-ID" header so the server can resume from where it left off.
// The server controls the retry delay with the "retry:" field (default ~3 s).
// To stop reconnection intentionally: send HTTP 204 No Content.

// ─────────────────────────────────────────────
// SSE vs Polling vs WebSockets — Quick Comparison
// ─────────────────────────────────────────────
//
// Feature              | SSE              | Short Polling     | WebSockets
// ─────────────────────|─────────────────|───────────────────|──────────────
// Direction            | server→client   | client→server     | bidirectional
// Protocol             | HTTP            | HTTP              | WS (upgrade)
// Connection           | persistent      | new each time     | persistent
// Auto-reconnect       | ✅ built-in     | manual            | manual
// Binary support       | ❌ text only    | via fetch         | ✅
// HTTP/2 multiplexing  | ✅              | limited           | separate conn
// Proxy / firewall     | ✅ friendly     | ✅ friendly       | sometimes blocked
// Server complexity    | low             | very low          | medium-high

// ─────────────────────────────────────────────
// CORS with SSE
// ─────────────────────────────────────────────
// EventSource follows normal CORS rules.
// For cross-origin streams the server must return:
//   Access-Control-Allow-Origin: <origin>
//
// To send cookies with the request (for auth):
const authSource = new EventSource("/stream", { withCredentials: true });
// Server must then respond with Access-Control-Allow-Credentials: true
// and a specific (not wildcard) origin.

// ─────────────────────────────────────────────
// React Usage Pattern
// ─────────────────────────────────────────────
// import { useEffect, useState } from 'react';
//
// function LiveFeed() {
//   const [messages, setMessages] = useState([]);
//
//   useEffect(() => {
//     const source = new EventSource('/stream');
//
//     source.addEventListener('update', (e) => {
//       setMessages(prev => [...prev, JSON.parse(e.data)]);
//     });
//
//     source.onerror = () => source.close();
//
//     return () => source.close(); // cleanup on unmount
//   }, []);
//
//   return <ul>{messages.map((m, i) => <li key={i}>{m.text}</li>)}</ul>;
// }

// ─────────────────────────────────────────────
// Good Use Cases for SSE
// ─────────────────────────────────────────────
//  ✅ Live news / activity feeds
//  ✅ Stock price / crypto tickers
//  ✅ Build / CI pipeline progress logs
//  ✅ Notification systems
//  ✅ Streaming LLM responses (ChatGPT-style token-by-token output)
//  ❌ Chat (needs bidirectional) — use WebSockets instead
//  ❌ Binary data streams (audio/video) — use WebSockets / WebRTC

// ─────────────────────────────────────────────
// Interview Questions
// ─────────────────────────────────────────────

// Q: What is the difference between SSE and WebSockets?
// A: SSE is unidirectional (server → client only) and runs over plain HTTP.
//    WebSockets are bidirectional and use the WS protocol after an HTTP upgrade.
//    SSE is simpler for push-only scenarios and benefits from HTTP/2 multiplexing.

// Q: How does SSE handle reconnection?
// A: The browser automatically reconnects when the connection drops.
//    It sends the Last-Event-ID header so the server can resume the stream.
//    The server can control retry delay with the "retry:" field.

// Q: What Content-Type header is required for SSE?
// A: text/event-stream

// Q: Can SSE send binary data?
// A: No. SSE is text-only. For binary data use WebSockets or the Fetch streaming API.

// Q: How does SSE compare to long polling?
// A: SSE keeps one persistent connection open and pushes many events over it.
//    Long polling opens a new request for every single event, adding overhead.
//    SSE is more efficient and has a native browser API with auto-reconnect.

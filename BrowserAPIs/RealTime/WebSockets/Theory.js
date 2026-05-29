// WebSockets — Full-Duplex Persistent Communication

// ─────────────────────────────────────────────
// What is a WebSocket?
// ─────────────────────────────────────────────
// WebSocket is a protocol that provides a persistent, full-duplex (bidirectional)
// communication channel between a browser and a server over a single TCP connection.
// Unlike HTTP, once the connection is open, either side can send messages at any time
// without a request/response cycle.

// Protocol: ws:// (plain) or wss:// (TLS-encrypted, required in production)
// The connection begins as a normal HTTP request and is "upgraded" to WebSocket.

// ─────────────────────────────────────────────
// The WebSocket Handshake
// ─────────────────────────────────────────────
// 1. Client sends an HTTP GET with special upgrade headers:
//      GET /chat HTTP/1.1
//      Upgrade: websocket
//      Connection: Upgrade
//      Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
//      Sec-WebSocket-Version: 13
//
// 2. Server responds with HTTP 101 Switching Protocols:
//      HTTP/1.1 101 Switching Protocols
//      Upgrade: websocket
//      Connection: Upgrade
//      Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
//
// 3. The TCP connection is now a WebSocket tunnel — HTTP is no longer used on it.

// ─────────────────────────────────────────────
// Browser WebSocket API
// ─────────────────────────────────────────────
const socket = new WebSocket("wss://example.com/chat");

// Connection lifecycle events:
socket.onopen = () => {
  console.log("Connected");
  socket.send("Hello server!"); // send a text message
};

socket.onmessage = (event) => {
  console.log("Received:", event.data); // string or Blob/ArrayBuffer
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

socket.onclose = (event) => {
  // event.code — numeric close code (1000 = normal, 1006 = abnormal, etc.)
  // event.reason — human-readable reason
  // event.wasClean — boolean
  console.log(`Closed: ${event.code} ${event.reason}`);
};

// ─────────────────────────────────────────────
// Sending Data
// ─────────────────────────────────────────────
// Text (string):
socket.send("plain text message");

// JSON (serialize manually):
socket.send(JSON.stringify({ type: "chat", payload: "Hi!" }));

// Binary (ArrayBuffer):
const buffer = new ArrayBuffer(8);
socket.send(buffer);

// Binary (Blob):
const blob = new Blob(["data"]);
socket.send(blob);

// Control the type of incoming binary data:
socket.binaryType = "arraybuffer"; // default is "blob"

// ─────────────────────────────────────────────
// Closing the Connection
// ─────────────────────────────────────────────
socket.close();            // close with default code 1000 (Normal Closure)
socket.close(1000, "Done"); // explicit code + reason

// Common close codes:
//  1000 — Normal closure
//  1001 — Endpoint going away (e.g. page unload)
//  1006 — Abnormal closure (no close frame received)
//  1011 — Server internal error

// ─────────────────────────────────────────────
// WebSocket readyState
// ─────────────────────────────────────────────
//  WebSocket.CONNECTING  = 0  — handshake in progress
//  WebSocket.OPEN        = 1  — connection is open, can send/receive
//  WebSocket.CLOSING     = 2  — close handshake in progress
//  WebSocket.CLOSED      = 3  — connection is closed

if (socket.readyState === WebSocket.OPEN) {
  socket.send("safe to send");
}

// ─────────────────────────────────────────────
// Server-Side (Node.js with "ws" library)
// ─────────────────────────────────────────────
//
// import { WebSocketServer } from 'ws';
// const wss = new WebSocketServer({ port: 8080 });
//
// wss.on('connection', (ws, req) => {
//   console.log('Client connected');
//
//   ws.on('message', (message) => {
//     console.log('Received:', message.toString());
//     ws.send(`Echo: ${message}`); // reply to sender
//   });
//
//   ws.on('close', () => console.log('Client disconnected'));
// });
//
// // Broadcast to all connected clients:
// function broadcast(data) {
//   wss.clients.forEach(client => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(data);
//     }
//   });
// }

// ─────────────────────────────────────────────
// React Usage Pattern
// ─────────────────────────────────────────────
// import { useEffect, useRef, useState } from 'react';
//
// function Chat() {
//   const ws = useRef(null);
//   const [messages, setMessages] = useState([]);
//
//   useEffect(() => {
//     ws.current = new WebSocket('wss://example.com/chat');
//
//     ws.current.onmessage = (e) => {
//       setMessages(prev => [...prev, JSON.parse(e.data)]);
//     };
//
//     return () => ws.current.close(); // cleanup on unmount
//   }, []);
//
//   function sendMessage(text) {
//     if (ws.current?.readyState === WebSocket.OPEN) {
//       ws.current.send(JSON.stringify({ text }));
//     }
//   }
//   // ...
// }

// ─────────────────────────────────────────────
// Reconnection Strategy (manual — WS has no built-in auto-reconnect)
// ─────────────────────────────────────────────
// function connect() {
//   const ws = new WebSocket('wss://example.com');
//
//   ws.onclose = (event) => {
//     if (!event.wasClean) {
//       setTimeout(connect, 3000); // exponential back-off in production
//     }
//   };
//
//   return ws;
// }

// Contrast with SSE: SSE reconnects automatically; WebSocket reconnection is manual.

// ─────────────────────────────────────────────
// Heartbeat / Ping-Pong
// ─────────────────────────────────────────────
// WebSocket protocol has built-in PING/PONG control frames (handled by the server lib).
// At the application level you often send periodic "ping" messages to keep connections
// alive through load balancers / proxies that close idle connections.
//
// const heartbeat = setInterval(() => {
//   if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'ping' }));
// }, 30_000);

// ─────────────────────────────────────────────
// Security Considerations
// ─────────────────────────────────────────────
//  1. Always use wss:// (TLS) in production — ws:// is unencrypted.
//  2. Authenticate via a token in the initial HTTP upgrade request
//     (query param or cookie) — WebSocket doesn't have custom request headers
//     after the handshake.
//  3. Validate and sanitize every incoming message — DoS / injection risk.
//  4. Enforce an origin check on the server (check the "Origin" header in the
//     handshake request) to prevent cross-site WebSocket hijacking (CSWSH).
//  5. Rate-limit messages from individual clients.

// ─────────────────────────────────────────────
// WebSockets vs SSE vs Polling
// ─────────────────────────────────────────────
//
// Feature              | WebSockets       | SSE              | Short Polling
// ─────────────────────|─────────────────|─────────────────|──────────────
// Direction            | bidirectional   | server→client   | client→server
// Protocol             | WS (upgrade)    | HTTP            | HTTP
// Binary support       | ✅              | ❌ text only    | via fetch
// Auto-reconnect       | ❌ manual       | ✅ built-in     | N/A
// Complexity           | medium          | low             | very low
// Use case             | chat, gaming    | feeds, notifs   | infrequent polls

// ─────────────────────────────────────────────
// Good Use Cases for WebSockets
// ─────────────────────────────────────────────
//  ✅ Real-time chat / messaging apps
//  ✅ Multiplayer games (low-latency state sync)
//  ✅ Collaborative editing (Google Docs style)
//  ✅ Live trading / financial platforms
//  ✅ IoT dashboards with bidirectional control
//  ❌ Simple push notifications — SSE is simpler and sufficient

// ─────────────────────────────────────────────
// Popular Libraries
// ─────────────────────────────────────────────
//  ws          — lightweight Node.js WebSocket library (server + client)
//  Socket.IO   — higher-level abstraction over WebSockets with auto-reconnect,
//                rooms, namespaces, and a fallback to long polling
//  sockjs      — similar fallback strategy to Socket.IO

// ─────────────────────────────────────────────
// Interview Questions
// ─────────────────────────────────────────────

// Q: How is a WebSocket connection established?
// A: The browser sends an HTTP GET with "Upgrade: websocket" and related headers.
//    The server responds with HTTP 101 Switching Protocols, and the TCP connection
//    is reused as a WebSocket tunnel.

// Q: What is the difference between ws:// and wss://?
// A: wss:// uses TLS encryption (like HTTPS). ws:// is unencrypted.
//    Always use wss:// in production.

// Q: Why doesn't WebSocket auto-reconnect like SSE does?
// A: WebSocket has no built-in reconnection in the browser API. You must implement
//    manual reconnect logic (e.g. in the onclose handler with exponential back-off).

// Q: How do you authenticate a WebSocket connection?
// A: Pass a token in the URL query string (wss://example.com?token=xxx) or in a
//    cookie during the initial HTTP upgrade handshake — you cannot set custom headers
//    after the WS connection is open.

// Q: What is cross-site WebSocket hijacking (CSWSH) and how do you prevent it?
// A: CSWSH occurs when a malicious page opens a WebSocket to your server using the
//    victim's session cookies. Prevent it by validating the "Origin" header in the
//    handshake — reject connections from origins you don't trust.

// Q: When would you use Socket.IO instead of raw WebSockets?
// A: When you need features like automatic reconnection, rooms/namespaces, event
//    multiplexing, or fallback for environments that block WebSocket connections.

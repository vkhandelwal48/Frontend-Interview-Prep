// CORS — Cross-Origin Resource Sharing

// What is CORS?
// CORS is a browser security mechanism that controls how web pages can request
// resources from a different origin (domain, protocol, or port) than the one
// that served the page.
// It is enforced by the BROWSER — not the server, not Node.js.
// Server-to-server requests are never blocked by CORS.

// What is an "Origin"?
// Origin = protocol + domain + port
// https://example.com:443  →  protocol: https, domain: example.com, port: 443

// Same Origin:    http://site.com/page   →  http://site.com/api       ✅
// Cross Origin:   http://site.com        →  http://api.site.com       ❌ (different subdomain)
// Cross Origin:   http://site.com        →  https://site.com          ❌ (different protocol)
// Cross Origin:   http://site.com:3000   →  http://site.com:5000      ❌ (different port)

// Why does CORS exist?
// Same Origin Policy (SOP) is the default browser security rule:
// a script on origin A cannot read responses from origin B.
// CORS is the mechanism that allows servers to RELAX this restriction selectively.

// How CORS works — the HTTP headers

// Server response headers:
// Access-Control-Allow-Origin: http://localhost:5173   → which origins are allowed
// Access-Control-Allow-Methods: GET, POST, PUT         → which HTTP methods
// Access-Control-Allow-Headers: Content-Type, Authorization  → which request headers
// Access-Control-Allow-Credentials: true               → allow cookies/auth headers
// Access-Control-Max-Age: 86400                        → cache preflight for 24h

// Simple Requests vs Preflight Requests

// Simple Request — browser sends the actual request directly, no preflight.
// Conditions: method is GET/POST/HEAD AND headers are only basic ones (no custom headers)
// AND Content-Type is only: application/x-www-form-urlencoded, multipart/form-data, text/plain

// Preflight Request — browser sends an OPTIONS request FIRST to check if the
// actual request is allowed, before sending the real request.
// Triggered when:
// - Method is PUT, DELETE, PATCH
// - Custom headers are used (e.g., Authorization, Content-Type: application/json)
// - Request includes credentials

// Preflight flow:
// 1) Browser sends OPTIONS /api/user
//    Origin: http://localhost:5173
//    Access-Control-Request-Method: POST
//    Access-Control-Request-Headers: Content-Type
//
// 2) Server responds:
//    Access-Control-Allow-Origin: http://localhost:5173
//    Access-Control-Allow-Methods: GET, POST
//    Access-Control-Allow-Headers: Content-Type
//    Status: 204 No Content
//
// 3) Browser sends the actual POST request

// In this demo — why POST /api/user triggers a preflight:
// Because Content-Type: application/json is a non-simple header.
// GET /api/data is a simple request — no preflight.

// Setting up CORS in Express

// Option 1: Allow a specific origin
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST'],
// }));

// Option 2: Allow multiple origins dynamically
// const allowedOrigins = ['http://localhost:5173', 'https://myapp.com'];
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));

// Option 3: Allow all origins (development only — NEVER in production)
// app.use(cors()); // Access-Control-Allow-Origin: *

// Credentials and CORS
// If the request includes cookies or Authorization headers:
// - Server must set: Access-Control-Allow-Credentials: true
// - Server CANNOT use wildcard: Access-Control-Allow-Origin: * (must be specific origin)
// - Client must set: credentials: 'include' in fetch options

// fetch('http://localhost:5000/api/data', {
//   credentials: 'include', // sends cookies with the request
// });

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));

// Common CORS Errors

// 1) "No 'Access-Control-Allow-Origin' header is present"
//    → Server is not sending CORS headers. Fix: add cors() middleware.

// 2) "The value of 'Access-Control-Allow-Origin' header must not be the wildcard '*'
//    when the request's credentials mode is 'include'"
//    → Cannot use * when credentials: 'include'. Fix: specify exact origin.

// 3) Preflight returns 404 or 405
//    → Server is not handling OPTIONS requests. Fix: ensure cors() middleware
//    is added BEFORE route definitions, or add explicit OPTIONS handler.

// 4) CORS error on localhost but works in production
//    → Check that allowed origins list includes the exact localhost URL with port.

// CORS vs Same Origin Policy vs CSRF

// Same Origin Policy  → browser blocks JS from READING cross-origin responses
// CORS               → server opts-in to allow specific cross-origin reads
// CSRF               → attacker tricks browser into SENDING requests (not reading)
//                      CORS does NOT prevent CSRF — use CSRF tokens or SameSite cookies

// Key interview points:
// 1) CORS is enforced by the BROWSER — Postman and curl are never affected
// 2) Preflight is triggered by non-simple requests (PUT/DELETE, custom headers, JSON body)
// 3) Wildcard '*' cannot be used with credentials
// 4) CORS is about READING responses, not blocking requests from being sent
// 5) Server-side requests (Node → Node) are never subject to CORS

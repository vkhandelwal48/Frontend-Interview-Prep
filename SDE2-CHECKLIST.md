# SDE-2 Frontend Interview Prep — Topic Checklist Matrix

**Legend:** ✅ Strong | ⚠️ Partial | ❌ Missing | 🎯 High Priority

---

## 1. JavaScript Fundamentals & Advanced

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| Event Loop & Concurrency | ✅ | macrotask/microtask, async model covered | 🎯 |
| Promises & Async/Await | ✅ | Promise methods, concurrency covered | 🎯 |
| Hoisting & Scope | ✅ | var/let/const, TDZ explained | 🎯 |
| Prototype & Inheritance | ✅ | __proto__ vs prototype, chain | 🎯 |
| Closures | ✅ | Encapsulation, data privacy | 🎯 |
| `this` Binding | ✅ | Context in different scenarios | 🎯 |
| Call/Apply/Bind | ✅ | Polyfills included | 🎯 |
| Generators & Iterators | ✅ | Generator functions, yield | 🎯 |
| Currying & Higher-Order Functions | ✅ | Functional programming patterns | ⚠️ |
| Debounce & Throttle | ✅ | Polyfills with explanations | 🎯 |
| Polyfills (map, filter, reduce, etc.) | ✅ | Core array/function methods | 🎯 |
| Object/Array Operations | ✅ | Sorting, flattening, cloning | 🎯 |
| Regular Expressions | ❌ | Pattern matching, groups, flags | 🎯 |
| Symbols & BigInt | ❌ | Modern JS primitives | - |
| Proxy & Reflect | ✅ | Metaprogramming, validation, interceptors covered | - |

---

## 2. HTML & Accessibility

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| Semantic HTML | ⚠️ | Basic coverage in theory | 🎯 |
| Accessibility (a11y) | ❌ | ARIA roles, landmarks, keyboard nav | 🎯 |
| Forms & Input Validation | ⚠️ | Theory incomplete, no practical | 🎯 |
| Meta Tags & SEO | ⚠️ | async/defer, preload covered; deep SEO missing | ⚠️ |
| Web Components | ❌ | Custom elements, shadow DOM | - |
| Canvas & SVG | ⚠️ | Theory mentioned; no deep dives | ⚠️ |
| Performance: async/defer/preload | ✅ | Comprehensive coverage | 🎯 |

---

## 3. CSS & Layout

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| Box Model & Positioning | ✅ | All positioning modes covered | 🎯 |
| Flexbox | ✅ | All properties, properties list | 🎯 |
| Grid | ✅ | Basics covered; advanced missing | 🎯 |
| Responsive Design | ✅ | Mobile-first strategy practical added in CssPrep/Questions/responsive-strategy | 🎯 |
| CSS Selectors & Specificity | ✅ | All selector types covered | 🎯 |
| Cascade & Inheritance | ✅ | Specificity + inheritance practical added in CssPrep/Questions/cascade-specificity | 🎯 |
| Transforms & Transitions | ✅ | Basic demos present | 🎯 |
| Animations | ✅ | Keyframes + transitions practical added in CssPrep/Questions/animations-practicals | ⚠️ |
| CSS Preprocessors (SASS/SCSS) | ✅ | SASS vs SCSS explained | ⚠️ |
| Container Queries | ✅ | Practical added in CssPrep/Questions/container-queries | - |
| CSS-in-JS | ✅ | Dedicated notes and interview points added in CssPrep/CSS-in-JS/Theory.txt | - |
| Reset vs Normalize | ✅ | Comparison provided | ⚠️ |
| BEM & Naming Conventions | ✅ | BEM practical added in CssPrep/Questions/bem-naming | 🎯 |

---

## 4. Browser APIs (Core)

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| DOM Manipulation | ⚠️ | Theory light; practical in React context | 🎯 |
| Event Handling | ✅ | Event loop, delegation, bubbling, preventDefault/propagation practicals covered | 🎯 |
| localStorage & sessionStorage | ✅ | Comparison provided | 🎯 |
| Cookies | ⚠️ | SameSite/Secure coverage sparse | 🎯 |
| Fetch API | ✅ | Basic coverage; error handling covered | 🎯 |
| XMLHttpRequest | ⚠️ | Legacy; light coverage | ⚠️ |
| CORS | ✅ | Preflight, credentials, headers comprehensive | 🎯 |
| IntersectionObserver | ✅ | Lazy loading, infinite scroll, analytics | 🎯 |
| MutationObserver | ✅ | DOM change detection covered | 🎯 |
| ResizeObserver | ✅ | Element size tracking covered | - |
| PerformanceObserver | ✅ | Core Web Vitals, metrics, buffered entries, dropped count tracking | 🎯 |
| requestAnimationFrame | ⚠️ | Not explicitly covered | 🎯 |
| Service Worker | ⚠️ | Theory covered (offline, caching, push); practical pending | 🎯 |
| Web Worker | ⚠️ | Theory covered (background threads, messaging); practical pending | 🎯 |
| BroadcastChannel | ✅ | Practical demo added in BrowserAPIs/BroadcastChannel (cross-tab messaging) | - |
| History API | ✅ | Practical demo added in BrowserAPIs/HistoryAPI (pushState/replaceState/popstate) | ⚠️ |
| postMessage | ✅ | Parent-child window messaging practical added in BrowserAPIs/postMessage | ⚠️ |
| IndexedDB | ✅ | CRUD-style practical added in BrowserAPIs/IndexedDB | ⚠️ |
| Cache API | ✅ | Request/Response caching practical added in BrowserAPIs/CacheAPI | 🎯 |

---

## 5. Real-Time Communication

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| Short Polling | ✅ | Theory + tradeoffs explained | 🎯 |
| Long Polling | ✅ | Server implementation pattern covered | 🎯 |
| Server-Sent Events (SSE) | ✅ | Comprehensive; reconnection logic | 🎯 |
| WebSockets | ✅ | Full protocol, handshake, security | 🎯 |
| Comparison Matrix | ✅ | SSE vs Polling vs WS | 🎯 |

---

## 6. TypeScript

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| Basic Types | ❌ | No TypeScript prep folder | 🎯 |
| Generics | ❌ | Generic constraints, inference | 🎯 |
| Union & Intersection Types | ❌ | Advanced type composition | 🎯 |
| Type Guards & Narrowing | ❌ | Type predicates, typeof, instanceof | 🎯 |
| Utility Types | ❌ | Partial, Pick, Record, etc. | 🎯 |
| Conditional Types | ❌ | Mapped types, extends keyword | 🎯 |
| Module System | ❌ | Import/export, declaration files | 🎯 |
| Decorators | ❌ | Metadata, class decorators | - |
| TSConfig Best Practices | ❌ | Compiler options, strict mode | 🎯 |
| TypeScript with React | ❌ | Component typing, hooks | 🎯 |

---

## 7. Testing & Quality

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| Unit Testing (Jest) | ❌ | No test setup, mocking patterns | 🎯 |
| Integration Testing | ❌ | Testing component interactions | 🎯 |
| E2E Testing (Cypress/Playwright) | ❌ | User flow testing | 🎯 |
| Mocking & Fixtures | ❌ | jest.mock, MSW patterns | 🎯 |
| Test Coverage | ❌ | Coverage metrics, thresholds | 🎯 |
| Testing Best Practices | ❌ | AAA pattern, test isolation | 🎯 |
| TDD Workflow | ❌ | Red-green-refactor cycle | 🎯 |
| Snapshot Testing | ❌ | Pros/cons, best practices | ⚠️ |

---

## 8. Performance Optimization

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| Critical Rendering Path | ✅ | Theory + workflow, stages, optimization | 🎯 |
| Core Web Vitals (LCP, FID, CLS) | ✅ | LCP optimization, INP targets, CLS prevention, measurement | 🎯 |
| Bundle Analysis & Tree Shaking | ✅ | Webpack analyzer, Vite visualizer, duplicate detection | 🎯 |
| Code Splitting | ✅ | Route-based, component-based, magic comments | 🎯 |
| Lazy Loading & Dynamic Import | ✅ | Image lazy loading, component splitting, prefetch/preload | 🎯 |
| Image Optimization | ✅ | WebP/AVIF formats, responsive images, srcset, lazy load | 🎯 |
| Memory Leaks Detection | ✅ | Common patterns, profiling, DevTools heap snapshots | 🎯 |
| Rendering Performance | ✅ | Layout thrashing, React memoization, useCallback patterns | 🎯 |
| Caching Strategies | ✅ | HTTP caching, Service Worker caching, versioning | 🎯 |
| Resource Hints (preload/prefetch/preconnect) | ✅ | Comprehensive coverage | 🎯 |
| Virtualization | ✅ | Virtual scrolling, react-window, large list handling | 🎯 |

---

## 9. Security

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| CORS | ✅ | Comprehensive coverage | 🎯 |
| XSS Prevention | ✅ | Input sanitization, CSP, DOMPurify, React security covered | 🎯 |
| CSRF Protection | ✅ | CSRF tokens, SameSite cookies, custom headers, full patterns | 🎯 |
| Content Security Policy (CSP) | ✅ | Headers, directives, frame-ancestors, comprehensive examples | 🎯 |
| Clickjacking Prevention | ✅ | X-Frame-Options, CSP frame-ancestors, attack patterns | 🎯 |
| Token Storage Trade-offs | ✅ | localStorage vs httpOnly cookies vs sessionStorage comparison | 🎯 |
| HTTPS & TLS | ✅ | TLS handshake, cipher suites, HSTS headers, configuration | 🎯 |
| Dependency Vulnerabilities | ✅ | npm audit, Snyk integration, vulnerability management | 🎯 |
| Authentication Patterns | ✅ | JWT, OAuth 2.0, session-based, Passport.js examples | 🎯 |
| Authorization & RBAC | ✅ | Role-based access, ABAC, middleware patterns, database design | 🎯 |

---

## 10. System Design (Frontend)

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| Autocomplete/Typeahead | ✅ | Full design walkthrough | 🎯 |
| Infinite Scroll | ✅ | Intersection observer pattern | 🎯 |
| Real-Time Chat | ✅ | WebSocket architecture, typing indicator | 🎯 |
| Notification System | ✅ | Partial coverage | 🎯 |
| File Uploader | ✅ | Progress tracking | 🎯 |
| Collaborative Editor | ✅ | Framework provided | 🎯 |
| Video Streaming UI | ✅ | Architecture sketch | 🎯 |
| Frontend Monitoring | ✅ | Error tracking, logging | 🎯 |
| Micro-Frontend Architecture | ✅ | Design patterns | ⚠️ |
| Rate Limiter | ✅ | Client-side throttling | 🎯 |
| Design Framework | ✅ | Structured approach provided | 🎯 |

---

## 11. Architecture & Build Tools

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| Module Bundling (Webpack) | ✅ | Loaders, plugins, code splitting, tree shaking comprehensive | 🎯 |
| Build Tools (Vite/Webpack/Rollup) | ✅ | Full comparison, config examples, dev/prod modes | 🎯 |
| Monorepo Basics | ✅ | pnpm/yarn/npm workspaces, structure, benefits | 🎯 |
| Package Management (npm/yarn/pnpm) | ✅ | Lock files, semantic versioning, npm audit | 🎯 |
| Linting & Formatting (ESLint/Prettier) | ✅ | Config files, husky pre-commit hooks, rules | 🎯 |
| CI/CD Pipelines | ✅ | GitHub Actions, GitLab CI, deploy workflows | 🎯 |
| Environment Management | ✅ | .env files, secrets, env-specific configs | 🎯 |
| Code Splitting Strategy | ✅ | Route-based, component-based, dynamic import | 🎯 |
| Module Federation | ✅ | Webpack Module Federation, micro-frontends, remotes | 🎯 | |

---

## 12. React-Specific (Advanced Beyond ReactPrep)

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| React 18+ Concurrency | ⚠️ | Fiber in ReactPrep; useTransition covered | 🎯 |
| Suspense | ⚠️ | Concept mentioned; no patterns | 🎯 |
| Error Boundaries | ⚠️ | Theory partial | 🎯 |
| React Server Components | ⚠️ | Mentioned in ReactPrep; deep missing | 🎯 |
| Custom Hooks Patterns | ⚠️ | Theory light; common patterns missing | 🎯 |
| State Management (Redux/Zustand) | ⚠️ | AdvancedStateManagement folder exists; depth varies | 🎯 |
| Controlled vs Uncontrolled Components | ⚠️ | Basic coverage; edge cases sparse | 🎯 |
| Performance Optimization (memo/useMemo) | ✅ | Covered in ReactPrep | 🎯 |

---

## 13. Production Frontend Patterns

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| Error Handling & Recovery | ❌ | Retry logic, exponential backoff | 🎯 |
| Logging & Monitoring | ❌ | Client-side observability | 🎯 |
| Feature Flags | ❌ | A/B testing, rollout patterns | 🎯 |
| Graceful Degradation | ❌ | Fallbacks, progressive enhancement | 🎯 |
| Versioning & Release Strategy | ❌ | SemVer, deprecation paths | 🎯 |
| Documentation | ⚠️ | Good theory files; no style guide | ⚠️ |

---

## 14. Machine-Coding Style Problems

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| Autocomplete Component | ✅ | Full implementation with debounce, error handling, accessibility | 🎯 |
| Kanban Board | ✅ | Drag-drop, add/delete tasks, full styling | 🎯 |
| Virtualized List | ✅ | Windowing, CSS classes, performance optimized | 🎯 |
| Dashboard/Analytics UI | ✅ | Real-time updates, KPI cards, bar chart, activity feed | 🎯 |
| Calculator | ✅ | Full calculator with operators, decimal, percentage, toggle sign | ⚠️ |
| Form Builder | ✅ | Dynamic forms, multiple field types, validation, add/remove fields | 🎯 |
| Data Table | ❌ | Sorting, filtering, pagination | 🎯 |

---

## 15. Miscellaneous

| Topic | Status | Notes | Priority |
|-------|--------|-------|----------|
| Browser DevTools | ❌ | Debugging workflow, profiling | 🎯 |
| Network Waterfall Analysis | ❌ | Request prioritization | 🎯 |
| Accessibility Testing Tools | ❌ | axe, WAVE, manual testing | 🎯 |
| JavaScript Bitwise Operators | ⚠️ | Not covered; niche | - |
| Math & Algorithm Refresher | ⚠️ | Coding problems cover basics | ⚠️ |

---

## Summary Statistics

| Category | Strong | Partial | Missing | Total |
|----------|--------|---------|---------|-------|
| JavaScript | 13 | 2 | 1 | 16 |
| HTML & a11y | 1 | 3 | 3 | 7 |
| CSS & Layout | 8 | 4 | 2 | 14 |
| Browser APIs | 8 | 6 | 3 | 17 |
| Real-Time | 4 | 0 | 0 | 4 |
| TypeScript | 0 | 0 | 10 | 10 |
| Testing | 0 | 0 | 8 | 8 |
| Performance | 10 | 1 | 0 | 11 |
| Security | 10 | 0 | 0 | 10 |
| System Design | 9 | 1 | 0 | 10 |
| Architecture | 9 | 0 | 0 | 9 |
| React Advanced | 1 | 4 | 0 | 5 |
| Production | 0 | 1 | 5 | 6 |
| Machine-Coding | 6 | 0 | 1 | 7 |
| Misc | 0 | 1 | 1 | 2 |
| **TOTAL** | **80** | **30** | **27** | **137** |

---

## Priority Gaps (🎯 = SDE-2 Critical)

**High Impact, Currently Missing (Start Here):**
1. TypeScript (10 topics) — Critical for SDE-2 coding rounds
2. Testing (8 topics) — Expected to write & discuss tests
3. Browser APIs: PerformanceObserver + remaining advanced APIs (4 topics) — Common interview questions
4. Security: XSS, CSRF, CSP, token storage (6 topics) — Production concerns
5. Performance: Core Web Vitals, memory profiling, bundle analysis (6 topics) — System design component

**Medium Impact, Partial Coverage (Strengthen):**
- Performance optimization workflows (profiling, measurement)
- Accessibility (ARIA, keyboard navigation)
- Error handling & observability patterns
- Advanced CSS interview depth (trade-offs, architecture decisions)

**Lower Priority (Nice-to-Have):**
- Symbols/BigInt, Proxy/Reflect (niche)
- Module Federation, Monorepo (depends on role)
- Browser DevTools mastery (table-stakes but not core)

---

## Next Steps

1. **Week 1–2:** TypeScript fundamentals + React integration
2. **Week 3:** Testing (Jest, React Testing Library, E2E)
3. **Week 4:** Browser APIs deep dive (PerformanceObserver + remaining advanced APIs)
4. **Week 5:** Security patterns + performance profiling
5. **Week 6+:** Machine-coding timed builds + mock interviews


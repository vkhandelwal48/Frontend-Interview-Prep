# Architecture & Build Tools — Comprehensive Coverage

## 1. Module Bundling (Webpack)

### What is Webpack?
Webpack is a static module bundler that takes modules with dependencies and generates static assets representing those modules.

### Core Concepts

#### 1.1 Entry Point
Starting point for building the dependency graph.

```javascript
// webpack.config.js
module.exports = {
  entry: './src/index.js',  // Single entry
  // or
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js'  // Multiple entries
  }
};
```

#### 1.2 Output
Where the bundled code should be written.

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    // or dynamic filenames
    filename: '[name].[contenthash].js'  // For caching
  }
};
```

#### 1.3 Loaders
Transform source files as they are imported/loaded.

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // Match .js/.jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']  // Order matters!
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  }
};
```

#### 1.4 Plugins
Perform broader transformations on chunks/assets.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  plugins: [
    // Generate HTML from template
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    
    // Extract CSS into separate file
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  
  optimization: {
    minimizer: [
      new TerserPlugin()  // Minify JS
    ]
  }
};
```

### Webpack Modes

```javascript
module.exports = {
  mode: 'development',  // Fast builds, readable code, no optimization
  // or
  mode: 'production'    // Slower builds, minified, optimized
  // or
  mode: 'none'          // No optimization
};
```

### Code Splitting & Tree Shaking

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    // Tree shaking (removes unused exports)
    usedExports: true
  }
};
```

---

## 2. Build Tools Comparison (Vite vs Webpack vs Rollup)

### Vite

**Advantages:**
- ⚡ Lightning fast dev server (native ES modules)
- 🚀 Instant HMR (Hot Module Replacement)
- 🛠️ Simple config (zero-config for most projects)
- 📦 Optimized production builds

**Disadvantages:**
- Smaller ecosystem compared to Webpack
- Less mature (Webpack has been around longer)

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    minify: 'terser'
  }
})
```

### Webpack

**Advantages:**
- 🌐 Mature ecosystem with thousands of loaders/plugins
- 🎯 Fine-grained control over bundling
- 📚 Extensive documentation
- 🔧 Works for complex projects

**Disadvantages:**
- Slower dev server (creates full bundles)
- Steeper learning curve
- Complex configuration

### Rollup

**Advantages:**
- 📦 Optimal for library bundling
- 🌳 Excellent tree-shaking
- 📚 Cleaner output code
- ⚡ Fast builds

**Disadvantages:**
- Less suitable for applications
- Smaller ecosystem
- Fewer features out-of-the-box

### Comparison Table

| Feature | Vite | Webpack | Rollup |
|---------|------|---------|--------|
| **Dev Speed** | ⚡⚡⚡ | ⚡ | ⚡⚡ |
| **Prod Build** | ⚡⚡ | ⚡ | ⚡⚡⚡ |
| **Learning Curve** | Easy | Hard | Medium |
| **Ecosystem** | Growing | Mature | Small |
| **Best For** | Apps | Complex apps | Libraries |
| **Tree Shaking** | ✅ Good | ✅ Good | ✅ Excellent |

---

## 3. Package Management (npm/yarn/pnpm)

### npm (Node Package Manager)

```bash
# Initialize project
npm init

# Install dependencies
npm install                    # Install from package.json
npm install package-name       # Install specific package
npm install -D package-name    # Dev dependency
npm install -S package-name    # Save to dependencies

# Update/remove
npm update package-name
npm uninstall package-name

# Audit vulnerabilities
npm audit
npm audit fix

# Check version
npm list                       # Local packages
npm list -g                    # Global packages
```

**package.json:**
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0"        // Caret: compatible with version
  },
  "devDependencies": {
    "webpack": "^5.0.0"
  },
  "scripts": {
    "start": "webpack serve",
    "build": "webpack"
  }
}
```

### yarn (Facebook's npm alternative)

**Advantages:**
- Faster parallel installation
- Deterministic installs (yarn.lock)
- Offline mode support
- Better error messages

```bash
# Install dependencies
yarn add package-name
yarn add -D package-name

# Install from lock file
yarn install

# Update
yarn upgrade package-name

# Audit
yarn audit
yarn audit --fix
```

### pnpm (Performant npm)

**Advantages:**
- ⚡ Fastest installation (content-addressable storage)
- 💾 Disk space efficient (hard links)
- 🔒 Strict dependency resolution
- Monorepo support

```bash
# Install
pnpm install package-name
pnpm add -D package-name

# Install from lock file
pnpm install

# Monorepo workspaces
pnpm install -r              # Install all workspaces
pnpm add package -w          # Add to root workspace
```

### Semantic Versioning

```
^1.2.3    Caret     1.2.3 <= version < 2.0.0 (minor/patch updates)
~1.2.3    Tilde     1.2.3 <= version < 1.3.0 (patch updates only)
1.2.3     Exact     Exactly 1.2.3
*         Any       Any version
1.2.x     Patch     1.2.0 - 1.2.9
1.x.x     Minor     1.0.0 - 1.9.9
```

---

## 4. Monorepo Basics

### Monorepo Structure

```
my-monorepo/
├── packages/
│   ├── ui-components/
│   │   ├── package.json
│   │   ├── src/
│   │   └── dist/
│   ├── api-client/
│   │   ├── package.json
│   │   ├── src/
│   │   └── dist/
│   ├── core-utils/
│   │   ├── package.json
│   │   └── src/
│   └── web-app/
│       ├── package.json
│       └── src/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
└── .github/
    └── workflows/
```

### pnpm Workspaces (Recommended)

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

```json
// packages/ui-components/package.json
{
  "name": "@myapp/ui-components",
  "version": "1.0.0",
  "main": "dist/index.js"
}

// packages/web-app/package.json
{
  "dependencies": {
    "@myapp/ui-components": "workspace:*"  // Reference workspace package
  }
}
```

### npm Workspaces

```json
// Root package.json
{
  "workspaces": [
    "packages/*"
  ]
}
```

### Yarn Workspaces

```json
// Root package.json
{
  "workspaces": [
    "packages/*"
  ]
}
```

**Benefits:**
- Shared dependencies
- Single lock file
- Simplified publishing
- Code reuse

---

## 5. Linting & Formatting

### ESLint (Code Quality)

```bash
# Install
npm install -D eslint @eslint/js

# Initialize
npx eslint --init

# Run
npx eslint src/
npx eslint src/ --fix  # Auto-fix problems
```

**eslint.config.js:**
```javascript
import js from "@eslint/js";

export default [
  {
    ignores: ["node_modules", "dist"]
  },
  {
    files: ["src/**/*.js"],
    languageOptions: {
      sourceType: "module"
    },
    rules: {
      "no-unused-vars": "error",
      "no-console": "warn",
      "eqeqeq": ["error", "always"]
    }
  },
  js.configs.recommended
];
```

**Popular Plugins:**
```javascript
// React
npm install -D eslint-plugin-react

// TypeScript
npm install -D typescript @typescript-eslint/eslint-plugin

// Accessibility
npm install -D eslint-plugin-jsx-a11y
```

### Prettier (Code Formatting)

```bash
# Install
npm install -D prettier

# Format files
npx prettier --write src/

# Check formatting
npx prettier --check src/
```

**.prettierrc:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### Husky + lint-staged (Git Hooks)

```bash
# Setup
npm install -D husky lint-staged
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "lint-staged"
```

**package.json:**
```json
{
  "lint-staged": {
    "*.js": "eslint --fix",
    "*.jsx": "eslint --fix",
    "**/*": "prettier --write --ignore-unknown"
  }
}
```

---

## 6. CI/CD Pipelines

### GitHub Actions

```yaml
# .github/workflows/build.yml
name: Build and Test

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Lint
      run: npm run lint
    
    - name: Build
      run: npm run build
    
    - name: Test
      run: npm test
    
    - name: Deploy
      if: github.ref == 'refs/heads/main'
      run: npm run deploy
```

### GitLab CI/CD

```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "18"

build:
  stage: build
  image: node:18
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 day

test:
  stage: test
  image: node:18
  script:
    - npm install
    - npm test

deploy:
  stage: deploy
  image: node:18
  only:
    - main
  script:
    - npm run deploy
```

---

## 7. Environment Management

### .env Files

```bash
# .env (committed to repo - non-sensitive)
VITE_API_URL=https://api.example.com
VITE_APP_NAME=MyApp

# .env.local (NOT committed - sensitive)
VITE_API_KEY=secret_key_here
VITE_DATABASE_URL=postgresql://user:password@localhost
```

**Accessing in Code:**
```javascript
// Vite
const apiUrl = import.meta.env.VITE_API_URL;

// Webpack
const apiUrl = process.env.REACT_APP_API_URL;

// Node.js
require('dotenv').config();
const apiUrl = process.env.API_URL;
```

### Environment-Specific Configs

```javascript
// webpack.config.js
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    mode: argv.mode,
    output: {
      filename: isProduction 
        ? '[name].[contenthash].js' 
        : '[name].js'
    },
    devtool: isProduction 
      ? 'source-map' 
      : 'eval-source-map'
  };
};
```

```bash
# Build for different environments
npm run build -- --env development
npm run build -- --env production
npm run build -- --env staging
```

### Secrets Management

```javascript
// Never hardcode secrets!
// ❌ Bad
const API_KEY = 'pk_live_51234567890';

// ✅ Good
const API_KEY = process.env.REACT_APP_API_KEY;

// Docker secrets
// ✅ Use environment variables passed at runtime
docker run -e API_KEY=secret myapp:latest
```

---

## 8. Code Splitting Strategy

### Route-Based Splitting (React Router)

```javascript
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Component-Based Splitting

```javascript
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  const [showHeavy, setShowHeavy] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowHeavy(true)}>Load</button>
      {showHeavy && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}
```

### Dynamic Import (Webpack Magic Comments)

```javascript
// Prefetch - loads in background with low priority
const utils = import(/* webpackPrefetch: true */ './utils');

// Preload - loads with high priority
const critical = import(/* webpackPreload: true */ './critical');

// Custom chunk name
const module = import(/* webpackChunkName: "my-chunk" */ './module');
```

---

## 9. Module Federation (Micro-Frontends)

### Webpack Module Federation

```javascript
// App 1 (Host/Container)
// webpack.config.js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        app1: 'app1@http://localhost:3001/remoteEntry.js',
        app2: 'app2@http://localhost:3002/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ]
};

// App 1 (Remote - Exposed)
// webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button'
      },
      shared: ['react', 'react-dom']
    })
  ]
};
```

**Using Federated Modules:**
```javascript
// Container App
import Button from 'app1/Button';

export default function App() {
  return <Button>Click me</Button>;
}
```

**Benefits:**
- Independent deployments
- Separate teams can work on different apps
- Shared dependencies
- Runtime composition

---

## Production Build Optimization

### Bundle Analysis

```bash
# Webpack Bundle Analyzer
npm install -D webpack-bundle-analyzer

# Vite Plugin
npm install -D rollup-plugin-visualizer
```

**webpack.config.js:**
```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html'
    })
  ]
};
```

### Performance Budget

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        // Warn if chunks are larger than 500kb
        chunkFileNames: () => {
          return 'chunks/[name]-[hash].js';
        }
      }
    }
  }
};
```

### Caching Strategy

```javascript
// webpack.config.js
module.exports = {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  optimization: {
    runtimeChunk: 'single',  // Separate runtime chunk
    splitChunks: {
      chunks: 'all'
    }
  }
};
```

---

## Complete Example: React App with Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'utils': ['lodash']
        }
      }
    }
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --fix",
    "format": "prettier --write src",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

---

## Interview Tips

**When asked about build tools:**
- Explain difference between bundlers and build tools
- Discuss Webpack vs Vite trade-offs
- Know when to use code splitting
- Understand performance optimization techniques

**When asked about monorepos:**
- Explain structure and benefits
- Mention workspaces (pnpm, yarn, npm)
- Discuss dependency management
- Know workspace:* syntax

**When asked about CI/CD:**
- Explain pipeline stages
- Discuss GitHub Actions syntax
- Know how to deploy
- Understand environment management

**When asked about module federation:**
- Explain micro-frontend architecture
- Discuss independent deployments
- Know remote/shared configuration
- Understand runtime composition

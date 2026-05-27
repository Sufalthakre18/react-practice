
# ⚛️ React — World Class Interview Notes (Part 1)

> **Topics Covered:** What is React · React in HTML · React Elements · Bundlers · npm · package.json vs package-lock.json

---

## 📌 Table of Contents

1. [What is React?](#1-what-is-react)
2. [Using React Directly in an HTML Page (CDN)](#2-using-react-directly-in-an-html-page-cdn)
3. [React Elements](#3-react-elements)
4. [Bundlers in React](#4-bundlers-in-react)
5. [Introduction to npm](#5-introduction-to-npm)
6. [package.json vs package-lock.json](#6-packagejson-vs-package-lockjson)

---

## 1. What is React?

### 🔑 One-liner (Interview Answer)
> **React is an open-source JavaScript library developed by Facebook (Meta) for building fast, interactive, and component-based User Interfaces (UIs).**

### Key Points

| Feature | Description |
|---|---|
| **Library, not Framework** | React only handles the **View** layer (UI). Routing, state management, etc. need extra libs. |
| **Component-Based** | UI is split into small, reusable, independent pieces called **components**. |
| **Declarative** | You describe *what* the UI should look like; React figures out *how* to update the DOM. |
| **Virtual DOM** | React maintains a lightweight copy of the real DOM in memory to compute minimal updates. |
| **Unidirectional Data Flow** | Data flows **top → down** (parent → child) via `props`. |
| **JSX** | A syntax extension that lets you write HTML-like code inside JavaScript. |

### History
- Created by **Jordan Walke** at Facebook.
- Open-sourced at **JSConf 2013**.
- Current major version: **React 19** (2024/2025).

### Why React? (Interview Talking Points)
- **Performance** — Virtual DOM diffs and batches DOM updates, reducing expensive repaints.
- **Reusability** — Components can be reused across the entire app or across projects.
- **Ecosystem** — Massive ecosystem: React Router, Redux, Zustand, React Query, Next.js, etc.
- **Developer Experience** — Hot Module Replacement, React DevTools, strong TypeScript support.
- **Cross-platform** — React Native lets you build mobile apps using the same component model.

### React vs Other Frameworks

| | React | Angular | Vue |
|---|---|---|---|
| Type | Library | Full Framework | Progressive Framework |
| Learning Curve | Medium | High | Low |
| Language | JSX/JS/TS | TypeScript | HTML Templates + JS |
| Data Binding | One-way | Two-way | Two-way |
| DOM | Virtual DOM | Real DOM (Incremental) | Virtual DOM |
| Maintained by | Meta | Google | Community (Evan You) |

---

## 2. Using React Directly in an HTML Page (CDN)

### 🔑 Core Concept
You can use React **without any build tool or Node.js** by loading it via CDN `<script>` tags. This is great for learning, quick prototypes, and adding React to an existing HTML page.

### The Three CDN Scripts You Need

```html
<!-- 1. React Core Library (the engine) -->
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>

<!-- 2. React DOM (connects React to the browser DOM) -->
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

<!-- 3. Babel (transforms JSX → plain JS in the browser) -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

> ⚠️ **Interview Note:** The `react-dom` package is separate because React itself is platform-agnostic — the same core works with React Native, React Three Fiber, etc.

### Complete Working Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>React via CDN</title>
  <!-- React & ReactDOM CDN -->
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <!-- Babel for JSX transformation in the browser -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>

  <!-- This is the "root" — React will render inside here -->
  <div id="root"></div>

  <!-- type="text/babel" tells Babel to process this script -->
  <script type="text/babel">
    function Greeting({ name }) {
      return <h1>Hello, {name}! 👋</h1>;
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Greeting name="World" />);
  </script>

</body>
</html>
```

### How It Works — Step by Step

```
1. Browser loads HTML
2. CDN scripts load React, ReactDOM, and Babel
3. Babel detects <script type="text/babel">
4. Babel compiles JSX → React.createElement() calls (pure JS)
5. ReactDOM.createRoot() selects the #root div
6. .render() tells React what to paint inside #root
7. React builds a Virtual DOM tree, then commits it to the real DOM
```

### Development vs Production CDN

```html
<!-- Development (human-readable, includes warnings) -->
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>

<!-- Production (minified, no warnings, faster) -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
```

### Limitations of CDN Approach

| Limitation | Why it matters |
|---|---|
| No module system (no `import`/`export`) | Can't split code into multiple files easily |
| Browser-side Babel is slow | Not suitable for production apps |
| No tree-shaking or code splitting | Larger bundle sizes |
| No Hot Module Replacement (HMR) | Must refresh page manually |

> 💡 **Conclusion:** CDN approach is **for learning and demos only**. Real apps use a **build tool + bundler** (CRA, Vite, Next.js).

---

## 3. React Elements

### 🔑 Definition
> **A React Element is the smallest building block of a React app — a plain JavaScript object that describes what should appear on the screen.**

React elements are **NOT** DOM elements. They are cheap, lightweight descriptions (blueprints) that React uses to build/update the actual DOM.

### Creating Elements — Two Ways

#### ① Without JSX (Pure JavaScript)

```javascript
// React.createElement(type, props, ...children)
const element = React.createElement(
  'h1',                         // type: HTML tag or Component
  { className: 'title' },       // props (attributes)
  'Hello, React!'               // children
);
```

This produces a plain JS object:

```javascript
{
  $$typeof: Symbol(react.element),
  type: 'h1',
  props: {
    className: 'title',
    children: 'Hello, React!'
  },
  key: null,
  ref: null
}
```

#### ② With JSX (Sugar Syntax — Compiles to Above)

```jsx
const element = <h1 className="title">Hello, React!</h1>;
// Babel compiles ↑ to ↓
const element = React.createElement('h1', { className: 'title' }, 'Hello, React!');
```

### Elements vs Components

| | React Element | React Component |
|---|---|---|
| **What is it?** | A plain JS object (blueprint) | A function or class that **returns** elements |
| **Mutable?** | ❌ Immutable (frozen once created) | ✅ Can have state and lifecycle |
| **Reusable?** | ❌ Single use | ✅ Reusable with different props |
| **Example** | `<h1>Hello</h1>` | `function App() { return <h1>Hello</h1> }` |

### Nesting Elements

```jsx
const element = (
  <div className="container">
    <h1>Title</h1>
    <p>Paragraph text</p>
    <button onClick={() => alert('Clicked!')}>Click Me</button>
  </div>
);
```

Compiles to:

```javascript
const element = React.createElement(
  'div', { className: 'container' },
  React.createElement('h1', null, 'Title'),
  React.createElement('p', null, 'Paragraph text'),
  React.createElement('button', { onClick: () => alert('Clicked!') }, 'Click Me')
);
```

### Rendering an Element

```jsx
// React 18+ way
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, World!</h1>);

// Old React 17 way (still works but deprecated)
ReactDOM.render(<h1>Hello, World!</h1>, document.getElementById('root'));
```

### Elements are Immutable

```jsx
// ❌ You CANNOT do this — elements are frozen
const el = <h1>Hello</h1>;
el.props.children = 'World'; // TypeError!

// ✅ Instead, render a new element
root.render(<h1>World</h1>);
```

### Key Interview Points About Elements

- `$$typeof: Symbol(react.element)` — React uses this symbol to prevent XSS attacks (JSON can't contain Symbols).
- Elements describe the **desired** UI state — React reconciles this against the current DOM.
- Elements can represent **HTML tags** (`'div'`, `'span'`) or **React components** (`App`, `Button`).
- The `key` prop on elements helps React identify which items in a list changed (crucial for performance).

---

## 4. Bundlers in React

### 🔑 What is a Bundler?
> **A bundler is a tool that takes your many JavaScript files (and CSS, images, etc.), resolves all their `import`/`require` dependencies, and combines them into one (or a few) optimized output file(s) for the browser.**

### Why Do We Need a Bundler?

```
Problem:
  Modern apps have 100s or 1000s of JS files using ES Modules (import/export)
  Browsers can't efficiently load 1000 separate network requests
  We also need JSX → JS compilation, TypeScript → JS, CSS processing, minification, etc.

Solution:
  Bundler combines everything into a single bundle.js (or a few chunks)
  Performs all transformations along the way
```

### The Bundler Pipeline

```
Source Files (JSX, TS, CSS, Images)
         ↓
   [Loaders / Plugins]     ← Transform JSX, TS, SCSS, etc.
         ↓
   [Dependency Graph]      ← Resolve all imports
         ↓
   [Tree Shaking]          ← Remove unused code
         ↓
   [Minification]          ← Compress and uglify
         ↓
   Output: bundle.js + assets
```

### Major Bundlers in the React Ecosystem

#### 1. 🌐 Webpack (Most Popular — CRA uses this)

```
- Released: 2012
- The OG and most feature-rich bundler
- Highly configurable via webpack.config.js
- Uses "loaders" for transformations and "plugins" for additional tasks
- Powers Create React App under the hood
- Slower than modern alternatives (especially for large projects)
```

```javascript
// webpack.config.js (simplified)
module.exports = {
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: __dirname + '/dist' },
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' },  // Transform JSX/JS
      { test: /\.css$/, use: ['style-loader', 'css-loader'] } // Handle CSS
    ]
  }
};
```

#### 2. ⚡ Vite (Modern Standard — Fastest DX)

```
- Released: 2020 by Evan You (creator of Vue)
- Uses native ES Modules in development (no bundling during dev!)
- Uses Rollup for production builds
- Extremely fast HMR (Hot Module Replacement)
- Now the RECOMMENDED tool for new React projects
```

```bash
# Create React app with Vite
npm create vite@latest my-app -- --template react
```

```
Why Vite is fast:
  Dev server:   Serves files as native ES Modules (browser resolves imports)
  Production:   Uses Rollup (extremely optimized output)
  No cold start: Only compiles files on demand (lazy)
```

#### 3. 📦 Rollup

```
- Best for building libraries (not apps)
- Produces the cleanest, smallest bundles
- Excellent tree-shaking
- React itself is bundled with Rollup!
- Vite uses Rollup under the hood for production
```

#### 4. 🔥 esbuild (Used inside Vite/Turbopack)

```
- Written in Go — extremely fast (10–100x faster than Webpack)
- Not commonly used standalone for React apps
- Powers Vite's dependency pre-bundling step
- Powers Turbopack (Next.js 13+)
```

#### 5. 🚀 Parcel (Zero-config)

```
- Zero configuration required (just point it at your HTML)
- Good for small projects and beginners
- Slower than Vite for large projects
```

### Bundler Comparison Table

| Bundler | Speed | Config | Use Case | Used In |
|---|---|---|---|---|
| **Webpack** | Medium | Complex | Full apps | CRA, custom setups |
| **Vite** | ⚡ Fastest DX | Minimal | Apps | New React projects |
| **Rollup** | Fast | Medium | Libraries | React, Vue source |
| **esbuild** | ⚡⚡ Fastest | Minimal | Internal | Vite, Turbopack |
| **Parcel** | Medium | None | Small apps | Beginners |

### What a Bundler Does for React Specifically

```
1. Compiles JSX → JavaScript (via Babel or SWC)
2. Transpiles modern JS (ES2022+) → older JS for browser compatibility
3. Bundles CSS Modules, SCSS, Tailwind
4. Handles static assets (images, fonts, SVGs)
5. Code splitting — splits app into lazy-loaded chunks
6. Tree shaking — removes unused exports (dead code elimination)
7. Source maps — maps minified code back to original for debugging
8. Hot Module Replacement — updates only changed modules in browser
```

### Babel vs SWC (Transpilers — often confused with bundlers)

> Transpilers convert JSX/modern JS into browser-compatible JS. Bundlers then bundle the result.

| | Babel | SWC |
|---|---|---|
| Written in | JavaScript | Rust |
| Speed | Standard | ~70x faster than Babel |
| Used in | CRA, older setups | Vite (optional), Next.js 12+ |

---

## 5. Introduction to npm

### 🔑 What is npm?
> **npm (Node Package Manager) is the default package manager for Node.js — it is the world's largest software registry with over 2 million packages.**

npm does three things:
1. **Registry** — An online database of open-source JS packages (npmjs.com)
2. **CLI Tool** — A command-line tool to install, update, and manage packages
3. **Dependency Manager** — Tracks project dependencies in `package.json`

### npm vs Node.js Relationship

```
Node.js:  A JavaScript runtime (runs JS outside the browser)
npm:      Comes bundled with Node.js — installing Node gives you npm
```

```bash
node --version   # v20.x.x
npm --version    # 10.x.x
```

### Essential npm Commands

```bash
# ── Initializing ──────────────────────────────────────────────
npm init              # Interactive setup → creates package.json
npm init -y           # Skip questions, use defaults

# ── Installing packages ───────────────────────────────────────
npm install           # Install all deps from package.json
npm install react     # Install 'react' and save to dependencies
npm install -D vite   # Install 'vite' as devDependency
npm install -g nodemon  # Install globally (accessible everywhere)

# Shorthand
npm i react           # same as npm install react
npm i -D eslint       # same as npm install --save-dev eslint

# ── Removing packages ────────────────────────────────────────
npm uninstall react   # Remove a package
npm uninstall -D vite # Remove a devDependency

# ── Running scripts ──────────────────────────────────────────
npm run dev           # Run the 'dev' script from package.json
npm run build         # Run the 'build' script
npm start             # Shorthand for npm run start
npm test              # Shorthand for npm run test

# ── Info & Search ────────────────────────────────────────────
npm list              # List installed packages (local)
npm list -g           # List global packages
npm outdated          # Show outdated packages
npm audit             # Check for security vulnerabilities
npm audit fix         # Auto-fix vulnerabilities

# ── Versioning ───────────────────────────────────────────────
npm update            # Update all packages to latest compatible
npm update react      # Update specific package
npm install react@18  # Install specific version
npm install react@latest  # Install latest version
```

### npm vs npx

| npm | npx |
|---|---|
| Installs packages | **Executes** packages without permanently installing |
| `npm install create-react-app -g` | `npx create-react-app my-app` |
| Package stays on your machine | Package is downloaded, run, then discarded |
| Use for project dependencies | Use for one-off CLI tools |

```bash
# Instead of installing CRA globally:
npx create-react-app my-app

# Or Vite:
npx create vite@latest my-app
```

### npm vs yarn vs pnpm

| | npm | yarn | pnpm |
|---|---|---|---|
| Made by | Node.js / npm Inc. | Facebook | Community |
| Lock file | `package-lock.json` | `yarn.lock` | `pnpm-lock.yaml` |
| Speed | Medium | Fast | ⚡ Fastest |
| Disk usage | High (duplicates) | Medium | Low (symlinks) |
| Install cmd | `npm install` | `yarn` | `pnpm install` |

### The `node_modules` Folder

```
After running npm install:

my-app/
├── node_modules/      ← ALL installed packages live here (can be 100k+ files!)
│   ├── react/
│   ├── react-dom/
│   └── ...
├── package.json
└── package-lock.json

⚠️ NEVER commit node_modules to Git!
✅ Always add node_modules/ to .gitignore
✅ Anyone can recreate it by running: npm install
```

### Semantic Versioning (semver) in npm

```
Format: MAJOR.MINOR.PATCH
Example: 18.2.0

MAJOR → Breaking changes (must update your code)
MINOR → New features, backward compatible
PATCH → Bug fixes, backward compatible

In package.json:
  "react": "18.2.0"   → Exact version only
  "react": "^18.2.0"  → Accept MINOR and PATCH updates (^= caret)
  "react": "~18.2.0"  → Accept PATCH updates only (~= tilde)
  "react": "*"        → Accept ANY version (dangerous!)
  "react": ">=18.0.0" → Greater than or equal to 18.0.0
```

---

## 6. package.json vs package-lock.json

### 🔑 One-line Summary
> **`package.json` is the human-maintained manifest of your project. `package-lock.json` is the auto-generated, exact snapshot of every installed dependency.**

---

### package.json

```json
{
  "name": "my-react-app",
  "version": "1.0.0",
  "description": "A sample React application",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "jest"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "eslint": "^8.45.0",
    "jest": "^29.0.0"
  },
  "peerDependencies": {
    "react": ">=17.0.0"
  },
  "keywords": ["react", "app"],
  "author": "Your Name",
  "license": "MIT",
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Fields Explained

| Field | Purpose |
|---|---|
| `name` | Package name (used if published to npm) |
| `version` | Current version of your project |
| `scripts` | Shortcut commands run via `npm run <name>` |
| `dependencies` | Packages needed in **production** (shipped to users) |
| `devDependencies` | Packages needed only during **development** (bundlers, testing, linters) |
| `peerDependencies` | Packages the consumer must provide (used in libraries) |
| `engines` | Specifies compatible Node.js versions |
| `main` | Entry point when the package is imported by others |

### dependencies vs devDependencies

```bash
# dependencies — goes to PRODUCTION
npm install react          # → "dependencies" in package.json
npm install axios

# devDependencies — DEVELOPMENT only, not in final user bundle
npm install -D vite        # → "devDependencies" in package.json
npm install -D eslint
npm install -D jest

# When you run: npm install --production
# Only "dependencies" are installed, NOT devDependencies
```

```
Production Build:
  ✅ react        (dependency)
  ✅ react-dom    (dependency)
  ❌ vite         (devDependency — not needed by end users)
  ❌ eslint       (devDependency — not needed by end users)
  ❌ jest         (devDependency — not needed by end users)
```

---

### package-lock.json

```json
{
  "name": "my-react-app",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "my-react-app",
      "dependencies": {
        "react": "^18.2.0"
      }
    },
    "node_modules/react": {
      "version": "18.2.0",               ← EXACT version locked
      "resolved": "https://registry.npmjs.org/react/-/react-18.2.0.tgz",
      "integrity": "sha512-/3IjMdb2L9QbBdWiW5e3P2/npwMBaU9mHCSCUzNln0ZCYbcfTsGbTJrU/kGemdH2IWmB2ioZ+zkxtmq6g09fA==",
      "dependencies": {
        "loose-envify": "^1.1.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    }
  }
}
```

### Key Fields in package-lock.json

| Field | Purpose |
|---|---|
| `version` | The **exact** version installed (not a range like ^18.2.0) |
| `resolved` | The exact URL the package was downloaded from |
| `integrity` | A SHA-512 hash to verify the download is untampered |
| `dependencies` | Nested dependencies of this package |

---

### The Core Difference — Side by Side

| Aspect | `package.json` | `package-lock.json` |
|---|---|---|
| **Written by** | Developer (manually) | npm (automatically) |
| **Contains** | Version ranges (`^18.2.0`) | Exact versions (`18.2.0`) |
| **Purpose** | Describes what your app needs | Records exactly what was installed |
| **Editable?** | ✅ Yes, you edit this | ❌ Never edit manually |
| **Committed to Git?** | ✅ Always | ✅ Always |
| **Reproducibility** | ❌ Same install might get different patch versions | ✅ Guarantees identical `node_modules` every time |

### Why Does package-lock.json Exist? (The Problem It Solves)

```
Scenario without lock file:

  Developer A runs npm install on Monday → gets react@18.2.0
  Developer B runs npm install on Friday → gets react@18.2.1 (new patch released!)

  "It works on my machine" 😅

With package-lock.json:

  Both developers get react@18.2.0 — EXACT same tree, always.
  CI/CD server also gets 18.2.0.
  Deployed production server also gets 18.2.0.
  ✅ Fully reproducible builds!
```

### npm ci vs npm install

```bash
# npm install
#  - Reads package.json version ranges
#  - Updates package-lock.json if it can find newer compatible versions
#  - Use during development

# npm ci (clean install)
#  - Reads package-lock.json ONLY (ignores package.json ranges)
#  - NEVER updates package-lock.json
#  - Deletes node_modules first, then reinstalls from scratch
#  - Faster and deterministic
#  - Use in CI/CD pipelines and production deployments

npm ci    # ← Use this in GitHub Actions, Docker, etc.
```

### Complete Mental Model

```
package.json       → "I need react somewhere in version 18"
                          ↓ (npm install runs)
package-lock.json  → "I installed react@18.2.0 from this URL, with this hash"
                          ↓
node_modules/      → The actual installed files
```

---

## 🎯 Quick Interview Cheat Sheet

| Question | Quick Answer |
|---|---|
| What is React? | A JS library by Meta for building component-based UIs using a Virtual DOM |
| React vs Framework? | React is a **library** (only View layer); frameworks like Angular include routing, DI, etc. |
| Can you use React without Node? | Yes — via CDN script tags (no bundler needed) |
| What is a React Element? | A plain JS object describing UI — the output of `React.createElement()` or JSX |
| Is JSX required? | No, but it's standard. JSX compiles to `React.createElement()` calls |
| What is a bundler? | A tool that bundles JS/CSS/assets into optimized output files for the browser |
| Best bundler for new React apps? | **Vite** — fastest DX, minimal config |
| What is npm? | Node Package Manager — installs/manages JS packages from npmjs.com registry |
| npm vs npx? | npm installs packages; npx **runs** packages without installing |
| package.json vs package-lock.json? | `.json` = intent (ranges); `-lock.json` = exact snapshot for reproducibility |
| Should you commit lock file? | ✅ YES — always commit `package-lock.json` |
| npm install vs npm ci? | `install` = dev use; `ci` = CI/CD (deterministic, reads lock file only) |

---

*📝 More Parts Coming: JSX · Components · Props · State · Hooks · useEffect · Context · Performance · React 19 Features*


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

---
# ⚛️ React — World Class Interview Notes (Part 2)

> **Topic: React Components — Complete Deep Dive**

---

## 📌 Table of Contents

1. [What is a Component?](#1-what-is-a-component)
2. [Functional Components](#2-functional-components)
3. [Class Components](#3-class-components)
4. [Functional vs Class Components](#4-functional-vs-class-components)
5. [JSX — Deep Dive](#5-jsx--deep-dive)
6. [Props](#6-props)
7. [State](#7-state)
8. [Component Composition](#8-component-composition)
9. [Component Lifecycle](#9-component-lifecycle)
10. [Controlled vs Uncontrolled Components](#10-controlled-vs-uncontrolled-components)
11. [Pure Components & React.memo](#11-pure-components--reactmemo)
12. [Component Best Practices](#12-component-best-practices)
13. [Quick Interview Cheat Sheet](#-quick-interview-cheat-sheet)

---

## 1. What is a Component?

### 🔑 One-liner (Interview Answer)
> **A React Component is a reusable, self-contained JavaScript function (or class) that accepts inputs called `props` and returns JSX describing what should appear on the screen.**

### The Core Idea

```
Traditional Web Dev:                React Way:
─────────────────────               ──────────────────────────────
HTML  → structure                   Component = HTML + CSS + JS
CSS   → styles                                  all in one place,
JS    → behaviour                               reusable, isolated
(3 separate files, tightly coupled) (one unit, loosely coupled)
```

### Component as a Building Block

```
                     ┌────────── App ───────────┐
                     │                          │
              ┌──────┴──────┐           ┌───────┴──────┐
              │   Navbar    │           │     Feed     │
              └──────┬──────┘           └───────┬──────┘
                     │                          │
          ┌──────────┼──────────┐    ┌──────────┼──────────┐
          │          │          │    │          │          │
       Logo       NavLinks   Avatar  Post      Post      Post
                                      │
                                ┌─────┴──────┐
                                │            │
                             Avatar      LikeBtn
```

Everything in React is a component. Components form a **tree**.

### Rules for Components

```
1. Component name MUST start with a Capital Letter
   ✅ function UserCard() {}
   ❌ function userCard() {}   ← React treats this as an HTML tag

2. Must return ONE root element (or a Fragment)
   ✅ return <div><h1/><p/></div>
   ✅ return <><h1/><p/></>       ← Fragment
   ❌ return <h1/><p/>            ← Two siblings = error

3. JSX must be properly closed
   ✅ <img src="..." />
   ❌ <img src="...">

4. Must be a pure function with respect to props
   (same props → same output, no side effects during render)
```

---

## 2. Functional Components

### 🔑 Definition
> **A Functional Component is a plain JavaScript function that takes `props` as an argument and returns JSX. It is the modern and recommended way to write React components.**

### Simplest Possible Component

```jsx
function Hello() {
  return <h1>Hello, World!</h1>;
}
```

### With Props

```jsx
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Usage
<Greeting name="Rahul" age={25} />
```

### Arrow Function Component (Also Valid)

```jsx
const Button = ({ label, onClick, disabled = false }) => (
  <button onClick={onClick} disabled={disabled}>
    {label}
  </button>
);
```

### With State (useState Hook)

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### With Side Effects (useEffect Hook)

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Re-run when userId changes

  if (loading) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}
```

### Different Ways to Write Functional Components

```jsx
// ① Named function declaration (most common, hoisted)
function MyComponent() {
  return <div>Hello</div>;
}

// ② Arrow function assigned to const (not hoisted)
const MyComponent = () => {
  return <div>Hello</div>;
};

// ③ Arrow function with implicit return (for simple JSX)
const MyComponent = () => <div>Hello</div>;

// ④ Arrow function with implicit return — multi-line (use parentheses)
const MyComponent = () => (
  <div>
    <h1>Hello</h1>
    <p>World</p>
  </div>
);
```

---

## 3. Class Components

### 🔑 Definition
> **A Class Component is an ES6 class that extends `React.Component`, has a mandatory `render()` method that returns JSX, and can manage local state and lifecycle methods natively.**

### Basic Structure

```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### With State

```jsx
class Counter extends Component {
  // Method 1: state as class property (modern, preferred)
  state = {
    count: 0,
    name: 'Counter'
  };

  // OR Method 2: constructor (older style)
  constructor(props) {
    super(props);  // ← REQUIRED — calls React.Component's constructor
    this.state = { count: 0 };
    // Must bind event handlers if not using arrow functions
    this.increment = this.increment.bind(this);
  }

  // Using arrow function — auto-binds 'this' ✅
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // Using regular method — needs .bind(this) in constructor ⚠️
  decrement() {
    this.setState(prevState => ({ count: prevState.count - 1 }));
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>+</button>
        <button onClick={() => this.decrement()}>-</button>
      </div>
    );
  }
}
```

### setState — Important Details

```jsx
// ❌ WRONG: Direct state mutation (React won't re-render)
this.state.count = this.state.count + 1;

// ✅ CORRECT: Always use setState
this.setState({ count: this.state.count + 1 });

// ✅ BEST: Use updater function when new state depends on old state
// (setState is ASYNCHRONOUS — this.state may be stale!)
this.setState(prevState => ({
  count: prevState.count + 1
}));

// setState can take a callback (runs after state update is applied)
this.setState({ count: 5 }, () => {
  console.log('State updated:', this.state.count); // 5
});

// Merging: setState does a SHALLOW MERGE
// state = { name: 'A', age: 20 }
this.setState({ age: 21 });
// Result: { name: 'A', age: 21 } ← name preserved ✅
```

### Class Component Lifecycle Methods

```jsx
class LifecycleDemo extends Component {
  state = { data: null };

  // ── MOUNTING phase ─────────────────────────────────────────
  constructor(props) {
    super(props);
    // Initialize state, bind methods
    // ❌ No side effects here
  }

  static getDerivedStateFromProps(props, state) {
    // Runs before every render (mount + update)
    // Returns new state object or null
    // Rarely needed
    return null;
  }

  componentDidMount() {
    // ✅ Runs ONCE after first render
    // Best place for: API calls, subscriptions, DOM manipulation
    fetch('/api/data')
      .then(r => r.json())
      .then(data => this.setState({ data }));
  }

  // ── UPDATING phase ─────────────────────────────────────────
  shouldComponentUpdate(nextProps, nextState) {
    // Return false to prevent re-render (optimization)
    // PureComponent does this automatically with shallow comparison
    return nextState.count !== this.state.count;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Runs right before DOM is updated
    // Return value is passed as 3rd arg to componentDidUpdate
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Runs after every update (not first render)
    // ✅ Safe to call setState here (with a condition!)
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId); // re-fetch on prop change
    }
  }

  // ── UNMOUNTING phase ───────────────────────────────────────
  componentWillUnmount() {
    // ✅ Cleanup: clear timers, cancel API calls, unsubscribe
    clearInterval(this.timer);
    this.subscription.unsubscribe();
  }

  // ── ERROR HANDLING ─────────────────────────────────────────
  componentDidCatch(error, info) {
    // Catches errors in child components
    logErrorToService(error, info);
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}
```

---

## 4. Functional vs Class Components

### Comparison Table

| Aspect | Functional Component | Class Component |
|---|---|---|
| **Syntax** | Plain JS function | ES6 class extending `React.Component` |
| **State** | `useState` hook | `this.state` + `this.setState()` |
| **Lifecycle** | `useEffect` hook | Dedicated lifecycle methods |
| **`this` keyword** | ❌ Not used | ✅ Used everywhere (`this.props`, `this.state`) |
| **Boilerplate** | Minimal | More verbose |
| **Performance** | Slightly faster (no class overhead) | Slightly heavier |
| **Hooks** | ✅ Can use all hooks | ❌ Cannot use hooks |
| **Code reuse** | ✅ Custom hooks | ❌ HOC / Render props (complex) |
| **Error Boundaries** | ❌ Not supported (yet) | ✅ `componentDidCatch` |
| **React Team Recommendation** | ✅ Preferred (since React 16.8) | ⚠️ Legacy (still works, not deprecated) |

### Same Component — Two Ways

```jsx
// ── CLASS VERSION ──────────────────────────────────────────────
class Timer extends Component {
  state = { seconds: 0 };
  interval = null;

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prev => ({ seconds: prev.seconds + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <p>Seconds: {this.state.seconds}</p>;
  }
}

// ── FUNCTIONAL VERSION (equivalent) ───────────────────────────
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return <p>Seconds: {seconds}</p>;
}
```

---

## 5. JSX — Deep Dive

### 🔑 What is JSX?
> **JSX (JavaScript XML) is a syntax extension for JavaScript that lets you write HTML-like markup inside JS files. It compiles to `React.createElement()` calls.**

### JSX Compilation

```jsx
// What you write:
const element = (
  <div className="card">
    <h2>{user.name}</h2>
    <button onClick={handleClick}>Follow</button>
  </div>
);

// What Babel compiles it to:
const element = React.createElement(
  'div',
  { className: 'card' },
  React.createElement('h2', null, user.name),
  React.createElement('button', { onClick: handleClick }, 'Follow')
);
```

### JSX Rules — Every One Matters

```jsx
// ── Rule 1: One root element ──────────────────────────────────
// ❌ Two siblings at top level
return (
  <h1>Title</h1>
  <p>Para</p>
);

// ✅ Wrap in a div
return (
  <div>
    <h1>Title</h1>
    <p>Para</p>
  </div>
);

// ✅ Or use Fragment (adds no extra DOM node)
return (
  <>
    <h1>Title</h1>
    <p>Para</p>
  </>
);

// ✅ Or explicit Fragment (when you need a key prop)
return (
  <React.Fragment>
    <h1>Title</h1>
    <p>Para</p>
  </React.Fragment>
);

// ── Rule 2: className, not class ──────────────────────────────
// ❌ <div class="box">       ← 'class' is a reserved JS keyword
// ✅ <div className="box">

// ── Rule 3: htmlFor, not for ──────────────────────────────────
// ❌ <label for="email">
// ✅ <label htmlFor="email">

// ── Rule 4: camelCase event handlers ─────────────────────────
// ❌ <button onclick={fn}>
// ✅ <button onClick={fn}>
// Other: onChange, onSubmit, onMouseEnter, onKeyDown, etc.

// ── Rule 5: Self-closing tags ─────────────────────────────────
// ❌ <img src="x.png">
// ✅ <img src="x.png" />
// ✅ <input type="text" />
// ✅ <MyComponent />

// ── Rule 6: JS expressions in curly braces ────────────────────
const name = 'Rahul';
const age = 25;
return <p>{name} is {age} years old</p>;

// ✅ Expressions only — NOT statements
// ❌ { if (x) ... }   ← statement, not allowed
// ✅ { x ? 'yes' : 'no' }  ← ternary is an expression
// ✅ { x && <Component /> }  ← short-circuit is an expression
```

### JSX Expressions vs Statements

```jsx
// ✅ VALID in JSX curly braces (expressions):
{name}                           // variable
{2 + 2}                          // arithmetic
{user.isAdmin ? 'Admin' : 'User'}// ternary
{isLoggedIn && <Dashboard />}    // short-circuit
{items.map(i => <li>{i}</li>)}   // .map()
{formatDate(new Date())}         // function call

// ❌ INVALID in JSX curly braces (statements):
{if (x) { ... }}                 // if statement
{for (let i...) { ... }}         // for loop
{let x = 5}                      // variable declaration
```

### Conditional Rendering Patterns

```jsx
function Notification({ type, message }) {
  // ── Pattern 1: if/else before return ──────────────────────
  if (!message) return null;

  // ── Pattern 2: Ternary ─────────────────────────────────────
  return (
    <div className={type === 'error' ? 'alert-error' : 'alert-success'}>
      {message}
    </div>
  );
}

// ── Pattern 3: Logical AND (&&) ────────────────────────────────
// Renders right side only if left side is truthy
function Banner({ isVisible, text }) {
  return (
    <div>
      {isVisible && <p>{text}</p>}
    </div>
  );
}
// ⚠️ Pitfall: {count && <p>{count}</p>} — if count = 0, renders "0" not nothing!
// ✅ Fix: {count > 0 && <p>{count}</p>}   OR   {!!count && <p>{count}</p>}

// ── Pattern 4: Switch/if in separate function ─────────────────
function getAlert(type) {
  switch(type) {
    case 'error':   return <ErrorAlert />;
    case 'warning': return <WarningAlert />;
    default:        return <InfoAlert />;
  }
}
// Usage: {getAlert(alertType)}

// ── Pattern 5: Object map ──────────────────────────────────────
const COMPONENTS = {
  error:   <ErrorAlert />,
  warning: <WarningAlert />,
  info:    <InfoAlert />
};
// Usage: {COMPONENTS[type]}
```

### Rendering Lists

```jsx
function TodoList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>   {/* ← key is REQUIRED and must be unique */}
          {item.text}
        </li>
      ))}
    </ul>
  );
}
```

### The `key` Prop — Critical for Performance

```jsx
// ❌ Using array index as key — BAD for dynamic lists
{items.map((item, index) => <li key={index}>{item}</li>)}
// Problem: if items are reordered/deleted, React re-renders everything

// ✅ Use stable, unique ID
{items.map(item => <li key={item.id}>{item.name}</li>)}

// When index key is acceptable:
// - Static lists that never reorder/filter/delete
// - No stateful items (like inputs)
```

---

## 6. Props

### 🔑 Definition
> **Props (short for "properties") are read-only inputs passed from a parent component to a child. They are the primary mechanism for data flow in React.**

### Passing and Receiving Props

```jsx
// ── Parent ─────────────────────────────────────────────────────
function App() {
  return (
    <UserCard
      name="Rahul Sharma"
      age={28}
      isAdmin={true}
      skills={['React', 'Node', 'Python']}
      address={{ city: 'Mumbai', state: 'MH' }}
      onDelete={() => console.log('deleted')}
    />
  );
}

// ── Child (Object destructuring — preferred) ───────────────────
function UserCard({ name, age, isAdmin, skills, address, onDelete }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>City: {address.city}</p>
      {isAdmin && <span className="badge">Admin</span>}
      <ul>{skills.map(s => <li key={s}>{s}</li>)}</ul>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

// ── Child (using props object — less common) ───────────────────
function UserCard(props) {
  return <h2>{props.name}</h2>;
}
```

### Props Are Read-Only (Immutable)

```jsx
function Child({ count }) {
  // ❌ Never mutate props — this breaks React's data flow
  count = count + 1;  // WRONG!
  props.count = 5;    // WRONG!

  // ✅ Use local state if you need a mutable version
  const [localCount, setLocalCount] = useState(count);
}
```

### Default Props

```jsx
// ── Method 1: Default parameter values (modern, preferred) ────
function Button({ label = 'Click Me', color = 'blue', size = 'md' }) {
  return <button className={`btn btn-${color} btn-${size}`}>{label}</button>;
}

// ── Method 2: defaultProps (older, still works) ────────────────
Button.defaultProps = {
  label: 'Click Me',
  color: 'blue',
  size: 'md'
};
```

### Prop Types (Runtime Type Checking)

```jsx
import PropTypes from 'prop-types';

function UserCard({ name, age, email, role }) {
  return <div>{name}</div>;
}

UserCard.propTypes = {
  name:  PropTypes.string.isRequired,  // required string
  age:   PropTypes.number,             // optional number
  email: PropTypes.string,
  role:  PropTypes.oneOf(['admin', 'user', 'guest']),
  tags:  PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node            // any renderable content
};
```

> 💡 **Interview Note:** For production TypeScript projects, use TypeScript interfaces/types instead of PropTypes. PropTypes only checks at runtime; TypeScript checks at compile time.

```tsx
// TypeScript version (better)
interface UserCardProps {
  name: string;
  age?: number;
  role: 'admin' | 'user' | 'guest';
  onClick: () => void;
  children?: React.ReactNode;
}

function UserCard({ name, age = 18, role, onClick }: UserCardProps) {
  return <div onClick={onClick}>{name}</div>;
}
```

### Spread Props

```jsx
// ✅ Useful for passing through props to underlying elements
function Input({ label, ...rest }) {
  // 'rest' collects: type, placeholder, value, onChange, etc.
  return (
    <div>
      <label>{label}</label>
      <input {...rest} />
    </div>
  );
}

// Usage — all extra props go directly to <input>
<Input label="Email" type="email" placeholder="you@example.com" onChange={fn} />
```

### The `children` Prop

```jsx
// children = anything between opening and closing tags
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">
        {children}     {/* ← whatever you put between <Card>...</Card> */}
      </div>
    </div>
  );
}

// Usage
<Card title="My Profile">
  <p>Name: Rahul</p>
  <img src="avatar.png" alt="avatar" />
  <button>Edit</button>
</Card>
```

---

## 7. State

### 🔑 Definition
> **State is a JavaScript object managed inside a component that can change over time. When state changes, React automatically re-renders the component with the new data.**

### State vs Props

| | State | Props |
|---|---|---|
| **Owned by** | The component itself | Parent component |
| **Mutable?** | ✅ Yes — via setter | ❌ Read-only in child |
| **Triggers re-render?** | ✅ Yes | ✅ Yes (when parent re-renders) |
| **Analogy** | Memory (changes internally) | Arguments (received externally) |

### useState Hook

```jsx
import { useState } from 'react';

function Form() {
  // Syntax: const [value, setter] = useState(initialValue)
  const [name, setName]       = useState('');
  const [age, setAge]         = useState(0);
  const [isOpen, setIsOpen]   = useState(false);
  const [items, setItems]     = useState([]);
  const [user, setUser]       = useState({ name: '', email: '' });

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

### State Updates Are Asynchronous

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // ❌ WRONG — all three setCount calls use the same stale 'count'
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // Result: count goes from 0 to 1, NOT 3

    // ✅ CORRECT — use updater function (gets fresh previous state)
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // Result: count goes from 0 to 3 ✅
  };
}
```

### Updating Objects in State

```jsx
const [user, setUser] = useState({ name: 'Rahul', age: 25, city: 'Mumbai' });

// ❌ WRONG — Direct mutation (React won't re-render)
user.name = 'Priya';
setUser(user);   // same reference, no re-render!

// ✅ CORRECT — Create a new object with spread
setUser({ ...user, name: 'Priya' });  // preserves age and city

// ✅ Nested object update
const [profile, setProfile] = useState({
  user: { name: 'Rahul', location: { city: 'Mumbai' } }
});

setProfile({
  ...profile,
  user: {
    ...profile.user,
    location: {
      ...profile.user.location,
      city: 'Delhi'
    }
  }
});
// For deep nested updates, use immer library (recommended)
```

### Updating Arrays in State

```jsx
const [items, setItems] = useState(['Apple', 'Banana']);

// ── Adding ─────────────────────────────────────────────────────
setItems([...items, 'Cherry']);           // add to end
setItems(['Mango', ...items]);            // add to start

// ── Removing ──────────────────────────────────────────────────
setItems(items.filter(item => item !== 'Banana'));

// ── Updating ──────────────────────────────────────────────────
setItems(items.map(item =>
  item === 'Apple' ? 'Pineapple' : item
));

// ── Sorting (create new array first!) ────────────────────────
setItems([...items].sort()); // ✅ spread first, then sort
// ❌ items.sort() mutates the original array
```

### Lifting State Up

```jsx
// When two sibling components need to share state,
// lift the state to their common parent

function Parent() {
  const [value, setValue] = useState('');  // state lives here

  return (
    <>
      <InputChild value={value} onChange={setValue} />
      <DisplayChild value={value} />
    </>
  );
}

function InputChild({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}

function DisplayChild({ value }) {
  return <p>You typed: {value}</p>;
}
```

---

## 8. Component Composition

### 🔑 Definition
> **Composition is the React pattern of combining simple components to build complex UIs — using `children` and props instead of inheritance.**

### Containment Pattern

```jsx
// Generic container components
function Modal({ title, children, footer }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header"><h2>{title}</h2></div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

// Usage — compose freely
<Modal
  title="Confirm Delete"
  footer={<><button>Cancel</button><button>Delete</button></>}
>
  <p>Are you sure you want to delete this item?</p>
</Modal>
```

### Specialization Pattern

```jsx
// Generic base component
function Dialog({ title, message, buttonLabel, buttonColor }) {
  return (
    <div className="dialog">
      <h2>{title}</h2>
      <p>{message}</p>
      <button style={{ background: buttonColor }}>{buttonLabel}</button>
    </div>
  );
}

// Specialized versions
function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome!"
      message="Thanks for joining us."
      buttonLabel="Get Started"
      buttonColor="green"
    />
  );
}

function ErrorDialog() {
  return (
    <Dialog
      title="Error"
      message="Something went wrong."
      buttonLabel="Retry"
      buttonColor="red"
    />
  );
}
```

### Compound Components Pattern

```jsx
// Components that work together and share implicit state
function Tabs({ children }) {
  const [active, setActive] = useState(0);

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.TabList = function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
};

Tabs.Tab = function Tab({ index, children }) {
  const { active, setActive } = useContext(TabsContext);
  return (
    <button
      className={active === index ? 'active' : ''}
      onClick={() => setActive(index)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function Panel({ index, children }) {
  const { active } = useContext(TabsContext);
  return active === index ? <div>{children}</div> : null;
};

// Usage — reads like HTML
<Tabs>
  <Tabs.TabList>
    <Tabs.Tab index={0}>Profile</Tabs.Tab>
    <Tabs.Tab index={1}>Settings</Tabs.Tab>
  </Tabs.TabList>
  <Tabs.Panel index={0}><ProfileContent /></Tabs.Panel>
  <Tabs.Panel index={1}><SettingsContent /></Tabs.Panel>
</Tabs>
```

---

## 9. Component Lifecycle

### The Three Phases

```
MOUNTING              UPDATING               UNMOUNTING
──────────            ─────────              ──────────
Component             State or props         Component
added to DOM  →       change      →          removed from DOM
```

### Lifecycle in Functional Components (useEffect)

```jsx
function MyComponent({ id }) {
  const [data, setData] = useState(null);

  // ── Equivalent to componentDidMount ───────────────────────
  useEffect(() => {
    console.log('Component mounted');
    fetchData();
  }, []);  // ← empty array = run only once on mount

  // ── Equivalent to componentDidUpdate (specific prop) ──────
  useEffect(() => {
    console.log('id changed, fetching new data');
    fetchData(id);
  }, [id]);  // ← run when 'id' changes

  // ── Equivalent to componentDidMount + componentDidUpdate ──
  useEffect(() => {
    console.log('Runs after every render');
  });  // ← no array = run after every render

  // ── Equivalent to componentWillUnmount ────────────────────
  useEffect(() => {
    const timer = setInterval(() => {}, 1000);

    return () => {
      console.log('Component unmounting — cleanup!');
      clearInterval(timer);  // ← cleanup function
    };
  }, []);

  return <div>{data}</div>;
}
```

### Lifecycle Diagram

```
MOUNT:
  constructor()
       ↓
  render() ← creates Virtual DOM
       ↓
  [React updates Real DOM]
       ↓
  componentDidMount() / useEffect(fn, [])

UPDATE (state or props change):
  render() ← creates new Virtual DOM
       ↓
  [React diffs old vs new Virtual DOM]
       ↓
  [React applies minimal DOM changes]
       ↓
  componentDidUpdate() / useEffect(fn, [deps])

UNMOUNT:
  componentWillUnmount() / useEffect cleanup function
```

---

## 10. Controlled vs Uncontrolled Components

### Controlled Component (React owns the data)

```jsx
// React state IS the source of truth
function ControlledForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}                             // ← value comes from state
        onChange={e => setEmail(e.target.value)}  // ← state updates on change
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Uncontrolled Component (DOM owns the data)

```jsx
import { useRef } from 'react';

// DOM manages the value; you read it when needed with a ref
function UncontrolledForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Read values directly from DOM at submit time
    console.log({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" ref={emailRef} defaultValue="initial@value.com" />
      <input type="password" ref={passwordRef} />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Controlled vs Uncontrolled — When to Use

| Feature | Controlled | Uncontrolled |
|---|---|---|
| **Source of truth** | React state | DOM |
| **Get value** | From state variable | Via `ref.current.value` |
| **Set initial value** | `value={state}` | `defaultValue="..."` |
| **Real-time validation** | ✅ Easy | ❌ Hard |
| **Instant feedback** | ✅ (disable button, show count) | ❌ |
| **Form libraries (RHF)** | Both supported | Preferred by React Hook Form |
| **Performance** | More re-renders | Fewer re-renders |
| **Recommended for** | Most cases | File inputs, simple forms |

> 💡 **Interview Note:** File inputs (`<input type="file">`) are **always uncontrolled** in React because their value is set by the user, not by code.

---

## 11. Pure Components & React.memo

### 🔑 The Problem

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ExpensiveChild />   {/* ← This re-renders every time Parent re-renders! */}
    </>
  );
}

function ExpensiveChild() {
  console.log('ExpensiveChild rendered'); // logs every time
  return <div>Heavy computation result here</div>;
}
```

### React.memo — Memoize Functional Components

```jsx
// React.memo wraps a component — skips re-render if props haven't changed
const ExpensiveChild = React.memo(function ExpensiveChild({ name }) {
  console.log('ExpensiveChild rendered'); // only when 'name' changes
  return <div>Hello, {name}</div>;
});

// OR
const ExpensiveChild = React.memo(({ name }) => {
  return <div>Hello, {name}</div>;
});
```

### React.memo with Custom Comparison

```jsx
const UserCard = React.memo(
  function UserCard({ user }) {
    return <div>{user.name}</div>;
  },
  // Custom comparison: return true = skip re-render, false = re-render
  (prevProps, nextProps) => prevProps.user.id === nextProps.user.id
);
```

### PureComponent (Class Equivalent)

```jsx
// Regular Component: re-renders on every parent re-render
class Regular extends Component {
  render() { return <div>{this.props.name}</div>; }
}

// PureComponent: shallow comparison of props and state
// Only re-renders if props/state actually changed
class Pure extends PureComponent {
  render() { return <div>{this.props.name}</div>; }
}
```

### When React.memo Does NOT Help

```jsx
// ❌ New function reference on every render — memo is bypassed
<MemoComponent onClick={() => doSomething()} />
// Fix: useCallback

// ❌ New object reference on every render — memo is bypassed
<MemoComponent style={{ color: 'red' }} />
// Fix: useMemo or define outside component

// ❌ New array reference on every render — memo is bypassed
<MemoComponent items={[1, 2, 3]} />
// Fix: useMemo
```

---

## 12. Component Best Practices

### Naming & Structure

```
✅ PascalCase for component names: UserCard, NavBar, LoginForm
✅ Descriptive names that say WHAT it is: ProductList, not List
✅ One component per file (usually)
✅ File name matches component name: UserCard.jsx
✅ Group related components in folders: /components/auth/, /components/ui/
```

### Keep Components Small & Focused

```jsx
// ❌ God component — does everything
function Dashboard() {
  // 300 lines of state, effects, handlers, and JSX
}

// ✅ Decomposed
function Dashboard() {
  return (
    <div>
      <DashboardHeader />
      <StatsGrid />
      <RecentActivity />
      <QuickActions />
    </div>
  );
}
```

### Single Responsibility Principle

```
Each component should do ONE thing:
  UserAvatar    → shows user avatar image
  UserBadge     → shows role badge
  UserCard      → composes Avatar + Badge + name info
  UserList      → renders a list of UserCards
```

### Extract Custom Hooks for Logic

```jsx
// ❌ Logic tangled with UI
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <div>{user.name}</div>;
}

// ✅ Logic extracted to custom hook
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
}

function UserProfile({ userId }) {
  const { user, loading, error } = useUser(userId);

  if (loading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <div>{user.name}</div>;
}
```

### Error Boundaries

```jsx
// Class components only (as of React 18)
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Error caught:', error, info.componentStack);
    logToErrorTracking(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage — wrap any part of your tree
<ErrorBoundary>
  <UserProfile userId={123} />
</ErrorBoundary>
```

---

## 🎯 Quick Interview Cheat Sheet

| Question | Quick Answer |
|---|---|
| What is a component? | A JS function/class that accepts props and returns JSX |
| Functional vs Class? | Functional = modern, hooks support, less boilerplate. Class = legacy, lifecycle methods |
| What is JSX? | HTML-like syntax that compiles to `React.createElement()` |
| What are props? | Read-only inputs passed from parent to child |
| What is state? | Mutable data owned by a component; changes trigger re-render |
| Can you modify props? | ❌ Never — props are immutable in the child |
| `value` vs `defaultValue`? | `value` = controlled; `defaultValue` = uncontrolled (initial value only) |
| What is lifting state up? | Moving shared state to the nearest common ancestor |
| What is React.memo? | HOC that memoizes a component — skips re-render if props unchanged |
| Difference: element vs component? | Element = plain JS object (blueprint); Component = function that returns elements |
| What is a Fragment? | `<>...</>` — groups elements without adding extra DOM nodes |
| Why is `key` prop important? | Helps React identify changed list items for efficient reconciliation |
| What is an Error Boundary? | A class component that catches JS errors in its subtree and shows fallback UI |
| Controlled vs Uncontrolled? | Controlled: React state drives value. Uncontrolled: DOM drives value, read via ref |
| When to use PureComponent? | When you want to skip re-renders on unchanged shallow props/state (class components) |
| What is composition in React? | Building complex UIs by combining simple components via `children` and props |

---

*📝 Next Parts: Hooks (useState, useEffect, useRef, useMemo, useCallback, custom hooks) · React Router · Context API · Performance Optimization · React 19 Features*

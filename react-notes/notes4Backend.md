# Node.js — Complete Interview-Ready Notes

> Covers: **Getting Started with Node.js** · **Diving into Node.js**

---

## Table of Contents

1. [Introduction to Node.js](#1-introduction-to-nodejs)
2. [Installing Node.js](#2-installing-nodejs)
3. [Non-Blocking I/O & the Event Loop](#3-non-blocking-io--the-event-loop)
4. [Node REPL](#4-node-repl)
5. [Global Objects in Node.js](#5-global-objects-in-nodejs)
6. [CommonJS Modules](#6-commonjs-modules)
7. [ES Modules (ESM)](#7-es-modules-esm)
8. [Module Wrapper Function](#8-module-wrapper-function)
9. [Built-in Modules](#9-built-in-modules)
10. [Quick-Fire Interview Q&A](#10-quick-fire-interview-qa)

---

## 1. Introduction to Node.js

### What is Node.js?

Node.js is an **open-source, cross-platform JavaScript runtime environment** built on **Google's V8 engine** (the same engine that powers Chrome). It allows JavaScript to run **outside the browser** — on servers, desktops, IoT devices, and more.

> "Node.js is not a framework, not a language — it is a **runtime**."

### Key Architecture

```
┌──────────────────────────────────┐
│         Your Application         │
├──────────────────────────────────┤
│         Node.js APIs / stdlib    │
├──────────────────────────────────┤
│  libuv (async I/O, Event Loop)   │
├──────────────┬───────────────────┤
│   V8 Engine  │  Node C++ Bindings│
└──────────────┴───────────────────┘
```

| Component | Role |
|-----------|------|
| **V8** | Compiles & executes JavaScript → machine code |
| **libuv** | Cross-platform async I/O, thread pool, event loop |
| **Node Bindings** | Bridges JS and C++ native system calls |
| **npm** | Default package manager bundled with Node |

### Why Node.js? Core Strengths

- **Single-threaded, event-driven** — no thread overhead for concurrent requests
- **Non-blocking I/O** — handles thousands of simultaneous connections efficiently
- **Same language on client & server** — full-stack JavaScript
- **Massive ecosystem** — npm hosts 2M+ packages
- **Fast startup** — ideal for microservices and serverless functions

### Where Node.js Excels

- REST APIs & GraphQL servers
- Real-time apps (chat, live dashboards, gaming)
- Streaming applications
- CLI tools and build tooling (webpack, vite, eslint)
- Microservices & serverless

### Where Node.js Is NOT Ideal

- CPU-intensive work (video encoding, ML training) — blocks the event loop
- Applications requiring multi-threading out of the box (use Worker Threads for this)

---

## 2. Installing Node.js

### Installation Methods

#### Method 1 — Official Installer (Recommended for beginners)

Download from [nodejs.org](https://nodejs.org):
- **LTS (Long Term Support)** — stable, production-safe (even-numbered: 18, 20, 22)
- **Current** — latest features, less stable (odd-numbered: 19, 21)

#### Method 2 — nvm (Node Version Manager) ✅ Best Practice

Allows you to install and switch between multiple Node versions.

```bash
# Install nvm (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install latest LTS
nvm install --lts

# Install a specific version
nvm install 20.11.0

# Switch versions
nvm use 20.11.0

# Set a default
nvm alias default 20.11.0

# List installed versions
nvm ls
```

#### Method 3 — Package Managers

```bash
# macOS (Homebrew)
brew install node

# Ubuntu/Debian
sudo apt update && sudo apt install nodejs npm

# Windows (winget)
winget install OpenJS.NodeJS.LTS
```

### Verifying Installation

```bash
node --version      # e.g., v20.11.0
npm --version       # e.g., 10.2.4
npx --version       # e.g., 10.2.4
```

### Running Your First Script

```bash
# Create a file
echo "console.log('Hello, Node.js!')" > app.js

# Execute it
node app.js          # Hello, Node.js!

# Run inline
node -e "console.log(process.version)"
```

### npm Basics

```bash
npm init -y                  # Create package.json
npm install express          # Install a dependency
npm install -D nodemon       # Dev dependency
npm install -g typescript    # Global install
npm run start                # Run a script from package.json
npm list                     # List installed packages
```

---

## 3. Non-Blocking I/O & the Event Loop

### The Problem with Blocking (Traditional Servers)

In a traditional multi-threaded server (Apache, Java EE):
- Each request gets its own thread
- While thread waits for DB/file/network → it **blocks** (CPU idle, memory used)
- Under high load → thousands of threads → memory exhaustion

```
Request 1 → Thread 1 → [wait for DB...] → respond
Request 2 → Thread 2 → [wait for file..] → respond
Request 3 → Thread 3 → [wait for API...] → respond
```

### Node.js: Non-Blocking I/O

Node.js uses a **single main thread** + **libuv's thread pool** for I/O.

- I/O operations (file, network, DB) are **offloaded** to the OS/thread pool
- Main thread keeps running other code
- When I/O completes → a **callback** is placed in the event queue
- Event loop picks it up and executes the callback

```
Request 1 ─┐
Request 2 ─┼─► Single Thread ──► Event Loop ──► Callback Queue
Request 3 ─┘
```

### Blocking vs Non-Blocking Code

```javascript
// ❌ BLOCKING — synchronous file read (DO NOT use in production servers)
const fs = require('fs');
const data = fs.readFileSync('file.txt', 'utf8');  // Stops everything
console.log(data);
console.log('This runs AFTER file is read');

// ✅ NON-BLOCKING — asynchronous file read
const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);                     // Runs when file is ready
});
console.log('This runs IMMEDIATELY');      // Runs before file is read
```

### The Event Loop — Deep Dive

The event loop is the heart of Node.js. It runs **continuously**, checking queues and executing callbacks.

```
   ┌───────────────────────────┐
   │         timers            │  ← setTimeout, setInterval callbacks
   ├───────────────────────────┤
   │     pending callbacks     │  ← I/O errors deferred to next loop
   ├───────────────────────────┤
   │       idle, prepare       │  ← internal use
   ├───────────────────────────┤
   │           poll            │  ← retrieve new I/O events (MAIN PHASE)
   ├───────────────────────────┤
   │           check           │  ← setImmediate callbacks
   ├───────────────────────────┤
   │      close callbacks      │  ← socket.on('close', ...) etc.
   └───────────────────────────┘
         ↑________________________↓  (loops forever until empty)
```

#### Phase Descriptions

| Phase | What runs here |
|-------|---------------|
| **timers** | `setTimeout` and `setInterval` callbacks (after minimum delay) |
| **pending callbacks** | OS-level errors (e.g., TCP ECONNREFUSED) |
| **poll** | Waits for new I/O events; executes their callbacks |
| **check** | `setImmediate` callbacks |
| **close callbacks** | Cleanup (e.g., socket close) |

#### Microtask Queue (Higher Priority)

Between each phase, Node drains the **microtask queue**:
1. `process.nextTick()` callbacks (highest priority)
2. `Promise.then()` / `async/await` continuations

```javascript
console.log('1 - synchronous');

setTimeout(() => console.log('5 - setTimeout'), 0);

setImmediate(() => console.log('4 - setImmediate'));

Promise.resolve().then(() => console.log('3 - Promise.then'));

process.nextTick(() => console.log('2 - nextTick'));

// Output order: 1, 2, 3, 4, 5
```

#### Priority Order (Most → Least):

```
Synchronous code
  → process.nextTick()
    → Promise microtasks
      → setImmediate
        → setTimeout / setInterval
```

### libuv Thread Pool

For operations the OS doesn't handle asynchronously (DNS lookups, file system, crypto), libuv uses a **thread pool** (default: 4 threads).

```bash
# Increase thread pool size (env variable)
UV_THREADPOOL_SIZE=8 node app.js
```

### Callback Pattern

The classic Node.js async pattern (Error-First Callbacks):

```javascript
// Convention: first argument is always error (null if none)
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error:', err.message);
        return;
    }
    console.log(JSON.parse(data));
});
```

### Promises and async/await (Modern Node.js)

```javascript
const fs = require('fs').promises;  // Promise-based fs

async function readConfig() {
    try {
        const data = await fs.readFile('config.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Failed:', err.message);
    }
}

readConfig().then(config => console.log(config));
```

---

## 4. Node REPL

### What is the REPL?

**REPL** = **R**ead–**E**val–**P**rint–**L**oop

An interactive shell to execute JavaScript expressions one line at a time. Launch it by running `node` with no arguments.

```bash
$ node
Welcome to Node.js v20.11.0.
Type ".help" for more information.
>
```

### Basic Usage

```javascript
> 2 + 2
4

> const name = "Node.js"
undefined

> `Hello, ${name}!`
'Hello, Node.js!'

> [1, 2, 3].map(x => x * 2)
[ 2, 4, 6 ]

> new Date().toISOString()
'2024-03-15T12:00:00.000Z'
```

### REPL Special Commands

| Command | Description |
|---------|-------------|
| `.help` | Show all REPL commands |
| `.exit` | Exit the REPL (also Ctrl+D) |
| `.save filename.js` | Save current session to a file |
| `.load filename.js` | Load and execute a JS file |
| `.clear` | Clear the REPL context (reset variables) |
| `.editor` | Enter multi-line editor mode (Ctrl+D to run) |
| `.break` | Exit multi-line mode without running |

### Multi-line Mode

```javascript
> function greet(name) {
...   return `Hello, ${name}!`;
... }
undefined

> greet("World")
'Hello, World!'
```

### Special REPL Variables

```javascript
> _          // Last evaluated expression
> _error     // Last thrown error
```

### Tab Completion

Press **Tab** twice to see all available globals, or type `process.` + Tab to see all process properties.

### REPL in Code (Programmatic)

```javascript
const repl = require('repl');

const r = repl.start({ prompt: 'myApp > ' });

// Inject custom context
r.context.greet = (name) => `Hello, ${name}!`;
```

---

## 5. Global Objects in Node.js

### Browser vs Node.js Globals

| Browser | Node.js | Notes |
|---------|---------|-------|
| `window` | `global` | Top-level object |
| `document` | ❌ | No DOM in Node |
| `localStorage` | ❌ | No Web Storage |
| `fetch` (modern) | `fetch` (v18+) | Built-in since v18 |
| `console` | `console` | Available in both |
| `setTimeout` | `setTimeout` | Available in both |

> In Node.js 22+, `globalThis` works in both environments as the universal global reference.

### The `global` Object

```javascript
// Browser: window.x = 5;
// Node.js:
global.myVar = 42;
console.log(myVar);  // 42 — accessible everywhere

// But best practice: DON'T pollute global scope
```

### `__filename` and `__dirname`

These are **not truly global** — they are injected by the Module Wrapper (see Section 8), but behave like globals in each file.

```javascript
console.log(__filename);
// /home/user/projects/app/index.js

console.log(__dirname);
// /home/user/projects/app
```

> **Note:** These are `undefined` in ES Modules (`.mjs`). Use `import.meta.url` instead.

### `process` Object

The most important global in Node.js. Provides info about the current process.

```javascript
// Version info
console.log(process.version);        // 'v20.11.0'
console.log(process.versions);       // { node: '20.11.0', v8: '11.3...', ... }
console.log(process.platform);       // 'linux', 'darwin', 'win32'
console.log(process.arch);           // 'x64', 'arm64'

// Working directory
console.log(process.cwd());          // Current working directory
process.chdir('/tmp');               // Change working directory

// Environment variables
console.log(process.env.NODE_ENV);   // 'development', 'production', etc.
console.log(process.env.PATH);

// Command-line arguments
console.log(process.argv);
// [ '/usr/bin/node', '/path/to/app.js', 'arg1', 'arg2' ]
// process.argv[0] = node executable
// process.argv[1] = script path
// process.argv[2+] = your arguments

// Exit process
process.exit(0);   // 0 = success
process.exit(1);   // non-zero = error

// Process ID
console.log(process.pid);           // e.g., 12345

// Memory usage
console.log(process.memoryUsage());
// { rss: 30MB, heapTotal: 10MB, heapUsed: 7MB, external: 1MB }

// CPU usage
console.log(process.cpuUsage());
// { user: 38579, system: 6966 } (microseconds)

// Uptime
console.log(process.uptime());      // seconds since process started
```

#### Standard Streams

```javascript
process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
    process.stdout.write(`You typed: ${data}`);
});

process.stderr.write('An error occurred\n');
```

#### Process Events

```javascript
// Uncaught exceptions (last resort — always fix root cause)
process.on('uncaughtException', (err) => {
    console.error('Uncaught:', err.message);
    process.exit(1);
});

// Unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Gracefully shutting down...');
    // close DB connections, servers etc.
    process.exit(0);
});

process.on('exit', (code) => {
    // Synchronous only — no async here!
    console.log(`Process exiting with code: ${code}`);
});
```

### `console` Object

```javascript
console.log('Info message');
console.error('Error message');       // Writes to stderr
console.warn('Warning message');
console.dir(obj, { depth: null });    // Inspect object (unlimited depth)
console.table([{ a: 1 }, { a: 2 }]); // Tabular data
console.time('label');
// ... some code ...
console.timeEnd('label');             // "label: 5.432ms"
console.count('myLabel');             // Count invocations
console.trace('tracing');             // Print stack trace
console.assert(1 === 2, 'Math failed!'); // Throws if false
```

### Timer Globals

```javascript
// Execute once after delay (ms)
const t = setTimeout(() => console.log('after 1s'), 1000);
clearTimeout(t);  // cancel it

// Repeat every interval
const i = setInterval(() => console.log('tick'), 500);
clearInterval(i);

// Execute after current event loop phase completes
setImmediate(() => console.log('immediate'));

// Execute before next event loop tick (highest async priority)
process.nextTick(() => console.log('next tick'));

// High-resolution timer
const [sec, nano] = process.hrtime();
const [sec2, nano2] = process.hrtime([sec, nano]); // Time since start
```

### `Buffer` Global

```javascript
// Represents raw binary data
const buf = Buffer.from('Hello', 'utf8');
console.log(buf);           // <Buffer 48 65 6c 6c 6f>
console.log(buf.toString()); // 'Hello'

const buf2 = Buffer.alloc(10);      // 10 bytes, zero-filled
const buf3 = Buffer.allocUnsafe(10); // 10 bytes, NOT zero-filled (faster)
```

### `URL` and `URLSearchParams` Globals (v10+)

```javascript
const url = new URL('https://example.com/path?q=node&v=20');
console.log(url.hostname);     // 'example.com'
console.log(url.pathname);     // '/path'
console.log(url.searchParams.get('q'));  // 'node'
```

---

## 6. CommonJS Modules

### What Are Modules?

Modules are the mechanism for splitting code across files. Each file in Node.js is its own **module** — variables and functions are **private** by default unless explicitly exported.

### CommonJS (CJS) — The Default

CommonJS is the original module system built into Node.js. It uses `require()` to import and `module.exports` to export.

```javascript
// math.js (exporting)
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
const PI = 3.14159;

module.exports = { add, subtract, PI };
```

```javascript
// app.js (importing)
const math = require('./math');     // .js extension optional
console.log(math.add(5, 3));        // 8
console.log(math.PI);               // 3.14159
```

### Export Patterns

```javascript
// Pattern 1: Export object (most common)
module.exports = { add, subtract };

// Pattern 2: Export single function or class
module.exports = function greet(name) { return `Hi, ${name}`; };

// Pattern 3: exports shorthand (same as module.exports initially)
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;

// ⚠️ GOTCHA: Never reassign exports directly
exports = { add };       // ❌ BREAKS the reference to module.exports
module.exports = { add }; // ✅ Always use module.exports for reassignment
```

### Require Resolution Algorithm

When you call `require('something')`, Node resolves in this order:

```
1. Core module?      → return core (e.g., 'fs', 'path', 'http')
2. Starts with ./ or ../? → load as file
   a. Try exact path
   b. Try + .js
   c. Try + .json
   d. Try + .node (native addon)
   e. Try as directory (look for index.js or package.json "main")
3. node_modules?     → traverse up directory tree looking in node_modules/
```

```javascript
require('fs')           // Core module
require('./utils')      // Relative — loads ./utils.js
require('../config')    // Parent directory
require('express')      // npm package in node_modules
require('/absolute/path/file') // Absolute path
```

### require() is Synchronous and Cached

```javascript
// ✅ Cached — the same object is returned on subsequent requires
const a = require('./config');
const b = require('./config');
console.log(a === b);  // true — same reference from cache

// Clear cache (advanced, rarely needed)
delete require.cache[require.resolve('./config')];
```

### require.resolve()

```javascript
// Returns the resolved file path without loading
const path = require.resolve('./utils');
console.log(path); // /absolute/path/to/utils.js
```

### Circular Dependencies

CJS handles circular requires by returning a **partially-built** module:

```javascript
// a.js
const b = require('./b');
console.log('a: b.done =', b.done); // a: b.done = false
exports.done = true;

// b.js
const a = require('./a');
console.log('b: a.done =', a.done); // b: a.done = false (incomplete a!)
exports.done = true;
```

> Best practice: **avoid circular dependencies** through good architecture.

---

## 7. ES Modules (ESM)

### What is ESM?

ES Modules are the **official ECMAScript standard** module system (introduced in ES2015/ES6). Node.js supports them natively from **v12+** (stable in v14+).

### Enabling ESM

Three ways to use ESM in Node.js:

```bash
# Method 1: Use .mjs file extension
# app.mjs automatically treated as ESM

# Method 2: Add "type": "module" in package.json
{
  "type": "module"
}
# Now ALL .js files in this package are ESM

# Method 3: .cjs extension forces CommonJS even in "type":"module" package
```

### ESM Syntax

```javascript
// math.mjs (exporting)
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export const PI = 3.14159;
export default class Calculator { /* ... */ }
```

```javascript
// app.mjs (importing)
import Calculator, { add, subtract, PI } from './math.mjs';

// Rename on import
import { add as sum } from './math.mjs';

// Import everything as namespace
import * as math from './math.mjs';
console.log(math.add(1, 2));

// Dynamic import (lazy loading, works in both CJS and ESM)
const { add } = await import('./math.mjs');
```

### Named vs Default Exports

```javascript
// named exports — multiple per file
export function foo() {}
export const bar = 42;

// default export — one per file
export default function main() {}

// Import both
import main, { foo, bar } from './module.mjs';
```

### ESM Key Differences from CJS

| Feature | CommonJS (`require`) | ES Modules (`import`) |
|---------|---------------------|----------------------|
| Syntax | `require()` / `module.exports` | `import` / `export` |
| Loading | **Synchronous** | **Asynchronous** (static analysis) |
| Time of execution | Runtime | Compile time (static) |
| Dynamic imports | ✅ `require()` always | ✅ `import()` (dynamic only) |
| Tree-shaking | ❌ No | ✅ Yes (bundlers can tree-shake) |
| `__dirname` / `__filename` | ✅ Available | ❌ Not available |
| Top-level `await` | ❌ Not supported | ✅ Supported |
| Circular deps | Partial object | Live bindings |
| JSON import | ✅ `require('./data.json')` | ✅ with `assert { type: 'json' }` |

### ESM in Node.js: Practical Replacements

```javascript
// __dirname equivalent in ESM
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Or with import.meta directly
console.log(import.meta.url);    // file:///path/to/file.mjs
console.log(import.meta.dirname); // /path/to (Node 21.2+)
```

### Top-Level Await (ESM Only)

```javascript
// Only works in ESM (.mjs or "type":"module")
const data = await fetch('https://api.example.com/data').then(r => r.json());
console.log(data);  // No async wrapper needed!
```

### Importing CJS from ESM

```javascript
// ✅ You can import CJS modules from ESM (default import only)
import lodash from 'lodash';

// ❌ Named imports from CJS don't work directly
import { cloneDeep } from 'lodash'; // May fail — CJS doesn't export statically
```

### Importing ESM from CJS

```javascript
// ❌ Cannot use require() on ESM modules
// ✅ Use dynamic import instead
async function loadESM() {
    const module = await import('./esm-module.mjs');
    module.someFunction();
}
```

---

## 8. Module Wrapper Function

### The Secret Behind Every Node.js File

Before Node.js executes any CommonJS module, it **wraps the entire file contents** in a function. This is the **Module Wrapper Function**.

### The Wrapper

```javascript
(function(exports, require, module, __filename, __dirname) {
    // === YOUR FILE CODE RUNS HERE ===
});
```

### What This Means

This wrapper is the reason:

1. **`__filename`** and **`__dirname`** exist — they're injected as parameters, not true globals
2. **`exports`, `require`, `module`** exist — injected as parameters
3. Variables declared with `var`, `let`, `const` are **file-scoped**, not global
4. **`this`** at the top level of a module equals `exports` (not `global`)

### Demonstration

```javascript
// Prove the wrapper exists
console.log(arguments);
// [Arguments] {
//   '0': {},                         ← exports
//   '1': [Function: require],        ← require
//   '2': Module { id: '.', ... },    ← module
//   '3': '/path/to/file.js',         ← __filename
//   '4': '/path/to'                  ← __dirname
// }

// Top-level this === exports
console.log(this === exports);   // true
console.log(this === global);    // false
```

### How It All Works

```javascript
// When you write in myModule.js:
const secret = 'hidden';
exports.publicValue = 42;

// Node.js actually runs:
(function(exports, require, module, __filename, __dirname) {
    const secret = 'hidden';     // Scoped to THIS function — private!
    exports.publicValue = 42;    // Attached to the exports object — public!
})(module.exports, require, module, '/path/myModule.js', '/path');
```

### The `module.exports` vs `exports` Relationship

```javascript
// Initially: module.exports === exports (same object reference)
console.log(module.exports === exports); // true

// exports is a SHORTCUT reference
exports.foo = 'bar';          // ✅ Works — mutates the shared object
module.exports.foo = 'bar';   // ✅ Same thing

// GOTCHA: Reassigning exports breaks the link!
exports = { foo: 'bar' };    // ❌ exports now points to a NEW object
                              // module.exports still points to original (empty) {}
                              // Nothing gets exported!

// Always use module.exports when reassigning:
module.exports = { foo: 'bar' };  // ✅ Correct
```

### Viewing the Wrapper

```javascript
const Module = require('module');
console.log(Module.wrapper);
// [
//   '(function(exports, require, module, __filename, __dirname) { ',
//   '\n});'
// ]
```

---

## 9. Built-in Modules

Node.js ships with a rich set of built-in (core) modules. No npm install required.

### Importing Core Modules

```javascript
// CommonJS
const fs = require('fs');
const path = require('path');

// ESM
import fs from 'fs';
import path from 'path';

// With 'node:' prefix (recommended — explicit, faster, avoids npm conflicts)
import fs from 'node:fs';
const path = require('node:path');
```

---

### `fs` — File System

```javascript
const fs = require('node:fs');
const fsp = require('node:fs').promises;  // Promise-based API

// --- Synchronous (blocking — avoid in servers) ---
const data = fs.readFileSync('file.txt', 'utf8');
fs.writeFileSync('out.txt', 'Hello!');

// --- Asynchronous Callback ---
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

fs.writeFile('out.txt', 'content', (err) => { if (err) throw err; });

// --- Promise API (recommended) ---
const data = await fsp.readFile('file.txt', 'utf8');
await fsp.writeFile('out.txt', data);
await fsp.appendFile('log.txt', 'new line\n');
await fsp.rename('old.txt', 'new.txt');
await fsp.unlink('file.txt');          // Delete file
await fsp.mkdir('newDir', { recursive: true });
await fsp.rmdir('dir', { recursive: true });
const files = await fsp.readdir('./');
const stats = await fsp.stat('file.txt');

// File stats
console.log(stats.isFile());           // true
console.log(stats.isDirectory());      // false
console.log(stats.size);               // bytes
console.log(stats.mtime);             // last modified Date

// Watching files
fs.watch('file.txt', (eventType, filename) => {
    console.log(`${filename} changed: ${eventType}`);
});

// Streams (for large files — memory efficient)
const readable = fs.createReadStream('large.txt', { encoding: 'utf8' });
const writable = fs.createWriteStream('output.txt');
readable.pipe(writable);
```

---

### `path` — Path Utilities

```javascript
const path = require('node:path');

path.join('/foo', 'bar', 'baz');       // '/foo/bar/baz'
path.join('/foo', '../bar');           // '/bar' (resolves ..)
path.resolve('foo', 'bar');           // '/cwd/foo/bar' (absolute)
path.basename('/foo/bar/file.js');     // 'file.js'
path.basename('/foo/bar/file.js', '.js'); // 'file'
path.dirname('/foo/bar/file.js');      // '/foo/bar'
path.extname('file.js');               // '.js'
path.extname('archive.tar.gz');        // '.gz'
path.parse('/foo/bar/file.js');
// { root: '/', dir: '/foo/bar', base: 'file.js', ext: '.js', name: 'file' }

path.format({ dir: '/foo/bar', name: 'file', ext: '.js' }); // '/foo/bar/file.js'

path.isAbsolute('/foo/bar');           // true
path.isAbsolute('foo/bar');            // false

path.relative('/foo/bar', '/foo/baz'); // '../baz'

path.sep;    // '/' on Unix, '\\' on Windows
path.delimiter; // ':' on Unix, ';' on Windows

// Best practice for cross-platform paths
const configPath = path.join(__dirname, 'config', 'settings.json');
```

---

### `os` — Operating System

```javascript
const os = require('node:os');

os.platform();          // 'linux', 'darwin', 'win32'
os.arch();              // 'x64', 'arm64'
os.release();           // OS version string
os.type();              // 'Linux', 'Darwin', 'Windows_NT'

os.homedir();           // '/home/username'
os.tmpdir();            // '/tmp'
os.hostname();          // 'my-machine'

os.cpus();              // Array of CPU info objects
os.cpus().length;       // Number of CPU cores

os.totalmem();          // Total RAM in bytes
os.freemem();           // Free RAM in bytes

os.networkInterfaces(); // Network interface details
os.uptime();            // System uptime in seconds

os.EOL;                 // '\n' on Unix, '\r\n' on Windows
```

---

### `events` — EventEmitter

The backbone of Node.js. `fs`, `http`, `stream` all extend EventEmitter.

```javascript
const EventEmitter = require('node:events');

// Creating a custom event emitter
class TaskRunner extends EventEmitter {
    run(task) {
        this.emit('start', task);
        try {
            const result = task();
            this.emit('done', result);
        } catch (err) {
            this.emit('error', err);
        }
    }
}

const runner = new TaskRunner();

runner.on('start', (task) => console.log('Task started'));
runner.on('done', (result) => console.log('Result:', result));
runner.on('error', (err) => console.error('Error:', err.message));

// once — fires only once
runner.once('start', () => console.log('First run only'));

// off — remove listener
const handler = () => console.log('done');
runner.on('done', handler);
runner.off('done', handler);

// List listeners
console.log(runner.listenerCount('done'));  // 1
console.log(runner.eventNames());           // ['start', 'done', 'error']

// Max listeners (default 10, increase to avoid warnings)
runner.setMaxListeners(20);

runner.run(() => 42);  // logs: Task started, Result: 42
```

---

### `http` — HTTP Server

```javascript
const http = require('node:http');

// Simple server
const server = http.createServer((req, res) => {
    // req = IncomingMessage, res = ServerResponse
    console.log(`${req.method} ${req.url}`);

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Hello Node.js!</h1>');
    } else if (req.url === '/api/data') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello API', time: Date.now() }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, 'localhost', () => {
    console.log('Server running at http://localhost:3000');
});

// HTTP client request
http.get('http://api.example.com/data', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(JSON.parse(data)));
});
```

---

### `url` — URL Parsing

```javascript
const { URL, URLSearchParams } = require('node:url');

const myUrl = new URL('https://user:pass@example.com:8080/path?q=test#hash');

myUrl.protocol;    // 'https:'
myUrl.host;        // 'example.com:8080'
myUrl.hostname;    // 'example.com'
myUrl.port;        // '8080'
myUrl.pathname;    // '/path'
myUrl.search;      // '?q=test'
myUrl.hash;        // '#hash'
myUrl.username;    // 'user'
myUrl.password;    // 'pass'

myUrl.searchParams.get('q');        // 'test'
myUrl.searchParams.set('page', '2');
myUrl.searchParams.append('tag', 'node');
myUrl.searchParams.has('q');        // true
myUrl.searchParams.delete('q');

for (const [key, val] of myUrl.searchParams) {
    console.log(key, val);
}
```

---

### `crypto` — Cryptography

```javascript
const crypto = require('node:crypto');

// Hashing
const hash = crypto.createHash('sha256').update('password').digest('hex');

// HMAC
const hmac = crypto.createHmac('sha256', 'secret').update('data').digest('hex');

// Random bytes (for tokens, salts)
const token = crypto.randomBytes(32).toString('hex');

// Secure password hashing
const salt = crypto.randomBytes(16).toString('hex');
crypto.scrypt('mypassword', salt, 64, (err, key) => {
    const hash = key.toString('hex');
});

// UUID v4 (Node 14.17+)
const id = crypto.randomUUID();  // 'a1b2c3d4-...'
```

---

### `stream` — Streams

Streams handle data piece by piece — ideal for large files or network data.

```javascript
const { Readable, Writable, Transform, pipeline } = require('node:stream');
const { promisify } = require('node:util');
const pipelineAsync = promisify(pipeline);

// Readable stream (data source)
const readable = new Readable({
    read() {
        this.push('Hello ');
        this.push('World');
        this.push(null);  // Signal end
    }
});

// Transform stream (modify data)
const upper = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
});

// Pipeline (auto error handling + cleanup)
await pipelineAsync(readable, upper, process.stdout);
// Output: HELLO WORLD

// 4 stream types:
// Readable  — can be read from (fs.createReadStream)
// Writable  — can be written to (fs.createWriteStream)
// Duplex    — both readable and writable (net.Socket)
// Transform — duplex that modifies data (zlib.createGzip)
```

---

### `util` — Utilities

```javascript
const util = require('node:util');

// Promisify callback-based functions
const fs = require('node:fs');
const readFile = util.promisify(fs.readFile);
const data = await readFile('file.txt', 'utf8');

// Inspect objects (deep, circular-safe)
console.log(util.inspect({ a: 1, b: [1,2,3] }, { depth: null, colors: true }));

// Format strings
util.format('Hello %s, you are %d years old', 'Alice', 30);
// 'Hello Alice, you are 30 years old'

// Type checking
util.types.isDate(new Date());          // true
util.types.isPromise(Promise.resolve()); // true
util.types.isRegExp(/abc/);             // true

// Deprecation warning
const oldFn = util.deprecate(() => {}, 'Use newFn instead');
```

---

### `child_process` — Spawn Processes

```javascript
const { exec, spawn, execFile, fork } = require('node:child_process');
const { promisify } = require('node:util');
const execAsync = promisify(exec);

// exec — runs in shell, buffers output
const { stdout, stderr } = await execAsync('ls -la');
console.log(stdout);

// spawn — streams output, better for large output
const ls = spawn('ls', ['-la', '/']);
ls.stdout.on('data', data => process.stdout.write(data));
ls.on('close', code => console.log(`Exited: ${code}`));

// fork — spawn a new Node.js process (IPC enabled)
const worker = fork('./worker.js');
worker.send({ task: 'compute' });
worker.on('message', msg => console.log('Result:', msg));
```

---

### Other Important Core Modules

| Module | Purpose | Common Use |
|--------|---------|------------|
| `node:buffer` | Binary data | `Buffer.from()`, `Buffer.alloc()` |
| `node:net` | TCP/Unix sockets | Raw socket servers |
| `node:dns` | DNS lookups | `dns.lookup()`, `dns.resolve()` |
| `node:zlib` | Compression | gzip/deflate streams |
| `node:assert` | Testing assertions | `assert.strictEqual()` |
| `node:timers/promises` | Promise timers | `setTimeout`, `setInterval` as promises |
| `node:readline` | Line-by-line stdin | CLI input, file line reading |
| `node:cluster` | Multi-process | Scale across CPU cores |
| `node:worker_threads` | True threads | CPU-intensive tasks |
| `node:perf_hooks` | Performance | `performance.now()`, `PerformanceObserver` |

---

## 10. Quick-Fire Interview Q&A

**Q: What is Node.js and how does it differ from browser JavaScript?**
A: Node.js is a JavaScript runtime built on V8 that runs outside the browser. It has no DOM/window, but adds APIs for file system, networking, OS interaction, and more. It uses CommonJS or ESM modules instead of script tags.

---

**Q: What is the Event Loop and why does it matter?**
A: The event loop is what allows Node.js to perform non-blocking I/O using a single thread. It continuously checks queues (timers → poll → check) and executes callbacks. It matters because it's how Node handles concurrency without threads.

---

**Q: What's the difference between `process.nextTick()` and `setImmediate()`?**
A: `process.nextTick()` fires before the next event loop iteration, draining the nextTick queue completely first. `setImmediate()` fires in the **check** phase of the current event loop iteration. nextTick has higher priority.

---

**Q: What is the difference between `require` (CJS) and `import` (ESM)?**
A: `require` is synchronous, resolves at runtime, and is Node-specific. `import` is static, resolved at parse time (enabling tree-shaking), asynchronous, and is the official ECMAScript standard. ESM supports top-level `await`; CJS does not.

---

**Q: What is the Module Wrapper Function?**
A: Every CJS module file is wrapped in `(function(exports, require, module, __filename, __dirname) { ... })` before execution. This creates a function scope (making variables file-private) and injects the module-related variables.

---

**Q: Why can't you use `__dirname` in ES modules?**
A: Because `__dirname` is injected by the Module Wrapper Function, which only applies to CommonJS. In ESM, use `import.meta.url` with `fileURLToPath` and `path.dirname()`.

---

**Q: What's the difference between `exports` and `module.exports`?**
A: They initially point to the same object. `exports` is a shortcut reference. If you reassign `exports = {...}`, you break the reference and nothing gets exported. Always use `module.exports` when you want to replace the export entirely.

---

**Q: What is `process.nextTick` and when would you use it?**
A: It schedules a callback to run after the current operation, before the event loop continues. Use it to ensure a callback is called asynchronously even if an operation is (or becomes) synchronous — for API consistency.

---

**Q: What does non-blocking I/O mean in practice?**
A: When Node.js performs I/O (read file, query DB), it hands the work off to the OS or libuv thread pool and immediately continues executing other code. When the I/O completes, the callback is queued and executed in the event loop — no thread sits idle waiting.

---

**Q: What's the `node:` prefix for built-in modules?**
A: The `node:` prefix (e.g., `require('node:fs')`) explicitly marks a module as a Node.js core module, preventing npm packages with the same name from shadowing it. It also slightly improves load performance. Recommended as best practice.

---

*Last updated: 2026 — Covers Node.js v18 through v22 LTS*

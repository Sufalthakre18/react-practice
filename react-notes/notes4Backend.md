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
# Node.js — API Design & Middleware
### Complete Interview-Ready Notes

---

## Table of Contents

1. [Introduction to Express.js](#1-introduction-to-expressjs)
2. [Creating a Server with Express](#2-creating-a-server-with-express)
3. [What is an API?](#3-what-is-an-api)
4. [HTTP Methods](#4-http-methods)
5. [Creating and Testing APIs](#5-creating-and-testing-apis)
6. [API for Create, Update, Delete Data](#6-api-for-create-update-delete-data)
7. [Middleware — Introduction](#7-middleware--introduction)
8. [Application-Level Middleware](#8-application-level-middleware)
9. [Router-Level Middleware](#9-router-level-middleware)
10. [Built-in Middleware](#10-built-in-middleware)
11. [Third-Party Middleware](#11-third-party-middleware)
12. [Interview Questions & Answers](#12-interview-questions--answers)

---

## 1. Introduction to Express.js

### What is Express.js?

Express.js is a **minimal, fast, and unopinionated web framework** for Node.js. It is built on top of Node's built-in `http` module and provides a clean abstraction for handling HTTP requests, routing, and middleware.

> "Express is to Node.js what jQuery was to the browser — it doesn't replace it, it makes it far easier to use."

### Why Express over Plain Node.js?

| Feature | Plain Node.js | Express.js |
|---|---|---|
| Routing | Manual `if/else` or `switch` | `app.get()`, `app.post()`, etc. |
| Request parsing | Manual buffer accumulation | `express.json()` built-in |
| Middleware | Not supported natively | First-class `app.use()` |
| Response helpers | `res.write()`, `res.end()` | `res.json()`, `res.send()`, `res.status()` |
| Code volume | ~40 lines for basic server | ~5 lines for same result |

### Installation

```bash
# Initialize project
npm init -y

# Install Express
npm install express

# Install nodemon for development (auto-restart on changes)
npm install --save-dev nodemon
```

Add to `package.json`:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

---

## 2. Creating a Server with Express

### Minimal Express Server

```javascript
// index.js
const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Understanding `app`

`app` is the Express application instance. It is the central object that:
- Registers routes
- Registers middleware
- Configures settings
- Starts listening on a port

### The `req` and `res` Objects

**`req` (Request Object)** — Represents the incoming HTTP request.

```javascript
req.params      // Route parameters: /users/:id → req.params.id
req.query       // Query strings: /users?age=25 → req.query.age
req.body        // Request body (requires body-parser middleware)
req.headers     // HTTP headers
req.method      // HTTP method: GET, POST, etc.
req.url         // Full URL path
req.ip          // Client IP address
```

**`res` (Response Object)** — Represents the outgoing HTTP response.

```javascript
res.send('Hello')          // Send a string/HTML response
res.json({ key: 'value' }) // Send a JSON response
res.status(404)            // Set HTTP status code
res.status(201).json({})   // Chain status and json
res.redirect('/home')      // Redirect to another URL
res.render('index')        // Render a view template
res.set('Content-Type', 'text/html') // Set a header
res.end()                  // End response with no data
```

### Environment Variables with `.env`

```bash
npm install dotenv
```

```javascript
// .env file
PORT=5000
NODE_ENV=development

// index.js
require('dotenv').config();
const PORT = process.env.PORT || 3000;
```

---

## 3. What is an API?

### Definition

An **API (Application Programming Interface)** is a set of rules and protocols that allow one software application to communicate with another. In web development, a **REST API** (Representational State Transfer) uses HTTP to expose data and functionality over the internet.

### REST API Principles (6 Constraints)

1. **Client-Server** — Frontend and backend are separate, communicate via HTTP.
2. **Stateless** — Each request contains all information needed; server stores no session state.
3. **Cacheable** — Responses must define themselves as cacheable or non-cacheable.
4. **Uniform Interface** — Consistent URL structure, standard HTTP methods.
5. **Layered System** — Client doesn't know if it's talking to the actual server or a proxy.
6. **Code on Demand** *(optional)* — Server can send executable code (e.g., JavaScript).

### REST API URL Design Best Practices

```
# ✅ Good — use nouns, use plural, use lowercase
GET    /api/users          → Get all users
GET    /api/users/42       → Get user with ID 42
POST   /api/users          → Create a new user
PUT    /api/users/42       → Update user 42 (full update)
PATCH  /api/users/42       → Update user 42 (partial update)
DELETE /api/users/42       → Delete user 42

# ❌ Bad — avoid verbs in URLs
GET    /api/getUsers
POST   /api/createUser
DELETE /api/deleteUser/42
```

### API Response Structure (Standard)

```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [
    { "id": 1, "name": "Arjun" }
  ]
}
```

---

## 4. HTTP Methods

### The 5 Core HTTP Methods

| Method | Purpose | Request Body | Safe? | Idempotent? |
|---|---|---|---|---|
| `GET` | Retrieve data | No | ✅ Yes | ✅ Yes |
| `POST` | Create new data | Yes | ❌ No | ❌ No |
| `PUT` | Replace entire resource | Yes | ❌ No | ✅ Yes |
| `PATCH` | Partially update a resource | Yes | ❌ No | ❌ No* |
| `DELETE` | Remove a resource | Optional | ❌ No | ✅ Yes |

> **Safe** = Does not modify data on the server.  
> **Idempotent** = Calling multiple times produces the same result.

### HTTP Status Codes

```
2xx — Success
  200 OK              → Standard success (GET, PUT, PATCH)
  201 Created         → Resource successfully created (POST)
  204 No Content      → Success but no response body (DELETE)

3xx — Redirection
  301 Moved Permanently
  302 Found (temporary redirect)
  304 Not Modified    → Cached version is still valid

4xx — Client Errors
  400 Bad Request     → Invalid input from client
  401 Unauthorized    → Not authenticated (no/invalid token)
  403 Forbidden       → Authenticated but not authorized
  404 Not Found       → Resource does not exist
  409 Conflict        → Duplicate resource
  422 Unprocessable Entity → Validation failed

5xx — Server Errors
  500 Internal Server Error → Unexpected error on server
  502 Bad Gateway
  503 Service Unavailable
```

---

## 5. Creating and Testing APIs

### Project Structure (Recommended)

```
my-api/
├── controllers/
│   └── userController.js
├── routes/
│   └── userRoutes.js
├── middleware/
│   └── auth.js
├── models/
│   └── user.js
├── index.js
└── package.json
```

### Full GET API Example

```javascript
// index.js
const express = require('express');
const app = express();

app.use(express.json()); // Parse JSON request bodies

// In-memory data (use a database in production)
let users = [
  { id: 1, name: 'Arjun', email: 'arjun@example.com' },
  { id: 2, name: 'Priya', email: 'priya@example.com' },
];

// GET all users
app.get('/api/users', (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// GET single user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({ success: true, data: user });
});

app.listen(3000, () => console.log('Server on port 3000'));
```

### Testing APIs

#### Using Thunder Client / Postman

1. Install **Thunder Client** extension in VS Code (or use Postman).
2. Create a new request.
3. Set method (GET, POST, etc.) and URL.
4. For POST/PUT/PATCH — go to **Body → JSON** and add your payload.
5. Click **Send**.

#### Using `curl` (terminal)

```bash
# GET request
curl http://localhost:3000/api/users

# GET with ID
curl http://localhost:3000/api/users/1

# POST request
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Raj", "email": "raj@example.com"}'

# DELETE request
curl -X DELETE http://localhost:3000/api/users/1
```

#### Query Parameters Example

```javascript
// GET /api/users?name=Arjun&page=1&limit=10
app.get('/api/users', (req, res) => {
  const { name, page = 1, limit = 10 } = req.query;

  let result = users;
  if (name) {
    result = result.filter((u) => u.name.toLowerCase().includes(name.toLowerCase()));
  }

  res.json({ success: true, data: result });
});
```

---

## 6. API for Create, Update, Delete Data

### POST — Create a Resource

```javascript
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required',
    });
  }

  // Check for duplicate
  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(409).json({ success: false, message: 'Email already exists' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser,
  });
});
```

### PUT — Full Update (Replace Entire Resource)

```javascript
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const index = users.findIndex((u) => u.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  // Replace the entire object
  users[index] = { id: parseInt(id), name, email };

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: users[index],
  });
});
```

### PATCH — Partial Update

```javascript
app.patch('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body; // Only the fields to update

  const index = users.findIndex((u) => u.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Merge existing data with updates (spread operator)
  users[index] = { ...users[index], ...updates };

  res.status(200).json({
    success: true,
    message: 'User partially updated',
    data: users[index],
  });
});
```

### DELETE — Remove a Resource

```javascript
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((u) => u.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const deleted = users.splice(index, 1);

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: deleted[0],
  });

  // OR: res.status(204).end() — no content
});
```

### Express Router — Organizing Routes

```javascript
// routes/userRoutes.js
const express = require('express');
const router = express.Router();

let users = [];

router.get('/', (req, res) => res.json({ data: users }));
router.get('/:id', (req, res) => { /* ... */ });
router.post('/', (req, res) => { /* ... */ });
router.put('/:id', (req, res) => { /* ... */ });
router.patch('/:id', (req, res) => { /* ... */ });
router.delete('/:id', (req, res) => { /* ... */ });

module.exports = router;
```

```javascript
// index.js
const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);
// Now: GET /api/users, POST /api/users, DELETE /api/users/:id, etc.
```

---

## 7. Middleware — Introduction

### What is Middleware?

Middleware is a **function** that has access to the `req` (request) object, the `res` (response) object, and the **`next`** function in the application's request-response cycle.

```javascript
function myMiddleware(req, res, next) {
  // Do something with req or res
  console.log('Request received:', req.method, req.url);
  next(); // Pass control to the next middleware/route handler
}
```

> If `next()` is **not called**, the request will hang and the client will time out. Always call `next()` unless you are sending a response.

### The Middleware Pipeline

```
Request → Middleware 1 → Middleware 2 → Middleware 3 → Route Handler → Response
              ↓ next()        ↓ next()        ↓ next()
```

Each middleware can:
- Execute any code
- Modify `req` and `res` objects
- End the request-response cycle (`res.send()`, `res.json()`)
- Call the next middleware (`next()`)
- Call `next(err)` to pass an error to the error handler

### Types of Middleware

| Type | Applied With | Scope |
|---|---|---|
| Application-level | `app.use()` | Entire application |
| Router-level | `router.use()` | Specific router/prefix |
| Built-in | `express.json()` etc. | Built into Express |
| Third-party | npm packages | Application or router |
| Error-handling | `app.use(fn)` with 4 params | Entire application |

---

## 8. Application-Level Middleware

Applied using `app.use()` or `app.METHOD()` — runs for **all or specific routes** in the application.

### Global Middleware (All Routes)

```javascript
const express = require('express');
const app = express();

// Logger middleware — runs for every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// All routes below will be affected
app.get('/api/users', (req, res) => {
  res.json({ data: [] });
});
```

### Route-Specific Middleware

```javascript
// Authentication check — only for /api/admin
const checkAdmin = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'admin-secret-token') {
    next(); // Authorized
  } else {
    res.status(403).json({ message: 'Forbidden: Admins only' });
  }
};

app.get('/api/admin/dashboard', checkAdmin, (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});
```

### Multiple Middleware in One Route

```javascript
const logRequest = (req, res, next) => {
  console.log('Logging...');
  next();
};

const validateBody = (req, res, next) => {
  if (!req.body.name) return res.status(400).json({ error: 'Name required' });
  next();
};

app.post('/api/users', logRequest, validateBody, (req, res) => {
  res.status(201).json({ message: 'User created' });
});
```

### Middleware Chaining with `app.use()` on a Path

```javascript
// This runs for ALL methods on /api/users and sub-paths
app.use('/api/users', (req, res, next) => {
  console.log('User route accessed');
  next();
});
```

### Error-Handling Middleware (4 Parameters!)

```javascript
// MUST have exactly 4 parameters: (err, req, res, next)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// In a route, pass errors to it via next(err)
app.get('/api/data', (req, res, next) => {
  try {
    throw new Error('Something went wrong!');
  } catch (err) {
    next(err); // Passed to the error handler above
  }
});
```

---

## 9. Router-Level Middleware

Works the same as application-level middleware, but is attached to an **`express.Router()`** instance instead of the `app`.

### Why Use Router-Level Middleware?

- Apply middleware **only to specific groups of routes** (e.g., only for `/api/admin`)
- Keeps code modular and clean
- Each router is like a "mini-application"

### Basic Router Middleware

```javascript
// routes/productRoutes.js
const express = require('express');
const router = express.Router();

// Middleware — only runs for routes in this router
router.use((req, res, next) => {
  console.log('Product route hit:', req.method, req.url);
  next();
});

router.get('/', (req, res) => res.json({ message: 'All products' }));
router.get('/:id', (req, res) => res.json({ message: `Product ${req.params.id}` }));
router.post('/', (req, res) => res.json({ message: 'Product created' }));

module.exports = router;
```

```javascript
// index.js
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
```

### Auth Guard at Router Level

```javascript
// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

// Auth middleware applies to ALL routes in this router
router.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (!token || token !== 'Bearer mysecret') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
});

router.get('/dashboard', (req, res) => {
  res.json({ message: 'Admin Dashboard' });
});

router.delete('/user/:id', (req, res) => {
  res.json({ message: `Deleted user ${req.params.id}` });
});

module.exports = router;
```

### Using `router.param()` — Parameter Middleware

```javascript
// Runs whenever `:userId` is present in the route
router.param('userId', (req, res, next, id) => {
  const user = users.find((u) => u.id === parseInt(id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  req.user = user; // Attach to req for downstream handlers
  next();
});

router.get('/:userId', (req, res) => {
  res.json(req.user); // Already validated and attached
});
```

---

## 10. Built-in Middleware

Express 4.x+ includes several useful middleware functions out of the box (no extra npm install needed).

### `express.json()`

Parses incoming requests with **JSON payloads** (`Content-Type: application/json`).

```javascript
app.use(express.json());

// Now req.body is populated for POST/PUT/PATCH with JSON body
app.post('/api/data', (req, res) => {
  console.log(req.body); // { name: "Arjun", age: 25 }
  res.json(req.body);
});
```

### `express.urlencoded()`

Parses **URL-encoded** form data (`Content-Type: application/x-www-form-urlencoded`). Used for HTML form submissions.

```javascript
app.use(express.urlencoded({ extended: true }));
// extended: true  → uses 'qs' library (supports nested objects)
// extended: false → uses 'querystring' library (flat data only)
```

### `express.static()`

Serves **static files** (HTML, CSS, JS, images) from a directory.

```javascript
app.use(express.static('public'));
// Files in /public are served at the root URL
// public/index.html → http://localhost:3000/index.html
// public/style.css  → http://localhost:3000/style.css

// With a virtual prefix
app.use('/static', express.static('public'));
// public/logo.png → http://localhost:3000/static/logo.png
```

### `express.raw()`

Parses incoming requests with raw **Buffer** payloads.

```javascript
app.use(express.raw({ type: 'application/octet-stream' }));
// req.body is now a Buffer
```

### `express.text()`

Parses incoming requests with **plain text** payloads.

```javascript
app.use(express.text());
// req.body is a string
```

### Summary Table

| Middleware | Purpose | Default Content-Type |
|---|---|---|
| `express.json()` | Parse JSON body | `application/json` |
| `express.urlencoded()` | Parse form data | `application/x-www-form-urlencoded` |
| `express.static()` | Serve static files | N/A |
| `express.raw()` | Parse raw buffer | `application/octet-stream` |
| `express.text()` | Parse plain text | `text/plain` |

---

## 11. Third-Party Middleware

Installed via npm, these add powerful features to your Express app.

### `morgan` — HTTP Request Logger

```bash
npm install morgan
```

```javascript
const morgan = require('morgan');

// Formats: 'tiny', 'short', 'dev', 'combined', 'common'
app.use(morgan('dev'));

// Output: GET /api/users 200 5.123 ms - 128
```

Custom token:

```javascript
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :body'));
```

### `cors` — Cross-Origin Resource Sharing

```bash
npm install cors
```

```javascript
const cors = require('cors');

// Allow all origins
app.use(cors());

// Restrict to specific origins
app.use(cors({
  origin: ['http://localhost:5173', 'https://myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies
}));

// Apply CORS only to specific route
app.get('/api/public', cors(), (req, res) => {
  res.json({ message: 'This route allows all origins' });
});
```

### `helmet` — Security Headers

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');

// Sets security-related HTTP headers automatically
app.use(helmet());
// Sets: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection,
//       Strict-Transport-Security, Content-Security-Policy, etc.
```

### `express-rate-limit` — Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                   // Limit each IP to 100 requests per window
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,      // Send RateLimit headers
  legacyHeaders: false,
});

app.use('/api/', limiter);
```

### `multer` — File Upload Handling

```bash
npm install multer
```

```javascript
const multer = require('multer');

// Store in memory
const upload = multer({ dest: 'uploads/' });

// Single file upload
app.post('/api/upload', upload.single('avatar'), (req, res) => {
  console.log(req.file);   // Uploaded file info
  console.log(req.body);   // Other form fields
  res.json({ message: 'File uploaded', file: req.file });
});

// Multiple files
app.post('/api/upload-many', upload.array('photos', 5), (req, res) => {
  res.json({ files: req.files });
});
```

### `cookie-parser` — Parse Cookies

```bash
npm install cookie-parser
```

```javascript
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'Arjun', { maxAge: 3600000, httpOnly: true });
  res.json({ message: 'Cookie set' });
});

app.get('/get-cookie', (req, res) => {
  console.log(req.cookies); // { username: 'Arjun' }
  res.json(req.cookies);
});
```

### `compression` — GZIP Compression

```bash
npm install compression
```

```javascript
const compression = require('compression');
app.use(compression());
// Compresses all responses using gzip → faster transfers
```

### Third-Party Middleware Summary

| Package | Purpose |
|---|---|
| `morgan` | HTTP request logging |
| `cors` | Cross-origin resource sharing |
| `helmet` | Security HTTP headers |
| `express-rate-limit` | Rate limiting / DDoS protection |
| `multer` | File upload handling |
| `cookie-parser` | Parse `Cookie` headers |
| `compression` | GZIP compress responses |
| `express-validator` | Input validation |
| `passport` | Authentication strategies |
| `express-session` | Session management |

---

## 12. Interview Questions & Answers

### Express & API

**Q1. What is Express.js and why is it used?**  
Express.js is a minimal and flexible Node.js web framework that provides a robust set of features for building web and mobile applications. It simplifies routing, request/response handling, and middleware integration compared to raw Node.js.

**Q2. What is the difference between `app.use()` and `app.get()`?**  
`app.use()` registers middleware that runs for **all HTTP methods** and can optionally be scoped to a path prefix. `app.get()` only handles **GET** requests for a specific path.

**Q3. What is the difference between `req.params`, `req.query`, and `req.body`?**
- `req.params` — Named route segments: `/users/:id` → `req.params.id`
- `req.query` — URL query string: `/users?page=2` → `req.query.page`
- `req.body` — Data sent in the request body (POST/PUT), requires `express.json()` middleware

**Q4. What is the difference between PUT and PATCH?**  
PUT replaces the **entire** resource with the provided data (missing fields are removed or set to null). PATCH makes a **partial update**, only modifying the fields provided.

**Q5. What HTTP status code do you return when creating a resource?**  
`201 Created`. It signals that the request succeeded and a new resource was created.

**Q6. What is REST? Is Express RESTful by default?**  
REST is an architectural style with 6 constraints (stateless, client-server, cacheable, uniform interface, layered, code on demand). Express is a framework — it can be used to build RESTful APIs, but it doesn't enforce REST by itself. You must follow the principles manually.

---

### Middleware

**Q7. What is middleware in Express.js?**  
A middleware is a function with `(req, res, next)` that executes during the request-response cycle. It can modify `req`/`res`, execute code, end the cycle, or call `next()` to pass control to the next middleware.

**Q8. What happens if you don't call `next()` in middleware?**  
The request will hang indefinitely. The client will eventually time out because no response was sent and no further middleware or route handler was invoked.

**Q9. What is the difference between application-level and router-level middleware?**  
Application-level middleware is attached to the `app` object using `app.use()` and applies to all routes. Router-level middleware is attached to an `express.Router()` instance and only applies to routes defined in that router.

**Q10. How do you create an error-handling middleware in Express?**  
Error-handling middleware must have **exactly 4 parameters**: `(err, req, res, next)`. Express identifies it as an error handler by this signature. It is called when `next(err)` is invoked in any route or middleware.

```javascript
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

**Q11. What is the difference between `express.json()` and `express.urlencoded()`?**  
`express.json()` parses request bodies with `Content-Type: application/json` (JSON data). `express.urlencoded()` parses bodies with `Content-Type: application/x-www-form-urlencoded` (HTML form submissions).

**Q12. What does `helmet` middleware do?**  
`helmet` automatically sets various HTTP security headers (like `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`) to protect the app from common web vulnerabilities like clickjacking, MIME sniffing, and more.

**Q13. What does CORS middleware solve?**  
CORS (Cross-Origin Resource Sharing) middleware adds the appropriate HTTP headers to allow (or restrict) browsers from making requests to your API from a **different origin** (domain, port, or protocol) than where the frontend is hosted.

**Q14. What is `router.param()` used for?**  
`router.param()` defines a middleware callback that runs whenever a specific named route parameter (e.g., `:userId`) is present in a route. It's used for pre-validation or pre-fetching of resources associated with route parameters.

**Q15. How does middleware ordering matter in Express?**  
Middleware is executed in the order it is defined with `app.use()`. Middleware defined before routes applies to those routes; middleware defined after a route won't apply to it. Error-handling middleware should always be defined **last**, after all routes.

```javascript
app.use(morgan('dev'));         // 1st — logging
app.use(express.json());        // 2nd — parsing
app.use('/api', routes);        // 3rd — routes
app.use(errorHandler);          // 4th (last) — error handling
```

---

*End of Notes — Node.js API Design & Middleware*

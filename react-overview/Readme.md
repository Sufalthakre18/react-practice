# ⚛️ React – Overview Notes

## 📌 What is React?

* React is a **JavaScript library** for building **user interfaces**
* Used to create **fast, interactive, and reusable UI components**
* Mainly used for **Single Page Applications (SPAs)**
* Focuses only on the **UI (View layer)** of an application

---

## 📜 History of React

* Created by **Jordan Walke**, a software engineer at **Facebook (Meta)**
* First used internally at Facebook in **2011**
* Officially **open-sourced in 2013**
* Developed to solve performance issues in large-scale applications
* Currently maintained by **Meta** and the open-source community

**Interview Note:** React was created to handle frequent UI updates efficiently.

---

## 🎯 Why React was Created?

* Traditional DOM manipulation was **slow**
* Large applications were **hard to manage and scale**
* Need for **reusable components**
* Required **better performance** for dynamic UIs

React introduced:

* Virtual DOM
* Component-based architecture

---

## 🧩 Core Concepts of React

* **Components** – Reusable building blocks of UI
* **JSX** – HTML-like syntax inside JavaScript
* **Virtual DOM** – Improves performance by minimizing real DOM updates
* **Props** – Used to pass data between components
* **State** – Manages dynamic data inside components
* **Unidirectional Data Flow** – Data flows from parent to child

---

## ⚙️ Key Features of React

* High performance using **Virtual DOM**
* Reusable and maintainable components
* Declarative UI approach
* Strong ecosystem and community support
* Easy integration with other libraries

---

## 🧠 React: Library, Not a Framework

* React handles **only the UI layer**
* Additional libraries are required for:

  * Routing → React Router
  * State Management → Redux / Context API
  * API calls → Fetch / Axios

---

## 🔗 React Ecosystem

* **React Router** – Client-side routing
* **Redux** – Global state management
* **Context API** – Built-in state management
* **Next.js** – Full-stack React framework
* **React Native** – Mobile app development

---

## 🧑‍💻 Companies Using React

* Facebook & Instagram
* Netflix
* Airbnb
* Uber
* WhatsApp Web

---

## 🚀 Advantages of React

* Fast rendering
* Easy to learn for beginners
* Large job market
* Reusable components
* Strong community support

---

## ⚠️ Limitations of React

* Handles only UI layer
* Requires additional libraries
* JSX has a learning curve
* Ecosystem changes frequently

--
> React is a JavaScript library developed by Facebook for building fast, reusable, and interactive user interfaces using a component-based architecture.

---
# 📦 JavaScript Import & Export – Perfect Notes

## What is Import / Export?

* Used to **share code** between JavaScript files (modules)
* Helps keep code **clean, reusable, and maintainable**
* Part of **ES6 (ES2015) Modules**

---

## Types of Export

### 1️⃣ Named Export

* Can export **multiple values** from a file
* Must use the **same name** while importing

```js
// math.js
export const add = (a, b) => a + b;
export const sub = (a, b) => a - b;
```

```js
// app.js
import { add, sub } from './math';
```

---

### 2️⃣ Default Export

* Only **one default export** per file
* Can import with **any name**

```js
// greet.js
export default function greet() {
  return 'Hello';
}
```

```js
// app.js
import greet from './greet';
```

---

## Import Variations

### Import All as Object

```js
import * as math from './math';
math.add(2, 3);
```

### Rename Imports

```js
import { add as addition } from './math';
```

---

## Export at Bottom (Alternative Syntax)

```js
const a = 10;
const b = 20;

export { a, b };
```

---

## Import / Export in React

* Used to share **components, hooks, utilities**
* Components usually use **default export**

```js
export default function Header() {}
```

```js
import Header from './Header';
```

---

## 🌳 Real DOM vs Virtual DOM (Important for React)

### Real DOM

* Actual DOM of the browser
* Direct updates are **slow**
* Entire DOM can re-render on change
* Used in traditional JavaScript apps

### Virtual DOM

* Lightweight **copy of Real DOM**
* Exists in **memory**
* Updates are **fast**
* React compares changes using **diffing**
* Updates only the changed part in Real DOM

### Why Virtual DOM is Faster?

* Minimizes direct DOM manipulation
* Improves performance in large apps

---

## Key Differences (Interview)

| Named Export       | Default Export   |
| ------------------ | ---------------- |
| Multiple allowed   | Only one allowed |
| Must use same name | Any name allowed |
| Uses `{}`          | No `{}` needed   |

---

## Common Mistakes

* Forgetting `{}` with named imports
* Using multiple default exports
* Wrong file path

---

## One-Line Interview Answer

> Import and export are ES6 features used to share code between files by creating reusable JavaScript modules.


# ⚛️ React Components & Props – Interview‑Focused Notes

---

## 📌 What is a Component in React?

* A **component** is a reusable piece of UI
* It is a **JavaScript function** that returns JSX
* Components make apps **modular, reusable, and maintainable**

**Interview line:**

> A component is an independent, reusable UI block in React.

---

## 🧩 Types of Components

### 1️⃣ Functional Components (Modern & Preferred)

* Written as JavaScript functions
* Use **Hooks** for state and lifecycle
* Simple and readable

```jsx
function Header() {
  return <h1>Hello</h1>;
}
```

📌 **Used in modern React projects**

---

### 2️⃣ Class Components (Legacy)

* Written using ES6 classes
* Uses lifecycle methods
* Rarely used in new projects

📌 **Good to know for interviews, not for practice**

---

## ⭐ Why Components are Important

* Code reusability
* Easy maintenance
* Better project structure
* Faster development

---

## 📦 What are Props in React?

* **Props = properties**
* Used to pass data **from parent to child**
* Props are **read-only (immutable)**

```jsx
function User(props) {
  return <h2>{props.name}</h2>;
}
```

```jsx
<User name="Rahul" />
```

**Interview line:**

> Props are used to pass data between components in React.

---

## 🔑 Key Points about Props

* Passed as attributes
* Flow is **one‑way (parent → child)**
* Cannot be modified by child component
* Helps make components dynamic

---

## 🆚 Props vs State (Quick)

| Props              | State                    |
| ------------------ | ------------------------ |
| Passed from parent | Managed inside component |
| Read‑only          | Can be updated           |
| External           | Internal                 |

---

## 🏗️ React App Setup (Theory Only)

### Create React App (CRA) – Theory

* Older way to create React apps
* Uses **Webpack** internally
* Zero configuration
* Slower builds
* Now **less preferred**

📌 Interview line:

> CRA was popular earlier but is now replaced by modern tools like Vite.

---

### React with Vite – Theory (Modern)

* Modern build tool
* Uses **ES Modules**
* Very fast startup and hot reload
* Recommended by React docs

📌 Interview line:

> Vite is preferred due to faster development and modern architecture.

---


## 📁 Component Best Practices

* One component = one responsibility
* Use meaningful component names
* Reuse components
* Keep components small

---

## 📝 One‑Line Interview Summaries

* **Component:** Reusable UI block
* **Props:** Data passed to components
* **Functional Components:** Modern React standard
* **Vite:** Fast modern React setup
* **Props** props should be pass in {} brackets for other components  

---

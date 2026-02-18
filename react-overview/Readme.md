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
# ⚛️ Working with Functions in React – Modern Interview Notes

---

## 📌 1️⃣ Functional Components (Modern Standard)

* React components are **JavaScript functions**
* They return **JSX**
* This is the modern way of writing React

```jsx
function Welcome() {
  return <h1>Hello</h1>;
}
```

📌 Functional components replaced most class components.

---

## 📌 2️⃣ Functions as Event Handlers

* Functions handle user interactions
* Passed as reference (not executed immediately)

```jsx
function App() {
  function handleClick() {
    alert("Clicked");
  }

  return <button onClick={handleClick}>Click</button>;
}
```

📌 Do NOT use `onClick={handleClick()}` unless you want immediate execution.

---

## 📌 3️⃣ Arrow Functions in React

* Common modern syntax
* Cleaner and shorter

```jsx
const Button = () => {
  return <button>Click</button>;
};
```

📌 Arrow functions are widely used in modern React projects.

---

## 📌 4️⃣ Passing Functions as Props

* Functions can be passed from parent to child
* Used for communication (child → parent)

```jsx
function Parent() {
  const greet = () => alert("Hello");
  return <Child onGreet={greet} />;
}

function Child(props) {
  return <button onClick={props.onGreet}>Greet</button>;
}
```

📌 Very common interview question.

---

## 📌 5️⃣ Functions with Parameters

* Wrap inside arrow function when passing arguments

```jsx
<button onClick={() => handleUser("Rahul")}>Click</button>
```

📌 Prevents immediate execution during render.

---

## 📌 6️⃣ useCallback (Performance Optimization)

* Prevents unnecessary function recreation
* Used in performance-sensitive components

```jsx
const memoizedFn = useCallback(() => {
  console.log("Optimized");
}, []);
```

📌 Used when passing functions to memoized components.

---

## 📌 7️⃣ Best Practices

* Keep functions small and focused
* Avoid defining heavy logic directly inside JSX
* Use arrow functions for cleaner syntax
* Use useCallback only when necessary

---

## 📝 One-Line Interview Summary

* React components are functions that return JSX.
* Functions handle events and can be passed as props.
* Modern React relies heavily on functional programming patterns.

---
# ⚛️ React Hooks – Complete & Understandable Notes

---

# 📌 What are Hooks?

* Hooks are special functions introduced in React 16.8
* They allow functional components to use state and lifecycle features
* Hooks replaced most class component usage

**Interview Line:**

> Hooks allow functional components to manage state and side effects.

---

# 🧠 Why Hooks Were Introduced

* Class components were complex
* Lifecycle methods were confusing
* Logic reuse was difficult
* Hooks simplified component logic

---

# 1️⃣ useState Hook

## What is useState?

* Used to add state to functional components
* Returns an array: [state, setState]

```jsx
const [count, setCount] = useState(0);
```

## How it works:

* `count` → current state value
* `setCount()` → updates state
* Updating state triggers re-render

## Important Points

* State updates are asynchronous
* Never modify state directly
* Can store numbers, strings, objects, arrays

## Functional Update (Important)

```jsx
setCount(prev => prev + 1);
```

Used when new state depends on previous state.

**Interview Line:**

> useState manages local component state and triggers re-render when updated.

---

# 2️⃣ useEffect Hook

## What is useEffect?

* Handles side effects in functional components
* Replaces lifecycle methods like componentDidMount

```jsx
useEffect(() => {
  console.log("Component mounted");
}, []);
```

## Dependency Array Cases

### 1. No dependency array

Runs on every render

### 2. Empty array []

Runs once (on mount)

### 3. With dependencies [value]

Runs when value changes

## Cleanup Function

```jsx
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

Used to prevent memory leaks.

**Interview Line:**

> useEffect handles side effects like API calls, subscriptions, and timers.

---

# 3️⃣ useContext Hook

## What is useContext?

* Used to access global data without prop drilling
* Works with Context API

## Steps:

1. Create Context
2. Wrap with Provider
3. Use useContext

```jsx
const value = useContext(MyContext);
```

## When to use?

* Theme
* User authentication
* Global settings

**Interview Line:**

> useContext allows global state sharing without passing props manually.

---

# 4️⃣ useReducer Hook

## What is useReducer?

* Alternative to useState
* Used for complex state logic

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

## Reducer Function

```jsx
function reducer(state, action) {
  switch(action.type) {
    case "increment":
      return { count: state.count + 1 };
    default:
      return state;
  }
}
```

## When to Use?

* Multiple state values
* Complex updates
* Redux-like pattern

**Interview Line:**

> useReducer manages complex state logic in a predictable way.

---

# 5️⃣ useRef Hook

## What is useRef?

* Used to reference DOM elements
* Stores mutable values without re-rendering

```jsx
const inputRef = useRef();
```

## Use Cases

* Access DOM elements
* Store previous values
* Persist values between renders

Important:

* Updating ref does NOT trigger re-render

**Interview Line:**

> useRef stores mutable values and references DOM elements without re-rendering.

---

# 6️⃣ useCallback Hook

## What is useCallback?

* Memoizes a function
* Prevents unnecessary re-creation

```jsx
const memoizedFn = useCallback(() => {
  console.log("Optimized");
}, []);
```

## Why use it?

* Prevent unnecessary re-renders
* Useful when passing functions to child components

Use only when performance optimization is needed.

**Interview Line:**

> useCallback prevents unnecessary function recreation to optimize performance.

---

# 7️⃣ useMemo Hook

## What is useMemo?

* Memoizes computed values
* Prevents expensive recalculations

```jsx
const result = useMemo(() => heavyCalculation(data), [data]);
```

## Why use it?

* Performance optimization
* Large computations

Important:

* Only use when needed

**Interview Line:**

> useMemo optimizes performance by caching expensive calculations.

---

# 🆚 useCallback vs useMemo (Quick)

| useCallback       | useMemo                 |
| ----------------- | ----------------------- |
| Memoizes function | Memoizes value          |
| Returns function  | Returns computed result |

---

# ⚠️ Common Hook Rules (Very Important)

1. Only call hooks at top level
2. Only call hooks inside React functions
3. Do not call inside loops or conditions

---

# 🔑 Hook Order (Basic Flow)

1. useState → Manage state
2. useEffect → Side effects
3. useContext → Global state
4. useReducer → Complex state
5. useRef → DOM reference
6. useCallback/useMemo → Optimization

---

# 🎯 Final Interview Summary

* Hooks simplify functional components
* useState manages state
* useEffect handles side effects
* useContext shares global data
* useReducer handles complex logic
* useRef stores mutable values
* useCallback & useMemo optimize performance

---
# ⚛️ Two-Way Data Binding in React – Complete Notes

---

# 📌 1️⃣ What is Two-Way Data Binding?

Two-way data binding means:

* UI (input field) updates the state
* State updates the UI

So data flows in **both directions**.

In React, this is achieved using:

* `useState`
* `value` attribute
* `onChange` event

⚠️ Important: React does NOT have automatic two-way binding like Angular.
We implement it manually using controlled components.

---

# 📌 2️⃣ Controlled Components (Core Concept)

A controlled component is an input element whose value is controlled by React state.

### Example:

```jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

Flow:

1. User types in input
2. onChange fires
3. State updates
4. React re-renders
5. Updated state reflects in input

✔ This is Two-Way Data Binding in React.

---

# 📌 3️⃣ Handling Form Input Changes (Multiple Inputs)

When working with forms, we often manage multiple fields using one state object.

```jsx
function Form() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
    </form>
  );
}
```

✔ Best practice for handling multiple inputs.

---

# 📌 4️⃣ Form Submission in React

We use `onSubmit` event and prevent default behavior.

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData);
};

<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>
```

Why `preventDefault()`?

* Prevents page refresh
* Keeps React SPA behavior

---

# 📌 5️⃣ Controlled vs Uncontrolled Components

### Controlled

* Uses state
* Recommended
* Predictable behavior

### Uncontrolled

* Uses `useRef`
* DOM manages input value
* Less preferred

Example (Uncontrolled):

```jsx
const inputRef = useRef();

<input ref={inputRef} />
```

---

# 📌 6️⃣ Important Interview Points

* React uses controlled components for two-way binding.
* Data flows from state → UI and UI → state.
* onChange is mandatory for controlled inputs.
* Always use preventDefault() in form submit.
* Manage multiple inputs using name attribute.

---

# 🧠 One-Line Interview Answer

- "React does not support automatic two-way binding. We implement it manually using controlled components with useState, value, and onChange."
- "When we use value in an input, we are telling React to control the input using state. That means whatever is stored in the state will be shown inside the input, and whenever the user types, the state updates. So the state becomes the main source of truth, not the DOM. This makes it easy to clear the input, validate it, or use its value anywhere in the component."
---
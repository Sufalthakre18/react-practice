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
* componentDidMount is a lifecycle method that runs once after a component is added (mounted) to the screen.

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

- Client side means the code runs in the browser and handles things like clicks, input, and state using hooks like useState. Server side means the code runs on the server and sends ready-made HTML to the browser for fast loading. In Next.js, we use "use client" when a component needs browser features like state or event handlers. Hydration is the process where React connects to the server-rendered HTML in the browser. A hydration error happens when the HTML generated on the server is different from what React generates in the browser.
---


# 💾 Local Storage & Session Storage – Complete Notes (React)

---

# 📌 1️⃣ What is Web Storage?

Web Storage allows us to store data in the browser.

There are two types:

1. **localStorage** → Persistent storage (does not expire)
2. **sessionStorage** → Temporary storage (cleared when tab closes)

Both store data in **key-value pair format**.

---

# 📌 2️⃣ localStorage vs sessionStorage

| Feature       | localStorage            | sessionStorage      |
| ------------- | ----------------------- | ------------------- |
| Expiry        | No expiry               | Clears on tab close |
| Storage limit | ~5MB                    | ~5MB                |
| Scope         | All tabs (same origin)  | Only current tab    |
| Use case      | Auth token, theme, cart | Temporary form data |

---

# 📌 3️⃣ Important Methods

## ✅ 1. setItem()

Stores data in storage.

```js
localStorage.setItem("name", "Rahul");
sessionStorage.setItem("age", "22");
```

---

## ✅ 2. getItem()

Retrieves stored data.

```js
const name = localStorage.getItem("name");
console.log(name);
```

---

## ✅ 3. removeItem()

Removes specific key.

```js
localStorage.removeItem("name");
```

---

## ✅ 4. clear()

Removes all data.

```js
localStorage.clear();
```

---

# 📌 4️⃣ Important: JSON.stringify() & JSON.parse()

⚠️ Storage only stores **strings**.
If we store objects/arrays, we must convert them.

---

## 🔹 Storing Object Example

```js
const user = {
  name: "Rahul",
  age: 22,
};

localStorage.setItem("user", JSON.stringify(user));
```

---

## 🔹 Retrieving Object Example

```js
const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser.name);
```

✔ stringify → converts object to string
✔ parse → converts string back to object

---

# 📌 5️⃣ Using localStorage in React (Practical Example)

```jsx
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState(
    localStorage.getItem("name") || ""
  );

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

✔ Persists data even after refresh.

---

# 📌 6️⃣ When to Use?

Use localStorage for:

* Theme preference
* Auth token (with caution)
* Cart data

Use sessionStorage for:

* Temporary form data
* OTP verification flow

---

# 📌 7️⃣ Interview Important Points

* Web Storage stores data as strings.
* Use JSON.stringify() before storing objects.
* Use JSON.parse() after retrieving.
* localStorage persists even after browser restart.
* sessionStorage clears when tab closes.
* Not suitable for sensitive data.

---

# 🧠 One-Line Interview Answer

"localStorage and sessionStorage are browser storage mechanisms that store key-value string data. localStorage persists permanently, while sessionStorage lasts only for a session."

---
# 🌐 API Calls in Frontend – Complete Guide (Fetch & Axios)

---

# 📌 1️⃣ What is an API Call?

API (Application Programming Interface) allows frontend to communicate with backend.

Frontend sends request → Server processes → Server sends response → UI updates.

Common HTTP Methods:

* GET → Fetch data
* POST → Create data
* PUT → Update data
* PATCH → Partial update
* DELETE → Remove data

---

# 📌 2️⃣ Using Fetch (Quick Overview)

Fetch is a built-in browser API.

## 🔹 GET Request

```js
fetch("https://api.example.com/users")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

⚠️ Fetch does NOT reject on HTTP errors (like 404, 500).
You must manually check `res.ok`.

---

## 🔹 POST Request

```js
fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name: "Rahul" })
});
```

---

# 📌 3️⃣ Why Axios is Preferred (Important)

Axios is a third-party HTTP client library.

Advantages over Fetch:

* Automatically parses JSON
* Automatically rejects on HTTP errors
* Cleaner syntax
* Built-in timeout support
* Request & response interceptors
* Base URL configuration
* Works in browser & Node.js

👉 In real-world projects, Axios is commonly used.

---

# 📌 4️⃣ Installing Axios

```bash
npm install axios
```

Import:

```js
import axios from "axios";
```

---

# 📌 5️⃣ Axios Basic Requests

## 🔹 GET Request

```js
axios.get("https://api.example.com/users")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
```

✔ Response data is directly inside `response.data`

---

## 🔹 POST Request

```js
axios.post("https://api.example.com/users", {
  name: "Rahul"
});
```

---

## 🔹 PUT Request

```js
axios.put("https://api.example.com/users/1", {
  name: "Updated Name"
});
```

---

## 🔹 DELETE Request

```js
axios.delete("https://api.example.com/users/1");
```

---

# 📌 6️⃣ Axios with async/await (Modern Way)

```js
const fetchUsers = async () => {
  try {
    const response = await axios.get("https://api.example.com/users");
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
```

✔ Preferred in modern React apps.

---

# 📌 7️⃣ Using Axios in React with useEffect

```jsx
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api.example.com/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return <div>{users.length}</div>;
}
```

---

# 📌 8️⃣ Axios Config Object

Axios allows configuration:

```js
axios({
  method: "get",
  url: "https://api.example.com/users",
  headers: {
    Authorization: "Bearer token"
  },
  timeout: 5000
});
```

Important Config Options:

* baseURL
* headers
* params
* timeout
* withCredentials

---

# 📌 9️⃣ Creating Axios Instance (Professional Way)

Used in large projects.

```js
const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
```

Usage:

```js
api.get("/users");
```

✔ Cleaner and reusable.

---

# 📌 🔟 Axios Interceptors (Very Important)

Interceptors allow modifying request/response globally.

## 🔹 Request Interceptor

```js
api.interceptors.request.use(config => {
  config.headers.Authorization = "Bearer token";
  return config;
});
```

```js
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

## 🔹 Response Interceptor


```js
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized! Redirect to login");
    }
    return Promise.reject(error);
  }
);
```

✔ Used for authentication & global error handling.

---

# 📌 1️⃣1️⃣ Handling Errors in Axios

Axios provides detailed error object:

```js
try {
  await axios.get("wrong-url");
} catch (error) {
  console.log(error.response); // server response
  console.log(error.request);  // request made
  console.log(error.message);  // error message
}
```

---

# 📌 1️⃣2️⃣ Sending Query Parameters

```js
axios.get("/users", {
  params: {
    page: 1,
    limit: 10
  }
});
```

---

# 📌 1️⃣3️⃣ Sending Headers

```js
axios.get("/users", {
  headers: {
    Authorization: "Bearer token"
  }
});
```

---

# 📌 1️⃣4️⃣ Canceling Requests

Useful in search or fast switching.

```js
const controller = new AbortController();

axios.get("/users", {
  signal: controller.signal
});

controller.abort();
```

---

# 📌 1️⃣5️⃣ Fetch vs Axios (Interview Table)

| Feature           | Fetch    | Axios     |
| ----------------- | -------- | --------- |
| Built-in          | Yes      | No        |
| Auto JSON parsing | No       | Yes       |
| Error handling    | Manual   | Automatic |
| Interceptors      | No       | Yes       |
| Timeout           | No       | Yes       |
| Cleaner syntax    | Moderate | Yes       |

---

# 📌 1️⃣6️⃣ Best Practices for API Calls in React

* Always use async/await
* Use try/catch
* Create Axios instance
* Use interceptors for auth
* Keep API logic separate (services folder)
* Handle loading & error states
* Avoid calling API directly inside JSX

---

# 🧠 One-Line Interview Answer

"Axios is a promise-based HTTP client that simplifies API calls with automatic JSON parsing, better error handling, interceptors, and configuration support, making it preferred over Fetch in large-scale applications."

---


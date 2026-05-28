# React Props — Complete Interview Notes

---

# 1) What are Props in React?

Props stands for **Properties**.

Props are used to pass data from a **parent component** to a **child component**.

They make components:

* reusable
* dynamic
* configurable

---

# 2) Basic Example of Props

```jsx
function User(props) {
  return <h1>Hello {props.name}</h1>;
}

function App() {
  return <User name="Rahul" />;
}
```

### Flow

```text
Parent Component → passes props → Child Component
```

---

# 3) Props are Read-Only

Props are immutable.

A child component should NEVER modify props directly.

❌ Wrong

```jsx
props.name = "Aman";
```

✅ Correct

```jsx
return <h1>{props.name}</h1>;
```

---

# 4) One-Way Data Flow

React follows one-way data flow.

```text
Parent → Child
```

Data always flows downward.

---

# 5) Destructuring Props

## Without destructuring

```jsx
function User(props) {
  return <h1>{props.name}</h1>;
}
```

## With destructuring

```jsx
function User({ name }) {
  return <h1>{name}</h1>;
}
```

---

# 6) Different Types of Props

## String

```jsx
<User name="Rahul" />
```

## Number

```jsx
<User age={25} />
```

## Boolean

```jsx
<User isAdmin={true} />
```

## Array

```jsx
<User skills={["React", "Node"]} />
```

## Object

```jsx
<User info={{ city: "Delhi", age: 22 }} />
```

## Function

```jsx
<User handleClick={handleClick} />
```

---

# 7) Passing Functions as Props

## Parent Component

```jsx
function App() {
  const greet = () => {
    alert("Hello");
  };

  return <Button greet={greet} />;
}
```

## Child Component

```jsx
function Button({ greet }) {
  return <button onClick={greet}>Click</button>;
}
```

---

# 8) Children Props

```jsx
function Card({ children }) {
  return <div>{children}</div>;
}
```

Usage:

```jsx
<Card>
  <h1>Hello</h1>
  <p>Paragraph</p>
</Card>
```

---

# 9) Props vs State

| Props              | State                    |
| ------------------ | ------------------------ |
| Passed from parent | Managed inside component |
| Read-only          | Mutable                  |
| External data      | Internal data            |

---

# 10) Important Interview Points

* Props are immutable
* Data flows parent → child
* Props help component reusability
* Functions can also be passed as props
* `children` is a special prop

# Conditional Rendering in React — Complete Notes

---

# 1) What is Conditional Rendering?

Conditional rendering means showing different UI based on conditions.

React uses JavaScript conditions to decide what to render.

---

# 2) Using `if` Statement

```jsx
function App() {
  const isLoggedIn = true;

  if (isLoggedIn) {
    return <h1>Welcome User</h1>;
  }

  return <h1>Please Login</h1>;
}
```

---

# 3) Ternary Operator

## Syntax

```jsx
condition ? trueValue : falseValue
```

## Example

```jsx
function App() {
  const isLoggedIn = true;

  return (
    <div>
      {isLoggedIn ? <h1>Welcome</h1> : <h1>Login</h1>}
    </div>
  );
}
```

---

# 4) Logical AND (`&&`) Operator

```jsx
function App() {
  const isAdmin = true;

  return (
    <div>
      {isAdmin && <h1>Admin Panel</h1>}
    </div>
  );
}
```

---

# 5) Returning `null`

Returning `null` renders nothing.

```jsx
function Warning({ show }) {
  if (!show) {
    return null;
  }

  return <h1>Warning!</h1>;
}
```

---

# 6) Nested Conditional Rendering

```jsx
{
  isLoading ? (
    <h1>Loading...</h1>
  ) : isError ? (
    <h1>Error</h1>
  ) : (
    <h1>Data Loaded</h1>
  );
}
```

---

# 7) Real-World Examples

## Authentication

```jsx
{
  user ? <Dashboard /> : <Login />;
}
```

## Loading Spinner

```jsx
{
  loading && <Spinner />;
}
```

---

# 8) Important Interview Points

* React uses JavaScript conditions
* Ternary operator is most common
* `&&` is useful for optional rendering
* Returning `null` hides UI

# React Lists — Complete Interview Notes

---

# 1) What are Lists in React?

Lists are used to render multiple elements dynamically.

React commonly uses `.map()` for rendering lists.

---

# 2) Basic List Rendering

```jsx
function App() {
  const users = ["Rahul", "Aman", "Priya"];

  return (
    <ul>
      {users.map((user) => (
        <li>{user}</li>
      ))}
    </ul>
  );
}
```

---

# 3) Rendering Objects

```jsx
function App() {
  const users = [
    { id: 1, name: "Rahul" },
    { id: 2, name: "Aman" }
  ];

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
```

---

# 4) Keys in React

Keys uniquely identify list items.

```jsx
<li key={user.id}>{user.name}</li>
```

---

# 5) Why Keys are Important

Keys help React:

* identify changed items
* improve performance
* optimize re-rendering
* handle reconciliation efficiently

---

# 6) Best Practices for Keys

✅ Use unique stable IDs

```jsx
key={user.id}
```

❌ Avoid indexes when list changes dynamically

```jsx
key={index}
```

---

# 7) Filtering Lists

```jsx
const activeUsers = users.filter(user => user.active);
```

Then render:

```jsx
{
  activeUsers.map(user => (
    <li key={user.id}>{user.name}</li>
  ));
}
```

---

# 8) Empty List Handling

```jsx
{
  users.length === 0 ? (
    <p>No users found</p>
  ) : (
    users.map(user => (
      <li key={user.id}>{user.name}</li>
    ))
  );
}
```

---

# 9) Common Interview Questions

## Why do we use keys?

To uniquely identify elements and optimize rendering.

## Can we use index as key?

Possible, but not recommended for dynamic lists.

## Which method is used for rendering lists?

`.map()`

---

# React Responding to Events — Complete Interview Notes

---

# 1) What are Events in React?

Events are user interactions that happen in the browser.

Examples:

* button click
* typing in input
* form submit
* mouse hover
* keyboard press

React handles events using event handlers.

---

# 2) Basic Event Handling

```jsx
function App() {
  const handleClick = () => {
    alert('Button Clicked');
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

---

# 3) React Event Naming

React uses camelCase event names.

| HTML        | React       |
| ----------- | ----------- |
| onclick     | onClick     |
| onchange    | onChange    |
| onsubmit    | onSubmit    |
| onmouseover | onMouseOver |

---

# 4) Passing Functions to Events

Correct:

```jsx
<button onClick={handleClick}>Click</button>
```

Wrong:

```jsx
<button onClick={handleClick()}>Click</button>
```

### Why wrong?

Because function executes immediately during rendering.

---

# 5) Inline Event Functions

```jsx
<button onClick={() => alert('Hello')}>
  Click
</button>
```

---

# 6) Passing Arguments in Events

```jsx
function App() {
  const greet = (name) => {
    alert(`Hello ${name}`);
  }

  return (
    <button onClick={() => greet('Rahul')}>
      Greet
    </button>
  );
}
```

---

# 7) Event Object

React automatically passes an event object.

```jsx
function App() {
  const handleClick = (event) => {
    console.log(event);
  }

  return <button onClick={handleClick}>Click</button>
}
```

---

# 8) Prevent Default Behavior

Used mainly in forms.

```jsx
function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

# 9) Common React Events

| Event       | Description       |
| ----------- | ----------------- |
| onClick     | Mouse click       |
| onChange    | Input change      |
| onSubmit    | Form submit       |
| onMouseOver | Mouse hover       |
| onKeyDown   | Key pressed       |
| onFocus     | Input focused     |
| onBlur      | Input loses focus |

---

# 10) Event Bubbling in React

Events bubble upward in React similar to JavaScript DOM.

```jsx
<div onClick={() => console.log('Parent')}>
  <button onClick={() => console.log('Child')}>
    Click
  </button>
</div>
```

Output:

```text
Child
Parent
```

---

# 11) stopPropagation()

Stops event bubbling.

```jsx
function App() {
  const handleChild = (e) => {
    e.stopPropagation();
    console.log('Child');
  }

  return (
    <div onClick={() => console.log('Parent')}>
      <button onClick={handleChild}>Click</button>
    </div>
  )
}
```

---

# 12) Synthetic Events

React wraps browser events inside Synthetic Events.

### Benefits

* cross-browser compatibility
* consistent behavior
* improved performance

---

# 13) Important Interview Points

* React events use camelCase
* Event handlers receive functions
* Synthetic events provide consistency
* `preventDefault()` prevents default browser behavior
* `stopPropagation()` stops bubbling

# React State — Complete Interview Notes

---

# 1) What is State in React?

State is data managed inside a component.

When state changes, React re-renders the component.

### State makes UI dynamic.

Examples:

* counters
* forms
* toggles
* API data
* user interactions

---

# 2) useState Hook

React state in functional components is managed using `useState`.

## Syntax

```jsx
const [state, setState] = useState(initialValue)
```

---

# 3) Basic Counter Example

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

---

# 4) Understanding useState

```jsx
const [count, setCount] = useState(0)
```

## Breakdown

| Part     | Meaning               |
| -------- | --------------------- |
| count    | current state value   |
| setCount | state update function |
| 0        | initial value         |

---

# 5) State Updates Cause Re-render

Whenever state changes:

```text
React re-renders the component
```

Example:

```jsx
setCount(count + 1)
```

---

# 6) State is Private

State belongs to the component where it is created.

Other components cannot directly access it.

---

# 7) Updating State Correctly

❌ Wrong

```jsx
count = count + 1
```

❌ Wrong

```jsx
count++
```

✅ Correct

```jsx
setCount(count + 1)
```

---

# 8) Functional Updates

Used when next state depends on previous state.

```jsx
setCount(prevCount => prevCount + 1)
```

### Why preferred?

Avoids stale state issues.

---

# 9) State with Strings

```jsx
const [name, setName] = useState('Rahul');
```

---

# 10) State with Boolean

```jsx
const [isOpen, setIsOpen] = useState(false);
```

Toggle example:

```jsx
setIsOpen(!isOpen)
```

---

# 11) State with Arrays

```jsx
const [items, setItems] = useState([]);
```

Adding item:

```jsx
setItems([...items, newItem])
```

---

# 12) State with Objects

```jsx
const [user, setUser] = useState({
  name: 'Rahul',
  age: 22
});
```

Updating object:

```jsx
setUser({
  ...user,
  age: 23
})
```

---

# 13) Why We Use Spread Operator

State should not be mutated directly.

❌ Wrong

```jsx
user.age = 23
```

✅ Correct

```jsx
setUser({ ...user, age: 23 })
```

---

# 14) Multiple State Variables

```jsx
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [loading, setLoading] = useState(false);
```

---

# 15) Asynchronous State Updates

State updates are asynchronous.

```jsx
setCount(count + 1);
console.log(count);
```

Console may show old value.

---

# 16) Batching in React

React groups multiple state updates together for performance.

---

# 17) Lifting State Up

Moving shared state to a common parent component.

### Why?

To share data between sibling components.

---

# 18) Controlled Components

Inputs controlled using React state.

```jsx
function Form() {
  const [name, setName] = useState('');

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

---

# 19) State vs Props

| State                | Props            |
| -------------------- | ---------------- |
| Internal data        | External data    |
| Mutable              | Read-only        |
| Managed by component | Passed by parent |
| Dynamic              | Configurable     |

---

# 20) Common Mistakes with State

## Mutating state directly

❌ Wrong

```jsx
items.push(newItem)
```

✅ Correct

```jsx
setItems([...items, newItem])
```

---

## Updating based on stale state

❌ Risky

```jsx
setCount(count + 1)
setCount(count + 1)
```

✅ Better

```jsx
setCount(prev => prev + 1)
setCount(prev => prev + 1)
```

---

# 21) Important Interview Questions

## What is state?

State is data managed inside a component that changes over time.

## What happens when state changes?

React re-renders the component.

## Why use functional updates?

To safely update state based on previous state.

## Can state be modified directly?

No.

## Difference between props and state?

Props come from parent and are read-only. State is internal and mutable.

---

# 22) Important Interview Points

* State makes UI dynamic
* useState is used in functional components
* State updates trigger re-render
* Never mutate state directly
* Functional updates prevent stale state issues
* State updates are asynchronous

---

# 23) Mini Revision Cheat Sheet

## Create state

```jsx
const [count, setCount] = useState(0)
```

## Update state

```jsx
setCount(count + 1)
```

## Functional update

```jsx
setCount(prev => prev + 1)
```

## Boolean toggle

```jsx
setOpen(!open)
```

## Array update

```jsx
setItems([...items, item])
```

## Object update

```jsx
setUser({ ...user, age: 23 })
```

---

# React Routing — Complete Interview Notes

---

# 1) What is Routing?

Routing means navigating between different pages or views in an application.

In traditional websites:

* browser requests a new HTML page from the server
* full page reload happens

In React:

* routing is usually client-side
* React changes components without full page reload
* provides faster user experience

---

# 2) What is React Router?

React Router is the most popular routing library for React.

Package:

```bash
npm install react-router-dom
```

---

# 3) Why We Need Routing in React

Without routing:

* only one page/component visible
* navigation becomes difficult

Routing helps create:

* multi-page experiences
* dashboards
* admin panels
* e-commerce apps
* authentication flows

---

# 4) Types of Routing

## A) Client-Side Routing

Handled in browser using JavaScript.

Advantages:

* faster navigation
* no full reload
* smoother UX

React mainly uses client-side routing.

---

## B) Server-Side Routing

Server returns new HTML page for every request.

Traditional websites mainly use this.

---

# 5) Installing React Router

```bash
npm install react-router-dom
```

---

# 6) Basic Routing Setup

## Step 1: Import router components

```jsx
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
```

---

## Step 2: Create Components

```jsx
function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}
```

---

## Step 3: Configure Routes

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

# 7) Understanding Important Components

---

## BrowserRouter

Wraps the application.

Enables routing functionality.

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

---

## Routes

Container for all routes.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
</Routes>
```

---

## Route

Defines a route.

```jsx
<Route path="/about" element={<About />} />
```

### Breakdown

| Part    | Meaning             |
| ------- | ------------------- |
| path    | URL path            |
| element | component to render |

---

# 8) Navigation Using Link

Instead of `<a>` tag, React Router uses `Link`.

```jsx
import { Link } from 'react-router-dom';
```

Example:

```jsx
<Link to="/about">About</Link>
```

---

# 9) Why Not Use `<a>` Tag?

Using `<a>` causes:

* full page reload
* state reset
* slower navigation

`Link` provides:

* SPA behavior
* fast navigation
* no reload

---

# 10) Navigation Example

```jsx
function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

---

# 11) useNavigate Hook

Used for programmatic navigation.

```jsx
import { useNavigate } from 'react-router-dom';
```

Example:

```jsx
function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  }

  return (
    <button onClick={handleLogin}>
      Login
    </button>
  );
}
```

---

# 12) Dynamic Routing

Dynamic routes contain parameters.

Example:

```jsx
<Route path="/user/:id" element={<User />} />
```

### URL Example

```text
/user/10
```

Here:

```text
id = 10
```

---

# 13) useParams Hook

Used to access route parameters.

```jsx
import { useParams } from 'react-router-dom';
```

Example:

```jsx
function User() {
  const { id } = useParams();

  return <h1>User ID: {id}</h1>;
}
```

---

# 14) Nested Routes

Routes inside routes.

Example:

```jsx
<Route path="dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

---

# 15) Outlet Component

Used to render nested child routes.

```jsx
import { Outlet } from 'react-router-dom';
```

Example:

```jsx
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}
```

---

# 16) 404 Page / No Match Route

```jsx
<Route path="*" element={<NotFound />} />
```

Used when route does not exist.

---

# 17) Redirecting Routes

Using `Navigate` component.

```jsx
import { Navigate } from 'react-router-dom';
```

Example:

```jsx
<Route path="/home" element={<Navigate to="/" />} />
```

---

# 18) Protected Routes

Used for authentication.

Example:

```jsx
function ProtectedRoute({ children }) {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
```

Usage:

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

# 19) Query Parameters

Example URL:

```text
/products?category=mobile
```

Using hook:

```jsx
import { useSearchParams } from 'react-router-dom';
```

Example:

```jsx
const [searchParams] = useSearchParams();

const category = searchParams.get('category');
```

---

# 20) NavLink

`NavLink` adds active styling automatically.

```jsx
import { NavLink } from 'react-router-dom';
```

Example:

```jsx
<NavLink to="/about">
  About
</NavLink>
```

---

# 21) Difference Between Link and NavLink

| Link                | NavLink                       |
| ------------------- | ----------------------------- |
| Simple navigation   | Navigation with active styles |
| No active detection | Detects active route          |

---

# 22) Lazy Loading Routes

Used for performance optimization.

```jsx
const About = React.lazy(() => import('./About'));
```

Usage:

```jsx
<Suspense fallback={<h1>Loading...</h1>}>
  <About />
</Suspense>
```

---

# 23) Route Order in React Router v6

React Router v6 automatically matches best route.

Unlike older versions:

* no `Switch`
* uses `Routes`

---

# 24) useLocation Hook

Returns current location object.

```jsx
import { useLocation } from 'react-router-dom';
```

Example:

```jsx
const location = useLocation();

console.log(location.pathname);
```

---

# 25) HashRouter

Alternative router.

Uses:

```text
/#/about
```

Example:

```jsx
<HashRouter>
  <App />
</HashRouter>
```

### Mostly used when:

* server configuration unavailable
* static hosting issues

---

# 26) BrowserRouter vs HashRouter

| BrowserRouter       | HashRouter              |
| ------------------- | ----------------------- |
| Clean URLs          | Uses #                  |
| Needs server config | No server config needed |
| Better SEO          | Less SEO friendly       |

---

# 27) Common Routing Mistakes

## Using `<a>` instead of `Link`

❌ Wrong

```jsx
<a href="/about">About</a>
```

✅ Correct

```jsx
<Link to="/about">About</Link>
```

---

## Forgetting BrowserRouter

Routing will not work.

---

## Wrong path names

Paths are case-sensitive sometimes.

---

# 28) Important Interview Questions

## What is routing?

Navigation between pages/views.

## What is React Router?

A routing library for React.

## Difference between Link and a tag?

Link prevents full reload.

## What is dynamic routing?

Routes with parameters.

## What is useNavigate?

Hook for programmatic navigation.

## What is Outlet?

Placeholder for nested routes.

## What are protected routes?

Routes accessible only after authentication.

---

# 29) Important Interview Points

* React Router enables SPA navigation
* BrowserRouter wraps app
* Routes contains Route components
* Link prevents full reload
* useNavigate handles programmatic routing
* useParams reads route parameters
* Outlet renders nested routes
* Navigate redirects routes

---

# 30) Mini Revision Cheat Sheet

## Install router

```bash
npm install react-router-dom
```

---

## Basic setup

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>
```

---

## Link

```jsx
<Link to="/about">About</Link>
```

---

## Navigate programmatically

```jsx
const navigate = useNavigate();
navigate('/home');
```

---

## Dynamic route

```jsx
<Route path="/user/:id" element={<User />} />
```

---

## Access params

```jsx
const { id } = useParams();
```

---

## Nested route rendering

```jsx
<Outlet />
```

---

## Redirect

```jsx
<Navigate to="/login" />
```

---

# 31) Final Summary

React Routing allows navigation between different pages in a React application without reloading the page. React Router provides components and hooks like BrowserRouter, Routes, Route, Link, useNavigate, useParams, and Outlet to build modern SPA navigation systems.

---

# React Hooks — Complete Interview Notes

---

# 1) What are Hooks in React?

Hooks are special functions introduced in React 16.8.

They allow functional components to use:

* state
* lifecycle features
* refs
* context
* performance optimizations

Before hooks:

* state and lifecycle mainly existed in class components

After hooks:

* functional components became powerful and preferred.

---

# 2) Why Hooks Were Introduced

Problems with class components:

* complex lifecycle methods
* harder code reuse
* `this` keyword confusion
* large boilerplate
* difficult stateful logic sharing

Hooks solve these problems.

---

# 3) Advantages of Hooks

* simpler code
* reusable logic
* no `this` keyword
* better readability
* smaller components
* easier testing
* cleaner lifecycle handling

---

# 4) Rules of Hooks

Very important interview topic.

## Rule 1

Only call hooks at the top level.

✅ Correct

```jsx
useState()
```

❌ Wrong

```jsx
if (condition) {
  useState()
}
```

---

## Rule 2

Only call hooks inside:

* React functional components
* custom hooks

❌ Wrong

```jsx
function test() {
  useState()
}
```

---

# 5) Common React Hooks

| Hook                | Purpose                      |
| ------------------- | ---------------------------- |
| useState            | State management             |
| useEffect           | Side effects                 |
| useContext          | Access context               |
| useRef              | DOM reference/persist values |
| useMemo             | Memoize values               |
| useCallback         | Memoize functions            |
| useReducer          | Complex state management     |
| useLayoutEffect     | DOM measurements             |
| useImperativeHandle | Custom ref handling          |

---

# 6) useState Hook

Used for component state.

## Syntax

```jsx
const [state, setState] = useState(initialValue)
```

---

## Example

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

---

## Important Points

* state updates trigger re-render
* state updates are asynchronous
* never mutate state directly

❌ Wrong

```jsx
count++
```

✅ Correct

```jsx
setCount(count + 1)
```

---

# 7) Functional State Updates

Used when new state depends on old state.

```jsx
setCount(prev => prev + 1)
```

### Why important?

Prevents stale state issues.

---

# 8) useEffect Hook

Used for side effects.

Examples:

* API calls
* event listeners
* timers
* subscriptions
* DOM updates

---

## Basic Syntax

```jsx
useEffect(() => {
  console.log('Component Rendered');
});
```

---

# 9) Dependency Array

---

## Run on every render

```jsx
useEffect(() => {
  console.log('Every render');
});
```

---

## Run only once

```jsx
useEffect(() => {
  console.log('Mounted');
}, []);
```

---

## Run when dependency changes

```jsx
useEffect(() => {
  console.log(count);
}, [count]);
```

---

# 10) Cleanup Function

Used to prevent memory leaks.

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Running');
  }, 1000);

  return () => {
    clearInterval(timer);
  }
}, []);
```

---

# 11) useRef Hook

Used for:

* accessing DOM elements
* persisting values without re-render

---

## DOM Access Example

```jsx
import { useRef } from 'react';

function App() {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </div>
  )
}
```

---

## Persisting Values

```jsx
const countRef = useRef(0)
```

Updating ref does NOT trigger re-render.

---

# 12) useContext Hook

Used to consume Context API.

---

## Create Context

```jsx
const ThemeContext = createContext();
```

---

## Provide Context

```jsx
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

---

## Consume Context

```jsx
const theme = useContext(ThemeContext)
```

---

# 13) useMemo Hook

Used for memoizing expensive calculations.

---

## Syntax

```jsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data)
}, [data])
```

---

## Why useMemo?

Avoids recalculating expensive operations on every render.

---

# 14) useCallback Hook

Used for memoizing functions.

---

## Syntax

```jsx
const memoizedFunction = useCallback(() => {
  console.log('Hello');
}, [])
```

---

## Why useCallback?

Prevents unnecessary function recreation.

Useful when:

* passing functions to child components
* optimizing performance

---

# 15) Difference Between useMemo and useCallback

| useMemo                | useCallback       |
| ---------------------- | ----------------- |
| Memoizes value         | Memoizes function |
| Returns computed value | Returns function  |

---

# 16) useReducer Hook

Alternative to useState for complex state logic.

---

## Syntax

```jsx
const [state, dispatch] = useReducer(reducer, initialState)
```

---

## Example

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch(action.type) {
    case 'increment':
      return { count: state.count + 1 };

    case 'decrement':
      return { count: state.count - 1 };

    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h1>{state.count}</h1>

      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
    </div>
  )
}
```

---

# 17) useReducer vs useState

| useState     | useReducer             |
| ------------ | ---------------------- |
| Simple state | Complex state          |
| Easy syntax  | More scalable          |
| Small apps   | Large logic-heavy apps |

---

# 18) Custom Hooks

Custom hooks allow reusable logic.

### Naming rule

Must start with `use`.

---

## Example

```jsx
function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  }

  return { count, increment };
}
```

Usage:

```jsx
const { count, increment } = useCounter();
```

---

# 19) useLayoutEffect

Similar to useEffect.

Difference:

* runs synchronously after DOM updates
* runs before browser paint

Used for:

* measurements
* animations
* layout calculations

---

# 20) useImperativeHandle

Customizes ref values exposed to parent.

Usually used with:

```jsx
forwardRef
```

---

# 21) Hook Execution Order

Hooks execute in the same order on every render.

That is why hooks should not be used inside:

* loops
* conditions
* nested functions

---

# 22) Common Hook Mistakes

---

## Missing dependency array

```jsx
useEffect(() => {
  fetchData();
})
```

Runs every render.

---

## Direct state mutation

❌ Wrong

```jsx
user.name = 'Rahul'
```

✅ Correct

```jsx
setUser({ ...user, name: 'Rahul' })
```

---

## Using hooks conditionally

❌ Wrong

```jsx
if (show) {
  useEffect(() => {})
}
```

---

# 23) React Hook Lifecycle Understanding

## Mount

```jsx
useEffect(() => {
  console.log('Mounted');
}, [])
```

---

## Update

```jsx
useEffect(() => {
  console.log('Updated');
}, [count])
```

---

## Unmount

```jsx
useEffect(() => {
  return () => {
    console.log('Unmounted');
  }
}, [])
```

---

# 24) Interview Questions on Hooks

## What are hooks?

Functions that allow functional components to use React features.

## Why hooks were introduced?

To simplify stateful logic and replace class component complexity.

## What is useEffect?

Hook for side effects.

## Difference between useMemo and useCallback?

useMemo memoizes values. useCallback memoizes functions.

## What is useRef?

Hook for DOM references and persisting mutable values.

## What is custom hook?

Reusable hook-based logic.

## Why hooks should not be conditional?

React depends on consistent hook order.

---

# 25) Important Interview Points

* Hooks work only in functional components
* Hooks simplify React development
* useState manages state
* useEffect handles side effects
* useRef accesses DOM elements
* useMemo and useCallback optimize performance
* useReducer manages complex state
* custom hooks reuse logic

---

# 26) Mini Revision Cheat Sheet

## useState

```jsx
const [count, setCount] = useState(0)
```

---

## useEffect once

```jsx
useEffect(() => {
  fetchData();
}, [])
```

---

## useEffect cleanup

```jsx
useEffect(() => {
  return () => {
    cleanup();
  }
}, [])
```

---

## useRef

```jsx
const ref = useRef()
```

---

## useMemo

```jsx
const value = useMemo(() => calc(), [])
```

---

## useCallback

```jsx
const fn = useCallback(() => {}, [])
```

---

## useReducer

```jsx
const [state, dispatch] = useReducer(reducer, initialState)
```

---

# 27) Final Summary

React Hooks are special functions that allow functional components to use state, lifecycle methods, context, refs, and advanced React features. Hooks simplify React development by reducing boilerplate and improving logic reusability.



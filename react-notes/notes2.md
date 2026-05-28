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


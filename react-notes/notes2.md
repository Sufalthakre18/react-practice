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

# 10) Important Interview Points

* Lists are rendered using `.map()`
* Keys are essential
* Prefer unique IDs
* Avoid index as key for dynamic lists
* Keys improve reconciliation performance

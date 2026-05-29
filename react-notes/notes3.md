# React Context API — Complete Interview Notes

---

# 1) What is Context API?

Context API is a built-in React feature used for sharing data globally across components without manually passing props at every level.

It helps avoid:

```text
Prop Drilling
```

---

# 2) What is Prop Drilling?

Prop drilling means passing props through many nested components even when intermediate components do not need them.

Example:

```text
App → Parent → Child → GrandChild
```

Problem:

* messy code
* unnecessary prop passing
* difficult maintenance

---

# 3) Why Context API is Needed

Context API allows components to access shared data directly.

Useful for:

* authentication
* themes
* language settings
* user data
* global app settings

---

# 4) How Context API Works

Context API mainly has 3 parts:

| Part          | Purpose         |
| ------------- | --------------- |
| createContext | Creates context |
| Provider      | Supplies data   |
| useContext    | Consumes data   |

---

# 5) createContext()

Used to create a context object.

## Syntax

```jsx
const MyContext = createContext();
```

Example:

```jsx
import { createContext } from 'react';

const ThemeContext = createContext();
```

---

# 6) Provider Component

Provider shares data with child components.

## Syntax

```jsx
<MyContext.Provider value={data}>
  <App />
</MyContext.Provider>
```

Example:

```jsx
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

---

# 7) useContext Hook

Used to access context data.

## Syntax

```jsx
const value = useContext(MyContext)
```

Example:

```jsx
import { useContext } from 'react';

function Header() {
  const theme = useContext(ThemeContext);

  return <h1>{theme}</h1>;
}
```

---

# 8) Complete Context API Example

---

## Step 1: Create Context

```jsx
import { createContext } from 'react';

export const UserContext = createContext();
```

---

## Step 2: Wrap Provider

```jsx
import { UserContext } from './UserContext';

function App() {
  const user = 'Rahul';

  return (
    <UserContext.Provider value={user}>
      <Home />
    </UserContext.Provider>
  );
}
```

---

## Step 3: Consume Context

```jsx
import { useContext } from 'react';
import { UserContext } from './UserContext';

function Home() {
  const user = useContext(UserContext);

  return <h1>{user}</h1>;
}
```

---

# 9) Context API Data Flow

```text
Provider → Consumer Components
```

All nested components inside Provider can access context.

---

# 10) Multiple Contexts

React supports multiple contexts.

Example:

```jsx
<AuthContext.Provider value={auth}>
  <ThemeContext.Provider value={theme}>
    <App />
  </ThemeContext.Provider>
</AuthContext.Provider>
```

---

# 11) Context with Objects

```jsx
<UserContext.Provider
  value={{
    name: 'Rahul',
    age: 22
  }}
>
  <App />
</UserContext.Provider>
```

Consume:

```jsx
const user = useContext(UserContext);

console.log(user.name)
```

---

# 12) Updating Context Values

Context values can contain state and setter functions.

Example:

```jsx
const [theme, setTheme] = useState('light');

<ThemeContext.Provider value={{ theme, setTheme }}>
  <App />
</ThemeContext.Provider>
```

Consume:

```jsx
const { theme, setTheme } = useContext(ThemeContext);
```

---

# 13) Theme Toggle Example

## Provider

```jsx
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

---

## Consumer

```jsx
function Button() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setTheme('dark')}
    >
      {theme}
    </button>
  );
}
```

---

# 14) useContext vs Props

| Props                   | Context API          |
| ----------------------- | -------------------- |
| Manual passing          | Global sharing       |
| Good for local data     | Good for global data |
| Can cause prop drilling | Avoids prop drilling |

---

# 15) When to Use Context API

Use Context API for:

* themes
* authentication
* language settings
* user profile
* global preferences

---

# 16) When NOT to Use Context API

Avoid Context API for:

* frequently changing huge state
* complex large-scale state management

In such cases:

* Redux
* Zustand
* MobX
  may be better.

---

# 17) Performance Problem in Context API

When context value changes:

```text
All consuming components re-render
```

This may affect performance.

---

# 18) Optimizing Context Performance

## Use memoization

```jsx
const value = useMemo(() => ({ theme }), [theme])
```

---

## Split contexts

Instead of one huge context:

❌ Bad

```text
GlobalContext
```

✅ Better

```text
ThemeContext
AuthContext
UserContext
```

---

# 19) Custom Hook with Context

Very common interview pattern.

## Create custom hook

```jsx
function useTheme() {
  return useContext(ThemeContext);
}
```

Usage:

```jsx
const { theme } = useTheme();
```

Benefits:

* cleaner code
* reusable logic
* easier imports

---

# 20) Context API Folder Structure

Example:

```text
src/
 ├── context/
 │    ├── ThemeContext.js
 │    ├── AuthContext.js
 │
 ├── components/
 │    ├── Header.jsx
 │    ├── Dashboard.jsx
```

---

# 21) Context API vs Redux

| Context API        | Redux                     |
| ------------------ | ------------------------- |
| Built into React   | External library          |
| Simpler setup      | More complex              |
| Small-medium apps  | Large apps                |
| Less boilerplate   | More structure            |
| Basic global state | Advanced state management |

---

# 22) Common Mistakes

---

## Forgetting Provider

❌ Wrong

```jsx
const theme = useContext(ThemeContext)
```

without Provider.

Result:

```text
undefined or default value
```

---

## Large global context

Too many unrelated values in one context can hurt performance.

---

## Unnecessary re-renders

Context updates re-render all consumers.

---

# 23) Real-World Context API Examples

## Authentication

```jsx
<AuthContext.Provider value={{ user }}>
```

---

## Theme

```jsx
<ThemeContext.Provider value={{ darkMode }}>
```

---

## Language

```jsx
<LanguageContext.Provider value={{ language }}>
```

---

# 24) Important Interview Questions

## What is Context API?

A built-in React feature for global state sharing.

## What problem does Context API solve?

Prop drilling.

## What are the main parts of Context API?

* createContext
* Provider
* useContext

## Difference between props and context?

Props are manually passed. Context shares globally.

## Can Context API replace Redux?

For small-medium apps yes, but large apps may still need Redux.

## Why Context API may cause performance issues?

All consumers re-render when context value changes.

---

# 25) Important Interview Points

* Context API avoids prop drilling
* Provider shares data
* useContext consumes data
* Context is good for global state
* Multiple contexts can be used
* Context updates trigger re-renders
* Custom hooks improve context usage

---

# 26) Mini Revision Cheat Sheet

## Create context

```jsx
const ThemeContext = createContext()
```

---

## Provider

```jsx
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>
```

---

## Consume context

```jsx
const theme = useContext(ThemeContext)
```

---

## Context with state

```jsx
<ThemeContext.Provider value={{ theme, setTheme }}>
```

---

## Custom hook

```jsx
function useTheme() {
  return useContext(ThemeContext)
}
```

---

# 27) Final Summary

React Context API is a built-in feature used for sharing global data between components without prop drilling. It mainly works using createContext, Provider, and useContext, and is commonly used for themes, authentication, and application-wide state.

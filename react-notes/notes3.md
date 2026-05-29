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

---

# Redux Toolkit (RTK) — Complete Interview Notes

---

# 1) What is Redux?

Redux is a state management library used to manage global application state.

It helps share state across components in a predictable way.

---

# 2) Why Redux is Needed

React already has:

* props
* state
* Context API

But in large applications:

* state becomes difficult to manage
* prop drilling increases
* multiple components need same data
* complex updates become messy

Redux solves these problems.

---

# 3) What is Redux Toolkit?

Redux Toolkit (RTK) is the official recommended way to write Redux logic.

Package:

```bash
npm install @reduxjs/toolkit react-redux
```

Redux Toolkit simplifies Redux by reducing:

* boilerplate
* configuration complexity
* repetitive code

---

# 4) Problems with Traditional Redux

Traditional Redux required:

* action types
* action creators
* reducers
* switch statements
* store setup
* middleware setup

Too much boilerplate.

Redux Toolkit simplifies everything.

---

# 5) Advantages of Redux Toolkit

* less boilerplate
* easier setup
* built-in Immer support
* built-in thunk support
* better developer experience
* cleaner code
* recommended by Redux team

---

# 6) Core Redux Concepts

---

## Store

Global state container.

```text
Single source of truth
```

---

## Action

Object describing what happened.

Example:

```js
{
  type: 'increment'
}
```

---

## Reducer

Function that updates state.

```js
(state, action) => newState
```

---

## Dispatch

Sends action to reducer.

```js
dispatch(action)
```

---

# 7) Redux Toolkit Flow

```text
Component → dispatch(action)
→ reducer updates store
→ UI re-renders
```

---

# 8) Setting Up Redux Toolkit

---

## Install Packages

```bash
npm install @reduxjs/toolkit react-redux
```

---

# 9) Create Slice

Slice contains:

* state
* reducers
* actions

---

## Example: counterSlice.js

```jsx
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',

  initialState: {
    value: 0
  },

  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const {
  increment,
  decrement,
  incrementByAmount
} = counterSlice.actions;

export default counterSlice.reducer;
```

---

# 10) Understanding createSlice

---

## name

Unique slice name.

```jsx
name: 'counter'
```

---

## initialState

Default state.

```jsx
initialState: {
  value: 0
}
```

---

## reducers

Functions that modify state.

```jsx
reducers: {
  increment: () => {}
}
```

---

# 11) Configure Store

## store.js

```jsx
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
```

---

# 12) Provide Store to React App

## main.jsx / index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

---

# 13) useSelector Hook

Used to read data from Redux store.

---

## Syntax

```jsx
const data = useSelector(state => state.sliceName)
```

---

## Example

```jsx
import { useSelector } from 'react-redux';

function Counter() {
  const count = useSelector(state => state.counter.value);

  return <h1>{count}</h1>;
}
```

---

# 14) useDispatch Hook

Used to dispatch actions.

---

## Example

```jsx
import { useDispatch } from 'react-redux';
import { increment } from './counterSlice';

function Counter() {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(increment())}>
      Increment
    </button>
  );
}
```

---

# 15) Complete Counter Example

```jsx
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement
} from './counterSlice';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => dispatch(increment())}>
        +
      </button>

      <button onClick={() => dispatch(decrement())}>
        -
      </button>
    </div>
  );
}
```

---

# 16) Action Payload

Payload carries data.

Example:

```jsx
dispatch(incrementByAmount(10))
```

Reducer:

```jsx
incrementByAmount: (state, action) => {
  state.value += action.payload;
}
```

---

# 17) Immer in Redux Toolkit

Redux Toolkit uses Immer internally.

This allows writing:

```jsx
state.value += 1
```

Looks mutable but actually creates immutable updates.

---

# 18) Traditional Redux vs Redux Toolkit

| Traditional Redux        | Redux Toolkit      |
| ------------------------ | ------------------ |
| Large boilerplate        | Minimal code       |
| Manual setup             | Simplified setup   |
| Manual immutable updates | Immer support      |
| Complex configuration    | Easy configuration |

---

# 19) Async Operations in Redux Toolkit

Used for:

* API calls
* async requests
* fetching data

Redux Toolkit provides:

```jsx
createAsyncThunk
```

---

# 20) createAsyncThunk

Used for async logic.

---

## Example

```jsx
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',

  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    return response.json();
  }
)
```

---

# 21) Handling Async States

Common async states:

```text
loading
success
error
```

---

## Example

```jsx
extraReducers: (builder) => {
  builder
    .addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    })

    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })

    .addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    })
}
```

---

# 22) extraReducers

Used to handle:

* async actions
* external actions

---

# 23) Redux Toolkit Folder Structure

Example:

```text
src/
 ├── app/
 │    ├── store.js
 │
 ├── features/
 │    ├── counter/
 │    │    ├── counterSlice.js
 │
 ├── components/
 │    ├── Counter.jsx
```

---

# 24) Middleware in Redux Toolkit

Middleware handles:

* async logic
* logging
* API requests
* side effects

Redux Toolkit automatically includes:

```text
redux-thunk
```

---

# 25) Redux DevTools

Redux Toolkit supports Redux DevTools automatically.

Benefits:

* inspect state
* debug actions
* track updates

---

# 26) RTK Query

Redux Toolkit includes RTK Query for API fetching.

Benefits:

* caching
* auto refetching
* loading states
* reduced boilerplate

---

# 27) RTK Query Example

```jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.example.com/'
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users'
    })
  })
})
```

---

# 28) Difference Between Context API and Redux Toolkit

| Context API          | Redux Toolkit             |
| -------------------- | ------------------------- |
| Built into React     | External library          |
| Simpler              | More powerful             |
| Small-medium apps    | Large apps                |
| Limited optimization | Better scalability        |
| Basic state sharing  | Advanced state management |

---

# 29) When to Use Redux Toolkit

Use Redux Toolkit when:

* app has large global state
* many components share state
* async operations are heavy
* state logic becomes complex
* debugging is important

---

# 30) Common Redux Toolkit Mistakes

---

## Forgetting Provider

❌ Wrong

```jsx
<App />
```

without:

```jsx
<Provider store={store}>
```

---

## Wrong state access

❌ Wrong

```jsx
state.value
```

✅ Correct

```jsx
state.counter.value
```

---

## Mutating non-Immer state incorrectly

Always understand immutable updates.

---

# 31) Redux Toolkit Interview Questions

## What is Redux Toolkit?

Official recommended way to use Redux.

## Why Redux Toolkit was introduced?

To reduce Redux boilerplate.

## What is createSlice?

Function that creates reducers and actions together.

## What is configureStore?

Function to create Redux store easily.

## What is useSelector?

Hook for reading Redux state.

## What is useDispatch?

Hook for dispatching actions.

## What is createAsyncThunk?

Utility for async operations.

## What is Immer?

Library that enables immutable updates using mutable syntax.

---

# 32) Important Interview Points

* Redux Toolkit is official Redux approach
* createSlice reduces boilerplate
* configureStore simplifies store setup
* useSelector reads state
* useDispatch dispatches actions
* RTK uses Immer internally
* createAsyncThunk handles async logic
* RTK Query simplifies API fetching

---

# 33) Mini Revision Cheat Sheet

## Install

```bash
npm install @reduxjs/toolkit react-redux
```

---

## Create slice

```jsx
const slice = createSlice({})
```

---

## Configure store

```jsx
configureStore({ reducer })
```

---

## Provider

```jsx
<Provider store={store}>
```

---

## Read state

```jsx
useSelector(state => state.counter.value)
```

---

## Dispatch action

```jsx
dispatch(increment())
```

---

## Async thunk

```jsx
createAsyncThunk()
```

---

# 34) Final Summary

Redux Toolkit is the official and simplified approach for Redux state management. It reduces boilerplate using createSlice and configureStore, supports async logic with createAsyncThunk, and provides scalable global state management for modern React applications.
# React Performance Optimization — Complete Interview Notes

# Topics Covered

* Performance Optimization Basics
* Lazy Loading
* React.lazy
* Suspense
* Code Splitting
* useMemo Hook
* Memoization
* Optimization Best Practices
* Common Mistakes
* Interview Questions

---

# 1) What is Performance Optimization?

Performance optimization means improving:

* application speed
* rendering efficiency
* loading time
* user experience

Goal:

```text
Render less, calculate less, load less
```

---

# 2) Why Performance Optimization is Important

Without optimization:

* slow rendering
* unnecessary re-renders
* heavy bundle size
* poor user experience
* laggy UI

Especially important in:

* large applications
* dashboards
* e-commerce apps
* data-heavy UIs

---

# 3) Common React Performance Problems

* unnecessary re-renders
* expensive calculations
* large JavaScript bundles
* too many API calls
* rendering huge lists
* inline object/function recreation

---

# 4) Important Optimization Techniques

| Technique      | Purpose                          |
| -------------- | -------------------------------- |
| Lazy Loading   | Load components only when needed |
| Code Splitting | Split bundle into smaller chunks |
| useMemo        | Memoize expensive values         |
| useCallback    | Memoize functions                |
| React.memo     | Prevent unnecessary re-renders   |
| Virtualization | Optimize large lists             |

---

# 5) What is Lazy Loading?

Lazy loading means:

```text
Load components only when required
```

Instead of loading entire application initially.

---

# 6) Benefits of Lazy Loading

* smaller initial bundle
* faster page load
* improved performance
* better user experience
* reduced memory usage

---

# 7) Code Splitting

Code splitting breaks application into smaller chunks.

Instead of:

```text
One huge JavaScript bundle
```

React loads:

```text
Only required chunks
```

---

# 8) React.lazy()

Used for lazy loading components.

---

## Syntax

```jsx
const Component = React.lazy(() => import('./Component'))
```

---

# 9) Basic Lazy Loading Example

```jsx
import React, { Suspense } from 'react';

const About = React.lazy(() => import('./About'));

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <About />
    </Suspense>
  );
}
```

---

# 10) Understanding React.lazy

```jsx
React.lazy(() => import('./About'))
```

### What happens?

* component loads only when needed
* dynamic import creates separate chunk
* reduces initial bundle size

---

# 11) Suspense Component

Used to display fallback UI while lazy component loads.

---

## Syntax

```jsx
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>
```

---

# 12) Fallback UI

Fallback can be:

* spinner
* loading text
* skeleton UI

Example:

```jsx
<Suspense fallback={<h1>Loading...</h1>}>
```

---

# 13) Route-Based Lazy Loading

Very common in real applications.

---

## Example

```jsx
const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

---

# 14) Lazy Loading Advantages

* improves initial load time
* reduces unused code download
* scalable for large apps
* better mobile performance

---

# 15) Lazy Loading Disadvantages

* small delay during first load
* more network requests
* over-splitting may hurt performance

---

# 16) What is Memoization?

Memoization means:

```text
Caching previously computed result
```

So React does not recalculate unnecessarily.

---

# 17) What is useMemo?

useMemo is a React hook used to memoize expensive calculations.

---

## Syntax

```jsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation();
}, [dependencies])
```

---

# 18) Why useMemo is Needed

Without useMemo:

```text
Expensive calculations run on every render
```

With useMemo:

```text
Calculation runs only when dependencies change
```

---

# 19) Basic useMemo Example

```jsx
import { useMemo, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const expensiveValue = useMemo(() => {
    console.log('Calculating...');

    return count * 2;
  }, [count]);

  return (
    <div>
      <h1>{expensiveValue}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

---

# 20) How useMemo Works

```jsx
useMemo(() => calculation, [dependencies])
```

React:

* stores calculated value
* reuses cached value
* recalculates only if dependency changes

---

# 21) Expensive Calculation Example

```jsx
const result = useMemo(() => {
  let sum = 0;

  for(let i = 0; i < 1000000000; i++) {
    sum += i;
  }

  return sum;
}, [])
```

Without useMemo:

```text
UI becomes slow on every render
```

---

# 22) useMemo with Filtering Lists

Very common real-world example.

```jsx
const filteredUsers = useMemo(() => {
  return users.filter(user => user.active);
}, [users])
```

---

# 23) useMemo with Sorting

```jsx
const sortedProducts = useMemo(() => {
  return [...products].sort((a, b) => a.price - b.price);
}, [products])
```

---

# 24) Difference Between useMemo and useCallback

| useMemo                 | useCallback        |
| ----------------------- | ------------------ |
| Memoizes values         | Memoizes functions |
| Returns computed result | Returns function   |

---

# 25) What is React.memo?

React.memo prevents unnecessary component re-renders.

---

## Example

```jsx
const Child = React.memo(function Child({ name }) {
  return <h1>{name}</h1>;
});
```

---

# 26) React.memo + useCallback

Very common optimization pair.

```jsx
const handleClick = useCallback(() => {
  console.log('Clicked');
}, [])
```

Prevents child component re-render.

---

# 27) When to Use useMemo

Use useMemo for:

* expensive calculations
* filtering
* sorting
* large datasets
* derived values

---

# 28) When NOT to Use useMemo

Avoid unnecessary memoization.

❌ Bad example:

```jsx
const value = useMemo(() => count + 1, [count])
```

Simple calculations do not need memoization.

---

# 29) Over-Optimization Problem

Too much optimization may:

* increase complexity
* increase memory usage
* reduce readability

Optimize only when needed.

---

# 30) Common Performance Optimization Mistakes

---

## Missing dependency array

❌ Wrong

```jsx
useMemo(() => calculate())
```

---

## Wrong dependencies

Incorrect dependencies cause stale values.

---

## Using useMemo everywhere

Can worsen performance.

---

## Lazy loading tiny components unnecessarily

Creates unnecessary network requests.

---

# 31) Real-World Optimization Example

---

## Search Filtering

```jsx
const filteredItems = useMemo(() => {
  return items.filter(item =>
    item.name.includes(search)
  );
}, [items, search])
```

---

## Dashboard Analytics

```jsx
const analytics = useMemo(() => {
  return heavyAnalyticsCalculation(data);
}, [data])
```

---

# 32) Performance Optimization Strategy

---

## Step 1

Identify performance bottlenecks.

---

## Step 2

Use React DevTools Profiler.

---

## Step 3

Optimize expensive renders/calculations.

---

## Step 4

Use memoization carefully.

---

# 33) React DevTools Profiler

Used for:

* detecting slow components
* measuring render time
* identifying unnecessary re-renders

---

# 34) Lazy Loading vs useMemo

| Lazy Loading             | useMemo                |
| ------------------------ | ---------------------- |
| Optimizes loading        | Optimizes calculations |
| Delays component loading | Caches computed values |
| Reduces bundle size      | Reduces recalculations |

---

# 35) Interview Questions

## What is lazy loading?

Loading components only when needed.

## Why use Suspense?

To show fallback UI during lazy loading.

## What is useMemo?

Hook for memoizing expensive calculations.

## Difference between useMemo and useCallback?

useMemo memoizes values. useCallback memoizes functions.

## When should useMemo be avoided?

For simple inexpensive calculations.

## What is code splitting?

Breaking application bundle into smaller chunks.

---

# 36) Important Interview Points

* Lazy loading improves initial performance
* React.lazy loads components dynamically
* Suspense handles loading state
* useMemo caches expensive calculations
* Memoization reduces unnecessary recalculations
* Over-optimization should be avoided
* React.memo prevents unnecessary re-renders

---

# 37) Mini Revision Cheat Sheet

## Lazy loading

```jsx
const About = React.lazy(() => import('./About'))
```

---

## Suspense

```jsx
<Suspense fallback={<h1>Loading...</h1>}>
```

---

## useMemo

```jsx
const value = useMemo(() => calc(), [deps])
```

---

## useCallback

```jsx
const fn = useCallback(() => {}, [])
```

---

## React.memo

```jsx
React.memo(Component)
```

---

# 38) Final Summary

React performance optimization improves rendering speed and user experience by reducing unnecessary renders, calculations, and bundle sizes. Lazy loading and code splitting improve loading performance, while useMemo optimizes expensive calculations using memoization.


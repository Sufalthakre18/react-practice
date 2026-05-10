# Redux & Redux Toolkit (RTK) — Beginner Friendly World-Class Notes

## Part 1 — Introduction to Redux & Redux Toolkit

---

# 1. Why Redux Exists

Before Redux, React applications mostly handled data using:

* Props
* Local component state (`useState`)
* Context API

This works fine for small apps.

But as applications grow:

* Data needs to be shared between many components
* Props drilling becomes painful
* State becomes difficult to track
* Bugs become harder to debug
* Multiple components try to manage same data
* Async operations become messy

Redux solves these problems.

---

# 2. What is Redux?

Redux is a **state management library**.

It helps manage and centralize application state.

Redux gives:

* Predictable state management
* Centralized data storage
* Better debugging
* Easier scaling
* Structured architecture

---

# 3. Real Meaning of State

State means:

> Data that changes over time and affects the UI.

Examples:

* User login status
* Cart items
* Theme mode
* Notifications
* API data
* Loading states
* Messages

Example:

```js
const [count, setCount] = useState(0)
```

Here:

* `count` = state
* `setCount` = function to update state

---

# 4. Problem Without Redux

Imagine:

```plaintext
App
 ├── Navbar
 ├── Sidebar
 ├── Products
 ├── Cart
 └── Profile
```

Suppose cart data is needed in:

* Navbar
* Cart page
* Checkout page
* Product cards

Without Redux:

You pass props everywhere.

This is called:

# Props Drilling

Example:

```plaintext
App → Products → ProductCard → Button
```

This becomes:

* Hard to maintain
* Messy
* Difficult to debug

Redux solves this using a:

# Global Store

---

# 5. What is a Store?

Store = Central place where all app state lives.

Think of it like:

```plaintext
Bank Locker
```

All important data stays in one safe place.

Components can:

* Read data from store
* Update data in store

---

# 6. Core Redux Architecture

Redux follows a strict flow.

# Redux Flow

```plaintext
UI → Dispatch(Action) → Reducer → Store Updated → UI Re-renders
```

This is the MOST IMPORTANT line in Redux.

Memorize it.

---

# 7. Redux Architecture Deep Dive

## Step 1 — UI

User interacts with application.

Example:

* Clicking Add to Cart
* Login button
* Increment counter

---

## Step 2 — Action

Action = Plain JavaScript object.

It tells Redux:

> WHAT happened.

Example:

```js
{
  type: "cart/addItem"
}
```

Action must have:

```js
type
```

---

## Step 3 — Dispatch

Dispatch sends action to reducer.

Example:

```js
dispatch(addItem())
```

Dispatch is like:

```plaintext
Courier Service
```

It delivers the action.

---

## Step 4 — Reducer

Reducer is a function.

It decides:

> HOW state should change.

Example:

```js
function counterReducer(state, action) {
  switch(action.type) {
    case "increment":
      return {
        count: state.count + 1
      }

    default:
      return state
  }
}
```

Reducer rules:

* Must be pure function
* Should not mutate state directly
* Same input → same output
* No API calls inside reducer
* No async code inside reducer

---

## Step 5 — Store Updates

Redux store updates state.

Example:

```js
{
  count: 5
}
```

becomes:

```js
{
  count: 6
}
```

---

## Step 6 — UI Re-renders

React detects updated state.

UI automatically updates.

Example:

Counter changes from:

```plaintext
5 → 6
```

---

# 8. Redux Data Flow Diagram

```plaintext
User Click
    ↓
Dispatch Action
    ↓
Reducer Runs
    ↓
Store Updates
    ↓
React Re-renders
```

Redux follows:

# One-Way Data Flow

This makes debugging easier.

---

# 9. Important Redux Terminologies

## 1. Store

Central storage of app state.

---

## 2. State

Current data inside store.

---

## 3. Action

Object describing what happened.

---

## 4. Reducer

Function deciding state updates.

---

## 5. Dispatch

Function used to send action.

---

## 6. Selector

Used to read state from store.

Example:

```js
const count = useSelector((state) => state.counter.value)
```

---

# 10. Three Principles of Redux

These are VERY IMPORTANT interview concepts.

---

## Principle 1 — Single Source of Truth

Entire application state lives in:

```plaintext
One Store
```

Benefits:

* Easy debugging
* Predictable state
* Centralized management

---

## Principle 2 — State is Read Only

You cannot directly modify state.

Wrong:

```js
state.count++
```

Correct:

```js
dispatch(increment())
```

State changes only through actions.

---

## Principle 3 — Changes with Pure Functions

Reducers must be pure functions.

Meaning:

* No side effects
* No API calls
* No randomness
* Same input → same output

---

# 11. What Makes Redux Powerful?

Redux is powerful because:

* Predictable behavior
* Easy debugging
* Time travel debugging
* Centralized state
* Better scalability
* DevTools support
* Middleware support

---

# 12. Redux DevTools

Redux DevTools help developers:

* Track actions
* See state changes
* Debug easily
* Time travel debugging

VERY IMPORTANT in real projects.

---

# 13. Problems with Traditional Redux

Redux was powerful.

But old Redux had many issues.

---

## Traditional Redux Problems

### 1. Too Much Boilerplate

Need separate files for:

* Actions
* Action types
* Reducers
* Constants
* Store

Very repetitive.

---

### 2. Complex Setup

Configuration was difficult for beginners.

---

### 3. Too Much Manual Work

Need to:

* Write immutable updates manually
* Configure middleware manually
* Configure DevTools manually

---

### 4. Difficult Async Handling

Using:

```plaintext
redux-thunk
redux-saga
redux-observable
```

became confusing.

---

# 14. Redux Toolkit (RTK)

Redux Toolkit is the:

# Official recommended way to write Redux.

Created by Redux team.

It simplifies Redux development.

---

# 15. Why Redux Toolkit Was Created

RTK solves:

* Boilerplate code
* Complex setup
* Immutable update difficulty
* Middleware configuration
* Redux best practices

---

# 16. What RTK Gives Automatically

Redux Toolkit provides:

* Simpler syntax
* Cleaner code
* Built-in Immer
* Built-in thunk
* DevTools setup
* Better architecture

---

# 17. Redux vs Redux Toolkit

| Redux                  | Redux Toolkit     |
| ---------------------- | ----------------- |
| Large boilerplate      | Minimal code      |
| Manual setup           | Easy setup        |
| Complex reducers       | Simple reducers   |
| Manual immutable logic | Immer handles it  |
| Hard for beginners     | Beginner friendly |
| Multiple files         | Cleaner structure |

---

# 18. What is Immer?

Immer allows writing:

```js
state.count++
```

inside reducers safely.

Even though it LOOKS mutable,
Immer internally creates immutable updates.

This is magic of RTK.

---

# 19. Core RTK Functions

These are VERY IMPORTANT.

---

## 1. configureStore()

Creates Redux store.

Example:

```js
const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})
```

---

## 2. createSlice()

Most important RTK feature.

It automatically creates:

* Actions
* Reducers
* Action types

Example:

```js
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
      state.value++
    }
  }
})
```

---

## 3. createAsyncThunk()

Used for API calls and async operations.

Example:

```js
createAsyncThunk()
```

Handles:

* pending
* fulfilled
* rejected

states automatically.

---

# 20. RTK Architecture

RTK architecture is almost same as Redux.

But much cleaner.

```plaintext
UI
 ↓
Dispatch Action
 ↓
Slice Reducer
 ↓
Store Updates
 ↓
UI Re-renders
```

---

# 21. What is Slice?

Slice means:

> Small piece of Redux state.

Example:

```plaintext
userSlice
cartSlice
productSlice
authSlice
```

Each slice manages one feature.

---

# 22. Recommended Folder Structure (RTK)

```plaintext
src/
 ├── app/
 │    └── store.js
 │
 ├── features/
 │    ├── counter/
 │    │     ├── counterSlice.js
 │    │
 │    ├── auth/
 │    │     ├── authSlice.js
 │    │
 │    └── cart/
 │          ├── cartSlice.js
```

This is industry standard structure.

---

# 23. When Should You Use Redux?

Use Redux when:

* Large applications
* Shared state across components
* Complex business logic
* Heavy async operations
* Large teams
* Predictable architecture needed

---

# 24. When Redux May NOT Be Needed

Do NOT use Redux for:

* Very small apps
* Simple local state
* Tiny projects

Sometimes:

```js
useState
useContext
```

is enough.

---

# 25. Redux vs Context API

| Context API         | Redux                     |
| ------------------- | ------------------------- |
| Good for small apps | Better for large apps     |
| Basic state sharing | Advanced state management |
| Less tooling        | Powerful DevTools         |
| Limited scalability | Highly scalable           |
| No middleware       | Middleware support        |

---

# 26. Common Redux Interview Questions

## Q1. What is Redux?

Redux is a predictable state management library used to manage global application state.

---

## Q2. Why use Redux?

Redux helps:

* Centralize state
* Avoid props drilling
* Improve scalability
* Simplify debugging

---

## Q3. What is Store in Redux?

Store is the central container holding application state.

---

## Q4. What is an Action?

Action is a plain JavaScript object describing what happened.

---

## Q5. What is a Reducer?

Reducer is a pure function that updates state based on action.

---

## Q6. What is Dispatch?

Dispatch sends actions to reducers.

---

## Q7. What is Redux Toolkit?

Redux Toolkit is the official recommended way to write Redux logic with less boilerplate.

---

## Q8. What is createSlice?

createSlice automatically creates reducers and actions.

---

## Q9. What is configureStore?

configureStore simplifies Redux store setup.

---

## Q10. What is Immer in RTK?

Immer allows writing mutable logic while maintaining immutable state internally.

---

# 27. MOST IMPORTANT Beginner Summary

Remember these:

```plaintext
Redux = Global State Management
```

```plaintext
Store = Central Data Storage
```

```plaintext
Action = What Happened
```

```plaintext
Reducer = How State Changes
```

```plaintext
Dispatch = Sends Action
```

```plaintext
RTK = Simplified Redux
```

---

# 28. One-Line Definitions (Fast Revision)

| Term     | Meaning                     |
| -------- | --------------------------- |
| Redux    | State management library    |
| Store    | Central state container     |
| State    | Application data            |
| Action   | Event description           |
| Reducer  | Updates state               |
| Dispatch | Sends action                |
| Selector | Reads state                 |
| Slice    | Feature state section       |
| RTK      | Modern Redux approach       |
| Immer    | Immutable updates made easy |

---

# 29. Final Beginner Understanding

If you understand THIS line,
you understand Redux:

```plaintext
User interacts with UI → Action dispatched → Reducer updates store → UI updates automatically
```

That is the entire Redux philosophy.

---

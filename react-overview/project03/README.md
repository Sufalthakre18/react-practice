# Assignment: Mini E-commerce Store (Context API Practice)

## Objective

Build a Mini E-commerce Store using React (Vite) to practice Context API for global state management.

---

## Contexts to Implement

### 1. AuthContext

Manage authentication globally.

Features:

* Login user
* Logout user
* Store user data
* Show login status in Navbar

---

### 2. CartContext

Manage shopping cart globally.

Features:

* Add product to cart
* Remove product from cart
* Show cart items
* Calculate total price
* Show cart count in Navbar

---

### 3. ThemeContext

Manage application theme.

Features:

* Dark mode
* Light mode
* Toggle theme from Navbar
* Apply theme globally

---

## API

Use this API to fetch products:

[https://fakestoreapi.com/products](https://fakestoreapi.com/products)

---

## Pages to Build

1. Home Page

* Fetch products from API
* Display product list
* Add products to cart

2. Product Details Page

* Show full product information
* Add to cart

3. Cart Page

* Show cart items
* Remove items
* Show total price

4. Login Page

* Simulate login
* Update AuthContext

---

## Suggested Folder Structure

src
├── components
├── pages
├── context
│     ├── AuthContext.jsx
│     ├── CartContext.jsx
│     └── ThemeContext.jsx
├── services
│     └── api.js
├── App.jsx
└── main.jsx

---

## Learning Outcomes

* Understand Context API for global state
* Share data between multiple components
* Use multiple context providers
* Combine API data with global state
* Follow a clean React project structure

---

## Bonus (Optional)

* Persist cart using localStorage
* Protected routes
* Product search
* Loading states for API calls

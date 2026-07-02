# REST API - Interview Notes

## What is a REST API?

**REST (Representational State Transfer)** is an architectural style used to design web services that allow communication between a **client** and a **server** over the HTTP protocol.

A **REST API (Application Programming Interface)** exposes resources through URLs, and clients interact with these resources using standard HTTP methods such as **GET, POST, PUT, PATCH, and DELETE**.

REST APIs are lightweight, scalable, stateless, and commonly exchange data in **JSON** format.

---

# How REST API Works

1. The client (browser, mobile app, frontend) sends an HTTP request.
2. The request contains:
   - HTTP Method
   - URL
   - Headers
   - Body (optional)
3. The server processes the request.
4. The server interacts with the database if needed.
5. The server returns an HTTP response containing:
   - Status Code
   - Headers
   - Response Body (usually JSON)

```
Client
   │
   │ HTTP Request
   ▼
REST API Server
   │
   │
Database
   │
   ▼
HTTP Response (JSON)
```

---

# REST Architecture Principles

## 1. Client-Server Architecture

The client and server are independent.

- Client is responsible for the UI.
- Server is responsible for business logic and database operations.

### Advantages

- Loose coupling
- Easy maintenance
- Better scalability

---

## 2. Stateless

REST APIs are **stateless**.

This means:

- The server does **not remember** previous requests.
- Every request must contain all required information.

Example:

```http
GET /users/101

Authorization: Bearer eyJhbGciOi...
```

If another request comes, the client must again send the authentication token.

### Advantages

- High scalability
- Easy load balancing
- Simple server design

---

## 3. Resources

Everything in REST is treated as a **Resource**.

Examples:

```
Users
Orders
Products
Employees
Students
```

Each resource has its own unique URL.

```
/users
/users/101

/products
/products/50

/orders
/orders/20
```

---

## 4. Uniform Interface

REST follows standard HTTP methods.

| HTTP Method | Purpose |
|------------|---------|
| GET | Retrieve data |
| POST | Create new data |
| PUT | Replace entire resource |
| PATCH | Update part of a resource |
| DELETE | Delete a resource |

Example:

```
GET     /users
GET     /users/101
POST    /users
PUT     /users/101
PATCH   /users/101
DELETE  /users/101
```

---

## 5. Representation of Resources

Resources can be represented in multiple formats.

Common formats:

- JSON ✅
- XML

Most REST APIs use JSON because it is lightweight.

Example:

```json
{
    "id": 101,
    "name": "John",
    "email": "john@example.com"
}
```

---

## 6. Cacheable

Responses can be cached.

Example:

A product list doesn't change every second.

Instead of fetching it every time, the client can reuse the cached response.

Benefits:

- Faster performance
- Reduced server load
- Better user experience

---

## 7. Layered System

The client doesn't know whether it communicates directly with the server or through multiple layers.

Example:

```
Client

↓

Load Balancer

↓

API Gateway

↓

Authentication Server

↓

Application Server

↓

Database
```

---

# HTTP Methods

## GET

Retrieve data.

Example:

```http
GET /users
```

Response

```json
[
    {
        "id":1,
        "name":"John"
    }
]
```

---

## POST

Create a new resource.

Request

```http
POST /users
```

Body

```json
{
    "name":"Alice",
    "email":"alice@example.com"
}
```

Response

```http
201 Created
```

---

## PUT

Updates the **entire resource**.

Example

```http
PUT /users/101
```

Body

```json
{
    "id":101,
    "name":"Alice",
    "email":"alice@gmail.com"
}
```

Entire object gets replaced.

---

## PATCH

Updates only required fields.

```http
PATCH /users/101
```

Body

```json
{
    "email":"alice@gmail.com"
}
```

Only the email field changes.

---

## DELETE

Deletes a resource.

```http
DELETE /users/101
```

Response

```http
204 No Content
```

---

# HTTP Request Structure

```
HTTP Method
URL
Headers
Body (Optional)
```

Example

```http
POST /users

Headers

Content-Type: application/json
Authorization: Bearer token

Body

{
    "name":"John",
    "email":"john@example.com"
}
```

---

# HTTP Response Structure

```
Status Code
Headers
Body
```

Example

```http
HTTP/1.1 201 Created

Content-Type: application/json

{
    "id":101,
    "name":"John"
}
```

---

# HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | OK |
| 201 | Created |
| 202 | Accepted |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 405 | Method Not Allowed |
| 409 | Conflict |
| 500 | Internal Server Error |
| 502 | Bad Gateway |
| 503 | Service Unavailable |

---

# Example REST API

Suppose we have a Student Management System.

## Get All Students

```http
GET /students
```

---

## Get Student by ID

```http
GET /students/10
```

---

## Create Student

```http
POST /students
```

Body

```json
{
    "name":"Rahul",
    "age":22
}
```

---

## Update Student

```http
PUT /students/10
```

---

## Update Student Age

```http
PATCH /students/10
```

Body

```json
{
    "age":23
}
```

---

## Delete Student

```http
DELETE /students/10
```

---

# Real-World Example

Imagine an e-commerce application.

### View Products

```http
GET /products
```

---

### View Single Product

```http
GET /products/20
```

---

### Add Product

```http
POST /products
```

---

### Update Product

```http
PUT /products/20
```

---

### Delete Product

```http
DELETE /products/20
```

---

# Advantages of REST API

- Simple and easy to understand
- Platform independent
- Lightweight communication
- Uses HTTP protocol
- Stateless architecture
- Highly scalable
- Easy integration with web and mobile applications
- Supports caching
- Uses JSON which is lightweight and human-readable

---

# Disadvantages of REST API

- Stateless requests may require sending repeated information (e.g., authentication tokens).
- No strict contract like SOAP.
- Versioning must be managed carefully.
- Large payloads can affect performance.

---

# REST vs SOAP

| REST | SOAP |
|------|------|
| Architectural Style | Protocol |
| Uses JSON | Uses XML |
| Lightweight | Heavyweight |
| Faster | Slower |
| Easy to learn | More complex |
| Uses HTTP methods | Uses SOAP operations |
| Widely used in web/mobile apps | Common in enterprise systems |

---

# Common Interview Questions

### What is REST API?

An architectural style for building web services where resources are accessed using URLs and manipulated using standard HTTP methods.

---

### Why is REST Stateless?

Because the server does not store client session information.

Each request contains everything needed to process it.

---

### Why is JSON preferred?

- Lightweight
- Easy to read
- Faster parsing
- Language independent

---

### Difference Between PUT and PATCH

| PUT | PATCH |
|------|--------|
| Updates entire resource | Updates selected fields |
| Replaces object | Partial modification |
| Idempotent | Usually idempotent |

Example:

PUT

```json
{
    "id":1,
    "name":"John",
    "email":"john@gmail.com"
}
```

PATCH

```json
{
    "email":"john@gmail.com"
}
```

---

### Difference Between POST and PUT

| POST | PUT |
|------|-----|
| Creates resource | Creates or replaces resource |
| Not idempotent | Idempotent |
| Server usually generates ID | Client often specifies the resource URL |

---

### What Makes a Good REST API?

- Meaningful resource names
- Proper HTTP methods
- Correct status codes
- Stateless communication
- Secure authentication (JWT/OAuth)
- Versioning (e.g., `/api/v1/users`)
- Pagination for large datasets
- Consistent JSON responses
- Proper error handling

---

# 2-Minute Interview Summary

> REST API (Representational State Transfer Application Programming Interface) is an architectural style for designing web services. It enables communication between clients and servers using the HTTP protocol. Resources are identified by URLs and manipulated using standard HTTP methods like GET, POST, PUT, PATCH, and DELETE. REST follows principles such as client-server architecture, stateless communication, resource-based URLs, a uniform interface, cacheable responses, and a layered system. Data is typically exchanged in JSON format. Due to its simplicity, scalability, and lightweight nature, REST APIs are widely used in modern web, mobile, and cloud applications.

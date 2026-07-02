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


---

# JWT (JSON Web Token) - Interview Notes

## What is JWT?

**JWT (JSON Web Token)** is an open standard (RFC 7519) used to securely transmit information between two parties as a JSON object.

JWT is commonly used for:

- Authentication
- Authorization
- Secure information exchange

After a user successfully logs in, the server generates a JWT and sends it to the client. The client stores the token (typically in memory or an HttpOnly cookie) and includes it with future requests. The server validates the token before granting access to protected resources.

---

# Why Do We Need JWT?

Without JWT, the server would need to maintain session data for every logged-in user.

JWT enables **stateless authentication**, meaning:

- The server does not store user session information.
- Each request contains the token needed to identify the user.

Benefits:

- Highly scalable
- Suitable for distributed systems and microservices
- Reduces server-side session storage

---

# How JWT Authentication Works

```
        Login Request
Client -----------------------> Server
          username/password

                    Validate User
                          │
                          ▼
                Generate JWT Token
                          │
                          ▼
Client <----------------------- Server
         JWT Token

Store Token

Future Requests

Client -----------------------> Server
Authorization: Bearer JWT_TOKEN

                    Verify Token

If Valid
↓

Return Protected Resource
```

---

# JWT Structure

A JWT consists of **three parts** separated by dots (`.`).

```
xxxxx.yyyyy.zzzzz
```

These parts are:

1. Header
2. Payload
3. Signature

Example:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJ1c2VySWQiOjEwMSwibmFtZSI6IkpvaG4ifQ
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

---

# 1. Header

The header contains metadata about the token.

Example:

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

Meaning:

- `alg` → Signing algorithm
- `typ` → Token type (JWT)

The header is Base64URL encoded.

---

# 2. Payload

The payload contains the claims (data).

Example:

```json
{
    "userId":101,
    "username":"john",
    "role":"ADMIN"
}
```

The payload may contain:

- User ID
- Username
- Email
- Role
- Permissions
- Expiration Time

Example with standard claims:

```json
{
    "sub":"101",
    "name":"John",
    "iat":1710000000,
    "exp":1710003600
}
```

### Common JWT Claims

| Claim | Meaning |
|--------|---------|
| sub | Subject (User ID) |
| iss | Issuer |
| aud | Audience |
| exp | Expiration Time |
| iat | Issued At |
| nbf | Not Before |

**Important:** The payload is encoded, **not encrypted**, so it should never contain sensitive information such as passwords.

---

# 3. Signature

The signature ensures the token has not been modified.

Example:

```
HMACSHA256(
    Base64Url(Header) +
    "." +
    Base64Url(Payload),
    SecretKey
)
```

Example:

```
Signature =
HMACSHA256(
header.payload,
secret_key
)
```

If someone changes the payload, the signature becomes invalid.

---

# JWT Generation Process

```
Header

↓

Base64 Encode

↓

Payload

↓

Base64 Encode

↓

Header.Payload

↓

Sign with Secret Key

↓

JWT Token
```

---

# Authentication Flow

## Step 1

Client sends login request.

```http
POST /login
```

Body

```json
{
    "username":"john",
    "password":"password123"
}
```

---

## Step 2

Server validates credentials.

If valid:

Generate JWT.

---

## Step 3

Server returns token.

```json
{
    "token":"eyJhbGciOi..."
}
```

---

## Step 4

Client stores token.

Common storage options:

- Memory (recommended for SPAs)
- HttpOnly Secure Cookie (recommended for web apps)
- Local Storage (possible but vulnerable to XSS if misused)

---

## Step 5

Client sends token in every request.

```http
GET /users

Authorization: Bearer eyJhbGciOi...
```

---

## Step 6

Server verifies token.

If valid:

```
Return Data
```

Else:

```
401 Unauthorized
```

---

# Authorization Header

JWT is usually sent using the Authorization header.

```http
Authorization: Bearer <JWT_TOKEN>
```

Example:

```http
GET /products

Authorization: Bearer eyJhbGc...
```

---

# JWT Example

Payload

```json
{
    "id":1,
    "name":"Alice",
    "role":"ADMIN"
}
```

Generated JWT

```
xxxxx.yyyyy.zzzzz
```

Request

```http
GET /orders

Authorization: Bearer xxxxx.yyyyy.zzzzz
```

---

# Token Expiration

JWTs should have an expiration time.

Example:

```json
{
    "exp":1710003600
}
```

If expired:

```
401 Unauthorized
```

The user must log in again or use a refresh token.

---

# Access Token vs Refresh Token

| Access Token | Refresh Token |
|--------------|---------------|
| Short-lived | Long-lived |
| Used for API requests | Used to obtain a new access token |
| Expires quickly | Stored more securely |
| Sent with every request | Used only when renewing access |

Example:

```
Access Token

Expires in

15 minutes

↓

Refresh Token

Expires in

7 days
```

---

# JWT vs Session Authentication

| JWT | Session |
|------|---------|
| Stateless | Stateful |
| Server stores no session | Server stores session |
| Easy to scale | Harder to scale |
| Best for APIs | Best for traditional web apps |
| Token stored by client | Session ID stored in cookie |

---

# Advantages of JWT

- Stateless authentication
- Highly scalable
- Compact and lightweight
- Easy to use with REST APIs
- Supports microservices
- Cross-platform
- Reduces database lookups for authentication

---

# Disadvantages of JWT

- Difficult to revoke before expiration without additional infrastructure
- Larger than simple session IDs
- Payload is readable (not encrypted)
- Requires careful token expiration management
- Compromised tokens remain valid until they expire unless a revocation strategy exists

---

# Best Practices

✅ Always use HTTPS.

✅ Keep access tokens short-lived.

✅ Use refresh tokens.

✅ Never store passwords in JWT.

✅ Validate signatures on every request.

✅ Verify expiration (`exp`).

✅ Use strong secret keys (or asymmetric keys like RSA/ECDSA).

✅ Prefer HttpOnly Secure Cookies for browser-based applications.

---

# Common HTTP Response

Valid Token

```
200 OK
```

Expired Token

```
401 Unauthorized
```

Invalid Signature

```
401 Unauthorized
```

No Token

```
401 Unauthorized
```

---

# Spring Boot JWT Flow

```
Client

↓

POST /login

↓

Spring Security

↓

Authentication Manager

↓

UserDetailsService

↓

Database

↓

Validate Credentials

↓

Generate JWT

↓

Return JWT

↓

Client Stores JWT

↓

Every Request

Authorization: Bearer JWT

↓

JWT Filter

↓

Validate Token

↓

Access Protected APIs
```

---

# Frequently Asked Interview Questions

## What is JWT?

JWT (JSON Web Token) is a compact, URL-safe token used for authentication and authorization. It securely carries user information between the client and server.

---

## Why is JWT Stateless?

Because the server does not store user session information. Every request includes the token, allowing the server to authenticate the user independently.

---

## What are the three parts of JWT?

1. Header
2. Payload
3. Signature

---

## Is JWT Encrypted?

No.

JWT is **Base64URL encoded**, not encrypted by default.

Anyone can decode the header and payload.

Only the signature prevents tampering.

---

## What is the Signature Used For?

To verify that the token has not been modified and was signed by a trusted issuer.

---

## Why Should JWT Expire?

To reduce the risk of misuse if a token is stolen.

---

## Difference Between Authentication and Authorization

| Authentication | Authorization |
|---------------|---------------|
| Verifies identity | Determines permissions |
| Login | Access control |
| "Who are you?" | "What can you do?" |

---

## Difference Between Access Token and Refresh Token

| Access Token | Refresh Token |
|--------------|---------------|
| Short-lived | Long-lived |
| Access APIs | Obtain new access tokens |
| Sent with each request | Used only during token renewal |

---

# 2-Minute Interview Summary

> JWT (JSON Web Token) is an open standard used for secure authentication and authorization. After a user logs in successfully, the server generates a signed JWT containing user-related claims such as the user ID and role. The client stores the token and sends it with each request in the `Authorization: Bearer <token>` header. The server verifies the token's signature and expiration before granting access. A JWT consists of three parts: Header, Payload, and Signature. Because JWT is stateless, the server does not maintain session data, making it highly scalable and ideal for REST APIs and microservices. For security, JWTs should be transmitted over HTTPS, have short expiration times, and avoid storing sensitive information in the payload.

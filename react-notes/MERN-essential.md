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

---

# Git & GitHub - Complete Interview Notes

# Table of Contents

1. Introduction
2. What is Git?
3. What is GitHub?
4. Git vs GitHub
5. Why Use Git?
6. Git Workflow
7. Installing Git
8. Git Configuration
9. Creating Repository
10. Git Lifecycle
11. Basic Git Commands
12. Branching
13. Merging
14. Merge Conflicts
15. Remote Repository
16. GitHub Workflow
17. Stashing
18. Undo Operations
19. Viewing History
20. Tags
21. .gitignore
22. Git Best Practices
23. Git Interview Questions
24. Complete Git Cheat Sheet

---

# What is Git?

**Git** is a **Distributed Version Control System (DVCS)** used to track changes in source code during software development.

Git allows multiple developers to work on the same project without overwriting each other's work.

It was created by **Linus Torvalds** in 2005.

---

# What is GitHub?

**GitHub** is a cloud-based platform that hosts Git repositories.

Git manages version control locally.

GitHub stores repositories online and enables:

- Collaboration
- Code sharing
- Pull Requests
- Code Reviews
- CI/CD Integration
- Issue Tracking

---

# Git vs GitHub

| Git | GitHub |
|------|---------|
| Version Control System | Cloud Hosting Platform |
| Works locally | Works online |
| Tracks code changes | Stores repositories |
| Free and Open Source | Provides collaboration tools |

---

# Why Use Git?

- Track code changes
- Collaboration
- Backup code
- Branching
- Easy rollback
- Faster development
- Version history

---

# Git Workflow

```
Working Directory
        │
        ▼
Staging Area
        │
        ▼
Local Repository
        │
        ▼
Remote Repository (GitHub)
```

---

# Install Git

Windows

Download:

https://git-scm.com/

Verify Installation

```bash
git --version
```

Example

```
git version 2.45.0
```

---

# Configure Git

Set Username

```bash
git config --global user.name "John Doe"
```

Set Email

```bash
git config --global user.email "john@example.com"
```

View Configuration

```bash
git config --list
```

---

# Create a Git Repository

Navigate to project

```bash
cd MyProject
```

Initialize Git

```bash
git init
```

Output

```
Initialized empty Git repository
```

---

# Git Lifecycle

```
Untracked

↓

Tracked

↓

Modified

↓

Staged

↓

Committed
```

---

# Check Repository Status

```bash
git status
```

Shows

- Modified files
- Staged files
- Untracked files

---

# Add Files

Add Single File

```bash
git add app.js
```

Add Multiple Files

```bash
git add file1 file2
```

Add Entire Project

```bash
git add .
```

---

# Commit Changes

```bash
git commit -m "Initial commit"
```

Example

```bash
git commit -m "Added login feature"
```

---

# View Commit History

```bash
git log
```

Short Version

```bash
git log --oneline
```

Graph View

```bash
git log --graph
```

Compact Graph

```bash
git log --oneline --graph --all
```

---

# Clone Repository

```bash
git clone https://github.com/user/project.git
```

Example

```bash
git clone https://github.com/john/ecommerce.git
```

---

# Connect Local Project to GitHub

Add Remote

```bash
git remote add origin https://github.com/user/project.git
```

Check Remote

```bash
git remote -v
```

---

# Push Code

First Push

```bash
git push -u origin main
```

Next Push

```bash
git push
```

---

# Pull Latest Code

```bash
git pull
```

Specific Branch

```bash
git pull origin main
```

---

# Fetch Changes

```bash
git fetch
```

Difference

```
git fetch

↓

Downloads changes

Does NOT merge
```

```
git pull

↓

Downloads

+

Merges
```

---

# Branching

Create Branch

```bash
git branch feature-login
```

List Branches

```bash
git branch
```

Switch Branch

```bash
git checkout feature-login
```

Create and Switch

```bash
git checkout -b feature-login
```

Using Modern Command

```bash
git switch feature-login
```

Create and Switch

```bash
git switch -c feature-login
```

---

# Merge Branch

Switch to Main

```bash
git checkout main
```

Merge

```bash
git merge feature-login
```

---

# Delete Branch

```bash
git branch -d feature-login
```

Force Delete

```bash
git branch -D feature-login
```

---

# Merge Conflict

Occurs when two branches modify the same lines of a file.

Example

```
<<<<<<< HEAD

Your Code

=======

Other Branch Code

>>>>>>> feature-login
```

Steps

1. Resolve manually
2. Save file
3. Add file

```bash
git add .
```

Commit

```bash
git commit
```

---

# Git Stash

Save Current Work

```bash
git stash
```

List Stash

```bash
git stash list
```

Apply Latest

```bash
git stash apply
```

Apply and Remove

```bash
git stash pop
```

Delete Stash

```bash
git stash drop
```

Clear All

```bash
git stash clear
```

---

# Remove File from Staging

```bash
git restore --staged file.txt
```

---

# Undo File Changes

```bash
git restore file.txt
```

---

# Undo Last Commit

Keep Changes

```bash
git reset --soft HEAD~1
```

Remove Changes

```bash
git reset --hard HEAD~1
```

---

# Revert Commit

```bash
git revert COMMIT_ID
```

---

# Rename Branch

```bash
git branch -m new-name
```

---

# Delete Remote Branch

```bash
git push origin --delete feature-login
```

---

# View Differences

Working Directory

```bash
git diff
```

Staged

```bash
git diff --staged
```

Between Commits

```bash
git diff commit1 commit2
```

---

# Ignore Files

Create

```
.gitignore
```

Example

```
node_modules/

.env

dist/

*.log

*.class
```

---

# Remove Tracked File

```bash
git rm file.txt
```

Keep File Locally

```bash
git rm --cached file.txt
```

---

# Tags

Create

```bash
git tag v1.0
```

Annotated

```bash
git tag -a v1.0 -m "Version 1"
```

List

```bash
git tag
```

Push Tags

```bash
git push origin --tags
```

---

# GitHub Workflow

## Step 1

Create Repository on GitHub

↓

## Step 2

Clone Repository

```bash
git clone URL
```

↓

## Step 3

Create Branch

```bash
git checkout -b feature-login
```

↓

## Step 4

Write Code

↓

## Step 5

Check Status

```bash
git status
```

↓

## Step 6

Add Files

```bash
git add .
```

↓

## Step 7

Commit

```bash
git commit -m "Added login"
```

↓

## Step 8

Push Branch

```bash
git push origin feature-login
```

↓

## Step 9

Create Pull Request

↓

## Step 10

Code Review

↓

## Step 11

Merge into Main

↓

## Step 12

Pull Latest Changes

```bash
git checkout main
git pull origin main
```

---

# Complete Git Flow (New Project)

## Create Project

```bash
mkdir Demo
```

Move Inside

```bash
cd Demo
```

Initialize Git

```bash
git init
```

Create File

```bash
touch README.md
```

Check Status

```bash
git status
```

Stage Files

```bash
git add .
```

Commit

```bash
git commit -m "Initial Commit"
```

Create GitHub Repository

Connect Remote

```bash
git remote add origin https://github.com/user/demo.git
```

Push

```bash
git branch -M main
git push -u origin main
```

Done!

---

# Everyday Git Commands

```bash
git pull

git status

git add .

git commit -m "message"

git push
```

---

# Useful Commands

Current Branch

```bash
git branch --show-current
```

Show Remote

```bash
git remote -v
```

Show Commit

```bash
git show
```

File History

```bash
git log filename
```

Search Commit

```bash
git log --grep="login"
```

Show Author

```bash
git shortlog
```

---

# Best Practices

- Commit frequently
- Write meaningful commit messages
- Pull before pushing
- Use feature branches
- Never commit secrets or passwords
- Add `.gitignore`
- Keep commits small and focused
- Review changes before committing (`git diff`)

---

# Common Interview Questions

## What is Git?

Git is a distributed version control system that tracks changes in source code and enables collaboration among developers.

---

## What is GitHub?

GitHub is a cloud platform that hosts Git repositories and provides collaboration features like Pull Requests, Issues, and Actions.

---

## Difference Between Git Pull and Git Fetch

| Git Pull | Git Fetch |
|----------|-----------|
| Downloads and merges changes | Downloads changes only |
| Updates local branch | Does not modify local branch |

---

## Difference Between Merge and Rebase

| Merge | Rebase |
|--------|--------|
| Preserves commit history | Rewrites commit history |
| Creates a merge commit | Produces a linear history |

---

## Difference Between Reset and Revert

| Reset | Revert |
|--------|--------|
| Moves branch pointer | Creates a new commit that undoes changes |
| Can rewrite history | Preserves history |

---

## What is HEAD?

`HEAD` is a pointer to the current branch and the latest checked-out commit.

---

## What is a Commit?

A commit is a snapshot of the project at a specific point in time.

---

## What is Staging Area?

The staging area (index) is an intermediate place where changes are prepared before committing.

---

## What is Branching?

Branching allows independent development of features without affecting the main codebase.

---

## What is a Pull Request (PR)?

A Pull Request is a request to merge changes from one branch into another after review.

---

# Git Cheat Sheet

## Setup

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git --version
```

## Repository

```bash
git init
git clone URL
```

## Status

```bash
git status
```

## Staging

```bash
git add .
git add filename
```

## Commit

```bash
git commit -m "message"
```

## Branches

```bash
git branch
git branch branch-name
git checkout branch-name
git checkout -b branch-name
git switch branch-name
git switch -c branch-name
```

## Merge

```bash
git merge branch-name
```

## Push & Pull

```bash
git push
git push -u origin main
git pull
git fetch
```

## Logs

```bash
git log
git log --oneline
git show
```

## Undo

```bash
git restore file
git restore --staged file
git reset --soft HEAD~1
git reset --hard HEAD~1
git revert COMMIT_ID
```

## Stash

```bash
git stash
git stash list
git stash apply
git stash pop
```

## Tags

```bash
git tag
git tag v1.0
git push origin --tags
```

---

# 2-Minute Interview Summary

> Git is a distributed version control system that helps developers track code changes, collaborate efficiently, and maintain project history. It allows developers to create branches, commit changes, merge code, and revert to previous versions when needed. GitHub is a cloud-based platform that hosts Git repositories and provides collaboration features such as pull requests, issue tracking, and CI/CD integration. A typical Git workflow involves initializing or cloning a repository, making changes, staging them with `git add`, committing them with `git commit`, and synchronizing with GitHub using `git push` and `git pull`. By using branches, developers can work on features independently and merge them safely into the main branch after review.


---
# Postman - Interview Notes

## What is Postman?

**Postman** is an API testing tool used to send HTTP requests to a server and verify the responses without writing frontend code.

It is mainly used by developers and QA engineers to test REST APIs.

---

# Why Do We Use Postman?

- Test REST APIs
- Verify backend functionality
- Debug APIs
- Check request and response data
- Test authentication (JWT, OAuth, API Keys)

---

# How Postman Works

```
Client (Postman)
      │
HTTP Request
      │
      ▼
Spring Boot REST API
      │
Business Logic
      │
Database
      │
      ▼
HTTP Response (JSON)
```

---

# HTTP Methods Used in Postman

| Method | Purpose |
|---------|---------|
| GET | Retrieve data |
| POST | Create data |
| PUT | Update entire resource |
| PATCH | Partial update |
| DELETE | Delete data |

---

# Parts of a Request

Every request contains:

### URL

```
http://localhost:8080/api/users
```

### HTTP Method

```
GET
POST
PUT
DELETE
PATCH
```

### Headers

Example

```http
Content-Type: application/json

Authorization: Bearer <JWT_TOKEN>
```

### Body

Used with POST, PUT and PATCH.

Example

```json
{
   "name":"John",
   "email":"john@example.com"
}
```

---

# Parts of a Response

A response contains

- Status Code
- Headers
- Response Body (JSON)

Example

```http
200 OK
```

```json
{
   "id":1,
   "name":"John"
}
```

---

# Common HTTP Status Codes

| Code | Meaning |
|------|----------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# Testing JWT APIs

After login,

Server returns

```json
{
   "token":"eyJhbGc..."
}
```

Copy the token.

Go to

```
Authorization

↓

Bearer Token

↓

Paste JWT
```

or manually add:

```http
Authorization: Bearer eyJhbGc...
```

Now click **Send**.

If the token is valid:

```
200 OK
```

If invalid:

```
401 Unauthorized
```

---

# Collections

A Collection is a folder that stores multiple API requests.

Example

```
User APIs

├── GET Users
├── POST User
├── PUT User
└── DELETE User
```

Collections help organize and reuse requests.

---

# Environment Variables

Instead of writing

```
http://localhost:8080
```

every time,

create

```
baseUrl = http://localhost:8080
```

Use

```
{{baseUrl}}/api/users
```

This makes switching between development, testing, and production environments easier.

---

# How I Use Postman in a Spring Boot Project

1. Run the Spring Boot application.
2. Open Postman.
3. Select the HTTP method.
4. Enter the API URL.
5. Add headers if required.
6. Add the request body for POST/PUT/PATCH.
7. Click **Send**.
8. Verify the response status and JSON data.
9. For secured APIs, add the JWT token in the Authorization header.

---

# Interview Questions

## What is Postman?

Postman is an API testing tool used to send HTTP requests, test REST APIs, inspect responses, and debug backend services.

---

## Why is Postman used?

- API Testing
- Backend Development
- Debugging
- Verifying Request and Response
- Testing JWT Authentication

---

## What is a Collection?

A Collection is a group of saved API requests that helps organize and reuse APIs.

---

## What are Environment Variables?

Environment variables store reusable values such as:

- Base URL
- JWT Token
- API Keys

Example:

```
{{baseUrl}}
{{token}}
```

---

## How do you test a secured API?

1. Login using the `/login` API.
2. Copy the JWT token from the response.
3. Add it as a **Bearer Token** in the Authorization tab.
4. Send the request to the protected API.
5. If the token is valid, the server returns `200 OK`; otherwise, it returns `401 Unauthorized`.

---

## 1-Minute Interview Answer

> Postman is an API testing tool that allows developers to send HTTP requests to a server and inspect responses without needing a frontend application. It supports all HTTP methods such as GET, POST, PUT, PATCH, and DELETE. In my Spring Boot projects, I use Postman to test REST APIs by sending requests with JSON payloads, verifying HTTP status codes and responses, and testing secured endpoints using JWT Bearer Tokens. I also use Collections to organize APIs and Environment Variables to manage values like the base URL and authentication tokens.

# MongoDB Interview Notes (MERN Stack)

# Table of Contents

1. Introduction
2. SQL vs MongoDB
3. MongoDB Architecture
4. CRUD Operations
5. Query Operators
6. Update Operators
7. Aggregation Framework
8. Indexing
9. Relationships
10. Schema Design
11. Transactions
12. Replication & Sharding
13. MongoDB with Node.js & Mongoose
14. Validation
15. Middleware in Mongoose
16. Populate
17. Performance Optimization
18. Common Interview Questions
19. Best Practices

---
[handboook](https://cwh-full-next-space.fra1.cdn.digitaloceanspaces.com/YouTube/MongoDB%20Handbook.pdf)
# 1. Introduction

MongoDB is a:

* NoSQL Database
* Document-oriented database
* Stores data in BSON format
* Highly scalable
* Flexible schema

MongoDB stores data as:

```json
{
  "name": "Sufal",
  "age": 22,
  "skills": ["React", "Node", "MongoDB"]
}
```

---

# 2. SQL vs MongoDB

| SQL              | MongoDB                |
| ---------------- | ---------------------- |
| Tables           | Collections            |
| Rows             | Documents              |
| Columns          | Fields                 |
| Fixed Schema     | Flexible Schema        |
| JOIN             | Populate / Aggregation |
| Vertical Scaling | Horizontal Scaling     |

---

# 3. MongoDB Architecture

## Database

Container for collections.

```js
use mernDB
```

---

## Collection

Group of documents.

```js
db.createCollection("users")
```

---

## Document

Single JSON-like object.

```json
{
  "name": "John",
  "email": "john@gmail.com"
}
```

---

# 4. CRUD Operations

# Create

## insertOne()

```js
db.users.insertOne({
  name: "Sufal",
  age: 22
})
```

---

## insertMany()

```js
db.users.insertMany([
  { name: "A" },
  { name: "B" }
])
```

---

# Read

## find()

```js
db.users.find()
```

---

## Pretty Output

```js
db.users.find().pretty()
```

---

## findOne()

```js
db.users.findOne({ name: "Sufal" })
```

---

# Update

## updateOne()

```js
db.users.updateOne(
  { name: "Sufal" },
  { $set: { age: 23 } }
)
```

---

## updateMany()

```js
db.users.updateMany(
  {},
  { $set: { active: true } }
)
```

---

# Delete

## deleteOne()

```js
db.users.deleteOne({ name: "Sufal" })
```

---

## deleteMany()

```js
db.users.deleteMany({})
```

---

# 5. Query Operators

# Comparison Operators

| Operator | Meaning            |
| -------- | ------------------ |
| $eq      | Equal              |
| $ne      | Not Equal          |
| $gt      | Greater Than       |
| $gte     | Greater Than Equal |
| $lt      | Less Than          |
| $lte     | Less Than Equal    |
| $in      | Match Any          |
| $nin     | Not In             |

---

## Example

```js
db.users.find({
  age: { $gte: 18 }
})
```

---

# Logical Operators

## AND

```js
db.users.find({
  $and: [
    { age: { $gt: 18 } },
    { city: "Delhi" }
  ]
})
```

---

## OR

```js
db.users.find({
  $or: [
    { city: "Mumbai" },
    { city: "Pune" }
  ]
})
```

---

# Element Operators

## exists

```js
db.users.find({
  phone: { $exists: true }
})
```

---

# Array Operators

## all

```js
db.users.find({
  skills: { $all: ["React", "Node"] }
})
```

---

# 6. Update Operators

| Operator | Purpose           |
| -------- | ----------------- |
| $set     | Update field      |
| $unset   | Remove field      |
| $inc     | Increment value   |
| $push    | Add to array      |
| $pull    | Remove from array |

---

## $inc Example

```js
db.users.updateOne(
  { name: "Sufal" },
  { $inc: { age: 1 } }
)
```

---

## $push Example

```js
db.users.updateOne(
  { name: "Sufal" },
  { $push: { skills: "MongoDB" } }
)
```

---

# 7. Aggregation Framework

Used for:

* Analytics
* Reports
* Data transformation

Pipeline stages:

| Stage    | Purpose          |
| -------- | ---------------- |
| $match   | Filter           |
| $group   | Group data       |
| $sort    | Sort             |
| $project | Select fields    |
| $lookup  | Join collections |
| $limit   | Limit records    |

---

# Example: Average Salary

```js
db.employees.aggregate([
  {
    $group: {
      _id: "$department",
      avgSalary: { $avg: "$salary" }
    }
  }
])
```

---

# $match Example

```js
db.orders.aggregate([
  {
    $match: {
      status: "completed"
    }
  }
])
```

---

# $project Example

```js
db.users.aggregate([
  {
    $project: {
      name: 1,
      email: 1
    }
  }
])
```

---

# $lookup Example (JOIN)

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails"
    }
  }
])
```

---

# 8. Indexing

Indexes improve query performance.

---

# Create Index

```js
db.users.createIndex({ email: 1 })
```

---

# Compound Index

```js
db.users.createIndex({
  name: 1,
  age: -1
})
```

---

# Text Index

```js
db.posts.createIndex({
  title: "text"
})
```

---

# Check Indexes

```js
db.users.getIndexes()
```

---

# Important

Too many indexes:

* Increase memory usage
* Slow inserts/updates

---

# 9. Relationships

MongoDB supports:

1. Embedded Documents
2. References

---

# Embedded Example

```json
{
  "name": "Sufal",
  "address": {
    "city": "Bhopal",
    "state": "MP"
  }
}
```

Best for:

* Small related data
* Fast reads

---

# Reference Example

```json
{
  "title": "MongoDB Notes",
  "author": ObjectId("123")
}
```

Best for:

* Large datasets
* Reusable relations

---

# 10. Schema Design

# Good Schema Principles

* Keep frequently accessed data together
* Avoid deep nesting
* Optimize for reads
* Use references wisely

---

# Example User Schema

```js
{
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: Date
}
```

---

# 11. Transactions

MongoDB supports ACID transactions.

---

# Example

```js
const session = await mongoose.startSession()

session.startTransaction()

try {
  await User.create(
    [{ name: "Sufal" }],
    { session }
  )

  await Account.create(
    [{ balance: 1000 }],
    { session }
  )

  await session.commitTransaction()
} catch (err) {
  await session.abortTransaction()
}
```

---

# 12. Replication & Sharding

# Replication

Copies data across servers.

Benefits:

* High availability
* Backup
* Failover

Replica Set:

* Primary Node
* Secondary Nodes

---

# Sharding

Splits data across servers.

Benefits:

* Horizontal scaling
* Handles huge data

---

# 13. MongoDB with Node.js & Mongoose

# Install

```bash
npm install mongoose
```

---

# Connect MongoDB

```js
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/mernDB")
.then(() => console.log("Connected"))
.catch(err => console.log(err))
```

---

# Create Schema

```js
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
})
```

---

# Create Model

```js
const User = mongoose.model("User", userSchema)
```

---

# Save Document

```js
const user = new User({
  name: "Sufal",
  age: 22,
  email: "sufal@gmail.com"
})

await user.save()
```

---

# Find Users

```js
const users = await User.find()
```

---

# Update User

```js
await User.updateOne(
  { name: "Sufal" },
  { age: 23 }
)
```

---

# Delete User

```js
await User.deleteOne({
  name: "Sufal"
})
```

---

# 14. Validation

# Required Validation

```js
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})
```

---

# Min Length

```js
password: {
  type: String,
  minlength: 6
}
```

---

# Enum Validation

```js
role: {
  type: String,
  enum: ["admin", "user"]
}
```

---

# Custom Validation

```js
email: {
  type: String,
  validate: {
    validator: function(v) {
      return v.includes("@")
    },
    message: "Invalid Email"
  }
}
```

---

# 15. Middleware in Mongoose

# Pre Middleware

Runs before event.

---

## Example: Password Hashing

```js
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 10)

  next()
})
```

---

# Post Middleware

```js
userSchema.post("save", function(doc) {
  console.log("User Saved")
})
```

---

# 16. Populate

Used to fetch referenced documents.

---

# Example

## User Schema

```js
const postSchema = new mongoose.Schema({
  title: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})
```

---

## Populate Query

```js
const posts = await Post.find()
.populate("user")
```

---

# 17. Performance Optimization

# Use Indexes

```js
db.users.createIndex({ email: 1 })
```

---

# Use Projection

```js
db.users.find({}, {
  name: 1,
  email: 1
})
```

---

# Use Limit

```js
db.users.find().limit(10)
```

---

# Avoid Large Documents

MongoDB document size limit:

```txt
16 MB
```

---

# Pagination

```js
const page = 1
const limit = 10

const users = await User.find()
.skip((page - 1) * limit)
.limit(limit)
```

---

# Lean Queries

```js
const users = await User.find().lean()
```

Faster because it returns plain JS objects.

---

# 18. Common Interview Questions

# What is BSON?

Binary version of JSON used internally by MongoDB.

---

# Difference Between find() and findOne()

| find()        | findOne()               |
| ------------- | ----------------------- |
| Returns array | Returns single document |

---

# What is Aggregation?

Process of transforming and analyzing data using pipeline stages.

---

# What is Indexing?

Data structure that improves query speed.

---

# What is Sharding?

Horizontal distribution of data across multiple servers.

---

# Embedded vs Referenced Data?

| Embedded            | Referenced               |
| ------------------- | ------------------------ |
| Faster reads        | Better scalability       |
| Duplicates possible | Normalized               |
| Good for small data | Good for large relations |

---

# Why Use MongoDB in MERN?

* JSON-like structure
* Easy integration with Node.js
* Flexible schema
* High scalability
* Fast development

---

# 19. Best Practices

# Always

✅ Use indexes wisely
✅ Validate data
✅ Use pagination
✅ Use aggregation for analytics
✅ Store passwords hashed
✅ Use `.lean()` when possible
✅ Optimize schema design

---

# Avoid

❌ Too many indexes
❌ Deep nesting
❌ Huge documents
❌ Returning unnecessary fields
❌ Storing sensitive data unencrypted

---

# Bonus: Complete MERN Example

# User Model

```js
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

module.exports = mongoose.model("User", userSchema)
```

---

# Express Route

```js
const express = require("express")
const router = express.Router()
const User = require("./models/User")

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body)

    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

module.exports = router
```

---

# Final Revision Topics

Before interview revise:

* CRUD
* Operators
* Aggregation
* Indexing
* Populate
* Validation
* Transactions
* Schema Design
* Replication
* Sharding
* Mongoose Middleware

---

# Pro Interview Tip

Most MongoDB interview questions revolve around:

1. Aggregation
2. Indexing
3. Schema Design
4. Populate vs Lookup
5. Transactions
6. Performance Optimization

Master these deeply.

---

# Top 15 MongoDB Interview Questions (Interview Ready)

# 1. What is MongoDB?

MongoDB is a NoSQL, document-oriented database that stores data in BSON format.

Features:

* Flexible schema
* High scalability
* Fast development
* JSON-like documents
* Horizontal scaling support

Example document:

```json id="g8q0c9"
{
  "name": "Sufal",
  "age": 22
}
```

---

# 2. Difference Between SQL and MongoDB?

| SQL              | MongoDB            |
| ---------------- | ------------------ |
| Relational DB    | NoSQL DB           |
| Tables           | Collections        |
| Rows             | Documents          |
| Fixed Schema     | Flexible Schema    |
| JOIN             | Populate / Lookup  |
| Vertical Scaling | Horizontal Scaling |

---

# 3. What is BSON?

BSON stands for Binary JSON.

MongoDB stores data internally in BSON format because:

* Faster processing
* Supports more data types
* Efficient storage

Extra BSON types:

* Date
* ObjectId
* Binary Data

---

# 4. What is the Difference Between find() and findOne()?

| find()                   | findOne()                  |
| ------------------------ | -------------------------- |
| Returns array            | Returns single document    |
| Can return multiple docs | Returns first matching doc |

Example:

```js id="2i6dm5"
db.users.find({ age: 22 })
```

```js id="9dd9jg"
db.users.findOne({ age: 22 })
```

---

# 5. What are Indexes in MongoDB?

Indexes improve query performance.

Without indexes:

* MongoDB scans entire collection

With indexes:

* Faster searching

Example:

```js id="ll9v8e"
db.users.createIndex({ email: 1 })
```

Types:

* Single Field
* Compound
* Text
* Unique

---

# 6. What is Aggregation in MongoDB?

Aggregation is used to process and transform data.

Common stages:

* `$match`
* `$group`
* `$sort`
* `$project`
* `$lookup`

Example:

```js id="kvltqf"
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      total: { $sum: 1 }
    }
  }
])
```

---

# 7. Difference Between Embedded and Referenced Documents?

# Embedded

Data stored inside same document.

```json id="sc7jlwm"
{
  "name": "Sufal",
  "address": {
    "city": "Bhopal"
  }
}
```

Best for:

* Small related data
* Fast reads

---

# Referenced

Stores relation using ObjectId.

```json id="odm95h"
{
  "title": "Post",
  "userId": ObjectId("123")
}
```

Best for:

* Large scalable systems
* Reusable relationships

---

# 8. What is Sharding?

Sharding is horizontal scaling in MongoDB.

Large data is distributed across multiple servers.

Benefits:

* Better scalability
* Handles huge traffic
* Improved performance

---

# 9. What is Replication?

Replication copies data across multiple servers.

MongoDB uses Replica Sets.

Components:

* Primary Node
* Secondary Nodes

Benefits:

* High availability
* Automatic failover
* Backup support

---

# 10. What is Mongoose?

Mongoose is an ODM (Object Data Modeling) library for Node.js.

Used for:

* Schema creation
* Validation
* Middleware
* Query building

Example:

```js id="3zcq3w"
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
})

const User = mongoose.model("User", userSchema)
```

---

# 11. What is Populate in MongoDB/Mongoose?

Populate is used to fetch referenced documents.

Example:

```js id="24w3pd"
const posts = await Post.find()
.populate("user")
```

Equivalent to SQL JOIN.

---

# 12. What is the Difference Between Populate and $lookup?

| Populate          | $lookup                   |
| ----------------- | ------------------------- |
| Mongoose feature  | MongoDB aggregation stage |
| Easier syntax     | More powerful             |
| Application-level | Database-level            |

Example of `$lookup`:

```js id="n4xf1v"
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  }
])
```

---

# 13. What are MongoDB Transactions?

Transactions provide ACID properties.

Used when multiple operations must succeed together.

Example:

```js id="dbbfxl"
const session = await mongoose.startSession()

session.startTransaction()

try {
  await User.create([{ name: "Sufal" }], { session })

  await session.commitTransaction()
} catch (err) {
  await session.abortTransaction()
}
```

---

# 14. How Does MongoDB Handle Schema Validation?

MongoDB supports validation using Mongoose schemas.

Example:

```js id="4qzpkz"
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 18
  }
})
```

---

# 15. What are MongoDB Performance Best Practices?

# Best Practices

✅ Use indexes wisely
✅ Use projections
✅ Use pagination
✅ Avoid deep nesting
✅ Use `.lean()` in Mongoose
✅ Optimize schema design
✅ Avoid unnecessary queries

Example:

```js id="0u6txm"
const users = await User.find()
.select("name email")
.limit(10)
.lean()
```

---

# Bonus Rapid-Fire Questions

| Question              | Short Answer               |
| --------------------- | -------------------------- |
| Max document size?    | 16 MB                      |
| Default MongoDB port? | 27017                      |
| What is ObjectId?     | Unique document identifier |
| What is ODM?          | Object Data Modeling       |
| Command to show DBs?  | `show dbs`                 |
| Command to use DB?    | `use dbName`               |

---

# Pro Interview Tip

When answering MongoDB interview questions:

1. Start with definition
2. Explain why it is used
3. Give advantages
4. Show code example
5. Mention real-world use case

That instantly makes your answer sound senior-level.

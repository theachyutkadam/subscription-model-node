
What is Node JS?

**What Can Node.js Do?**
 - Node.js can generate dynamic page content
 - Node.js can create, open, read, write, delete, and close files on the server
 - Node.js can collect form data
 - Node.js can add, delete, and modify data in your database

Installation-
**Create new app/Setup New app with MySQL DB and swagger UI**
- ```mkdir 'folder_name'```
- ```cd 'folder_name'```
- ```npm init -y```
- ```npm install express mysql2 sequelize swagger-ui-express dotenv```

**Create a project structure like this.**
- src
  - models
    - user.js
  - routes
    - users.js
  - index.js
  - db.js
- swagger
  - swagger.json
- .env

**What is ORM and how does it work?**
  - ORMs it means Object Relational Mapper.
  - ORM frameworks simplify the process of interacting with a database.
  - They allow developers to work with data using objects, rather than having to write SQL queries.

In NodeJS many ORMs (Object Relational Mapper) are available. See the following Image.
  - We are using the Sequelize ORM in our application.

**Use the following link to check how to implement authentication in NodeJS.**
- https://adevait.com/nodejs/how-to-implement-jwt-authentication-on-node

*Create a User Subscription model*
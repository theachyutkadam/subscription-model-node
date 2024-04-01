
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

Use the following commands for create model, migration files, controllers, seed files.

  - sequelize db:migrate                        Run pending migrations
  - sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
  - sequelize db:migrate:status                 List the status of all migrations
  - sequelize db:migrate:undo                   Reverts a migration
  - sequelize db:migrate:undo:all               Revert all migrations ran
  - sequelize db:seed                           Run specified seeder
  - sequelize db:seed:undo                      Deletes data from the database
  - sequelize db:seed:all                       Run every seeder
  - sequelize db:seed:undo:all                  Deletes data from the database
  - sequelize db:create                         Create database specified by configuration
  - sequelize db:drop                           Drop database specified by configuration
  - sequelize init                              Initializes project
  - sequelize init:config                       Initializes configuration
  - sequelize init:migrations                   Initializes migrations
  - sequelize init:models                       Initializes models
  - sequelize init:seeders                      Initializes seeders
  - sequelize migration:generate                Generates a new migration file
  - sequelize migration:create                  Generates a new migration file
  - sequelize model:generate                    Generates a model and its migration
  - sequelize model:create                      Generates a model and its migration
  - sequelize seed:generate                     Generates a new seed file
  - sequelize seed:create                       Generates a new seed file

*check following examples*
 - sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
 - sequelize-cli seed:generate --name user
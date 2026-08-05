<details>
    <summary><b>Prisma + PostgreSQL + Neon Setup Guide</b></summary>

Reference - [Link](https://youtu.be/8_X0nSrzrCw?t=6147)

# Prisma + PostgreSQL + Neon Setup Guide

> A complete step-by-step guide for initializing Prisma with a PostgreSQL database hosted on Neon.

---

# Table of Contents

1. Introduction
2. Prerequisites
3. Install Prisma
4. Initialize Prisma
5. Create a Neon Database
6. Obtain the Connection String
7. Configure Environment Variables
8. Configure Prisma Schema
9. Create the First Migration
10. Generate Prisma Client
11. Verify the Database
12. Understanding Generated Files
13. Common Prisma Commands
14. Working with Prisma Client
15. Updating the Schema
16. Resetting the Database
17. Opening Prisma Studio
18. Production Considerations
19. Troubleshooting
20. Complete Project Structure

---

# 1. Introduction

Prisma is a modern ORM (Object-Relational Mapping) tool for Node.js and TypeScript that makes working with relational databases significantly easier.

In this guide you'll learn how to:

- Install Prisma
- Initialize Prisma in an existing project
- Create a PostgreSQL database using Neon
- Connect Prisma to Neon
- Create migrations
- Generate Prisma Client
- Query the database
- Update your schema
- Manage future migrations

This guide assumes you already have a Node.js project.

---

# 2. Prerequisites

You should have:

- Node.js installed
- npm installed
- A Node.js project

Example:

```bash
mkdir my-project
cd my-project

npm init -y
```

---

# 3. Install Prisma

Install Prisma CLI as a development dependency.

```bash
npm install -D prisma
```

Why a development dependency?

Because Prisma CLI is only needed during development for:

- creating migrations
- generating Prisma Client
- introspecting databases
- formatting schemas

It is not needed in production.

---

# 4. Initialize Prisma

Initialize Prisma.

```bash
npx prisma init
```

This command creates:

```
prisma/
    schema.prisma

.env
```

Your project becomes:

```
project/

node_modules/

package.json

.env

prisma/
    schema.prisma
```

---

# 5. Understanding What Was Created

## `.env`

Contains your database connection string.

Initially:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
```

We'll replace this with the Neon connection string.

---

## `prisma/schema.prisma`

Example:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

The datasource tells Prisma:

- which database
- how to connect
- where the URL comes from

---

# 6. Create a Neon Database

Visit:

https://console.neon.tech

Create an account.

Create a project.

Example:

```
Project:
My App

Database:
neondb

Region:
Choose nearest

Postgres Version:
Latest
```

Once created, Neon automatically provisions your PostgreSQL database.

---

# 7. Obtain the Connection String

Inside Neon:

```
Dashboard

↓

Connection Details

↓

Connection String
```

Example:

```text
postgresql://alex:password123@ep-cool-mouse.us-east-2.aws.neon.tech/neondb?sslmode=require
```

Copy it.

---

# 8. Configure Environment Variables

Replace `.env`

```env
DATABASE_URL="postgresql://alex:password123@ep-cool-mouse.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

Do **not** commit `.env` to Git.

Ensure `.gitignore` contains:

```
.env
```

---

# 9. Configure Prisma Schema

Open

```
prisma/schema.prisma
```

Datasource:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Generator:

```prisma
generator client {
  provider = "prisma-client-js"
}
```

---

# 10. Create Your First Model

Example:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

Full schema:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

---

# 11. Create Your First Migration

Run:

```bash
npx prisma migrate dev --name init
```

Example output:

```
Datasource "db"

Applying migration...

Migration created.

Prisma Client generated.
```

This command performs several actions:

- Creates SQL migration
- Executes migration
- Updates database
- Generates Prisma Client

---

# 12. Generated Files

Your project now contains:

```
project/

prisma/

    migrations/

        20260704110000_init/

            migration.sql

    schema.prisma

.env

node_modules/

package.json
```

---

# 13. Install Prisma Client

If it was not installed automatically:

```bash
npm install @prisma/client
```

Whenever the schema changes:

```bash
npx prisma generate
```

---

# 14. Prisma Client Example

```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
```

---

## Create a User

```javascript
const user = await prisma.user.create({
  data: {
    email: 'john@example.com',
    name: 'John',
  },
});
```

---

## Find All Users

```javascript
const users = await prisma.user.findMany();
```

---

## Find One User

```javascript
const user = await prisma.user.findUnique({
  where: {
    email: 'john@example.com',
  },
});
```

---

## Update

```javascript
await prisma.user.update({
  where: {
    email: 'john@example.com',
  },
  data: {
    name: 'John Doe',
  },
});
```

---

## Delete

```javascript
await prisma.user.delete({
  where: {
    email: 'john@example.com',
  },
});
```

---

# 15. Adding Another Model

Example:

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)

  authorId  Int
  author    User @relation(fields: [authorId], references: [id])
}
```

Update `User`:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())

  posts Post[]
}
```

---

# 16. Create Another Migration

```bash
npx prisma migrate dev --name add-post-model
```

Prisma detects schema changes automatically.

---

# 17. Generate Prisma Client Again

```bash
npx prisma generate
```

Although `migrate dev` already generates it, this command can be run independently after schema changes.

---

# 18. Prisma Studio

Launch Prisma Studio:

```bash
npx prisma studio
```

Default:

```
http://localhost:5555
```

Prisma Studio provides a graphical interface to:

- Browse tables
- Insert data
- Edit rows
- Delete records
- Inspect relations

---

# 19. Common Prisma Commands

Initialize Prisma:

```bash
npx prisma init
```

Create migration:

```bash
npx prisma migrate dev --name migration-name
```

Deploy migrations (production):

```bash
npx prisma migrate deploy
```

Generate client:

```bash
npx prisma generate
```

Open Studio:

```bash
npx prisma studio
```

Format schema:

```bash
npx prisma format
```

Validate schema:

```bash
npx prisma validate
```

Pull existing database schema:

```bash
npx prisma db pull
```

Push schema without creating migrations:

```bash
npx prisma db push
```

Reset database:

```bash
npx prisma migrate reset
```

Check migration status:

```bash
npx prisma migrate status
```

---

# 20. Typical Development Workflow

1. Modify `schema.prisma`
2. Run:

```bash
npx prisma migrate dev --name describe-change
```

3. Prisma:
   - Creates SQL migration
   - Updates database
   - Generates Prisma Client
4. Use the new Prisma Client in your application.

---

# 21. Production Deployment

In production, avoid using `migrate dev`.

Instead:

```bash
npx prisma migrate deploy
```

This applies existing migrations without creating new ones.

Ensure the production environment has the correct `DATABASE_URL` configured.

---

# 22. Troubleshooting

## Error: Environment variable not found

```
Environment variable not found: DATABASE_URL
```

Solution:

- Verify `.env` exists.
- Ensure it contains `DATABASE_URL`.
- Restart your development server if necessary.

---

## Error: P1001

```
Can't reach database server
```

Possible causes:

- Incorrect Neon connection string.
- Internet connectivity issues.
- Database is suspended or unavailable.
- Firewall restrictions.

---

## Error: Prisma Client not generated

Run:

```bash
npx prisma generate
```

---

## Error: Migration failed

Try:

```bash
npx prisma migrate reset
```

**Warning:** This command deletes all data in the development database.

---

# 23. Complete Project Structure

```
project/

node_modules/

prisma/

    migrations/

        20260704110000_init/

            migration.sql

    schema.prisma

.env

.gitignore

package.json

package-lock.json

src/

    index.ts
```

---

# Summary

The typical setup flow is:

```bash
# Install Prisma CLI
npm install -D prisma

# Initialize Prisma
npx prisma init

# Install Prisma Client
npm install @prisma/client

# Configure DATABASE_URL in .env

# Edit prisma/schema.prisma

# Create the initial migration
npx prisma migrate dev --name init

# Generate Prisma Client (if needed)
npx prisma generate

# Launch Prisma Studio
npx prisma studio
```

After completing these steps, your application is connected to a Neon-hosted PostgreSQL database through Prisma, with migrations and a type-safe Prisma Client ready for development.

</details>

<br/><hr/><br/>

<details>
    <summary><b>NestJS Resource Generation Guide</b></summary>

# NestJS Resource Generation Guide

> A comprehensive guide explaining the `nest g resource` command, how it scaffolds a RESTful CRUD module, and what every generated file is responsible for.

---

# Table of Contents

1. Introduction
2. Understanding the Command
3. Breaking Down the CLI Prompts
4. Generated Project Structure
5. Understanding Every Generated File
6. How NestJS Connects Everything Together
7. Generated CRUD Endpoints
8. Request Flow
9. Dependency Injection
10. The App Module Update
11. DTOs Explained
12. Entities Explained
13. Unit Test Files
14. Typical Development Workflow
15. Advantages of Using `nest g resource`
16. Summary

---

# 1. Introduction

NestJS provides a powerful Command Line Interface (CLI) that can automatically generate a complete feature module.

Instead of manually creating controllers, services, DTOs, modules, and entities, NestJS can scaffold everything for you using a single command.

The command used is:

```bash
nest g resource employees
```

or equivalently:

```bash
nest generate resource employees
```

This command creates a complete CRUD (Create, Read, Update, Delete) resource following NestJS best practices.

---

# 2. Understanding the Command

The command executed was:

```bash
nest g resource employees
```

Let's break it down.

| Part        | Meaning                             |
| ----------- | ----------------------------------- |
| `nest`      | Executes the NestJS CLI             |
| `g`         | Short for `generate`                |
| `resource`  | Generates a complete feature module |
| `employees` | Name of the resource/module         |

NestJS interprets this as:

> "Generate everything needed to manage employees."

Instead of manually creating files, the CLI generates all required boilerplate code.

---

# 3. CLI Prompts

During generation, NestJS asked:

```text
✔ What transport layer do you use?
```

You selected:

```
REST API
```

This tells NestJS to generate HTTP endpoints using controllers.

Other options include:

- GraphQL
- Microservices
- WebSockets

Each transport layer generates different code.

---

Then NestJS asked:

```text
Would you like to generate CRUD entry points?
```

You selected:

```
Yes
```

This means NestJS automatically generates:

- POST
- GET
- GET by ID
- PATCH
- DELETE

without requiring you to write them manually.

---

# 4. Generated Files

NestJS created:

```
src/

employees/

    dto/

        create-employee.dto.ts

        update-employee.dto.ts

    entities/

        employee.entity.ts

    employees.controller.ts

    employees.controller.spec.ts

    employees.service.ts

    employees.service.spec.ts

    employees.module.ts
```

It also updated:

```
src/app.module.ts
```

---

# 5. Understanding Each File

---

## employees.module.ts

```
CREATE src/employees/employees.module.ts
```

This is the feature module.

Example:

```ts
@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
```

Responsibilities:

- Groups related components.
- Registers controllers.
- Registers services.
- Makes the feature reusable.

Think of a module as a package containing everything related to employees.

---

## employees.controller.ts

```
CREATE src/employees/employees.controller.ts
```

The controller handles incoming HTTP requests.

Example endpoints:

```
GET /employees

POST /employees

PATCH /employees/:id

DELETE /employees/:id
```

The controller should contain minimal business logic.

Its responsibility is to:

- Receive requests.
- Validate input.
- Call the service.
- Return responses.

---

## employees.service.ts

```
CREATE src/employees/employees.service.ts
```

The service contains the application's business logic.

Examples:

- Creating employees
- Updating employees
- Searching employees
- Deleting employees

Controllers delegate work to services.

This separation makes the application easier to maintain and test.

---

## create-employee.dto.ts

```
CREATE dto/create-employee.dto.ts
```

DTO stands for:

> Data Transfer Object

A Create DTO defines the data expected when creating a new employee.

Example:

```ts
export class CreateEmployeeDto {
  name: string;
  email: string;
}
```

It defines the request body structure for:

```
POST /employees
```

---

## update-employee.dto.ts

```
CREATE dto/update-employee.dto.ts
```

Used when updating an employee.

NestJS generates:

```ts
export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
```

`PartialType()` makes every property optional.

Example:

Instead of requiring:

```json
{
  "name": "...",
  "email": "..."
}
```

You can send:

```json
{
  "name": "Updated Name"
}
```

Only the fields being updated need to be included.

---

## employee.entity.ts

```
CREATE entities/employee.entity.ts
```

An Entity represents the application's domain model.

Initially:

```ts
export class Employee {}
```

Later, when using an ORM like Prisma or TypeORM, this file may represent the structure of an employee in your application.

---

## Test Files

```
employees.controller.spec.ts

employees.service.spec.ts
```

These are unit test files.

NestJS generates them automatically.

They are used with testing frameworks like Jest to verify that controllers and services behave as expected.

---

# 6. CRUD Endpoints Generated

Since you selected **Yes** for CRUD generation, NestJS creates methods for:

## Create

```
POST /employees
```

Creates a new employee.

---

## Find All

```
GET /employees
```

Returns all employees.

---

## Find One

```
GET /employees/:id
```

Returns a specific employee by ID.

---

## Update

```
PATCH /employees/:id
```

Updates an existing employee.

---

## Remove

```
DELETE /employees/:id
```

Deletes an employee.

---

# 7. Request Flow

When a client sends:

```
POST /employees
```

the flow is:

```
Client
    │
    ▼
EmployeesController
    │
    ▼
EmployeesService
    │
    ▼
Database (later with Prisma)
```

The controller receives the request and delegates the work to the service, which performs the business logic and interacts with the database.

---

# 8. Dependency Injection

NestJS uses Dependency Injection (DI) to manage dependencies.

The service is injected into the controller.

Example:

```ts
constructor(private readonly employeesService: EmployeesService) {}
```

NestJS automatically creates and provides an instance of `EmployeesService`, so you don't need to instantiate it manually.

Benefits include:

- Loose coupling
- Easier testing
- Better maintainability

---

# 9. App Module Update

The CLI also updated:

```
src/app.module.ts
```

Typically, it adds:

```ts
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [EmployeesModule],
})
export class AppModule {}
```

This registers the new feature module with the application.

Without this step, NestJS would not know about the `EmployeesModule`.

---

# 10. Why DTOs Matter

DTOs provide a clear contract for incoming data.

Benefits:

- Consistent request structure
- Easier validation
- Better documentation
- Improved maintainability

When combined with `class-validator`, DTOs can enforce rules such as:

- Required fields
- Valid email format
- Minimum string length
- Numeric constraints

---

# 11. Why Services Exist

Controllers should remain lightweight.

Instead of writing business logic inside a controller:

```ts
@Post()
create() {
    // business logic
}
```

the controller delegates to the service:

```ts
@Post()
create() {
    return this.employeesService.create();
}
```

This keeps responsibilities separated and makes the code easier to test.

---

# 12. Why Modules Exist

Modules organize the application into cohesive features.

As the application grows, you might have modules such as:

```
UsersModule

EmployeesModule

AuthModule

ProductsModule

OrdersModule
```

Each module contains its own controllers, services, DTOs, and entities.

This modular architecture is a core principle of NestJS.

---

# 13. Typical Development Workflow

After generating the resource, a common workflow is:

1. Define the database model (e.g., with Prisma).
2. Update the DTOs with the required properties.
3. Implement the business logic in the service.
4. Connect the service to the database.
5. Test the REST endpoints using Postman or another API client.

The generated code provides the structure; you then replace placeholder implementations with real functionality.

---

# 14. Advantages of Using `nest g resource`

Using the NestJS CLI offers several benefits:

- Saves development time.
- Follows NestJS best practices.
- Generates a consistent project structure.
- Includes CRUD endpoints.
- Creates DTOs and entities.
- Sets up dependency injection.
- Generates test files.
- Registers the module automatically.

This allows developers to focus on implementing business logic rather than creating boilerplate code.

---

# 15. Summary

The command:

```bash
nest g resource employees
```

generated a complete RESTful CRUD feature named `employees`.

It created:

- A feature module (`EmployeesModule`)
- A controller (`EmployeesController`)
- A service (`EmployeesService`)
- DTOs for creating and updating employees
- An entity placeholder (`Employee`)
- Unit test files
- CRUD endpoints
- Automatic registration in `AppModule`

This scaffold provides a solid foundation for building a maintainable, modular REST API. The next step is typically to connect the service to a database (such as PostgreSQL via Prisma), replace the placeholder implementations with real business logic, and add validation, authentication, and authorization as needed.

</details>

<br/><hr/><br/>

<details>
  <summary><b>Environment Variables Setup</b></summary>

# 🔐 Environment Setup

This project requires a few environment variables to establish a connection with a PostgreSQL database through **Prisma ORM**.

For security reasons, this repository **does not include any sensitive credentials or connection strings**. You will need to create your own database and provide your own environment variables before running the application.

---

# 📋 Prerequisites

Before configuring the environment variables, make sure you have:

- Node.js installed
- A PostgreSQL database
- Prisma ORM installed (included in project dependencies)

You can use any PostgreSQL provider, including:

- Neon
- Supabase
- Railway
- Render
- Local PostgreSQL
- PostgreSQL running in Docker

---

# 📁 Create the Environment File

Navigate to the lesson that requires a database (such as **lesson04** or **lesson05**) and create a new file named:

```text
.env
```

Alternatively, you can copy the example file if one exists:

```bash
cp .env.example .env
```

---

# 📝 Required Environment Variables

Add the following variables to your `.env` file.

```env
# Prisma Database Connection

# Primary database connection (recommended pooled connection)
DATABASE_URL=""

# Direct database connection (unpooled)
DATABASE_URL_UNPOOLED=""
```

Replace the empty values with your own PostgreSQL connection strings.

---

# 📖 Variable Reference

| Variable                | Required | Description                                                                                                                                                                    |
| ----------------------- | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DATABASE_URL`          |    ✅    | The primary PostgreSQL connection string used by Prisma Client during normal application runtime. A pooled connection is recommended when supported by your database provider. |
| `DATABASE_URL_UNPOOLED` |    ✅    | A direct PostgreSQL connection used by Prisma for migrations or operations that require an unpooled connection.                                                                |

---

# ⚙ Prisma Configuration

If you're using a custom `prisma.config.ts` file, ensure that environment variables are loaded before Prisma initializes.

Example:

```ts
import 'dotenv/config';
```

Without loading your environment variables, Prisma may not be able to access your database connection settings.

---

# 🚀 Running the Application

After configuring your `.env` file, install the project dependencies:

```bash
npm install
```

Generate the Prisma Client:

```bash
npx prisma generate
```

Run any pending database migrations:

```bash
npx prisma migrate dev
```

Finally, start the application:

```bash
npm run start:dev
```

---

# 🔒 Security Best Practices

To keep your project secure:

- Never commit your `.env` file to Git.
- Keep your database credentials private.
- Use different credentials for development and production environments.
- Rotate credentials if they are ever exposed.
- Verify that `.env` is included in your `.gitignore`.

---

# 📄 Example Project Structure

```text
lesson04/
│
├── prisma/
├── src/
├── .env
├── .env.example
├── package.json
└── prisma.config.ts
```

---

# ❓ Troubleshooting

## Prisma cannot find the environment variables

Ensure your `.env` file exists in the project root and that your Prisma configuration loads it correctly.

Example:

```ts
import 'dotenv/config';
```

---

## Database connection failed

Verify that:

- Your PostgreSQL server is running.
- Your connection string is correct.
- Your username and password are valid.
- SSL settings match your database provider's requirements.
- The database is accessible from your current network.

---

## Prisma Client is outdated

If you modify your Prisma schema, regenerate the Prisma Client:

```bash
npx prisma generate
```

---

# 📚 Additional Resources

For more information, consult the official documentation:

- Prisma ORM Documentation
- Prisma Environment Variables Guide
- PostgreSQL Documentation
- NestJS Documentation

---

# 🤝 Contributing

If you notice missing environment variables or setup instructions, feel free to open an issue or submit a pull request to help improve the documentation.

---

# 📜 License

This documentation is provided as part of the project and follows the same license as the repository.

</details>

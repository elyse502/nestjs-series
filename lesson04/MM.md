<details>
    <summary><b>Prisma + PostgreSQL + Neon Setup Guide</b></summary>

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

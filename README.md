<div align="center">

# 🚀 NestJS Series 🇳🪺｡🇯‌🇸‌

## A Complete Hands-on Journey Through NestJS Fundamentals

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/elyse502/nestjs-series)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

**Building Production-Ready REST APIs with NestJS, TypeScript, and Prisma**

</div>

---

## 📋 Table of Contents

- [About This Series](#-about-this-series)
- [Repository Structure](#-repository-structure)
- [Git Branches](#-git-branches)
- [Course Overview](#-course-overview)
- [Technologies Used](#-technologies-used)
- [Getting Started](#-getting-started)
- [Lessons Overview](#-lessons-overview)
- [Available Scripts](#-available-scripts)
- [Prerequisites](#-prerequisites)
- [Useful Resources](#-useful-resources)
- [Learning Goals](#-learning-goals)
- [Repository Progress](#-repository-progress)
- [Acknowledgements](#-acknowledgements)
- [Support This Project](#-support-this-project)
- [Author](#-author)
- [License](#-license)

---

## 👋 About This Series

Welcome to my **NestJS Series** repository. This project documents my comprehensive learning journey through NestJS while following a complete tutorial series. Each lesson is contained in its own directory and corresponding Git branch, making it easy to follow the project's evolution step by step.

Instead of continuously modifying a single project, every lesson represents a milestone that introduces new concepts and builds upon previous knowledge. This approach provides a clear progression from NestJS fundamentals to building production-ready REST APIs.

### Why NestJS?

| Aspect                   | Description                             |
| ------------------------ | --------------------------------------- |
| **Architecture**         | Modular structure inspired by Angular   |
| **TypeScript First**     | Full TypeScript support with decorators |
| **Dependency Injection** | Built-in DI container                   |
| **Scalability**          | Designed for large-scale applications   |
| **Performance**          | Built on Express or Fastify             |
| **Testing**              | Excellent testing capabilities          |

---

## 📁 Repository Structure

```console
nestjs-series/
│
├── 📁 lesson01/                     # Introduction & Controllers
│   ├── 📁 src/
│   ├── 📄 package.json
│   └── 📄 README.md
│
├── 📁 lesson02/                     # Providers & Dependency Injection
│   ├── 📁 src/
│   ├── 📄 package.json
│   └── 📄 README.md
│
├── 📁 lesson03/                     # DTOs, Validation & Pipes
│   ├── 📁 src/
│   ├── 📄 package.json
│   └── 📄 README.md
│
├── 📁 lesson04/                     # Prisma & PostgreSQL Integration
│   ├── 📁 src/
│   ├── 📁 prisma/
│   ├── 📄 package.json
│   └── 📄 README.md
│
├── 📁 lesson05/                     # Production Best Practices
│   ├── 📁 src/
│   ├── 📄 package.json
│   └── 📄 README.md
│
└── 📄 README.md                     # Documentation
```

Each folder is an independent NestJS application for the corresponding lesson.

---

## 🌿 Git Branches

Every lesson has its own feature branch, making it easy to compare changes introduced in each chapter.

| Branch        | Lesson                                     | Status |
| ------------- | ------------------------------------------ | ------ |
| `ft/lesson01` | Lesson 1: Introduction & Controllers       | ✅     |
| `ft/lesson02` | Lesson 2: Providers & Dependency Injection | ✅     |
| `ft/lesson03` | Lesson 3: DTOs, Validation & Pipes         | ✅     |
| `ft/lesson04` | Lesson 4: Prisma & PostgreSQL              | ✅     |
| `ft/lesson05` | Lesson 5: Production Best Practices        | ✅     |
| `main`        | Final combined repository                  | ✅     |

---

## 🎯 Course Overview

Unlike the original course, I combined **Chapter 1** and **Chapter 2** into a single lesson. Therefore this repository contains **5 lessons** instead of 6.

| Lesson       | Topics Covered                                        | Key Skills                                   |
| ------------ | ----------------------------------------------------- | -------------------------------------------- |
| **Lesson 1** | Introduction, Project Setup, Nest CLI, Controllers    | Project structure, routing, request handling |
| **Lesson 2** | Providers & Dependency Injection                      | Services, DI container, business logic       |
| **Lesson 3** | DTOs, Validation, Pipes & Error Handling              | Data validation, exception filters           |
| **Lesson 4** | Building REST APIs using Prisma & PostgreSQL          | Database modeling, CRUD operations           |
| **Lesson 5** | CORS, Rate Limiting, Logging, Production Improvements | Security, monitoring, configuration          |

---

## 🛠 Technologies Used

<div align="center">

| Category          | Technologies    | Badge                                                                                                   |
| ----------------- | --------------- | ------------------------------------------------------------------------------------------------------- |
| **Framework**     | NestJS          | ![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)                       |
| **Language**      | TypeScript      | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)           |
| **Runtime**       | Node.js         | ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)                    |
| **Web Framework** | Express         | ![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)                 |
| **ORM**           | Prisma          | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)                       |
| **Database**      | PostgreSQL      | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)           |
| **Validation**    | Class Validator | ![Class Validator](https://img.shields.io/badge/Class_Validator-2D3748?logo=typescript&logoColor=white) |
| **Linting**       | ESLint          | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)                       |

</div>

---

## 📦 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **PostgreSQL** (local or cloud instance)
- **Git**

### Step-by-Step Setup

```console
# 1. Clone the repository
git clone https://github.com/elyse502/nestjs-series.git

# 2. Navigate to the project
cd nestjs-series

# 3. Choose the lesson you want to explore
cd lesson01

# 4. Install dependencies
npm install

# 5. Configure environment (for lessons 4 and 5)
cp .env.example .env
# Update .env with your database credentials

# 6. Run database migrations (for lessons 4 and 5)
npx prisma migrate dev

# 7. Start the development server
npm run start:dev

# 8. Access the application
# Open http://localhost:3000
```

---

## 📂 Lessons Overview

### Lesson 1: Introduction & Controllers

📁 `lesson01/`

**Topics Covered:**

- NestJS CLI and project creation
- Project structure and module organization
- Controllers and routing
- Request handling (GET, POST, PUT, DELETE)
- Route parameters and query strings
- Basic REST API endpoints

**What You'll Build:**
A simple REST API with basic CRUD operations using in-memory data storage.

---

### Lesson 2: Providers & Dependency Injection

📁 `lesson02/`

**Topics Covered:**

- Providers and services
- Dependency Injection (DI) in NestJS
- Business logic separation
- Custom providers
- Service lifecycle
- Testing with DI

**What You'll Build:**
The same REST API but with business logic moved to services, demonstrating proper separation of concerns.

---

### Lesson 3: DTOs, Validation & Pipes

📁 `lesson03/`

**Topics Covered:**

- Data Transfer Objects (DTOs)
- Validation pipes
- Class Validator integration
- Exception handling
- Global validation
- Custom pipes

**What You'll Build:**
A REST API with input validation, proper error handling, and DTOs for data transfer.

---

### Lesson 4: Prisma & PostgreSQL Integration

📁 `lesson04/`

**Topics Covered:**

- Prisma ORM setup and configuration
- Database modeling with Prisma schema
- PostgreSQL integration
- CRUD operations with Prisma
- Database migrations
- Repository pattern

**What You'll Build:**
A complete REST API with PostgreSQL persistence using Prisma ORM.

---

### Lesson 5: Production Best Practices

📁 `lesson05/`

**Topics Covered:**

- CORS configuration
- Rate limiting
- Logging and monitoring
- Application configuration
- Environment variables
- Production optimizations
- Security best practices

**What You'll Build:**
A production-ready REST API with security, logging, and monitoring capabilities.

---

## 🚀 Available Scripts

Inside each lesson directory, you can run:

| Script              | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `npm run start`     | Start the application in production mode                  |
| `npm run start:dev` | Start the application in development mode with hot reload |
| `npm run build`     | Build the application for production                      |
| `npm run test`      | Run unit tests                                            |
| `npm run test:e2e`  | Run end-to-end tests                                      |
| `npm run test:cov`  | Run tests with coverage                                   |
| `npm run lint`      | Run ESLint for code quality                               |
| `npm run format`    | Format code with Prettier                                 |

---

## 📖 Prerequisites

Before learning NestJS, it's helpful to understand:

| Topic                 | Description                   |
| --------------------- | ----------------------------- |
| **JavaScript (ES6+)** | Modern JavaScript features    |
| **TypeScript**        | Type system and decorators    |
| **Node.js**           | Runtime environment           |
| **REST APIs**         | HTTP methods and status codes |
| **Express.js**        | Web framework basics          |
| **Database Basics**   | SQL and ORM concepts          |
| **Git**               | Version control               |

---

## 📚 Useful Resources

| Resource                     | Link                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| **NestJS Documentation**     | [docs.nestjs.com](https://docs.nestjs.com)                                           |
| **TypeScript Documentation** | [typescriptlang.org](https://www.typescriptlang.org)                                 |
| **Prisma Documentation**     | [prisma.io](https://www.prisma.io)                                                   |
| **PostgreSQL Documentation** | [postgresql.org](https://www.postgresql.org)                                         |
| **Class Validator**          | [github.com/typestack/class-validator](https://github.com/typestack/class-validator) |

---

## 🎓 Learning Goals

This repository explores the following concepts:

| Concept                    | Description                             |
| -------------------------- | --------------------------------------- |
| **NestJS Architecture**    | Understanding the framework's structure |
| **Controllers**            | Handling HTTP requests                  |
| **Modules**                | Organizing application structure        |
| **Providers**              | Dependency Injection and services       |
| **Dependency Injection**   | Managing dependencies                   |
| **DTO Validation**         | Input validation with pipes             |
| **Error Handling**         | Exception filters and global handling   |
| **REST API Development**   | Building production-ready APIs          |
| **Prisma ORM**             | Database modeling and operations        |
| **PostgreSQL Integration** | Working with relational databases       |
| **Production Practices**   | Security, logging, and monitoring       |

---

## 📈 Repository Progress

| Lesson                                     | Status | Completed |
| ------------------------------------------ | ------ | --------- |
| Lesson 1: Introduction & Controllers       | ✅     | Yes       |
| Lesson 2: Providers & Dependency Injection | ✅     | Yes       |
| Lesson 3: DTOs, Validation & Pipes         | ✅     | Yes       |
| Lesson 4: Prisma & PostgreSQL Integration  | ✅     | Yes       |
| Lesson 5: Production Best Practices        | ✅     | Yes       |

---

## 🤝 Acknowledgements

This repository was created while following an excellent NestJS tutorial series by **Dave Gray**.

The code has been rewritten, practiced, and organized into lesson-based directories as part of my personal learning journey. I highly recommend checking out the original tutorial series for additional context and explanations.

---

## ⭐ Support This Project

If you found this repository helpful:

- ⭐ **Star** this repository on GitHub
- 🍴 **Fork** it to explore the lessons
- 📢 **Share** it with others learning NestJS
- 💬 **Connect** with me for discussions

Your support helps others discover this project and motivates continued learning.

---

## 👨‍💻 Author

### **Elysée NIYIBIZI**

_Junior Fullstack Software Engineer_

<div align="center">

[![Portfolio](https://img.shields.io/badge/Portfolio-elyseedev.netlify.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://elyseedev.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-elyse502-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/elyse502)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Niyibizi_Elys%C3%A9e-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/niyibizi-elys%C3%A9e)
[![Email](https://img.shields.io/badge/Email-elyseniyibizi502@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:elyseniyibizi502@gmail.com)
[![X](https://img.shields.io/badge/X-Niyibizi_Elyse-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/Niyibizi_Elyse)

</div>

**Specialties:**

- Backend Development
- TypeScript & Node.js
- API Design
- Database Architecture

---

## 📄 License

This repository is intended for educational purposes. Feel free to fork it, explore the lessons, and use it as a learning resource.

```
MIT License

Copyright (c) 2026 Elysée NIYIBIZI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

<div align="center">

### 🚀 Happy Coding!

_Building better APIs with NestJS, one lesson at a time._

---

**⭐ Star this repository if you find it helpful!**

</div>

<h1 align="center">🧑‍💼 Employee Management System (EMS) — Frontend</h1>

<p align="center">
  <b>Modern, secure, and scalable employee management application built with Angular.</b><br>
  Developed using <a href="https://github.com/angular/angular-cli">Angular CLI</a> v19.2.12 — integrated with Spring Boot backend for RESTful APIs.
</p>

---

## 🌟 Overview

The **Employee Management System (EMS)** is a full-featured Angular application that enables seamless management of employee records with **JWT authentication**, **role-based access**, **email verification**, and **password reset functionality**.  
It provides an elegant UI, modular architecture, and real-time form validation for smooth enterprise-level operations.

---

## ⚙️ Technologies Used

| Category | Technologies |
|-----------|--------------|
| **Frontend Framework** | Angular 19, TypeScript |
| **UI / Styling** | HTML5, CSS3, Bootstrap |
| **State Management & Utilities** | RxJS |
| **Security** | JWT Authentication, Auth Guards, Interceptors |
| **Backend Integration** | RESTful API (Spring Boot) |

---

## 🚀 Key Features

### 🔐 Authentication & Security
- Secure **JWT-based login** and logout  
- **Email verification** during signup (confirmation sent to user email)  
- **Forgot Password** — sends reset link to registered email  
- **Auth Guards** — restricts unauthorized access to routes  
- **Auth Interceptor** — attaches JWT tokens to HTTP requests automatically  

### 👨‍💼 Employee Management (CRUD)
- Add, View, Update, and Delete Employees  
- Responsive and mobile-friendly interface  
- Dynamic search, sorting, and pagination  
- Real-time validation and notification system  

### 🧩 Architecture Highlights
- **Modular Routing System** — clean navigation with lazy-loaded modules  
- **Environment Configuration** — centralized API paths in `environment.ts`  
- **Reusable Services** for separation of concerns:
  - `AuthService` — Authentication, Email Verification, Password Reset  
  - `EmployeeService` — Employee CRUD APIs  
  - `NotificationService` — Success/Error messages  
- **Guards & Interceptors** — maintain route security and authentication state  

---

## 🗂️ Project Structure

```bash
employee-web/
│
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── forgot-password/
│   │   │   ├── auth.guard.ts
│   │   │   └── auth.interceptor.ts
│   │   ├── employee/
│   │   │   ├── add-employee/
│   │   │   ├── employee-list/
│   │   │   ├── update-employee/
│   │   │   └── employee.service.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── notification.service.ts
│   │   │   └── token-storage.service.ts
│   │   ├── environment/
│   │   │   ├── environment.ts
│   │   │   └── environment.prod.ts
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   └── assets/
│
└── README.md

💻 Development Setup

To start a local development server, run:

ng serve


Then open your browser and navigate to:
👉 http://localhost:4200/

The app will automatically reload whenever you modify the source files.

🏗️ Build for Production

Build the project using:

ng build


This command compiles and optimizes your project for production.
The build artifacts will be stored in the dist/ directory.

🧪 Running Tests
✅ Unit Tests

Run unit tests using Karma
:

ng test

🧩 End-to-End Tests

For E2E testing (optional), run:

ng e2e


Angular CLI does not come with an e2e framework by default — you can configure one (like Cypress or Protractor).

🌍 Environment Configuration

src/environments/environment.ts

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api'
};


src/environments/environment.prod.ts

export const environment = {
  production: true,
  apiBaseUrl: 'https://your-deployed-backend-url/api'
};

📚 Useful Resources

Angular CLI Documentation

RxJS Official Docs

Bootstrap Components

🏁 Summary

The Employee Management System (EMS) frontend is a modern, modular, and secure Angular application built to handle all employee-related operations.
It integrates seamlessly with the Spring Boot backend, offering:

✅ Secure Authentication (JWT + Guards + Interceptors)
📧 Real Email Verification & Password Reset
⚙️ Full Employee CRUD Operations
🌐 Centralized Environment Configurations
💎 Scalable & Responsive UI

<p align="center">✨ Designed & Developed with ❤️ using Angular ✨</p> ```

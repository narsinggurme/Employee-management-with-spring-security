# 🧑‍💼 Employee Management System (EMS) — Frontend

This project is the **frontend application** for the **Employee Management System**, developed using **Angular CLI** version **19.2.12**.  
It provides a secure and user-friendly interface for managing employees with features such as authentication, authorization, email verification, password reset, and complete CRUD operations.

---

## ⚙️ Technologies Used

- **Angular 19**
- **TypeScript**
- **HTML5, CSS3, Bootstrap**
- **RxJS**
- **JWT Authentication**
- **RESTful API (Spring Boot Backend Integration)**

---

## 🚀 Key Features

### 🔐 Authentication & Security
- **Login with JWT Authentication**
- **Signup with Email Verification** — confirmation email sent to the registered user
- **Forgot Password** — reset link sent to the registered email ID
- **Auth Guards** — restrict unauthorized users from accessing protected routes
- **Auth Interceptor** — automatically adds JWT token to secured HTTP requests

### 👥 Employee Management (CRUD)
- Add, view, update, and delete employees
- Dynamic search and filtering
- Pagination support
- Responsive UI with form validations

### 🧩 Architecture Highlights
- **Routing Module** — manages route-based navigation
- **Environment Files** — all API paths and constants stored in one place (`environment.ts` and `environment.prod.ts`)
- **Services for Reusable Logic:**
  - `AuthService` — handles login, signup, forgot password, and email verification
  - `EmployeeService` — manages CRUD operations
  - `NotificationService` — displays success/error messages
- **Guards & Interceptors** — for route-level security and authentication handling

---

## 📁 Project Structure

employee-web/
│
├── src/
│ ├── app/
│ │ ├── auth/
│ │ │ ├── login/
│ │ │ ├── signup/
│ │ │ ├── forgot-password/
│ │ │ ├── auth.guard.ts
│ │ │ └── auth.interceptor.ts
│ │ ├── employee/
│ │ │ ├── add-employee/
│ │ │ ├── employee-list/
│ │ │ ├── update-employee/
│ │ │ └── employee.service.ts
│ │ ├── services/
│ │ │ ├── auth.service.ts
│ │ │ ├── notification.service.ts
│ │ │ └── token-storage.service.ts
│ │ ├── environment/
│ │ │ ├── environment.ts
│ │ │ └── environment.prod.ts
│ │ ├── app-routing.module.ts
│ │ └── app.module.ts
│ └── assets/
│
└── README.md


---

## 💻 Development Server

To start a local development server, run:

```bash
ng serve


Once the server is running, open your browser and navigate to:
👉 http://localhost:4200/

The application will automatically reload whenever you modify any source files.

🏗️ Building

To build the project for production:

ng build


This will compile and optimize your project, storing the build artifacts in the dist/ directory.

🧪 Running Unit Tests

To execute unit tests with the Karma
 test runner:

ng test

🧩 Running End-to-End Tests

For end-to-end (e2e) testing, run:

ng e2e


(Angular CLI doesn’t come with a built-in e2e framework; you can configure your own.)

🌍 Environment Configuration Example

environment.ts

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api'
};


environment.prod.ts

export const environment = {
  production: true,
  apiBaseUrl: 'https://your-deployed-backend-url/api'
};

📚 Additional Resources

For more information on using the Angular CLI and its commands, visit the
👉 Angular CLI Overview and Command Reference

🏁 Summary

The Employee Management System (EMS) frontend is a secure, modular, and scalable Angular application that includes:

JWT Authentication & Role-based Authorization

Real Email Verification & Password Reset

Auth Guards & Interceptors for Security

Centralized API Management via Environment Files

Full Employee CRUD Operations

This application is designed to integrate seamlessly with the Spring Boot backend, delivering a complete, enterprise-grade Employee Management Solution.
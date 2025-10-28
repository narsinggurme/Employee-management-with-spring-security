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
- **Reusable Services:**
  - `AuthService` — handles login, signup, forgot password, and email verification  
  - `EmployeeService` — manages CRUD operations  
  - `NotificationService` — displays success/error messages  
- **Guards & Interceptors** — for route-level security and authentication handling  

---

## 📁 Project Structure

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

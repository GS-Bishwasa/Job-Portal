# Job Portal Project

[Live Demo](https://job-portal-client-umber-three.vercel.app/)

This is a **Job Portal** web application built using the **MERN stack** with **Vite** as the frontend build tool. It allows users to explore job listings, apply for jobs, and manage job postings. The application features modern UI with **Tailwind CSS**, smooth scrolling effects, and rich text editors for job descriptions.

---

## Features

- User authentication and authorization
- Job posting and management
- Job search and filters
- Smooth scrolling animations
- Rich text editor for job descriptions
- Notifications and alerts for user actions
- Cloud-based image upload for job/company logos
- Error tracking and logging

---

## Tech Stack

### Frontend
- **React** (`react` & `react-dom`) – For building the user interface.
- **Vite** – Modern frontend build tool for fast development and optimized builds.
- **Tailwind CSS** (`tailwindcss`, `@tailwindcss/vite`) – Utility-first CSS framework for styling the app.
- **React Router DOM** (`react-router-dom`) – For client-side routing.
- **React Toastify** (`react-toastify`) – To display notifications and alerts.
- **Quill** (`quill`) – Rich text editor for job descriptions.
- **Lenis** (`lenis`) – Smooth scroll animations for better user experience.

### Backend
- **Node.js & Express** (`express`) – Server-side framework for handling APIs.
- **MongoDB & Mongoose** (`mongoose`) – Database and ODM for storing users, jobs, and applications.
- **Axios** (`axios`) – HTTP client for frontend-backend communication.
- **Moment** (`moment`) – Formatting and manipulating dates.
- **k-convert** (`k-convert`) – Utility for value conversions (currency, units, etc.).
- **bcrypt** (`bcrypt`) – Password hashing for secure authentication.
- **jsonwebtoken** (`jsonwebtoken`) – JWT-based authentication.
- **Multer** (`multer`) – Handling file uploads (images, resumes).
- **Cloudinary** (`cloudinary`) – Cloud-based image storage.
- **Cors** (`cors`) – Enabling cross-origin requests.
- **Dotenv** (`dotenv`) – Managing environment variables.
- **Nodemon** (`nodemon`) – Development tool to auto-restart server on file changes.
- **Sentry** (`@sentry/node`) – Error tracking and monitoring.
- **Svix** (`svix`) – Webhook management and notifications.
- **Clerk Express** (`@clerk/express`) – Authentication middleware for Express backend.

### Authentication
- **Clerk** (`@clerk/clerk-react`, `@clerk/express`) – User authentication and management (signup, login, session handling).

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-link>
   cd job-portal

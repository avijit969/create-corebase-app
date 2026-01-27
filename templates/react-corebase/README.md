# React + CoreBase Authentication Template

This template provides a robust starting point for a React application with full authentication flow using **CoreBase**, **React Router v7**, **Zustand**, and **Shadcn UI**.

## Features

- 🔐 **Secure Authentication**: Complete Login and Signup flows integrated with CoreBase.
- 🛡️ **Route Protection**: Middleware-based route guarding (v8 style) to protect private pages and redirect public access.
- 🐻 **State Management**: Global authentication state managed with **Zustand**.
- 🎨 **Modern UI**: Polished interface using **Shadcn UI** components and **Tailwind CSS**.
- 🌓 **Dark Mode**: Built-in theme switching support.

## Project Structure

```bash
src/
├── components/         # Reusable UI components
│   ├── ui/             # Shadcn primitives (Card, Input, Button, etc.)
│   ├── mode-toggle.tsx # Dark/Light mode switcher
│   └── theme-provider.tsx
├── corebase/           # CoreBase SDK Configuration
│   ├── auth.ts         # Auth helper functions (login, signup, getSession)
│   └── client.ts       # CoreBase client initialization
├── middlewares/        # Router Middlewares
│   └── auth-middleware.ts # Logic for Protected and Guest routes
├── pages/              # Page Components
│   └── auth/           # Login and Signup pages
├── store/              # Global State
│   └── auth-store.ts   # Zustand store for User & Session
├── lib/                # Utilities (cn, etc.)
├── App.tsx             # Main dashboard/profile component
├── main.tsx            # App entry point & Router configuration
└── index.css           # Global styles & Tailwind directives
```

## Authentication & Route Protection Logic

This project uses the **React Router v7 Middleware** pattern combined with a **Zustand** store to handle route security efficiently.

### 1. Global State (`src/store/auth-store.ts`)
We use a Zustand store to keep track of the current user and session status.
- **`user`**: The current authenticated user object.
- **`loading`**: Boolean state to indicate if auth check is in progress.
- **`checkAuth()`**: An async action that calls CoreBase's `getSession` to validate the current session.

### 2. Middleware (`src/middlewares/auth-middleware.ts`)
Instead of wrapping components, we use router middleware functions that run *before* a route is entered.

- **`authMiddleware`**: Applied to protected routes (like `/`).
  - Checks if a user is logged in.
  - If **NO**, redirects to `/login`.
  - If **YES**, allows access.

- **`guestMiddleware`**: Applied to public auth routes (like `/login`, `/signup`).
  - Checks if a user is logged in.
  - If **YES**, redirects to `/` (Home).
  - If **NO**, allows access.

### 3. Router Configuration (`src/main.tsx`)
The middleware is hooked into the router definition using the new `middleware` property.

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    middleware: [authMiddleware], // Protects the home page
  },
  {
    path: "/login",
    element: <Login />,
    middleware: [guestMiddleware], // Redirects logged-in users away
  },
  // create your other routes here.   
]);
```

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Environment**:
    Ensure your `.env` file contains your CoreBase credentials.
    ```env
    VITE_COREBASE_URL=your_project_url (or proxy)
    VITE_COREBASE_PUBLIC_KEY=your_public_key
    ```

3.  **Run Locally**:
    ```bash
    npm run dev
    ```

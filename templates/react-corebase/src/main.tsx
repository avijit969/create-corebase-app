import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App.tsx'
import Login from './pages/auth/login.tsx'
import Signup from './pages/auth/signup.tsx'
import { authMiddleware, guestMiddleware } from './middlewares/auth-middleware.ts';
import { ThemeProvider } from "@/components/theme-provider"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    middleware: [authMiddleware],
  },
  {
    path: "/login",
    element: <Login />,
    middleware: [guestMiddleware],
  },
  {
    path: "/signup",
    element: <Signup />,
    middleware: [guestMiddleware],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)

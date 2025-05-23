"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Define user types
export type UserRole = "client" | "tasker"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  initials: string
}

// Define context type
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, username: string, role: UserRole) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for testing
const MOCK_USERS = {
  "client@gmail.com": {
    id: "user-1",
    name: "John Client",
    email: "client@gmail.com",
    role: "client" as UserRole,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JC",
    password: "12345678",
  },
  "tasker@gmail.com": {
    id: "user-2",
    name: "Jane Tasker",
    email: "tasker@gmail.com",
    role: "tasker" as UserRole,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JT",
    password: "12345678",
  },
}

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on mount
useEffect(() => {
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("bounty_token");

      if (!token) {
        // If no token exists, set user to null and exit
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Validate token with backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid or expired token");
      }

      const data = await response.json();

      // Set user state
      setUser(data.user);
    } catch (error) {
      console.error("Auth check failed:", error);

      // Clear any invalid data
      localStorage.removeItem("bounty_token");
      localStorage.removeItem("bounty_user");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  checkAuth();
}, []);

  // Login function
const login = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Login failed");
    }

    const { user, token } = data;

    if (!token) {
      throw new Error("No token received from server");
    }

    // Store token in localStorage
    localStorage.setItem("bounty_token", token);

    // Store user data in localStorage
    localStorage.setItem("bounty_user", JSON.stringify(user));

    // Set user state
    setUser({
      id: user.id,
      name: user.username,
      email: user.email,
      role: user.role,
      initials: user.username.substring(0, 2).toUpperCase(),
    });

    // Redirect to dashboard
    router.push("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error(error instanceof Error ? error.message : "Login failed. Please check your credentials and try again.");
  } finally {
    setIsLoading(false);
  }
};

  // Register function
const register = async (email: string, password: string, username: string, role: UserRole) => {
  setIsLoading(true);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        role,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    console.log("Registration successful:", data);

    // Redirect to login page with success message
    router.push("/login?registered=true");
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error(error instanceof Error ? error.message : "Registration failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  // Logout function
  const logout = () => {
    // Remove token and user data
    localStorage.removeItem("bounty_token")
    localStorage.removeItem("bounty_user")

    // Clear user state
    setUser(null)

    // Redirect to home page
    router.push("/")
  }

  // Forgot password function
  const forgotPassword = async (email: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be:
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // const data = await response.json();

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if the email exists
      if (!MOCK_USERS[email as keyof typeof MOCK_USERS]) {
        // In a real app, you might not want to reveal if an email exists or not
        // for security reasons, but we'll do it here for demonstration
        throw new Error("Email not found")
      }

      // In a real app, an email would be sent with a reset link
      // For our mock implementation, we'll just return success

      return
    } catch (error) {
      console.error("Forgot password request failed:", error)
      throw new Error("Failed to process your request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


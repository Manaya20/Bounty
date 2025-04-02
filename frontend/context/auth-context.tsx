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
    // In a real app, you would check for a token in localStorage or cookies
    // and validate it with your backend
    const checkAuth = async () => {
      try {
        // Simulate API call to validate token
        // In a real app, this would be:
        // const response = await fetch('/api/auth/me', {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('token')}`
        //   }
        // });
        // const data = await response.json();

        // For demo purposes, check if we have a token and user data in localStorage
        const token = localStorage.getItem("bounty_token")
        const storedUser = localStorage.getItem("bounty_user")

        if (token && storedUser) {
          // Parse the stored user data
          const userData = JSON.parse(storedUser)

          // Set the user state
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            avatar: userData.avatar,
            initials: userData.initials,
          })
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setUser(null)
        // Clear any invalid data
        localStorage.removeItem("bounty_token")
        localStorage.removeItem("bounty_user")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if the email exists in our mock data
      const mockUser = MOCK_USERS[email as keyof typeof MOCK_USERS]

      if (!mockUser || mockUser.password !== password) {
        throw new Error("Invalid email or password")
      }

      // Create a user object without the password
      const { password: _, ...userWithoutPassword } = mockUser

      // Store token and user data
      localStorage.setItem("bounty_token", "mock_token_" + Date.now())
      localStorage.setItem("bounty_user", JSON.stringify(userWithoutPassword))

      // Set user state
      setUser(userWithoutPassword)

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      throw new Error("Login failed. Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (email: string, password: string, username: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // In a real app, this would be:
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, username, role }),
      // });
      // const data = await response.json();

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if email already exists
      if (MOCK_USERS[email as keyof typeof MOCK_USERS]) {
        throw new Error("Email already in use")
      }

      // In a real app, the user would be created in the database
      // For our mock implementation, we'll just redirect to login

      // Redirect to login page
      router.push("/login?registered=true")
    } catch (error) {
      console.error("Registration failed:", error)
      throw new Error("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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


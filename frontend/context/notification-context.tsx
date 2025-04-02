"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define notification type
export interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  link?: string
}

// Define context type
interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<Notification, "id" | "read">) => void
}

// Create context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Mock notifications data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    title: "New application received",
    description: "Sarah Johnson applied to Website Redesign",
    time: "2 hours ago",
    read: false,
    link: "/tasks/1",
  },
  {
    id: "notif-2",
    title: "Task completed",
    description: "Logo Design was marked as completed",
    time: "1 day ago",
    read: false,
    link: "/my-tasks",
  },
  {
    id: "notif-3",
    title: "Payment processed",
    description: "$150 payment for Logo Design was processed",
    time: "1 day ago",
    read: true,
    link: "/my-tasks",
  },
  {
    id: "notif-4",
    title: "New review",
    description: "You received a 5-star review from David Kim",
    time: "2 days ago",
    read: true,
    link: "/profile",
  },
]

// Provider component
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const [unreadCount, setUnreadCount] = useState(0)

  // Calculate unread count whenever notifications change
  useEffect(() => {
    const count = notifications.filter((notif) => !notif.read).length
    setUnreadCount(count)
  }, [notifications])

  // Mark a notification as read
  const markAsRead = (id: string) => {
    // In a real app, this would make an API call:
    // await fetch(`/api/notifications/${id}/read`, { method: 'POST' });

    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    // In a real app, this would make an API call:
    // await fetch('/api/notifications/read-all', { method: 'POST' });

    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  // Add a new notification
  const addNotification = (notification: Omit<Notification, "id" | "read">) => {
    // In a real app, this might be triggered by a websocket event
    // or a push notification

    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

// Custom hook to use the notification context
export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}


"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, PaperclipIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/context/auth-context"

interface Message {
  id: number | string
  sender: {
    name: string
    avatar?: string
    initials: string
    isClient: boolean
  }
  content: string
  timestamp: string
}

interface ChatInterfaceProps {
  taskId: string | number
  clientName: string
  clientAvatar?: string
  clientInitials: string
  initialMessages?: Message[]
  onClose: () => void
}

export function ChatInterface({
  taskId,
  clientName,
  clientAvatar,
  clientInitials,
  initialMessages = [],
  onClose,
}: ChatInterfaceProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load messages from API/localStorage
  useEffect(() => {
    // In a real app, you would fetch messages from an API
    // Example:
    // const fetchMessages = async () => {
    //   try {
    //     const response = await fetch(`/api/tasks/${taskId}/messages`);
    //     const data = await response.json();
    //     setMessages(data);
    //   } catch (error) {
    //     console.error('Failed to fetch messages:', error);
    //   }
    // };
    // fetchMessages();

    // For demo purposes, we'll use the initialMessages
    if (initialMessages.length > 0) {
      setMessages(initialMessages)
    }
  }, [taskId, initialMessages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // In a real app, you would send the message to an API
    // Example:
    // const sendMessage = async () => {
    //   try {
    //     const response = await fetch(`/api/tasks/${taskId}/messages`, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ content: newMessage }),
    //     });
    //     const data = await response.json();
    //     setMessages(prev => [...prev, data]);
    //   } catch (error) {
    //     console.error('Failed to send message:', error);
    //   }
    // };
    // sendMessage();

    // For demo purposes, we'll create a new message locally
    const newMsg: Message = {
      id: Date.now(),
      sender: {
        name: user?.name || "You",
        avatar: user?.avatar,
        initials: user?.initials || "YO",
        isClient: user?.role === "client",
      },
      content: newMessage,
      timestamp: new Date().toLocaleString(),
    }

    setMessages((prev) => [...prev, newMsg])
    setNewMessage("")
  }

  return (
    <div
      className={`fixed bottom-0 right-4 z-50 w-80 rounded-t-lg shadow-lg bg-card border border-border transition-all duration-300 ${
        isMinimized ? "h-12" : "h-96"
      }`}
    >
      {/* Chat header */}
      <div
        className="flex items-center justify-between p-3 border-b cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={clientAvatar} alt={clientName} />
            <AvatarFallback>{clientInitials}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm">{clientName}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat body */}
      {!isMinimized && (
        <>
          <div className="p-3 h-[calc(100%-96px)] overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender.isClient ? "justify-start" : "justify-end"}`}>
                  <div className={`flex max-w-[90%] ${msg.sender.isClient ? "flex-row" : "flex-row-reverse"}`}>
                    <Avatar className={`h-8 w-8 ${msg.sender.isClient ? "mr-2" : "ml-2"} flex-shrink-0`}>
                      <AvatarImage src={msg.sender.avatar} alt={msg.sender.name} />
                      <AvatarFallback>{msg.sender.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div
                        className={`rounded-lg p-2 text-sm ${
                          msg.sender.isClient ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{msg.timestamp}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat input */}
          <div className="p-3 border-t">
            <div className="flex items-end gap-2">
              <Textarea
                placeholder="Type a message..."
                className="min-h-[60px] text-sm resize-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <PaperclipIcon className="h-4 w-4" />
                </Button>
                <Button size="icon" className="h-8 w-8" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}


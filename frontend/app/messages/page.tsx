"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send, PaperclipIcon, MessageSquare } from "lucide-react"

// Mock conversation data
const CONVERSATIONS = [
  {
    id: 1,
    user: {
      name: "TechStore Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TS",
      isOnline: true,
    },
    lastMessage: {
      content: "Hello John, thanks for your interest! Our current website is quite outdated, built about 3 years ago.",
      timestamp: "10:45 AM",
      isRead: true,
      sender: "them",
    },
    task: {
      id: 1,
      title: "Website Redesign for E-commerce Store",
    },
  },
  {
    id: 2,
    user: {
      name: "FitLife Co.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "FL",
      isOnline: false,
    },
    lastMessage: {
      content:
        "I've reviewed your proposal and I'm interested in discussing further. When are you available for a call?",
      timestamp: "Yesterday",
      isRead: false,
      sender: "them",
    },
    task: {
      id: 2,
      title: "Mobile App Development for Fitness Tracking",
    },
  },
  {
    id: 3,
    user: {
      name: "TechBlog Media",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TM",
      isOnline: true,
    },
    lastMessage: {
      content: "Thanks for the article. It looks great! I'll review it and get back to you soon.",
      timestamp: "Yesterday",
      isRead: true,
      sender: "them",
    },
    task: {
      id: 3,
      title: "Content Writing for Technology Blog",
    },
  },
  {
    id: 4,
    user: {
      name: "Bella Cucina",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "BC",
      isOnline: false,
    },
    lastMessage: {
      content: "I've sent you the final logo files. Let me know if you need any adjustments.",
      timestamp: "Monday",
      isRead: true,
      sender: "you",
    },
    task: {
      id: 4,
      title: "Logo Design for New Restaurant",
    },
  },
]

// Mock messages for the selected conversation
const MESSAGES = [
  {
    id: 1,
    content:
      "Hi, I'm interested in your website redesign project. I have 5 years of experience with e-commerce websites and WordPress. Could you provide more details about your current website?",
    timestamp: "Apr 2, 2025 • 10:23 AM",
    sender: "you",
  },
  {
    id: 2,
    content:
      "Hello John, thanks for your interest! Our current website is quite outdated, built about 3 years ago. We're looking for a complete redesign with modern aesthetics and better mobile responsiveness. I've attached some screenshots of our current site for reference.",
    timestamp: "Apr 2, 2025 • 10:45 AM",
    sender: "them",
  },
  {
    id: 3,
    content:
      "Thanks for the information. I've looked at the screenshots and I have some ideas for improvement. Would you be open to a call to discuss the project in more detail?",
    timestamp: "Apr 2, 2025 • 11:15 AM",
    sender: "you",
  },
  {
    id: 4,
    content:
      "Yes, that would be great. How about tomorrow at 2 PM EST? We can use Zoom or Google Meet, whichever you prefer.",
    timestamp: "Apr 2, 2025 • 11:30 AM",
    sender: "them",
  },
  {
    id: 5,
    content:
      "2 PM EST works for me. Let's use Zoom. I'll send you a meeting link shortly. Looking forward to discussing your project!",
    timestamp: "Apr 2, 2025 • 11:45 AM",
    sender: "you",
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(CONVERSATIONS[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredConversations = CONVERSATIONS.filter(
    (conversation) =>
      conversation.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // This is where you would make an API call to send a message
    // Example:
    // await fetch('/api/messages', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     conversationId: selectedConversation.id,
    //     content: newMessage
    //   }),
    // });

    // For demo purposes, we'll just clear the input
    setNewMessage("")
  }

  return (
    <DashboardLayout>
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground">Communicate with clients and taskers</p>
          </div>
        </div>

        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 h-[calc(100vh-200px)]">
            {/* Conversations sidebar */}
            <div className="md:col-span-1 border-r">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <div className="px-4 pt-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-0">
                  <div className="overflow-y-auto h-[calc(100vh-300px)]">
                    {filteredConversations.length > 0 ? (
                      filteredConversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          className={`p-4 border-b cursor-pointer hover:bg-muted transition-colors ${
                            selectedConversation.id === conversation.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedConversation(conversation)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                                <AvatarFallback>{conversation.user.initials}</AvatarFallback>
                              </Avatar>
                              {conversation.user.isOnline && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card"></span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium truncate">{conversation.user.name}</h3>
                                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                  {conversation.lastMessage.timestamp}
                                </span>
                              </div>
                              <p
                                className={`text-sm truncate ${
                                  !conversation.lastMessage.isRead && conversation.lastMessage.sender === "them"
                                    ? "font-medium text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {conversation.lastMessage.sender === "you" ? "You: " : ""}
                                {conversation.lastMessage.content}
                              </p>
                              <p className="text-xs text-muted-foreground truncate mt-1">
                                Re: {conversation.task.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">No conversations found</div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="unread" className="mt-0">
                  <div className="overflow-y-auto h-[calc(100vh-300px)]">
                    {filteredConversations.filter((c) => !c.lastMessage.isRead && c.lastMessage.sender === "them")
                      .length > 0 ? (
                      filteredConversations
                        .filter((c) => !c.lastMessage.isRead && c.lastMessage.sender === "them")
                        .map((conversation) => (
                          <div
                            key={conversation.id}
                            className={`p-4 border-b cursor-pointer hover:bg-muted transition-colors ${
                              selectedConversation.id === conversation.id ? "bg-muted" : ""
                            }`}
                            onClick={() => setSelectedConversation(conversation)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="relative">
                                <Avatar>
                                  <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                                  <AvatarFallback>{conversation.user.initials}</AvatarFallback>
                                </Avatar>
                                {conversation.user.isOnline && (
                                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card"></span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <h3 className="font-medium truncate">{conversation.user.name}</h3>
                                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                    {conversation.lastMessage.timestamp}
                                  </span>
                                </div>
                                <p className="text-sm font-medium truncate">{conversation.lastMessage.content}</p>
                                <p className="text-xs text-muted-foreground truncate mt-1">
                                  Re: {conversation.task.title}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">No unread messages</div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Chat area */}
            <div className="md:col-span-2 lg:col-span-3 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat header */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={selectedConversation.user.avatar} alt={selectedConversation.user.name} />
                          <AvatarFallback>{selectedConversation.user.initials}</AvatarFallback>
                        </Avatar>
                        {selectedConversation.user.isOnline && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card"></span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedConversation.user.name}</h3>
                        <p className="text-xs text-muted-foreground">Re: {selectedConversation.task.title}</p>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        View Task
                      </Button>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {MESSAGES.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "them" ? "justify-start" : "justify-end"}`}
                        >
                          {message.sender === "them" && (
                            <Avatar className="h-8 w-8 mr-2 mt-1">
                              <AvatarImage
                                src={selectedConversation.user.avatar}
                                alt={selectedConversation.user.name}
                              />
                              <AvatarFallback>{selectedConversation.user.initials}</AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`max-w-[80%]`}>
                            <div
                              className={`rounded-lg p-3 ${
                                message.sender === "them"
                                  ? "bg-muted text-foreground"
                                  : "bg-primary text-primary-foreground"
                              }`}
                            >
                              {message.content}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{message.timestamp}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat input */}
                  <div className="p-4 border-t">
                    <div className="flex items-end gap-2">
                      <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                        <PaperclipIcon className="h-5 w-5" />
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        className="flex-1"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button
                        size="icon"
                        className="h-10 w-10 shrink-0"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                    <p className="text-muted-foreground">Select a conversation from the sidebar to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


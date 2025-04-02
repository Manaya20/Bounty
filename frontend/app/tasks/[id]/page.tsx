"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
  Calendar,
  Clock,
  DollarSign,
  FileText,
  MapPin,
  MessageSquare,
  PaperclipIcon,
  Send,
  Star,
  Tag,
  Users,
} from "lucide-react"
import { ChatInterface } from "@/components/chat-interface"

// Mock task data
const TASK = {
  id: 1,
  title: "Website Redesign for E-commerce Store",
  description:
    "Looking for a skilled web designer to redesign our e-commerce website. The project involves updating the UI/UX, improving navigation, and optimizing for mobile devices. We're a small business selling handmade crafts and need a modern, responsive design that showcases our products effectively.\n\nThe current website is built on WordPress but we're open to other platforms if they better suit our needs. The redesign should include a homepage, product catalog, product detail pages, about us, contact, and checkout process.\n\nThe ideal candidate will have experience with e-commerce websites and can provide examples of previous work.",
  budget: "$500 - $1,000",
  deadline: "Apr 30, 2025",
  location: "Remote",
  skills: ["Web Design", "UI/UX", "Responsive Design", "E-commerce", "WordPress"],
  client: {
    name: "TechStore Inc.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "TS",
    rating: 4.8,
    reviews: 24,
    memberSince: "Jan 2023",
    tasksPosted: 12,
    completionRate: "95%",
  },
  postedDate: "Apr 1, 2025",
  applicants: 8,
  attachments: [
    { name: "current_website_screenshots.pdf", size: "2.4 MB" },
    { name: "design_requirements.docx", size: "1.1 MB" },
  ],
}

// Mock messages data
const MESSAGES = [
  {
    id: 1,
    sender: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      isClient: false,
    },
    content:
      "Hi, I'm interested in your website redesign project. I have 5 years of experience with e-commerce websites and WordPress. Could you provide more details about your current website?",
    timestamp: "Apr 2, 2025 • 10:23 AM",
  },
  {
    id: 2,
    sender: {
      name: "TechStore Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TS",
      isClient: true,
    },
    content:
      "Hello John, thanks for your interest! Our current website is quite outdated, built about 3 years ago. We're looking for a complete redesign with modern aesthetics and better mobile responsiveness. I've attached some screenshots of our current site for reference.",
    timestamp: "Apr 2, 2025 • 11:45 AM",
  },
  {
    id: 3,
    sender: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      isClient: false,
    },
    content:
      "Thanks for the information. I've looked at the screenshots and I have some ideas for improvement. Would you be open to a call to discuss the project in more detail?",
    timestamp: "Apr 2, 2025 • 1:15 PM",
  },
]

export default function TaskDetailPage() {
  const params = useParams()
  const taskId = params.id
  const { toast } = useToast()
  const [message, setMessage] = useState("")
  const [proposalAmount, setProposalAmount] = useState("")
  const [proposalDescription, setProposalDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleSendMessage = () => {
    if (!message.trim()) return

    // This is where you would make an API call to send a message
    // Example:
    // await fetch('/api/messages', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ taskId, message }),
    // });

    toast({
      title: "Message sent",
      description: "Your message has been sent to the client.",
    })

    setMessage("")
  }

  const handleSubmitProposal = () => {
    if (!proposalAmount || !proposalDescription) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // This is where you would make an API call to submit a proposal
    // Example:
    // await fetch('/api/proposals', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ taskId, amount: proposalAmount, description: proposalDescription }),
    // });

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Proposal submitted",
        description: "Your proposal has been submitted to the client.",
      })

      setProposalAmount("")
      setProposalDescription("")
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <Link href="/tasks" className="text-sm text-primary hover:underline mb-2 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to tasks
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">{TASK.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Posted {TASK.postedDate}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{TASK.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Due {TASK.deadline}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{TASK.applicants} applicants</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Save Task</Button>
            <Button>Apply Now</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          <div className="md:col-span-2 lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-medium text-lg">{TASK.budget}</span>
                  </div>

                  <div className="whitespace-pre-line text-muted-foreground">{TASK.description}</div>

                  <div>
                    <h3 className="font-medium mb-2">Skills Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {TASK.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/5">
                          <Tag className="h-3 w-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Attachments</h3>
                    <div className="space-y-2">
                      {TASK.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center p-2 border rounded-md">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{attachment.name}</div>
                            <div className="text-xs text-muted-foreground">{attachment.size}</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="messages">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="proposal">Submit Proposal</TabsTrigger>
              </TabsList>

              <TabsContent value="messages" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>Communicate with the client about this task</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
                      {MESSAGES.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender.isClient ? "justify-start" : "justify-end"}`}>
                          <div className={`flex max-w-[80%] ${msg.sender.isClient ? "flex-row" : "flex-row-reverse"}`}>
                            <Avatar className={`h-8 w-8 ${msg.sender.isClient ? "mr-2" : "ml-2"}`}>
                              <AvatarImage src={msg.sender.avatar} alt={msg.sender.name} />
                              <AvatarFallback>{msg.sender.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div
                                className={`rounded-lg p-3 ${
                                  msg.sender.isClient
                                    ? "bg-muted text-foreground"
                                    : "bg-primary text-primary-foreground"
                                }`}
                              >
                                {msg.content}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">{msg.timestamp}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <Textarea
                          placeholder="Type your message here..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="icon">
                          <PaperclipIcon className="h-4 w-4" />
                        </Button>
                        <Button size="icon" onClick={handleSendMessage} disabled={!message.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="proposal" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Submit a Proposal</CardTitle>
                    <CardDescription>Tell the client why you're the best fit for this task</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Your Bid Amount</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            type="number"
                            placeholder="Enter your bid amount"
                            className="pl-10"
                            value={proposalAmount}
                            onChange={(e) => setProposalAmount(e.target.value)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Client's budget: {TASK.budget}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Cover Letter</label>
                        <Textarea
                          placeholder="Describe why you're the best fit for this task, your relevant experience, and your approach to completing it."
                          className="min-h-[200px]"
                          value={proposalDescription}
                          onChange={(e) => setProposalDescription(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Attachments (Optional)</label>
                        <div className="border border-dashed rounded-md p-6 text-center">
                          <PaperclipIcon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop files here, or click to browse
                          </p>
                          <Button variant="outline" size="sm">
                            Browse Files
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            Max file size: 10MB. Supported formats: PDF, DOC, DOCX, JPG, PNG
                          </p>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={handleSubmitProposal}
                        disabled={isSubmitting || !proposalAmount || !proposalDescription}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Proposal"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About the Client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={TASK.client.avatar} alt={TASK.client.name} />
                    <AvatarFallback>{TASK.client.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{TASK.client.name}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="text-yellow-500 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(TASK.client.rating) ? "fill-current" : ""}`}
                          />
                        ))}
                      </span>
                      <span className="ml-1">
                        {TASK.client.rating} ({TASK.client.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since</span>
                    <span>{TASK.client.memberSince}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tasks posted</span>
                    <span>{TASK.client.tasksPosted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion rate</span>
                    <span>{TASK.client.completionRate}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full" onClick={() => setIsChatOpen(true)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat with Client
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Similar Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 2,
                      title: "E-commerce Website Development",
                      budget: "$1,200 - $2,500",
                      deadline: "May 15, 2025",
                    },
                    {
                      id: 3,
                      title: "WordPress Theme Customization",
                      budget: "$300 - $600",
                      deadline: "Apr 20, 2025",
                    },
                    {
                      id: 4,
                      title: "UI/UX Design for Online Store",
                      budget: "$800 - $1,500",
                      deadline: "May 5, 2025",
                    },
                  ].map((task) => (
                    <Link key={task.id} href={`/tasks/${task.id}`}>
                      <div className="p-3 border rounded-lg hover:border-primary transition-colors">
                        <h3 className="font-medium text-sm mb-2">{task.title}</h3>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <DollarSign className="h-3 w-3 mr-1" />
                            <span>{task.budget}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Due {task.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      {isChatOpen && (
        <ChatInterface
          taskId={taskId}
          clientName={TASK.client.name}
          clientAvatar={TASK.client.avatar}
          clientInitials={TASK.client.initials}
          initialMessages={MESSAGES}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </DashboardLayout>
  )
}


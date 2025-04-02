"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  Star,
  Briefcase,
  ArrowRight,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()
  const [userRole, setUserRole] = useState<"client" | "tasker">(user?.role || "client")

  // Update userRole when user changes
  useEffect(() => {
    if (user) {
      setUserRole(user.role)
    }
  }, [user])

  // Toggle role for demo purposes
  const toggleRole = () => {
    setUserRole((prev) => (prev === "client" ? "tasker" : "client"))
  }

  return (
    <DashboardLayout userRole={userRole}>
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name || "User"}! Here's what's happening with your{" "}
              {userRole === "client" ? "tasks" : "work"}.
            </p>
          </div>
          <Button onClick={toggleRole} variant="outline" size="sm">
            Switch to {userRole === "client" ? "Tasker" : "Client"} View
          </Button>
        </div>

        {userRole === "client" ? <ClientDashboard /> : <TaskerDashboard />}
      </div>
    </DashboardLayout>
  )
}

function ClientDashboard() {
  // In a real app, you would fetch this data from an API
  // Example:
  // const [stats, setStats] = useState(null)
  // const [activeTasks, setActiveTasks] = useState([])
  // const [applications, setApplications] = useState([])
  //
  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const statsResponse = await fetch('/api/client/stats')
  //       const statsData = await statsResponse.json()
  //       setStats(statsData)
  //
  //       const tasksResponse = await fetch('/api/client/tasks/active')
  //       const tasksData = await tasksResponse.json()
  //       setActiveTasks(tasksData)
  //
  //       const applicationsResponse = await fetch('/api/client/applications/recent')
  //       const applicationsData = await applicationsResponse.json()
  //       setApplications(applicationsData)
  //     } catch (error) {
  //       console.error('Failed to fetch dashboard data:', error)
  //     }
  //   }
  //
  //   fetchDashboardData()
  // }, [])

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,254.00</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+4 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-yellow-500 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </span>
              <span className="ml-1">(24 reviews)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-6">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Active Tasks</CardTitle>
            <CardDescription>Your currently active tasks and their progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "Website Redesign",
                  progress: 75,
                  budget: "$500",
                  dueDate: "Apr 15, 2025",
                  applicants: 8,
                },
                {
                  id: 2,
                  title: "Mobile App Development",
                  progress: 30,
                  budget: "$1,200",
                  dueDate: "May 20, 2025",
                  applicants: 12,
                },
                {
                  id: 3,
                  title: "Content Writing for Blog",
                  progress: 50,
                  budget: "$200",
                  dueDate: "Apr 10, 2025",
                  applicants: 5,
                },
                {
                  id: 4,
                  title: "Logo Design",
                  progress: 10,
                  budget: "$150",
                  dueDate: "Apr 5, 2025",
                  applicants: 15,
                },
              ].map((task) => (
                <div key={task.id} className="flex items-center">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{task.title}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {task.applicants} applicants
                        </Badge>
                        <Link href={`/tasks/${task.id}`}>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3" />
                        <span>{task.budget}</span>
                        <span className="mx-1">•</span>
                        <Calendar className="h-3 w-3" />
                        <span>Due {task.dueDate}</span>
                      </div>
                      <div>
                        <Progress value={task.progress} className="h-1 w-20" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/tasks/create">
                <Button variant="outline" size="sm">
                  Create New Task
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Recent applications to your tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  name: "Sarah Johnson",
                  task: "Website Redesign",
                  time: "2 hours ago",
                  avatar: "/placeholder.svg?height=40&width=40",
                  initials: "SJ",
                },
                {
                  id: 2,
                  name: "Michael Chen",
                  task: "Mobile App Development",
                  time: "5 hours ago",
                  avatar: "/placeholder.svg?height=40&width=40",
                  initials: "MC",
                },
                {
                  id: 3,
                  name: "Emily Rodriguez",
                  task: "Content Writing for Blog",
                  time: "1 day ago",
                  avatar: "/placeholder.svg?height=40&width=40",
                  initials: "ER",
                },
                {
                  id: 4,
                  name: "David Kim",
                  task: "Logo Design",
                  time: "2 days ago",
                  avatar: "/placeholder.svg?height=40&width=40",
                  initials: "DK",
                },
              ].map((application) => (
                <div key={application.id} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={application.avatar} alt={application.name} />
                    <AvatarFallback>{application.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{application.name}</p>
                    <p className="text-xs text-muted-foreground">Applied to {application.task}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="mr-1 h-3 w-3" />
                      {application.time}
                    </Badge>
                    <Link href={`/applications/${application.id}`}>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/applications">
                <Button variant="outline" size="sm">
                  View All Applications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Task Analytics</CardTitle>
            <CardDescription>Task performance and engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
              <div className="flex flex-col items-center text-muted-foreground">
                <BarChart className="h-10 w-10 mb-2" />
                <p>Task analytics chart would render here</p>
                <p className="text-xs">Showing data for the last 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Recent updates and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "New application received",
                  description: "Sarah Johnson applied to Website Redesign",
                  time: "2 hours ago",
                  icon: Bell,
                },
                {
                  id: 2,
                  title: "Task completed",
                  description: "Logo Design was marked as completed",
                  time: "1 day ago",
                  icon: CheckCircle2,
                },
                {
                  id: 3,
                  title: "Payment processed",
                  description: "$150 payment for Logo Design was processed",
                  time: "1 day ago",
                  icon: DollarSign,
                },
                {
                  id: 4,
                  title: "New review",
                  description: "You received a 5-star review from David Kim",
                  time: "2 days ago",
                  icon: Star,
                },
              ].map((notification) => (
                <div key={notification.id} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <notification.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/notifications">
                <Button variant="outline" size="sm">
                  View All Notifications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

function TaskerDashboard() {
  // In a real app, you would fetch this data from an API
  // Example:
  // const [stats, setStats] = useState(null)
  // const [activeJobs, setActiveJobs] = useState([])
  // const [applications, setApplications] = useState([])
  // const [completedJobs, setCompletedJobs] = useState([])
  //
  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const statsResponse = await fetch('/api/tasker/stats')
  //       const statsData = await statsResponse.json()
  //       setStats(statsData)
  //
  //       const jobsResponse = await fetch('/api/tasker/jobs/active')
  //       const jobsData = await jobsResponse.json()
  //       setActiveJobs(jobsData)
  //
  //       const applicationsResponse = await fetch('/api/tasker/applications')
  //       const applicationsData = await applicationsResponse.json()
  //       setApplications(applicationsData)
  //
  //       const completedResponse = await fetch('/api/tasker/jobs/completed')
  //       const completedData = await completedResponse.json()
  //       setCompletedJobs(completedData)
  //     } catch (error) {
  //       console.error('Failed to fetch dashboard data:', error)
  //     }
  //   }
  //
  //   fetchDashboardData()
  // }, [])

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,845.00</div>
            <p className="text-xs text-muted-foreground">+24% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+6 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-yellow-500 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </span>
              <span className="ml-1">(32 reviews)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="mb-6">
        <TabsList>
          <TabsTrigger value="active">Active Jobs</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="completed">Completed Jobs</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {[
                  {
                    id: 1,
                    title: "E-commerce Website Development",
                    client: "TechCorp Inc.",
                    progress: 65,
                    payment: "$1,200",
                    dueDate: "May 10, 2025",
                    clientAvatar: "/placeholder.svg?height=40&width=40",
                    clientInitials: "TC",
                  },
                  {
                    id: 2,
                    title: "Social Media Marketing Campaign",
                    client: "Fashion Boutique",
                    progress: 40,
                    payment: "$800",
                    dueDate: "Apr 25, 2025",
                    clientAvatar: "/placeholder.svg?height=40&width=40",
                    clientInitials: "FB",
                  },
                  {
                    id: 3,
                    title: "UI/UX Design for Mobile App",
                    client: "StartUp Labs",
                    progress: 85,
                    payment: "$950",
                    dueDate: "Apr 15, 2025",
                    clientAvatar: "/placeholder.svg?height=40&width=40",
                    clientInitials: "SL",
                  },
                ].map((job) => (
                  <div key={job.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={job.clientAvatar} alt={job.client} />
                          <AvatarFallback>{job.clientInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">Client: {job.client}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{job.payment}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Due {job.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Progress:</span>
                          <Progress value={job.progress} className="h-2 w-20" />
                          <span>{job.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end md:self-center">
                      <Link href={`/tasks/${job.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Link href={`/messages/${job.id}`}>
                        <Button size="sm">Message Client</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="applications" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {[
                  {
                    id: 1,
                    title: "WordPress Website Maintenance",
                    client: "Local Business",
                    status: "Pending",
                    payment: "$500",
                    appliedDate: "Apr 1, 2025",
                    clientAvatar: "/placeholder.svg?height=40&width=40",
                    clientInitials: "LB",
                  },
                  {
                    id: 2,
                    title: "Product Photography",
                    client: "Online Store",
                    status: "Under Review",
                    payment: "$350",
                    appliedDate: "Mar 28, 2025",
                    clientAvatar: "/placeholder.svg?height=40&width=40",
                    clientInitials: "OS",
                  },
                  {
                    id: 3,
                    title: "SEO Optimization",
                    client: "Marketing Agency",
                    status: "Interview Scheduled",
                    payment: "$700",
                    appliedDate: "Mar 25, 2025",
                    clientAvatar: "/placeholder.svg?height=40&width=40",
                    clientInitials: "MA",
                  },
                ].map((application) => (
                  <div
                    key={application.id}
                    className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={application.clientAvatar} alt={application.client} />
                          <AvatarFallback>{application.clientInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{application.title}</h3>
                          <p className="text-sm text-muted-foreground">Client: {application.client}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{application.payment}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Applied on {application.appliedDate}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            application.status === "Pending"
                              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              : application.status === "Under Review"
                                ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                : "bg-green-500/10 text-green-500 border-green-500/20"
                          }
                        >
                          {application.status}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Link href={`/tasks/${application.id}`}>
                        <Button variant="outline" size="sm">
                          View Task
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {[
                  {
                    id: 1,
                    title: "Logo Design for Restaurant",
                    client: "Food & Co.",
                    payment: "$250",
                    completedDate: "Mar 20, 2025",
                    rating: 5,
                    clientAvatar: "/placeholder.svg?height=40&width=40",
                    clientInitials: "FC",
                  },
                  {
                    id: 2,
                    title: "Content Writing for Blog",
                    client: "Travel Magazine",
                    payment: "$400",
                    completedDate: "Mar 15, 2025",
                    rating: 5,
                    clientAvatar: "/placeholder.svg?height=40&width=40",
                    clientInitials: "TM",
                  },
                  {
                    id: 3,
                    title: "Video Editing for YouTube",
                    client: "Influencer Inc.",
                    payment: "$600",
                    completedDate: "Mar 10, 2025",
                    rating: 4,
                    clientAvatar: "/placeholder.svg?height=40&width=40",
                    clientInitials: "II",
                  },
                ].map((job) => (
                  <div key={job.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={job.clientAvatar} alt={job.client} />
                          <AvatarFallback>{job.clientInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">Client: {job.client}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{job.payment}</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Completed on {job.completedDate}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500 flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < job.rating ? "fill-current" : ""}`} />
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Link href={`/tasks/${job.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Earnings Overview</CardTitle>
            <CardDescription>Your earnings over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
              <div className="flex flex-col items-center text-muted-foreground">
                <BarChart className="h-10 w-10 mb-2" />
                <p>Earnings chart would render here</p>
                <p className="text-xs">Showing data for the last 6 months</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Tasks</CardTitle>
            <CardDescription>Tasks that match your skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "React Developer Needed",
                  payment: "$800",
                  dueDate: "2 weeks",
                  matchScore: "95%",
                },
                {
                  id: 2,
                  title: "UI/UX Design for Web App",
                  payment: "$600",
                  dueDate: "1 month",
                  matchScore: "90%",
                },
                {
                  id: 3,
                  title: "Content Writing for Tech Blog",
                  payment: "$300",
                  dueDate: "3 weeks",
                  matchScore: "85%",
                },
              ].map((task) => (
                <div key={task.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{task.title}</h3>
                    <Badge className="bg-primary/20 text-primary border-primary/10 text-xs">
                      {task.matchScore} match
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <DollarSign className="h-3 w-3 mr-1" />
                      <span>{task.payment}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Due in {task.dueDate}</span>
                    </div>
                  </div>
                  <Link href={`/tasks/${task.id}`}>
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      View Task
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/tasks">
                <Button variant="outline" size="sm">
                  Browse All Tasks
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}


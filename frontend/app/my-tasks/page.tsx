"use client"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, DollarSign, MessageSquare } from "lucide-react"
import { useAuth } from "@/context/auth-context"

// Mock data for client tasks
const CLIENT_TASKS = {
  active: [
    {
      id: 1,
      title: "Website Redesign",
      progress: 75,
      budget: "$500",
      dueDate: "Apr 15, 2025",
      applicants: 8,
      tasker: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
    },
    {
      id: 2,
      title: "Mobile App Development",
      progress: 30,
      budget: "$1,200",
      dueDate: "May 20, 2025",
      applicants: 12,
      tasker: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MC",
      },
    },
    {
      id: 3,
      title: "Content Writing for Blog",
      progress: 50,
      budget: "$200",
      dueDate: "Apr 10, 2025",
      applicants: 5,
      tasker: null,
    },
  ],
  completed: [
    {
      id: 4,
      title: "Logo Design",
      budget: "$150",
      completedDate: "Mar 15, 2025",
      tasker: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ER",
        rating: 5,
      },
    },
    {
      id: 5,
      title: "Social Media Graphics",
      budget: "$300",
      completedDate: "Feb 28, 2025",
      tasker: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "DK",
        rating: 4,
      },
    },
  ],
  drafts: [
    {
      id: 6,
      title: "Email Newsletter Design",
      budget: "$250",
      lastUpdated: "Apr 1, 2025",
    },
    {
      id: 7,
      title: "Product Photography",
      budget: "$400",
      lastUpdated: "Mar 30, 2025",
    },
  ],
}

// Mock data for tasker tasks
const TASKER_TASKS = {
  active: [
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
  ],
  applications: [
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
  ],
  completed: [
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
  ],
}

export default function MyTasksPage() {
  const { user } = useAuth()
  const userRole = user?.role || "client"

  return (
    <DashboardLayout userRole={userRole}>
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Tasks</h1>
            <p className="text-muted-foreground">
              {userRole === "client"
                ? "Manage your posted tasks and track their progress"
                : "Manage your active jobs and applications"}
            </p>
          </div>
          {userRole === "client" && (
            <Link href="/tasks/create">
              <Button>Create New Task</Button>
            </Link>
          )}
        </div>

        {userRole === "client" ? <ClientTasks /> : <TaskerTasks />}
      </div>
    </DashboardLayout>
  )
}

function ClientTasks() {
  return (
    <Tabs defaultValue="active">
      <TabsList className="mb-6">
        <TabsTrigger value="active">Active Tasks</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="drafts">Drafts</TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        <div className="space-y-6">
          {CLIENT_TASKS.active.length > 0 ? (
            CLIENT_TASKS.active.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">
                          <Link href={`/tasks/${task.id}`} className="hover:text-primary transition-colors">
                            {task.title}
                          </Link>
                        </h3>
                        <Badge variant="outline" className="ml-2">
                          {task.applicants} applicants
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-4">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{task.budget}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Due {task.dueDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-muted-foreground">Progress:</span>
                        <Progress value={task.progress} className="h-2 flex-1" />
                        <span className="text-sm font-medium">{task.progress}%</span>
                      </div>

                      {task.tasker ? (
                        <div className="flex items-center mt-4">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={task.tasker.avatar} alt={task.tasker.name} />
                            <AvatarFallback>{task.tasker.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">Assigned to: {task.tasker.name}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground mt-4">No tasker assigned yet</div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      {task.tasker && (
                        <Link href={`/messages/${task.id}`}>
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </Link>
                      )}
                      <Link href={`/tasks/${task.id}`}>
                        <Button size="sm" className="w-full sm:w-auto">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No active tasks</h3>
              <p className="text-muted-foreground mb-6">You don't have any active tasks at the moment</p>
              <Link href="/tasks/create">
                <Button>Create a Task</Button>
              </Link>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="completed">
        <div className="space-y-6">
          {CLIENT_TASKS.completed.length > 0 ? (
            CLIENT_TASKS.completed.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">
                          <Link href={`/tasks/${task.id}`} className="hover:text-primary transition-colors">
                            {task.title}
                          </Link>
                        </h3>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Completed
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-4">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{task.budget}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Completed on {task.completedDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center mt-4">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={task.tasker.avatar} alt={task.tasker.name} />
                          <AvatarFallback>{task.tasker.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">Completed by: {task.tasker.name}</div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="text-yellow-500 flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill={i < task.tasker.rating ? "currentColor" : "none"}
                                  stroke="currentColor"
                                  className="h-3 w-3"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                  />
                                </svg>
                              ))}
                            </span>
                            <span className="ml-1">{task.tasker.rating}/5</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link href={`/tasks/${task.id}`}>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No completed tasks</h3>
              <p className="text-muted-foreground mb-6">You don't have any completed tasks yet</p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="drafts">
        <div className="space-y-6">
          {CLIENT_TASKS.drafts.length > 0 ? (
            CLIENT_TASKS.drafts.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">
                          <Link href={`/tasks/edit/${task.id}`} className="hover:text-primary transition-colors">
                            {task.title}
                          </Link>
                        </h3>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                          Draft
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-4">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{task.budget}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Last updated on {task.lastUpdated}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link href={`/tasks/edit/${task.id}`}>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          Edit Draft
                        </Button>
                      </Link>
                      <Button size="sm" className="w-full sm:w-auto">
                        Publish
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No draft tasks</h3>
              <p className="text-muted-foreground mb-6">You don't have any tasks saved as drafts</p>
              <Link href="/tasks/create">
                <Button>Create a Task</Button>
              </Link>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}

function TaskerTasks() {
  return (
    <Tabs defaultValue="active">
      <TabsList className="mb-6">
        <TabsTrigger value="active">Active Jobs</TabsTrigger>
        <TabsTrigger value="applications">My Applications</TabsTrigger>
        <TabsTrigger value="completed">Completed Jobs</TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        <div className="space-y-6">
          {TASKER_TASKS.active.length > 0 ? (
            TASKER_TASKS.active.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={job.clientAvatar} alt={job.client} />
                          <AvatarFallback>{job.clientInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">
                            <Link href={`/tasks/${job.id}`} className="hover:text-primary transition-colors">
                              {job.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground">Client: {job.client}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-4">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{job.payment}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Due {job.dueDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-muted-foreground">Progress:</span>
                        <Progress value={job.progress} className="h-2 flex-1" />
                        <span className="text-sm font-medium">{job.progress}%</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link href={`/messages/${job.id}`}>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message Client
                        </Button>
                      </Link>
                      <Link href={`/tasks/${job.id}`}>
                        <Button size="sm" className="w-full sm:w-auto">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No active jobs</h3>
              <p className="text-muted-foreground mb-6">You don't have any active jobs at the moment</p>
              <Link href="/tasks">
                <Button>Browse Tasks</Button>
              </Link>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="applications">
        <div className="space-y-6">
          {TASKER_TASKS.applications.length > 0 ? (
            TASKER_TASKS.applications.map((application) => (
              <Card key={application.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={application.clientAvatar} alt={application.client} />
                          <AvatarFallback>{application.clientInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">
                            <Link href={`/tasks/${application.id}`} className="hover:text-primary transition-colors">
                              {application.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground">Client: {application.client}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-4">
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

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link href={`/tasks/${application.id}`}>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View Task
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No applications</h3>
              <p className="text-muted-foreground mb-6">You haven't applied to any tasks yet</p>
              <Link href="/tasks">
                <Button>Browse Tasks</Button>
              </Link>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="completed">
        <div className="space-y-6">
          {TASKER_TASKS.completed.length > 0 ? (
            TASKER_TASKS.completed.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={job.clientAvatar} alt={job.client} />
                          <AvatarFallback>{job.clientInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">
                            <Link href={`/tasks/${job.id}`} className="hover:text-primary transition-colors">
                              {job.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground">Client: {job.client}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-4">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{job.payment}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Completed on {job.completedDate}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500 flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={i < job.rating ? "currentColor" : "none"}
                                stroke="currentColor"
                                className="h-3 w-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                              </svg>
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link href={`/tasks/${job.id}`}>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No completed jobs</h3>
              <p className="text-muted-foreground mb-6">You don't have any completed jobs yet</p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}


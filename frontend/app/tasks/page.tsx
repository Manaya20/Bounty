"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Slider } from "@/components/ui/slider"
import { Calendar, Clock, DollarSign, MapPin, Search, Tag } from "lucide-react"

// Mock data for tasks
const TASKS = [
  {
    id: 1,
    title: "Website Redesign for E-commerce Store",
    description:
      "Looking for a skilled web designer to redesign our e-commerce website. The project involves updating the UI/UX, improving navigation, and optimizing for mobile devices.",
    budget: "$500 - $1,000",
    deadline: "Apr 30, 2025",
    location: "Remote",
    skills: ["Web Design", "UI/UX", "Responsive Design"],
    client: {
      name: "TechStore Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TS",
      rating: 4.8,
      reviews: 24,
    },
    postedDate: "2 days ago",
  },
  {
    id: 2,
    title: "Mobile App Development for Fitness Tracking",
    description:
      "Need a mobile app developer to create a fitness tracking app for iOS and Android. The app should track workouts, nutrition, and provide personalized recommendations.",
    budget: "$2,000 - $3,500",
    deadline: "Jun 15, 2025",
    location: "Remote",
    skills: ["Mobile Development", "iOS", "Android", "React Native"],
    client: {
      name: "FitLife Co.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "FL",
      rating: 4.9,
      reviews: 37,
    },
    postedDate: "5 days ago",
  },
  {
    id: 3,
    title: "Content Writing for Technology Blog",
    description:
      "Seeking a content writer with knowledge of technology trends to write blog posts for our company blog. Topics include AI, blockchain, and software development.",
    budget: "$200 - $400",
    deadline: "Apr 20, 2025",
    location: "Remote",
    skills: ["Content Writing", "SEO", "Technology"],
    client: {
      name: "TechBlog Media",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TM",
      rating: 4.7,
      reviews: 18,
    },
    postedDate: "1 week ago",
  },
  {
    id: 4,
    title: "Logo Design for New Restaurant",
    description:
      "Looking for a creative graphic designer to create a logo for a new Italian restaurant. The logo should convey a sense of tradition and quality.",
    budget: "$150 - $300",
    deadline: "Apr 15, 2025",
    location: "Remote",
    skills: ["Graphic Design", "Logo Design", "Branding"],
    client: {
      name: "Bella Cucina",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "BC",
      rating: 4.5,
      reviews: 12,
    },
    postedDate: "3 days ago",
  },
  {
    id: 5,
    title: "Social Media Marketing Campaign",
    description:
      "Need a social media marketer to plan and execute a marketing campaign for our new product launch. Experience with Facebook, Instagram, and TikTok ads required.",
    budget: "$800 - $1,500",
    deadline: "May 10, 2025",
    location: "Remote",
    skills: ["Social Media Marketing", "Content Creation", "Advertising"],
    client: {
      name: "Innovate Products",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "IP",
      rating: 4.6,
      reviews: 29,
    },
    postedDate: "4 days ago",
  },
  {
    id: 6,
    title: "Video Editing for YouTube Channel",
    description:
      "Seeking a video editor for our educational YouTube channel. The role involves editing lectures, adding animations, and improving overall video quality.",
    budget: "$300 - $600",
    deadline: "Apr 25, 2025",
    location: "Remote",
    skills: ["Video Editing", "Animation", "Adobe Premiere Pro"],
    client: {
      name: "EduTech Learning",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EL",
      rating: 4.9,
      reviews: 42,
    },
    postedDate: "1 day ago",
  },
]

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [category, setCategory] = useState("all")
  const [location, setLocation] = useState("all")
  const [filteredTasks, setFilteredTasks] = useState(TASKS)

  // Filter tasks based on search and filters
  const handleSearch = () => {
    let results = TASKS

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by price range
    results = results.filter((task) => {
      const minPrice = Number.parseInt(task.budget.split(" - ")[0].replace(/\$|,/g, ""))
      return minPrice >= priceRange[0] && minPrice <= priceRange[1]
    })

    // Filter by category (skills)
    if (category !== "all") {
      results = results.filter((task) => task.skills.some((skill) => skill.toLowerCase() === category.toLowerCase()))
    }

    // Filter by location
    if (location !== "all") {
      results = results.filter((task) => task.location.toLowerCase() === location.toLowerCase())
    }

    setFilteredTasks(results)
  }

  return (
    <DashboardLayout>
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Browse Tasks</h1>
            <p className="text-muted-foreground">Find tasks that match your skills and interests</p>
          </div>
          <Link href="/tasks/create">
            <Button>Create Task</Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-5 mb-8">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-card rounded-lg border p-4">
              <h2 className="font-semibold mb-4">Filters</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Price Range</label>
                  <div className="pt-4 px-2">
                    <Slider
                      defaultValue={[0, 5000]}
                      max={5000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="web design">Web Design</SelectItem>
                      <SelectItem value="mobile development">Mobile Development</SelectItem>
                      <SelectItem value="content writing">Content Writing</SelectItem>
                      <SelectItem value="graphic design">Graphic Design</SelectItem>
                      <SelectItem value="social media marketing">Social Media Marketing</SelectItem>
                      <SelectItem value="video editing">Video Editing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Location</label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">Onsite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSearch} className="w-full">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search tasks by title, description, or skills..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <Card key={task.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              <Link href={`/tasks/${task.id}`} className="hover:text-primary transition-colors">
                                {task.title}
                              </Link>
                            </h3>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Posted {task.postedDate}</span>
                              <span className="mx-2">•</span>
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{task.location}</span>
                              <span className="mx-2">•</span>
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>Due {task.deadline}</span>
                            </div>
                            <div className="flex items-center mb-4">
                              <DollarSign className="h-4 w-4 mr-1 text-primary" />
                              <span className="font-medium">{task.budget}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{task.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {task.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="bg-primary/5">
                                  <Tag className="h-3 w-3 mr-1" />
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={task.client.avatar} alt={task.client.name} />
                              <AvatarFallback>{task.client.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{task.client.name}</div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <span className="text-yellow-500 flex">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill={i < Math.floor(task.client.rating) ? "currentColor" : "none"}
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
                                <span className="ml-1">
                                  {task.client.rating} ({task.client.reviews} reviews)
                                </span>
                              </div>
                            </div>
                          </div>
                          <Link href={`/tasks/${task.id}`}>
                            <Button>View Task</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-card rounded-lg border">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setPriceRange([0, 5000])
                      setCategory("all")
                      setLocation("all")
                      setFilteredTasks(TASKS)
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>

            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


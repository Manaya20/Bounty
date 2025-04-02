"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, PaperclipIcon, Plus, Trash2 } from "lucide-react"

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  budgetMin: z.string().min(1, { message: "Minimum budget is required" }),
  budgetMax: z.string().min(1, { message: "Maximum budget is required" }),
  deadline: z.string().min(1, { message: "Deadline is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  skills: z.array(z.string()).min(1, { message: "At least one skill is required" }),
})

export default function CreateTaskPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      budgetMin: "",
      budgetMax: "",
      deadline: "",
      location: "",
      skills: [],
    },
  })

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()]
      setSkills(updatedSkills)
      form.setValue("skills", updatedSkills)
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove)
    setSkills(updatedSkills)
    form.setValue("skills", updatedSkills)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // This is where you would make an API call to create a task
      // Example:
      // const response = await fetch('/api/tasks', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // });
      // const data = await response.json();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Task created",
        description: "Your task has been created successfully.",
      })

      // Redirect to tasks page
      router.push("/tasks")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating your task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create a New Task</h1>
            <p className="text-muted-foreground">Post a task to find the perfect freelancer for your project</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
              <CardDescription>
                Provide detailed information about your task to attract the right freelancers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Task Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Website Redesign for E-commerce Store" {...field} />
                        </FormControl>
                        <FormDescription>A clear, concise title that describes your task</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Task Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your task in detail, including requirements, deliverables, and any specific instructions..."
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Be as detailed as possible to help freelancers understand your needs
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="budgetMin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Budget ($)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 500" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budgetMax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Budget ($)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 1000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deadline</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>When do you need this task completed by?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="onsite">Onsite</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Where will the work be performed?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={() => (
                      <FormItem>
                        <FormLabel>Required Skills</FormLabel>
                        <div className="flex gap-2 mb-2">
                          <FormControl>
                            <Input
                              placeholder="e.g., Web Design"
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                            />
                          </FormControl>
                          <Button type="button" onClick={addSkill} variant="outline">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {skills.map((skill) => (
                            <div
                              key={skill}
                              className="flex items-center bg-primary/10 text-primary rounded-md px-2 py-1"
                            >
                              <span className="text-sm">{skill}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 ml-1 text-primary hover:text-primary/80"
                                onClick={() => removeSkill(skill)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <FormDescription>Add skills that freelancers need to have for this task</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <label className="text-sm font-medium mb-1 block">Attachments (Optional)</label>
                    <div className="border border-dashed rounded-md p-6 text-center">
                      <PaperclipIcon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                      <Button variant="outline" size="sm">
                        Browse Files
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Max file size: 10MB. Supported formats: PDF, DOC, DOCX, JPG, PNG
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions
                    </label>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Task...
                        </>
                      ) : (
                        "Create Task"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tips for Creating a Great Task</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex gap-2">
                    <div className="bg-primary/10 rounded-full p-1 h-6 w-6 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Be specific</h3>
                      <p className="text-sm text-muted-foreground">
                        Clearly describe what you need done, including any requirements or preferences.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <div className="bg-primary/10 rounded-full p-1 h-6 w-6 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Set a realistic budget</h3>
                      <p className="text-sm text-muted-foreground">
                        Research market rates for similar tasks to set a competitive budget range.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <div className="bg-primary/10 rounded-full p-1 h-6 w-6 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Include all requirements</h3>
                      <p className="text-sm text-muted-foreground">
                        List all skills, qualifications, and experience needed for the task.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <div className="bg-primary/10 rounded-full p-1 h-6 w-6 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium">Set a reasonable deadline</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow enough time for quality work while meeting your project timeline.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <div className="bg-primary/10 rounded-full p-1 h-6 w-6 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      5
                    </div>
                    <div>
                      <h3 className="font-medium">Attach relevant files</h3>
                      <p className="text-sm text-muted-foreground">
                        Include examples, references, or documents that will help freelancers understand your needs.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task Visibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="public" defaultChecked />
                    <div>
                      <label htmlFor="public" className="text-sm font-medium leading-none">
                        Public Task
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">Visible to all freelancers on the platform</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="featured" />
                    <div>
                      <label htmlFor="featured" className="text-sm font-medium leading-none">
                        Featured Task (Premium)
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Highlighted in search results and on the homepage
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="urgent" />
                    <div>
                      <label htmlFor="urgent" className="text-sm font-medium leading-none">
                        Urgent Task (Premium)
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Marked as urgent to attract immediate attention
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


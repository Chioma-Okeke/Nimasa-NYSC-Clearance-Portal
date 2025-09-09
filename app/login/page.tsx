"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import EmployeeService from "@/services/employee-service"

// Role type
type UserRole = "CORPS_MEMBER" | "SUPERVISOR" | "HOD" | "ADMIN"

// Zod schema
const loginFormSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  department: z.string().min(1, "Department is required"),
  role: z.enum(["CORPS_MEMBER", "SUPERVISOR", "HOD", "ADMIN"], {
    required_error: "Role is required",
  }),
  password: z.string().optional(),
}).refine(
  (data) => {
    if (data.role !== "CORPS_MEMBER" && !data.password) return false
    return true
  },
  {
    message: "Password is required for employees",
    path: ["password"],
  }
)

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      name: "",
      department: "",
      role: undefined,
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setIsLoading(true)

    try {
      // Mock login logic
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: values.name,
          department: values.department,
          role: values.role,
          token: "mock-token",
        }),
      )
      const employeeService = new EmployeeService()
      const response = await employeeService.login({
        ...values,
        password: values.password ?? "",
      })
      console.log('Login response:', response);

      // Route based on role
      switch (response.role) {
        case "CORPS_MEMBER":
          router.push("/corps-member")
          break
        case "SUPERVISOR":
          router.push("/supervisor")
          break
        case "HOD":
          router.push("/hod")
          break
        case "ADMIN":
          router.push("/admin")
          break
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to server. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Watch role to conditionally show password
  const role = form.watch("role")

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            NIMASA NYSC Clearance System
          </CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Department */}
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your department" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CORPS_MEMBER">Corps Member</SelectItem>
                        <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
                        <SelectItem value="HOD">Head of Department</SelectItem>
                        <SelectItem value="ADMIN">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password (conditionally visible) */}
              {role && role !== "CORPS_MEMBER" && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

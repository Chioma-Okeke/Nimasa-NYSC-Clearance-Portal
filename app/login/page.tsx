"use client"

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
import EmployeeService from "@/services/employee-service"
import { useMutation } from "@tanstack/react-query"
import { IEmployee } from "@/types"
import { toast } from "sonner"
import { loginFormSchema } from "@/lib/schema"
import Logo from "@/components/shared/logo"
import { useRouter } from "@bprogress/next"
import LoadingSpinner from "@/components/shared/loading-spinner"

export default function LoginPage() {
  const router = useRouter()
  const employeeService = new EmployeeService()

  const { mutate: logUserIn, isPending } = useMutation({
    mutationFn: async (data: IEmployee) => {
      return await employeeService.login(data)
    },
    onSuccess: (response) => {
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
      form.reset()
      toast.success("Login Successful", {
        description: " User successfully logged in."
      })
    },
    onError: (error: any) => {
      toast.error("Login Failed", {
        description: error ? error.message : "There was an error while logging user."
      })
    }
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      name: "",
      department: "",
      role: undefined,
      password: "",
    },
  })
  const role = form.watch("role")

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    const payload: any = {
      name: values.name,
      department: values.department,
      role: values.role,
    }

    if (values.password) {
      payload.password = values.password
    }

    logUserIn(payload)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center flex flex-col items-center">
          <Logo />
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
                disabled={isPending}
              >
                {isPending ? <LoadingSpinner/> : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

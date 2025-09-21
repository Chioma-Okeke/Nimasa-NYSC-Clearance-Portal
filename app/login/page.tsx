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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IEmployee } from "@/types"
import { toast } from "sonner"
import { loginFormSchema } from "@/lib/schema"
import Logo from "@/components/shared/logo"
import { useRouter } from "@bprogress/next"
import LoadingSpinner from "@/components/shared/loading-spinner"
import { getCurrentUserQueryOpt } from "@/lib/query-options/employee"
import { Building2, Eye, EyeClosed, EyeOff, Shield, Users } from "lucide-react"
import { useState } from "react"
import { ROLE_SELECTION, ROLES } from "@/lib/constants"
import { getRoleDisplayName } from "@/lib/utils"

export default function LoginPage() {
  const router = useRouter()
  const employeeService = new EmployeeService()
  const queryClient = useQueryClient()
  const [showPassword, setShowPassword] = useState(false)

  const { mutate: logUserIn, isPending } = useMutation({
    mutationFn: async (data: IEmployee) => {
      return await employeeService.login(data)
    },
    onSuccess: async (response) => {
      if (response.role !== ROLES.CORPER) {
        await queryClient.invalidateQueries(getCurrentUserQueryOpt)
      }
      switch (response.role) {
        case "CORPS_MEMBER":
          localStorage.setItem("corper_details", JSON.stringify(response))
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
    // <div className="min-h-screen bg-background flex items-center justify-center p-4">
    //   <Card className="w-full max-w-md">
    //     <CardHeader className="text-center flex flex-col items-center">
    //       <Logo />
    //       <CardTitle className="text-2xl font-bold text-primary">
    //         NIMASA NYSC Clearance System
    //       </CardTitle>
    //       <CardDescription>Sign in to access your dashboard</CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <Form {...form}>
    //         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    //           {/* Full Name */}
    //           <FormField
    //             control={form.control}
    //             name="name"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Full Name</FormLabel>
    //                 <FormControl>
    //                   <Input placeholder="Enter your full name" {...field} />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />

    //           {/* Department */}
    //           <FormField
    //             control={form.control}
    //             name="department"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Department</FormLabel>
    //                 <FormControl>
    //                   <Input placeholder="Enter your department" {...field} />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />

    //           {/* Role */}
    //           <FormField
    //             control={form.control}
    //             name="role"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Role</FormLabel>
    //                 <Select
    //                   onValueChange={field.onChange}
    //                   defaultValue={field.value}
    //                 >
    //                   <FormControl>
    //                     <SelectTrigger>
    //                       <SelectValue placeholder="Select your role" />
    //                     </SelectTrigger>
    //                   </FormControl>
    //                   <SelectContent>
    //                     <SelectItem value="CORPS_MEMBER">Corps Member</SelectItem>
    //                     <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
    //                     <SelectItem value="HOD">Head of Department</SelectItem>
    //                     <SelectItem value="ADMIN">Administrator</SelectItem>
    //                   </SelectContent>
    //                 </Select>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />

    //           {/* Password (conditionally visible) */}
    //           {role && role !== "CORPS_MEMBER" && (
    //             <FormField
    //               control={form.control}
    //               name="password"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>Password</FormLabel>
    //                   <FormControl >
    //                     <div className="relative">
    //                       <Input
    //                         type={showPassword ? "text" : "password"}
    //                         placeholder="Enter your password"
    //                         {...field}
    //                       />
    //                       <button type="button" className="absolute bottom-1.5 right-3 cursor-pointer hover:scale-125 transition ease-in-out duration-300"
    //                         onClick={() => setShowPassword(prev => !prev)}>
    //                         {
    //                           showPassword ?
    //                             <Eye size={15} /> :
    //                             <EyeClosed size={15} />
    //                         }
    //                       </button>
    //                     </div>
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           )}

    //           <Button
    //             type="submit"
    //             className="w-full bg-primary hover:bg-primary/90"
    //             disabled={isPending}
    //           >
    //             {isPending ? <LoadingSpinner /> : "Sign In"}
    //           </Button>
    //         </form>
    //       </Form>
    //     </CardContent>
    //   </Card>
    // </div>
    <div className="min-h-screen flex items-center justify-center">
      <Card className="border-0 shadow-xl bg-white w-full max-w-md ">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold text-center" style={{ color: '#333333' }}>
            <div className='flex flex-col items-center gap-2'>
              <Logo />
              <p> NYSC Clearance System</p>
            </div>
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Access the clearance management platform
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* {loginResponse && (
                                <Alert className={`mb-6 ${loginResponse.error ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
                                    <AlertDescription className={loginResponse.error ? 'text-red-800' : 'text-green-800'}>
                                        {loginResponse.error || loginResponse.message}
                                    </AlertDescription>
                                </Alert>
                            )} */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ color: '#333333' }} className="font-medium">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm" />
                  </FormItem>
                )}
              />

              {/* Department Field */}
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ color: '#333333' }} className="font-medium">
                      Department
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your department"
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 text-sm" />
                  </FormItem>
                )}
              />

              {/* Role Selection */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ color: '#333333' }} className="font-medium">
                      Role
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLE_SELECTION.map(({ roleName, Icon, value }) => {
                          return (
                            <SelectItem value={value}>
                              <div className="flex items-center space-x-2">
                                <Icon className="size-4" style={{ color: '#0066CC' }} />
                                <span>{roleName}</span>
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-600 text-sm" />
                  </FormItem>
                )}
              />

              {/* Password Field - Conditional */}
              {role && role !== "CORPS_MEMBER" && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: '#333333' }} className="font-medium">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="h-11 pr-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600 text-sm" />
                    </FormItem>
                  )}
                />
              )}

              {/* Role-specific Information */}
              {role && (
                <div className="p-4 rounded-lg bg-[#F5F5F5]">
                  <p className="text-sm text-[#666666]">
                    <strong>Selected Role:</strong> {getRoleDisplayName(role)}
                  </p>
                  {role === "CORPS_MEMBER" && (
                    <p className="text-sm mt-1 text-[#006633]">
                      New corps members will have accounts created automatically upon login.
                    </p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="secondary"
                className="w-full px-3 py-4"
                disabled={isPending}
              >
                {isPending ? <LoadingSpinner /> : "Sign In"}
              </Button>
            </form>
          </Form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Need technical assistance?{' '}
              <Button type="button" variant="link" className="p-0 h-auto text-sm" style={{ color: '#0066CC' }}>
                Contact IT Support
              </Button>
            </p>
            <p className="mt-2 text-xs text-gray-500">
              © 2024 NIMASA - All rights reserved
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

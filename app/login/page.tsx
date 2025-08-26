"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

type UserRole = "CORPS_MEMBER" | "SUPERVISOR" | "HOD" | "ADMIN"

interface LoginForm {
  name: string
  department: string
  role: UserRole | ""
  password: string
}

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({
    name: "",
    department: "",
    role: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.department || !form.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Only require password for employees (not corps members)
    if (form.role !== "CORPS_MEMBER" && !form.password) {
      toast({
        title: "Password Required",
        description: "Password is required for employees.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // const response = await fetch("/api/unified-auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(form),
      // })

      // if (response.ok) {
      //   const data = await response.json()

      // Store user data in localStorage (in production, use secure storage)
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: form.name,
          department: form.department,
          role: form.role,
          token: "mock-token", // Mock token for frontend testing
        }),
      )

      // Route based on role
      switch (form.role) {
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
      // } else {
      //   toast({
      //     title: "Login Failed",
      //     description: "Invalid credentials. Please try again.",
      //     variant: "destructive",
      //   })
      // }
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

  const showPasswordField = form.role && form.role !== "CORPS_MEMBER"

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">NIMASA NYSC Clearance System</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                type="text"
                placeholder="Enter your department"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={form.role} onValueChange={(value: UserRole) => setForm({ ...form, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CORPS_MEMBER">Corps Member</SelectItem>
                  <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
                  <SelectItem value="HOD">Head of Department</SelectItem>
                  <SelectItem value="ADMIN">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {showPasswordField && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  name: string
  department: string
  role: string
  token: string
}

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles: string[]
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("employee")
    console.log("AuthGuard userData:", userData)

    if (!userData) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)

      if (!allowedRoles.includes(parsedUser.role)) {
        router.push("/login")
        return
      }

      setUser(parsedUser)
    } catch (error) {
      router.push("/login")
      return
    } finally {
      setIsLoading(false)
    }
  }, [router, allowedRoles])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // if (!user) {
  //   return null
  // }

  return <>{children}</>
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { IEmployeeCreationResponse } from "@/types"
import NotAuthorized from "./shared/not-authorized"

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
  const [user, setUser] = useState<IEmployeeCreationResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // useEffect(() => {
  //   // const employeeData = localStorage.getItem("employee")

  //   // if (!employeeData) {
  //   //   router.push("/login")
  //   //   toast.warning("Please Log in to Continue", {
  //   //     description: "You need to be logged in to access this page."
  //   //   })
  //   //   return
  //   // }

  //   try {
  //     const parsedUser = JSON.parse(employeeData)
  //     if (!allowedRoles.includes(parsedUser.role)) {
  //       router.push("/login")
  //       toast.error("Access Denied", {
  //         description: " You do not have permission to access this page."
  //       })
  //       return
  //     }
  //     setUser(parsedUser)
  //   } catch (error) {
  //     router.push("/login")
  //     return
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }, [router, allowedRoles])

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-background flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
  //         <p className="text-muted-foreground">Loading...</p>
  //       </div>
  //     </div>
  //   )
  // }

  // if (!user) {
  //   return <NotAuthorized/>
  // }

  return <>{children}</>
}

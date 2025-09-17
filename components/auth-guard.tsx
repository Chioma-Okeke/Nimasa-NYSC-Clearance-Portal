"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import useAuth from "@/providers/use-auth"
import Logo from "./shared/logo"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles: string[]
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const router = useRouter()
  const { isLoggingOut, employee } = useAuth()

  if (isLoggingOut) {
    return (
      <div className="animate-pulse h-screen flex items-center justify-center w-full">
        <Logo />
      </div>
    )
  }

  if (!employee) {
    router.push("/login")
    return null;
  }

  if (!allowedRoles.includes(employee?.role)) {
    router.push("/login")
    toast.error("Access Denied", {
      description: " You do not have permission to access this page."
    })
    return
  }

  return <>{children}</>
}

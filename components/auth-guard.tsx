"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import useAuth from "@/providers/use-auth"
import Logo from "./shared/logo"
import { ALLOWED_ROLES } from "@/lib/constants"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const { isLoggingOut, employee, isLoading } = useAuth()

  if (isLoading || isLoggingOut) {
    return (
      <div className="animate-pulse h-screen flex items-center justify-center w-full">
        <Logo />
      </div>
    )
  }

  if (!employee) {
    router.push("/login")
    console.log("No employee found, redirecting to login.")
    return null;
  }

  if (!ALLOWED_ROLES.includes(employee?.role)) {
    toast.error("Access Denied", {
      description: " You do not have permission to access this page."
    })
    router.push("/login")
    return null
  }

  return <>{children}</>
}

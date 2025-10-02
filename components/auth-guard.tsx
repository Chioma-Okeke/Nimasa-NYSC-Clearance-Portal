"use client"

import type React from "react"

import { toast } from "sonner"
import useAuth from "@/providers/use-auth"
import Logo from "./shared/logo"
import { ALLOWED_ROLES } from "@/lib/constants"
import NotAuthorized from "./shared/not-authorized"
import { useRouter } from "@bprogress/next"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isLoggingOut, employee, isLoading } = useAuth()
  const router = useRouter();


  if (isLoading || isLoggingOut) {
    return (
      <div className="animate-pulse h-screen flex items-center justify-center w-full">
        <Logo />
      </div>
    )
  }

  if (!employee && !isLoading) {
    router.push("/login");
    return null;
  }

  if (!ALLOWED_ROLES.includes(employee?.role ?? "")) {
    toast.error("Access Denied", {
      description: " You do not have permission to access this page."
    })
    return <NotAuthorized />;
  }

  return <>{children}</>
}

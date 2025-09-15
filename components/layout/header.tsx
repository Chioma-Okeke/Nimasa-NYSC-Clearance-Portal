"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import UserProfileCard from "../shared/user-profile-card"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import EmployeeService from "@/services/employee-service"
import { useAuth } from "@/context/auth-context"

interface HeaderProps {
  title: string
  userRole: string
  userName: string
}

export function Header({ title, userRole, userName }: HeaderProps) {
  const router = useRouter()
  const { logout } = useAuth()
  const {
    mutate: logUserOut,
    isPending
  } = useMutation({
    mutationFn: () => new EmployeeService().logout(),
    onSuccess: () => {
      logout()
      toast.success(
        "Logged Out", {
        description: "You have been successfully logged out."
      }
      )
      router.push("/login")
    },
    onError: (error) => {
      toast.error('error', {
        description: error.message ? error.message : "There was an error when trying to log user out"
      })
    },
  })

  const handleLogout = () => {
    logUserOut();
  }

  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3.5 xl:gap-5 flex-1">
            <div className="w-full aspect-[181/201] max-w-[50px] md:max-w-[80px] relative overflow-hidden">
              <Image src={"/company_logo.png"} alt="Logo" fill sizes="100vw" className="object-cover object-center" />
            </div>
            <div>
              <h1 className="xl:text-xl font-bold text-primary">NIMASA NYSC Clearance System</h1>
              <p className="text-sm text-muted-foreground">{title}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <UserProfileCard userName={userName} userRole={userRole} handleLogout={handleLogout} />
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="items-center gap-2 bg-transparent hover:bg-red-500 hidden xl:flex"
            >
              <LogOut className="h-4 w-4" />
              {isPending ? "...logging out" : "Logout"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

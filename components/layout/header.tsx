"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, User, User2 } from "lucide-react"
import UserProfileCard from "../shared/user-profile-card"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import EmployeeService from "@/services/employee-service"
import useAuth from "@/providers/use-auth"
import LoadingSpinner from "../shared/loading-spinner"

interface HeaderProps {
  title: string
  userRole: string
  userName: string | undefined
}

export function Header({ title, userRole, userName }: HeaderProps) {
  const router = useRouter()
  const { logoutUser, isLoggingOut } = useAuth()
  console.log(userName, "name coming in")

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
            { userName ?<UserProfileCard userName={userName} userRole={userRole} handleLogout={logoutUser} /> : <User2/>}
            <Button
              variant="outline"
              size="sm"
              onClick={() => logoutUser()}
              className="items-center gap-2 bg-transparent hover:bg-red-500 hidden xl:flex"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? <LoadingSpinner/> : "Logout"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

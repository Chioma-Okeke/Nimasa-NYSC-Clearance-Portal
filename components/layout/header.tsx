"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import UserProfileCard from "../shared/user-profile-card"

interface HeaderProps {
  title: string
  userRole: string
  userName: string
}

export function Header({ title, userRole, userName }: HeaderProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    localStorage.removeItem("user")
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-primary">NIMASA NYSC Clearance System</h1>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>

          <div className="flex items-center gap-4">
            <UserProfileCard userName={userName} userRole={userRole} handleLogout={handleLogout}/>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="items-center gap-2 bg-transparent hover:bg-red-500 hidden xl:flex"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

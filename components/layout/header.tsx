"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Bell, Download, LogOut, RefreshCw, User, User2 } from "lucide-react"
import UserProfileCard from "../shared/user-profile-card"
import Image from "next/image"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import EmployeeService from "@/services/employee-service"
import useAuth from "@/providers/use-auth"
import LoadingSpinner from "../shared/loading-spinner"
import Logo from "../shared/logo"
import { generateUserInitials } from "@/lib/utils"
import { IEmployeeCreationResponse } from "@/types"
import { ROLE_MAPPING, ROLES } from "@/lib/constants"
import { SidebarTrigger } from "../ui/sidebar"

export function Header({ employee }: { employee: IEmployeeCreationResponse }) {
  const { logoutUser, isLoggingOut } = useAuth()
  const queryClient = useQueryClient()

  const refreshForms = () => {
    queryClient.invalidateQueries({ queryKey: ["corperForms", employee?.name] })
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {employee?.role === ROLES.ADMIN && <SidebarTrigger />}
          <div className="flex items-center space-x-3 flex-1">
            <Logo />
            <div>
              <h1 className="text-xl font-bold text-[#003366]">NIMASA</h1>
              <p className="text-sm text-gray-600">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {employee?.role === ROLES.ADMIN && <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>}
          <Button variant="outline" size="sm" className="hidden">
            <Bell className="w-4 h-4" />
          </Button>
          <div className="hidden lg:block">
            {employee.role === ROLES.CORPER && <Button variant="outline" size="sm" onClick={refreshForms}>
              <RefreshCw className={`w-4 h-4 mr-2`} />
              Refresh
            </Button>}
          </div>
          <div className="items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hidden xl:flex">
            <div className="w-8 h-8 bg-[#172d5c] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">{generateUserInitials(employee?.name ?? "")}</span>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium">{employee?.name}</p>
              <p className="text-xs text-gray-500">{ROLE_MAPPING[employee?.role as keyof typeof ROLE_MAPPING]}</p>
            </div>
          </div>
          <div className="xl:hidden">
            {employee ? <UserProfileCard userName={employee.name} userRole={employee.role} handleLogout={logoutUser} refreshForms={refreshForms} /> : <User2 />}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => logoutUser()}
            className="items-center gap-2 bg-transparent hover:bg-destructive hidden xl:flex"
          >
            <LogOut className="h-4 w-4" />
            {isLoggingOut ? <LoadingSpinner /> : "Logout"}
          </Button>
        </div>
      </div>
    </header>
  )
}

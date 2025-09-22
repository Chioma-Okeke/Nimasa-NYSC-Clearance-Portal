"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "./logo"
import { Button } from "../ui/button"
import { BookAIcon, LayoutDashboard, LogOut, Users2Icon } from "lucide-react"
import useAuth from "@/providers/use-auth"
import LoadingSpinner from "./loading-spinner"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const menus = [
    {
        title: "Dashboard",
        url: "/dashboard/admin-dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Employee Management",
        url: "/dashboard/admin-dashboard/employee-management",
        icon: Users2Icon
    },
    {
        title: "Forms",
        url: "/dashboard/admin-dashboard/forms",
        icon: BookAIcon
    },
]

export function SideNavigation() {
    const { logoutUser, isLoggingOut } = useAuth()
    const path = usePathname()
    return (
        <Sidebar className="py-4">
            <SidebarHeader>
                <div className="flex items-center space-x-3 flex-1">
                    <Logo />
                    <div>
                        <h1 className="text-xl font-bold text-[#003366]">NIMASA</h1>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="pt-3">
                <SidebarMenu>
                    {menus.map((item) => (
                        <SidebarMenuItem key={item.title} className="px-3">
                            <SidebarMenuButton asChild className={cn("px-3 py-5", {
                                "bg-secondary text-white": path === item.url
                            })}>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>

            </SidebarContent>
            <SidebarFooter>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => logoutUser()}
                    className="items-center gap-2 bg-transparent hover:bg-destructive hidden xl:flex"
                >
                    <LogOut className="h-4 w-4" />
                    {isLoggingOut ? <LoadingSpinner /> : "Logout"}
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}
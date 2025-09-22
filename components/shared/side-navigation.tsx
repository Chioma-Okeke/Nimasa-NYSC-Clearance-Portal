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
import { LayoutDashboard, LogOut, Users2Icon } from "lucide-react"
import useAuth from "@/providers/use-auth"
import LoadingSpinner from "./loading-spinner"

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
]

export function SideNavigation() {
    const { logoutUser, isLoggingOut } = useAuth()
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
                            <SidebarMenuButton asChild className="px-3 py-5">
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
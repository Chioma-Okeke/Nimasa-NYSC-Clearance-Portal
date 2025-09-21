import { Header } from "@/components/layout/header"
import { SideNavigation } from "@/components/shared/side-navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import ClientDashboardLayout from "./client-dashboard-layout"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <ClientDashboardLayout>
                {children}
            </ClientDashboardLayout>
        </SidebarProvider>
    )
}
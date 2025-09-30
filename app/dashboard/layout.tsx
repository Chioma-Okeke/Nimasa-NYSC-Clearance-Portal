import { SidebarProvider } from "@/components/ui/sidebar"
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
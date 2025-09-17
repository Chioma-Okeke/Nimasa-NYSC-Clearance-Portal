"use client"

import type React from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/layout/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "@tanstack/react-query"
import { getClearanceFormsQueryOpt, getPendingApprovalFormsQueryOpt } from "@/lib/query-options/clearance"
import AllFormsCard from "@/components/admin/all-forms-card"
import PendingApprovalForms from "@/components/admin/pending-approval-forms"
import EmployeeManagement from "@/components/admin/employee-management"
import useAuth from "@/providers/use-auth"
import Logo from "@/components/shared/logo"

export default function AdminPage() {
  const { employee, isLoggingOut } = useAuth()
  const { data: clearanceForms } = useQuery(getClearanceFormsQueryOpt(employee?.role || ""))
  const { data: pendingClearanceForms, isLoading } = useQuery(getPendingApprovalFormsQueryOpt(employee?.role || ""))

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header title="Administrator Dashboard" userRole="Admin" userName={employee ? employee.name : ""} />

        {isLoggingOut ?
          (
            <div className="animate-pulse h-full flex items-center justify-center w-full">
              <Logo />
            </div>
          ) :
          (<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Tabs defaultValue="pending" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending" className="cursor-pointer">Forms to Approve ({pendingClearanceForms?.length})</TabsTrigger>
                <TabsTrigger value="all" className="cursor-pointer">All Forms ({clearanceForms?.length})</TabsTrigger>
                <TabsTrigger value="manage" className="cursor-pointer">Manage People</TabsTrigger>
              </TabsList>

              {/* Forms to Approve/Reject Section */}
              <TabsContent value="pending">
                <PendingApprovalForms pendingClearanceForms={pendingClearanceForms} isLoading={isLoading} />
              </TabsContent>

              {/* All Forms Section */}
              <TabsContent value="all">
                <AllFormsCard clearanceForms={clearanceForms} />
              </TabsContent>

              {/* Manage People Section */}
              <TabsContent value="manage">
                <EmployeeManagement />
              </TabsContent>
            </Tabs>
          </main>)}
      </div>
    </AuthGuard>
  )
}

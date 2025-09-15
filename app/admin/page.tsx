"use client"

import type React from "react"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle, XCircle, Users, AlertTriangle } from "lucide-react"
import { IReviewResponse } from "@/types"
import AddEmployeeForm from "@/forms/add-employee-form"
import { useAuth } from "@/context/auth-context"
import { useQuery } from "@tanstack/react-query"
import { getClearanceFormsQueryOpt, getPendingApprovalFormsQueryOpt } from "@/lib/query-options/clearance"
import AllFormsCard from "@/components/admin/all-forms-card"
import PendingApprovalForms from "@/components/admin/pending-approval-forms"

export default function AdminPage() {
  const { employee } = useAuth()
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false)
  const { data: clearanceForms } = useQuery(getClearanceFormsQueryOpt(employee?.role || ""))
  const { data: pendingClearanceForms, isLoading } = useQuery(getPendingApprovalFormsQueryOpt(employee?.role || ""))

  const getStatusBadge = (status: IReviewResponse["status"]) => {
    switch (status) {
      case "PENDING_SUPERVISOR":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending Supervisor
          </Badge>
        )
      case "PENDING_HOD":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending HOD
          </Badge>
        )
      case "PENDING_ADMIN":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending Admin
          </Badge>
        )
      case "APPROVED":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "REJECTED":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
    }
  }

  // if (!user) return null

  return (
    <AuthGuard allowedRoles={["ADMIN"]}>
      <div className="min-h-screen bg-background">
        <Header title="Administrator Dashboard" userRole="Admin" userName={employee ? employee.name : ""} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Manage People
                  </CardTitle>
                  <CardDescription>Add supervisors, HODs, and other employees to the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <AddEmployeeForm isAddEmployeeDialogOpen={isAddEmployeeDialogOpen} setIsAddEmployeeDialogOpen={setIsAddEmployeeDialogOpen} />

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-foreground mb-1">Employee Management</h4>
                          <p className="text-sm text-muted-foreground">
                            Use this section to add new supervisors and HODs to the system. They will be able to log in
                            using their credentials and access their respective dashboards.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AuthGuard>
  )
}

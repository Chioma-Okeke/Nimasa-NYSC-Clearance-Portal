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
import EmployeeManagement from "@/components/admin/employee-management"

export default function AdminPage() {
  const { employee } = useAuth()
  const { data: clearanceForms } = useQuery(getClearanceFormsQueryOpt(employee?.role || ""))
  const { data: pendingClearanceForms, isLoading } = useQuery(getPendingApprovalFormsQueryOpt(employee?.role || ""))

  return (
    <AuthGuard allowedRoles={[employee?.role || ""]}>
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
              <EmployeeManagement />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AuthGuard>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import PendingApprovalForms from "@/components/supervisor/pending-approval-forms"
import StatusBadge from "@/components/shared/status-badge"
import { formatDate } from "@/lib/utils"
import ReviewedForms from "@/components/supervisor/reviewed-forms"
import useAuth from "@/providers/use-auth"
import { useQuery } from "@tanstack/react-query"
import { getPendingApprovalFormsQueryOpt } from "@/lib/query-options/clearance"

export default function SupervisorPage() {
  const { employee } = useAuth()
  const { data: pendingForms, isLoading } = useQuery({
    ...getPendingApprovalFormsQueryOpt(employee?.role || "", employee?.id || ""),
    refetchOnMount: "always"
  })

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {employee && <Header employee={employee}/>}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Forms to Review Section */}
            {/* {employee && (
              <div className="space-y-6">
                <PendingApprovalForms pendingForms={pendingForms ?? []} isLoading={isLoading} employee={employee} />
              </div>
            )} */}

            {/* Forms I've Reviewed Section */}
            {employee && <div className="space-y-6">
              <ReviewedForms
                reviewedForms={[]} 
                isLoading={false}
                searchQuery=""
              />
            </div>}
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}

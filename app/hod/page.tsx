"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Clock, CheckCircle, Eye, UserCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import StatusBadge from "@/components/shared/status-badge"
import { formatDate } from "@/lib/utils"
import useAuth from "@/providers/use-auth"
import PendingApprovalForms from "@/components/hod/pending-approval-forms"
import ReviewedForms from "@/components/hod/reviewed-forms"

interface ClearanceForm {
  id: string
  corpsName: string
  stateCode: string
  department: string
  status: "PENDING_SUPERVISOR" | "PENDING_HOD" | "PENDING_ADMIN" | "APPROVED" | "REJECTED"
  createdAt: string
  updatedAt: string
  supervisorName?: string
  daysAbsent?: number
  conductRemark?: string
  supervisorReviewDate?: string
  hodName?: string
  hodRemark?: string
  hodReviewDate?: string
}

interface HODReviewData {
  hodName: string
  hodRemark: string
}

export default function HODPage() {
    const { employee } = useAuth()

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header title="Head of Department Dashboard" userRole="HOD" userName={employee?.name} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Forms to Review Section */}
            {employee && <div className="space-y-6">
              <PendingApprovalForms employee={employee}/>
            </div>}

            {/* Forms I've Reviewed Section */}
            {employee && <div className="space-y-6">
              <ReviewedForms employee={employee}/>
            </div>}
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}

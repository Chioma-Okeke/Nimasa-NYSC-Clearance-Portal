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
}

interface SupervisorReviewData {
  supervisorName: string
  daysAbsent: number
  conductRemark: string
}

export default function SupervisorPage() {
  const [reviewedForms, setReviewedForms] = useState<ClearanceForm[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedForm, setSelectedForm] = useState<ClearanceForm | null>(null)
  const [reviewData, setReviewData] = useState<SupervisorReviewData>({
    supervisorName: "",
    daysAbsent: 0,
    conductRemark: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const { employee } = useAuth()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setReviewData((prev) => ({ ...prev, supervisorName: parsedUser.name }))
      fetchForms(parsedUser)
    }
  }, [])

  const fetchForms = async (userData: any) => {
    setIsLoading(true)
    try {
      // Mock data for frontend testing
      const mockPendingForms: ClearanceForm[] = [
        {
          id: "CF001",
          corpsName: "John Doe",
          stateCode: "LA/23A/1234",
          department: "IT Department",
          status: "PENDING_SUPERVISOR",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]
      setReviewedForms([])
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to fetch forms. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedForm || !reviewData.supervisorName || !reviewData.conductRemark) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Mock form update for frontend testing
      const updatedForm: ClearanceForm = {
        ...selectedForm,
        status: "PENDING_HOD",
        supervisorName: reviewData.supervisorName,
        daysAbsent: reviewData.daysAbsent,
        conductRemark: reviewData.conductRemark,
        supervisorReviewDate: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Remove from pending and add to reviewed
      setReviewedForms((prev) => [updatedForm, ...prev])

      // Reset form and close dialog
      setReviewData({
        supervisorName: employee?.name || "",
        daysAbsent: 0,
        conductRemark: "",
      })
      setSelectedForm(null)
      setIsDialogOpen(false)

      toast({
        title: "Review Submitted",
        description: "Form has been reviewed and sent to HOD for approval.",
      })
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to submit review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const openReviewDialog = (form: ClearanceForm) => {
    setSelectedForm(form)
    setReviewData({
      supervisorName: employee?.name || "",
      daysAbsent: 0,
      conductRemark: "",
    })
    setIsDialogOpen(true)
  }

  // if (!user) return null

  return (
    <AuthGuard allowedRoles={["SUPERVISOR"]}>
      <div className="min-h-screen bg-background">
        <Header title="Supervisor Dashboard" userRole="Supervisor" userName={employee ? employee?.name : ""} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Forms to Review Section */}
            {employee && (
              <div className="space-y-6">
                <PendingApprovalForms employee={employee} />
              </div>
            )}

            {/* Forms I've Reviewed Section */}
            {employee && <div className="space-y-6">
              <ReviewedForms employee={employee} />
            </div>}
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}

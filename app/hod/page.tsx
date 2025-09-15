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
  const [user, setUser] = useState<any | null>(null)
  const [pendingForms, setPendingForms] = useState<ClearanceForm[]>([])
  const [reviewedForms, setReviewedForms] = useState<ClearanceForm[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedForm, setSelectedForm] = useState<ClearanceForm | null>(null)
  const [reviewData, setReviewData] = useState<HODReviewData>({
    hodName: "",
    hodRemark: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("employee")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setReviewData((prev) => ({ ...prev, hodName: parsedUser.name }))
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
          status: "PENDING_HOD",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          supervisorName: "Jane Smith",
          daysAbsent: 2,
          conductRemark: "Good conduct throughout the service year",
          supervisorReviewDate: new Date().toISOString(),
        },
      ]
      setPendingForms(mockPendingForms)
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

    if (!selectedForm || !reviewData.hodName || !reviewData.hodRemark) {
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
        status: "PENDING_ADMIN",
        hodName: reviewData.hodName,
        hodRemark: reviewData.hodRemark,
        hodReviewDate: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Remove from pending and add to reviewed
      setPendingForms((prev) => prev.filter((form) => form.id !== selectedForm.id))
      setReviewedForms((prev) => [updatedForm, ...prev])

      // Reset form and close dialog
      setReviewData({
        hodName: user?.name || "",
        hodRemark: "",
      })
      setSelectedForm(null)
      setIsDialogOpen(false)

      toast({
        title: "Review Submitted",
        description: "Form has been reviewed and sent to Admin for final approval.",
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
      hodName: user?.name || "",
      hodRemark: "",
    })
    setIsDialogOpen(true)
  }

  // if (!user) return null

  return (
    <AuthGuard allowedRoles={["HOD"]}>
      <div className="min-h-screen bg-background">
        <Header title="Head of Department Dashboard" userRole="HOD" userName={user?.name} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Forms to Review Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Forms to Review ({pendingForms.length})
                  </CardTitle>
                  <CardDescription>Review forms that have been approved by supervisors</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading forms...</p>
                    </div>
                  ) : pendingForms.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No forms pending review.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingForms.map((form) => (
                        <div
                          key={form.id}
                          className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-foreground">{form.corpsName}</h3>
                                <StatusBadge status={form.status} />
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Form ID: {form.id} • State Code: {form.stateCode}
                              </p>
                              <p className="text-sm text-muted-foreground">Department: {form.department}</p>
                              <p className="text-sm text-muted-foreground">Submitted: {formatDate(form.createdAt)}</p>

                              {/* Supervisor Review Details */}
                              {form.supervisorName && (
                                <div className="mt-3 p-3 bg-muted/50 rounded-md">
                                  <h4 className="text-sm font-medium text-foreground mb-2">Supervisor Review:</h4>
                                  <p className="text-sm text-muted-foreground">Reviewed by: {form.supervisorName}</p>
                                  {form.daysAbsent !== undefined && (
                                    <p className="text-sm text-muted-foreground">Days Absent: {form.daysAbsent}</p>
                                  )}
                                  {form.conductRemark && (
                                    <p className="text-sm text-muted-foreground">
                                      Conduct: {form.conductRemark.substring(0, 80)}
                                      {form.conductRemark.length > 80 ? "..." : ""}
                                    </p>
                                  )}
                                  {form.supervisorReviewDate && (
                                    <p className="text-sm text-muted-foreground">
                                      Review Date: {formatDate(form.supervisorReviewDate)}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    className="bg-primary hover:bg-primary/90"
                                    onClick={() => openReviewDialog(form)}
                                  >
                                    <UserCheck className="h-4 w-4 mr-1" />
                                    Review
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>HOD Review</DialogTitle>
                                    <DialogDescription>
                                      Provide your review for {selectedForm?.corpsName}'s clearance form
                                    </DialogDescription>
                                  </DialogHeader>
                                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="hodName">HOD Name</Label>
                                      <Input
                                        id="hodName"
                                        type="text"
                                        value={reviewData.hodName}
                                        onChange={(e) => setReviewData({ ...reviewData, hodName: e.target.value })}
                                        required
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="hodRemark">HOD Remark</Label>
                                      <Textarea
                                        id="hodRemark"
                                        placeholder="Enter your remarks and recommendations..."
                                        value={reviewData.hodRemark}
                                        onChange={(e) => setReviewData({ ...reviewData, hodRemark: e.target.value })}
                                        rows={4}
                                        required
                                      />
                                    </div>

                                    <div className="flex gap-2 pt-4">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsDialogOpen(false)}
                                        className="flex-1"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        type="submit"
                                        className="flex-1 bg-primary hover:bg-primary/90"
                                        disabled={isSubmitting}
                                      >
                                        {isSubmitting ? "Submitting..." : "Submit Review"}
                                      </Button>
                                    </div>
                                  </form>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Forms I've Reviewed Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Forms I've Reviewed ({reviewedForms.length})
                  </CardTitle>
                  <CardDescription>Track forms you have already reviewed</CardDescription>
                </CardHeader>
                <CardContent>
                  {reviewedForms.length === 0 ? (
                    <div className="text-center py-8">
                      <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No forms reviewed yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reviewedForms.map((form) => (
                        <div
                          key={form.id}
                          className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-foreground">{form.corpsName}</h3>
                              <StatusBadge status={form.status} />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Form ID: {form.id} • State Code: {form.stateCode}
                            </p>
                            <p className="text-sm text-muted-foreground">Department: {form.department}</p>
                            {form.hodReviewDate && (
                              <p className="text-sm text-muted-foreground">
                                Reviewed: {formatDate(form.hodReviewDate)}
                              </p>
                            )}
                            {form.hodRemark && (
                              <p className="text-sm text-muted-foreground">
                                My Remark: {form.hodRemark.substring(0, 100)}
                                {form.hodRemark.length > 100 ? "..." : ""}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}

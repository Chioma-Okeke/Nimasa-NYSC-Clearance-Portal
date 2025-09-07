"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Clock, CheckCircle, XCircle, Trash2, UserPlus, Users, Shield, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import EmployeeService from "@/services/employee-service"

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

interface NewEmployeeData {
  name: string
  department: string
  role: "SUPERVISOR" | "HOD"
  password: string
}

export default function AdminPage() {
  const [user, setUser] = useState<any | null>(null)
  const [pendingForms, setPendingForms] = useState<ClearanceForm[]>([])
  const [allForms, setAllForms] = useState<ClearanceForm[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newEmployee, setNewEmployee] = useState<NewEmployeeData>({
    name: "",
    department: "",
    role: "SUPERVISOR",
    password: "",
  })
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
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
          status: "PENDING_ADMIN",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          supervisorName: "Jane Smith",
          daysAbsent: 2,
          conductRemark: "Good conduct throughout the service year",
          supervisorReviewDate: new Date().toISOString(),
          hodName: "Dr. Johnson",
          hodRemark: "Excellent performance and dedication",
          hodReviewDate: new Date().toISOString(),
        },
      ]
      setPendingForms(mockPendingForms)

      const mockAllForms: ClearanceForm[] = [
        ...mockPendingForms,
        {
          id: "CF002",
          corpsName: "Jane Smith",
          stateCode: "LA/23A/5678",
          department: "HR Department",
          status: "APPROVED",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]
      setAllForms(mockAllForms)
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

  const handleApproveForm = async (formId: string) => {
    setIsSubmitting(true)
    try {
      // Mock approval for frontend testing
      setPendingForms((prev) => prev.filter((form) => form.id !== formId))
      setAllForms((prev) => prev.map((form) => (form.id === formId ? { ...form, status: "APPROVED" as const } : form)))

      toast({
        title: "Form Approved",
        description: "The clearance form has been approved successfully.",
      })
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to approve form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRejectForm = async (formId: string) => {
    setIsSubmitting(true)
    try {
      // Mock rejection for frontend testing
      setPendingForms((prev) => prev.filter((form) => form.id !== formId))
      setAllForms((prev) => prev.map((form) => (form.id === formId ? { ...form, status: "REJECTED" as const } : form)))

      toast({
        title: "Form Rejected",
        description: "The clearance form has been rejected.",
      })
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to reject form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteForm = async (formId: string) => {
    if (!confirm("Are you sure you want to delete this form? This action cannot be undone.")) {
      return
    }

    try {
      // Mock deletion for frontend testing
      setAllForms((prev) => prev.filter((form) => form.id !== formId))
      setPendingForms((prev) => prev.filter((form) => form.id !== formId))

      toast({
        title: "Form Deleted",
        description: "The clearance form has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to delete form. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newEmployee.name || !newEmployee.department || !newEmployee.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const employeeService = await new EmployeeService()
      await employeeService.addEmployee(newEmployee)
      // Mock employee addition for frontend testing
      setNewEmployee({
        name: "",
        department: "",
        role: "SUPERVISOR",
        password: "",
      })
      setIsAddEmployeeDialogOpen(false)

      toast({
        title: "Employee Added",
        description: `${newEmployee.role} has been added successfully.`,
      })
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to add employee. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status: ClearanceForm["status"]) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (!user) return null

  return (
    <AuthGuard allowedRoles={["ADMIN"]}>
      <div className="min-h-screen bg-background">
        <Header title="Administrator Dashboard" userRole="Admin" userName={user.name} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Forms to Approve ({pendingForms.length})</TabsTrigger>
              <TabsTrigger value="all">All Forms ({allForms.length})</TabsTrigger>
              <TabsTrigger value="manage">Manage People</TabsTrigger>
            </TabsList>

            {/* Forms to Approve/Reject Section */}
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Forms Awaiting Final Approval
                  </CardTitle>
                  <CardDescription>Review and make final decisions on clearance forms</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading forms...</p>
                    </div>
                  ) : pendingForms.length === 0 ? (
                    <div className="text-center py-8">
                      <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No forms pending final approval.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingForms.map((form) => (
                        <div
                          key={form.id}
                          className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="space-y-3 flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-foreground">{form.corpsName}</h3>
                                {getStatusBadge(form.status)}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Form ID: {form.id} • State Code: {form.stateCode}
                              </p>
                              <p className="text-sm text-muted-foreground">Department: {form.department}</p>
                              <p className="text-sm text-muted-foreground">Submitted: {formatDate(form.createdAt)}</p>

                              {/* Complete Review Chain */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {/* Supervisor Review */}
                                {form.supervisorName && (
                                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-md">
                                    <h4 className="text-sm font-medium text-orange-800 mb-2">Supervisor Review:</h4>
                                    <p className="text-sm text-orange-700">Reviewed by: {form.supervisorName}</p>
                                    {form.daysAbsent !== undefined && (
                                      <p className="text-sm text-orange-700">Days Absent: {form.daysAbsent}</p>
                                    )}
                                    {form.conductRemark && (
                                      <p className="text-sm text-orange-700">
                                        Conduct: {form.conductRemark.substring(0, 60)}
                                        {form.conductRemark.length > 60 ? "..." : ""}
                                      </p>
                                    )}
                                  </div>
                                )}

                                {/* HOD Review */}
                                {form.hodName && (
                                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                                    <h4 className="text-sm font-medium text-blue-800 mb-2">HOD Review:</h4>
                                    <p className="text-sm text-blue-700">Reviewed by: {form.hodName}</p>
                                    {form.hodRemark && (
                                      <p className="text-sm text-blue-700">
                                        Remark: {form.hodRemark.substring(0, 60)}
                                        {form.hodRemark.length > 60 ? "..." : ""}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleApproveForm(form.id)}
                                disabled={isSubmitting}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectForm(form.id)}
                                disabled={isSubmitting}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* All Forms Section */}
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    All Clearance Forms
                  </CardTitle>
                  <CardDescription>Complete overview of all forms in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  {allForms.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No forms in the system.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {allForms.map((form) => (
                        <div
                          key={form.id}
                          className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-foreground">{form.corpsName}</h3>
                                {getStatusBadge(form.status)}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Form ID: {form.id} • State Code: {form.stateCode}
                              </p>
                              <p className="text-sm text-muted-foreground">Department: {form.department}</p>
                              <p className="text-sm text-muted-foreground">
                                Submitted: {formatDate(form.createdAt)} • Updated: {formatDate(form.updatedAt)}
                              </p>
                            </div>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteForm(form.id)}>
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
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
                    <Dialog open={isAddEmployeeDialogOpen} onOpenChange={setIsAddEmployeeDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Add Employee
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add New Employee</DialogTitle>
                          <DialogDescription>Add a new supervisor or HOD to the system</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddEmployee} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="employeeName">Full Name</Label>
                            <Input
                              id="employeeName"
                              type="text"
                              placeholder="Enter full name"
                              value={newEmployee.name}
                              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="employeeDepartment">Department</Label>
                            <Input
                              id="employeeDepartment"
                              type="text"
                              placeholder="Enter department"
                              value={newEmployee.department}
                              onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="employeeRole">Role</Label>
                            <Select
                              value={newEmployee.role}
                              onValueChange={(value: "SUPERVISOR" | "HOD") =>
                                setNewEmployee({ ...newEmployee, role: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                                <SelectItem value="HOD">Head of Department</SelectItem>
                                <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="employeePassword">Password</Label>
                            <Input
                              id="employeePassword"
                              type="password"
                              placeholder="Enter password"
                              value={newEmployee.password}
                              onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                              required
                            />
                          </div>

                          <div className="flex gap-2 pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsAddEmployeeDialogOpen(false)}
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              className="flex-1 bg-primary hover:bg-primary/90"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Adding..." : "Add Employee"}
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>

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

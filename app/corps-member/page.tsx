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
import { Search, Plus, FileText, Clock, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import ClearanceForm from "@/forms/clearance-form"

interface User {
  name: string
  department: string
  role: string
  token: string
}

interface ClearanceForm {
  id: string
  corpsName: string
  stateCode: string
  department: string
  status: "PENDING_SUPERVISOR" | "PENDING_HOD" | "PENDING_ADMIN" | "APPROVED" | "REJECTED"
  createdAt: string
  updatedAt: string
}

interface NewFormData {
  corpsName: string
  stateCode: string
  department: string
}

export default function CorpsMemberPage() {
  const [user, setUser] = useState<User | null>(null)
  const [forms, setForms] = useState<ClearanceForm[]>([])
  const [filteredForms, setFilteredForms] = useState<ClearanceForm[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newForm, setNewForm] = useState<NewFormData>({
    corpsName: "",
    stateCode: "",
    department: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setNewForm((prev) => ({ ...prev, department: parsedUser.department }))
      fetchForms(parsedUser)
    }
  }, [])

  useEffect(() => {
    // Filter forms based on search query
    if (searchQuery.trim() === "") {
      setFilteredForms(forms)
    } else {
      const filtered = forms.filter(
        (form) =>
          form.corpsName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          form.stateCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          form.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredForms(filtered)
    }
  }, [searchQuery, forms])

  const fetchForms = async (userData: User) => {
    setIsLoading(true)
    try {
      // Mock data for frontend testing
      const mockForms: ClearanceForm[] = [
        {
          id: "CF001",
          corpsName: "John Doe",
          stateCode: "LA/23A/1234",
          department: "IT Department",
          status: "PENDING_SUPERVISOR",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "CF002",
          corpsName: "Jane Smith",
          stateCode: "LA/23A/5678",
          department: "IT Department",
          status: "APPROVED",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]
      setForms(mockForms)
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

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newForm.corpsName || !newForm.stateCode || !newForm.department) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Mock form creation for frontend testing
      const createdForm: ClearanceForm = {
        id: `CF${Date.now()}`,
        ...newForm,
        status: "PENDING_SUPERVISOR",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setForms((prev) => [createdForm, ...prev])

      setNewForm({
        corpsName: "",
        stateCode: "",
        department: user?.department || "",
      })
      toast({
        title: "Form Submitted",
        description: "Your clearance form has been submitted successfully.",
      })
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to submit form. Please try again.",
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
    <AuthGuard allowedRoles={["CORPS_MEMBER"]}>
      <div className="min-h-screen bg-background">
        <Header title="Corps Member Dashboard" userRole="Corps Member" userName={user.name} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create New Form Section */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" />
                    Create New Form
                  </CardTitle>
                  <CardDescription>Submit a new clearance form for processing</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <form onSubmit={handleSubmitForm} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="corpsName">Corps Member Name</Label>
                      <Input
                        id="corpsName"
                        type="text"
                        placeholder="Enter full name"
                        value={newForm.corpsName}
                        onChange={(e) => setNewForm({ ...newForm, corpsName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stateCode">State Code</Label>
                      <Input
                        id="stateCode"
                        type="text"
                        placeholder="e.g., LA/23A/1234"
                        value={newForm.stateCode}
                        onChange={(e) => setNewForm({ ...newForm, stateCode: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        type="text"
                        value={newForm.department}
                        onChange={(e) => setNewForm({ ...newForm, department: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Form"}
                    </Button>
                  </form> */}
                  <ClearanceForm/>
                </CardContent>
              </Card>
            </div>

            {/* Forms List and Search Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    Search Forms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search by name, state code, or form ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* My Forms List Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    My Forms ({filteredForms.length})
                  </CardTitle>
                  <CardDescription>Track the status of your submitted clearance forms</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading your forms...</p>
                    </div>
                  ) : filteredForms.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {searchQuery ? "No forms match your search." : "No forms submitted yet."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredForms.map((form) => (
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
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Submitted: {formatDate(form.createdAt)}</p>
                              <p className="text-sm text-muted-foreground">Updated: {formatDate(form.updatedAt)}</p>
                            </div>
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

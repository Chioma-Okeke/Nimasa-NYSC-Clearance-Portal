"use client"

import type React from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import ClearanceForm from "@/forms/clearance-form"
import CorperFormList from "@/components/corper/corper-form-list"
import useAuth from "@/providers/use-auth"

export default function CorpsMemberPage() {
  const {employee} = useAuth()

  return (
    <AuthGuard allowedRoles={[employee?.role || ""]}>
      <div className="min-h-screen bg-background">
        <Header title="Corps Member Dashboard" userRole="Corps Member" userName={employee?.name} />

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
                  {employee && <ClearanceForm employee={employee} />}
                </CardContent>
              </Card>
            </div>

            {/* Forms List and Search Section */}
            {employee && <CorperFormList employee={employee}/>}
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}

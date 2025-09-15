import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { AlertTriangle, Users } from 'lucide-react'
import AddEmployeeForm from '@/forms/add-employee-form'

function EmployeeManagement() {
    return (
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
                    <AddEmployeeForm />

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
    )
}

export default EmployeeManagement
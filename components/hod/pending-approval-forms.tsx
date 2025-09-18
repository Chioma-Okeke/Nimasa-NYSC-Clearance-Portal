import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getPendingApprovalFormsQueryOpt } from '@/lib/query-options/clearance'
import StatusBadge from '../shared/status-badge'
import { formatDate } from '@/lib/utils'
import { IEmployeeCreationResponse } from '@/types'
import ReviewForm from './review-form'

function PendingApprovalForms({ employee }: { employee: IEmployeeCreationResponse }) {
    const { data: pendingForms, isLoading } = useQuery({
        ...getPendingApprovalFormsQueryOpt(employee.role || "", employee.id || 0),
        refetchOnMount: "always"
    })
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Forms to Review ({pendingForms?.length})
                </CardTitle>
                <CardDescription>Review forms that have been approved by supervisors</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading forms...</p>
                    </div>
                ) : pendingForms?.length === 0 ? (
                    <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No forms pending review.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {pendingForms?.map((form) => (
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
                                                {form.dayAbsent !== undefined && (
                                                    <p className="text-sm text-muted-foreground">Days Absent: {form.dayAbsent}</p>
                                                )}
                                                {form.conductRemark && (
                                                    <p className="text-sm text-muted-foreground">
                                                        Conduct: {form.conductRemark.substring(0, 80)}
                                                        {form.conductRemark.length > 80 ? "..." : ""}
                                                    </p>
                                                )}
                                                {form.supervisorDate && (
                                                    <p className="text-sm text-muted-foreground">
                                                        Review Date: {formatDate(form.supervisorDate)}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <ReviewForm selectedForm={form} employee={employee}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default PendingApprovalForms
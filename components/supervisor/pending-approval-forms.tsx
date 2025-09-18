import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { FileText } from 'lucide-react'
import ReviewForm from './review-form'
import { IClearanceFormResponse, IEmployeeCreationResponse } from '@/types'
import { formatDate } from '@/lib/utils'
import StatusBadge from '../shared/status-badge'

type PendingApprovalFormsProps = {
    employee: IEmployeeCreationResponse
    pendingForms: IClearanceFormResponse[]
    isLoading: boolean
}

function PendingApprovalForms({employee, pendingForms, isLoading}: PendingApprovalFormsProps) {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Forms to Review ({pendingForms?.length})
                </CardTitle>
                <CardDescription>Review and approve corps member clearance forms</CardDescription>
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
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium text-foreground">{form.corpsName}</h3>
                                            <StatusBadge status={form.status} />
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Form ID: {form.id} • State Code: {form.stateCode}
                                        </p>
                                        <p className="text-sm text-muted-foreground">Department: {form.department}</p>
                                        <p className="text-sm text-muted-foreground">Submitted: {formatDate(form.createdAt)}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <ReviewForm employee={employee} selectedForm={form}/>
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
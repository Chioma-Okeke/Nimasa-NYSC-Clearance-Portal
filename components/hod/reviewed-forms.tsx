import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Eye } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getClearanceFormsByStatusQueryOpt } from '@/lib/query-options/clearance'
import { FORM_STATUSES } from '@/lib/constants'
import { IEmployeeCreationResponse } from '@/types'
import StatusBadge from '../shared/status-badge'
import { formatDate } from '@/lib/utils'


function ReviewedForms({employee}: {employee: IEmployeeCreationResponse}) {
    const { data: reviewedForms = [], isLoading } = useQuery(getClearanceFormsByStatusQueryOpt(employee?.role || "", FORM_STATUSES.PENDING_ADMIN))
    return (

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
                                    {form.hodDate && (
                                        <p className="text-sm text-muted-foreground">
                                            Reviewed: {formatDate(form.hodDate)}
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
    )
}

export default ReviewedForms
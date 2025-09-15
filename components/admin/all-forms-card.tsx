import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { CheckCircle, Clock, FileText, XCircle } from 'lucide-react'
import { IClearanceFormResponse, IReviewResponse } from '@/types'
import { Badge } from '../ui/badge'
import DeleteClearanceForm from '../dialogs/delete-clearance-form'

function AllFormsCard({ clearanceForms }: { clearanceForms: IClearanceFormResponse[] | undefined}) {

    const getStatusBadge = (status: IReviewResponse["status"]) => {
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

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    All Clearance Forms
                </CardTitle>
                <CardDescription>Complete overview of all forms in the system</CardDescription>
            </CardHeader>
            <CardContent>
                {clearanceForms?.length === 0 ? (
                    <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No forms in the system.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {clearanceForms?.map((form) => (
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
                                    <DeleteClearanceForm form={form} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default AllFormsCard
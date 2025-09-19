import { AlertCircle, CheckCircle, Shield, XCircle } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { IClearanceFormResponse, IEmployeeCreationResponse } from '@/types'
import { formatDate } from '@/lib/utils'
import StatusBadge from '../shared/status-badge'
import CloseOutForm from './close-out-form'

function PendingApprovalForms({ pendingClearanceForms, isLoading, employee }: { pendingClearanceForms: IClearanceFormResponse[] | undefined, isLoading: boolean, employee: IEmployeeCreationResponse | undefined }) {

    return (
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
                ) : pendingClearanceForms?.length === 0 ? (
                    <div className="text-center py-8">
                        <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No forms pending final approval.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {pendingClearanceForms?.map((form) => (
                            <div
                                key={form.id}
                                className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    <div className="space-y-3 flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium text-foreground">{form.corpsName}</h3>
                                            <StatusBadge status={form.status} />
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
                                                    {form.dayAbsent !== undefined && (
                                                        <p className="text-sm text-orange-700">Days Absent: {form.dayAbsent}</p>
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

                                    {employee && <div className="flex gap-2">
                                        <CloseOutForm name='Approve' Icon={CheckCircle} employee={employee} form={form} />
                                        <CloseOutForm name='Reject' Icon={XCircle} employee={employee} form={form} />
                                    </div>}
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
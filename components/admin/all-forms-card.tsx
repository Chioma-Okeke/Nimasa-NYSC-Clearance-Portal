import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { FileText } from 'lucide-react'
import { IClearanceFormResponse } from '@/types'
import DeleteClearanceForm from '../dialogs/delete-clearance-form'
import StatusBadge from '../shared/status-badge'
import { formatDate } from '@/lib/utils'

function AllFormsCard({ clearanceForms }: { clearanceForms: IClearanceFormResponse[] | undefined}) {

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
                                            <StatusBadge status={form.status}/>
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
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { AlertCircle, CheckCircle, Clock, FileText, XCircle } from 'lucide-react'
import { IClearanceFormResponse } from '@/types'
import DeleteClearanceForm from '../dialogs/delete-clearance-form'
import StatusBadge from '../shared/status-badge'
import { formatDate } from '@/lib/utils'
import LoadingSpinner from '../shared/loading-spinner'
import FromDetailsModal from '../supervisor/form-details-modal'

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'APPROVED': return <CheckCircle className="w-5 h-5 text-green-600" />;
        case 'REJECTED': return <XCircle className="w-5 h-5 text-red-600" />;
        case 'PENDING_SUPERVISOR':
        case 'PENDING_HOD':
        case 'PENDING_ADMIN': return <Clock className="w-5 h-5 text-orange-500" />;
        default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
};

function AllFormsCard({ isLoading, searchQuery, clearanceForms }: { isLoading: boolean, searchQuery: string, clearanceForms: IClearanceFormResponse[] | undefined }) {

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
                {isLoading ? <LoadingSpinner /> : clearanceForms?.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No reviewed forms</h3>
                        <p className="text-gray-600">
                            {searchQuery
                                ? 'No reviewed forms match your search criteria'
                                : 'You haven\'t reviewed any forms yet'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {clearanceForms?.map((formItem) => (
                            <div key={formItem.id} className="border-2 border-input rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            {getStatusIcon(formItem.status)}
                                            <div>
                                                <h3 className="font-medium text-gray-900">{formItem.corpsName}</h3>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                                            <div>
                                                <span className="text-gray-500">Status:</span>
                                                <div className="mt-1"><StatusBadge status={formItem.status} /></div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Days Absent:</span>
                                                <p className={`font-medium ${formItem.dayAbsent === 0 ? 'text-green-600' : formItem.dayAbsent <= 2 ? 'text-orange-600' : 'text-red-600'}`}>
                                                    {formItem.dayAbsent}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Department:</span>
                                                <p className="font-medium">{formItem.department}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">State Code:</span>
                                                <p className="font-medium">{formItem.stateCode}</p>
                                            </div>
                                        </div>

                                        {formItem.hodRemark && (
                                            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                                <span className="text-xs font-medium text-gray-700">Your Remark:</span>
                                                <p className="text-sm text-gray-900 mt-1">{formItem.hodRemark}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className='flex gap-3'>
                                        <FromDetailsModal selectedForm={formItem} />
                                        <DeleteClearanceForm form={formItem} />
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

export default AllFormsCard
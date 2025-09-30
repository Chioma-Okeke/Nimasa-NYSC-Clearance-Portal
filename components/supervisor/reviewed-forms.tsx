import React from 'react'
import type { IClearanceFormResponse } from '@/types'

import StatusIcon from '../shared/status-icon'
import StatusBadge from '../shared/status-badge'
import FromDetailsModal from './form-details-modal'
import { CheckCircle, FileText } from "lucide-react"
import LoadingSpinner from '../shared/loading-spinner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


function ReviewedForms({ reviewedForms, isLoading, searchQuery }: { reviewedForms: IClearanceFormResponse[], isLoading: boolean, searchQuery: string }) {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Forms You've Reviewed</span>
                </CardTitle>
                <CardDescription>
                    Track the progress of forms you've already reviewed
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? <LoadingSpinner /> : reviewedForms.length === 0 ? (
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
                        {reviewedForms.map((formItem) => (
                            <div key={formItem.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex flex-col lg:flex-row items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <StatusIcon status={formItem.status} />
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

                                        {formItem.conductRemark && (
                                            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                                <span className="text-xs font-medium text-gray-700">Your Remark:</span>
                                                <p className="text-sm text-gray-900 mt-1">{formItem.conductRemark}</p>
                                            </div>
                                        )}
                                    </div>

                                    <FromDetailsModal selectedForm={formItem} />
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
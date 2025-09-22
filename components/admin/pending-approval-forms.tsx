import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import type { IClearanceFormResponse } from '@/types'
import LoadingSpinner from '../shared/loading-spinner'
import useAuth from '@/providers/use-auth'
import CloseOutForm from '../admin/close-out-form'

type PendingApprovalFormsProps = {
    pendingForms: IClearanceFormResponse[]
    isLoading: boolean
    searchQuery: string
}

function PendingApprovalForms({ pendingForms, isLoading, searchQuery }: PendingApprovalFormsProps) {
    const { employee } = useAuth()
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span>Forms Requiring Your Review</span>
                </CardTitle>
                <CardDescription>
                    Forms that have been reviewed by supervisors.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? <LoadingSpinner /> : pendingForms.length === 0 ? (
                    <div className="text-center py-12">
                        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                        <p className="text-gray-600">
                            {searchQuery
                                ? 'No pending forms match your search criteria'
                                : 'No forms are currently pending your review'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {pendingForms.map((formItem) => (
                            <div key={formItem.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-orange-50 border-orange-200">
                                <div className="flex flex-col lg:flex-row items-start justify-between">
                                    <div className="flex-1 ">
                                        <div className="flex  items-center space-x-3 mb-2">
                                            <Clock className="w-5 h-5 text-orange-500" />
                                            <div>
                                                <h3 className="font-medium text-gray-900">{formItem.corpsName}</h3>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                                            <div>
                                                <span className="text-gray-500">State Code:</span>
                                                <p className="font-medium">{formItem.stateCode}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Submitted:</span>
                                                <p className="font-medium">{formItem.createdAt}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {employee && <div className="flex gap-2">
                                        <CloseOutForm name='Approve' Icon={CheckCircle} employee={employee} form={formItem} />
                                        <CloseOutForm name='Reject' Icon={XCircle} employee={employee} form={formItem} />
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
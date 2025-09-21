import StatusBadge from '@/components/shared/status-badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { IClearanceFormResponse } from '@/types'
import { Briefcase, CheckCircle, Eye, UserCheck } from 'lucide-react'
import React, { useState } from 'react'

function FromDetailsModal({ selectedForm }: { selectedForm: IClearanceFormResponse }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Form Details - {selectedForm?.corpsName}</DialogTitle>
                    <DialogDescription>
                        Complete form information and review details
                    </DialogDescription>
                </DialogHeader>

                {selectedForm && (
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Form ID</label>
                                <p className="text-sm font-mono text-gray-900">{selectedForm.id}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Status</label>
                                <div className="mt-1"><StatusBadge status={selectedForm.status} /></div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Corps Member</label>
                                <p className="text-sm text-gray-900">{selectedForm.corpsName}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">State Code</label>
                                <p className="text-sm text-gray-900">{selectedForm.stateCode}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Department</label>
                                <p className="text-sm text-gray-900">{selectedForm.department}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Created Date</label>
                                <p className="text-sm text-gray-900">{selectedForm.createdAt}</p>
                            </div>
                        </div>

                        {/* Supervisor Review Section (if reviewed) */}
                        {selectedForm.supervisorName && (
                            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                                <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                                    <UserCheck className="w-4 h-4 mr-2" />
                                    Supervisor Review
                                </h4>
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <label className="text-sm font-medium text-blue-700">Supervisor</label>
                                        <p className="text-sm text-blue-900">{selectedForm.supervisorName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-blue-700">Days Absent</label>
                                        <p className="text-sm text-blue-900">{selectedForm.dayAbsent || 'N/A'}</p>
                                    </div>
                                </div>
                                {selectedForm.conductRemark && (
                                    <div>
                                        <label className="text-sm font-medium text-blue-700">Conduct Remark</label>
                                        <p className="text-sm text-blue-900 mt-1 p-2 bg-white rounded border">
                                            {selectedForm.conductRemark}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* HOD Review Section (if applicable) */}
                        {selectedForm.hodName && (
                            <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
                                <h4 className="font-medium text-purple-900 mb-3 flex items-center">
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    HOD Review
                                </h4>
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <label className="text-sm font-medium text-purple-700">HOD Name</label>
                                        <p className="text-sm text-purple-900">{selectedForm.hodName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-purple-700">Review Date</label>
                                        <p className="text-sm text-purple-900">{selectedForm.hodDate || 'N/A'}</p>
                                    </div>
                                </div>
                                {selectedForm.hodRemark && (
                                    <div>
                                        <label className="text-sm font-medium text-purple-700">HOD Remark</label>
                                        <p className="text-sm text-purple-900 mt-1 p-2 bg-white rounded border">
                                            {selectedForm.hodRemark}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Admin Section (if applicable) */}
                        {selectedForm.adminName && (
                            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                                <h4 className="font-medium text-green-900 mb-3 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Final Approval
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-green-700">Admin Name</label>
                                        <p className="text-sm text-green-900">{selectedForm.adminName}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <DialogFooter className="flex justify-end">
                            <DialogClose asChild>
                                <Button variant="outline">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default FromDetailsModal
import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { EmployeeList } from '@/types'
import { Alert, AlertDescription } from '../ui/alert'
import { Shield, UserX } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import EmployeeService from '@/services/employee-service'

interface EmployeeDeactivationProp {
    selectedEmployee: EmployeeList
}

function EmployeeDeactivation({ selectedEmployee }: EmployeeDeactivationProp) {
    const [isOpen, setIsOpen] = useState(false)
    const [reason, setReason] = useState("")
    const { mutate: deactivateEmployee, isPending } = useMutation({
        mutationFn: async (employee: EmployeeList) => {
            await new EmployeeService().deactivateEmployee(employee?.id, reason)
        },
        
    })

    const handleDeactivate = (employee: EmployeeList) => {
        deactivateEmployee(employee)
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-700 border-red-200 hover:border-red-300 hover:text-white"
                >
                    <UserX className="w-4 h-4 mr-1" />
                    Deactivate
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deactivate Employee</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to deactivate {selectedEmployee?.name}? They will lose access to the system immediately.
                    </DialogDescription>
                </DialogHeader>

                {selectedEmployee && (
                    <div>
                        <Alert>
                            <Shield className="w-4 h-4" />
                            <AlertDescription>
                                <strong>Warning:</strong> This action will immediately revoke {selectedEmployee.name}'s access to the NIMASA clearance system. Any pending reviews will need to be reassigned.
                            </AlertDescription>
                        </Alert>

                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Name:</span>
                                    <p className="font-medium">{selectedEmployee.name}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Role:</span>
                                    <p className="font-medium">{selectedEmployee.userRole}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Department:</span>
                                    <p className="font-medium">{selectedEmployee.department}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Forms Pending Review:</span>
                                    <p className="font-medium">{selectedEmployee.formPendingReview}</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 mt-4'>
                            <Label htmlFor='reason'>Reason for Deactivation</Label>
                            <Textarea
                                name="reason"
                                placeholder='Kindly enter the reason for deactivation'
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                <DialogFooter className="flex gap-2 pt-4">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="flex-1"
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={() => handleDeactivate(selectedEmployee)}
                        disabled={isPending}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                        {isPending ? 'Deactivating...' : 'Deactivate'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EmployeeDeactivation
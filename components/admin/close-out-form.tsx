import { toast } from 'sonner'
import React, { useState } from 'react'
import type { IClearanceFormResponse, IEmployeeCreationResponse } from '@/types'

import { cn } from '@/lib/utils'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { LucideIcon } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import LoadingSpinner from '../shared/loading-spinner'
import { ClearanceService } from '@/services/clearance-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '../ui/dialog'

function CloseOutForm({ name, employee, form, Icon }: { name: string, employee: IEmployeeCreationResponse, form: IClearanceFormResponse, Icon: LucideIcon }) {
    const [reason, setReason] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()
    const { mutate: approveForm, isPending: approvalInProgress } = useMutation({
        mutationFn: async (id: number) => {
            await new ClearanceService().approveClearanceForm(id, reason)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clearanceForms", employee?.role, "PENDING_APPROVAL", employee?.id] })
            queryClient.invalidateQueries({ queryKey: ["clearanceForms", employee?.role] })
            toast.success("Form Approved", {
                description: "The clearance form has been approved."
            })
        },
        onError: (error) => {
            toast.error("Form Approval Failed", {
                description: error ? error.message : "There was an error while approving the clearance form."
            })
        }
    })
    const { mutate: rejectForm, isPending: rejectionInProgress } = useMutation({
        mutationFn: async (id: number) => {
            await new ClearanceService().rejectClearanceForm(id, reason)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clearanceForms", employee?.role, "PENDING_APPROVAL", employee?.id] })
            queryClient.invalidateQueries({ queryKey: ["clearanceForms", employee?.role] })
            toast.success("Form Approved", {
                description: "The clearance form has been approved."
            })
        },
        onError: (error) => {
            toast.error("Form Approval Failed", {
                description: error ? error.message : "There was an error while approving the clearance form."
            })
        }
    })

    const handleApproveForm = (id: number) => {
        approveForm(id)
    }

    const handleRejectForm = (id: number) => {
        rejectForm(id)
    }

    const handleClick = (id: number) => {
        if (reason.length === 0) {
            toast.error("Reason is required", {
                description: "Kindly give the reason for your choice"
            })
            return;
        }

        switch (name) {
            case "Approve":
                handleApproveForm(id)
                break
            case "Reject":
                handleRejectForm(id)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <Button
                    size="sm"
                    variant={name === "Reject" ? "destructive" : "default"}
                    className={
                        cn({
                            "bg-green-600 hover:bg-green-700 text-white": name === "Approve",
                        })
                    }
                >
                    {approvalInProgress ? <LoadingSpinner /> : (
                        <>
                            <Icon className="h-4 w-4 mr-1" />
                            {name}
                        </>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Label>Reason</Label>
                <Textarea
                    placeholder="Enter your reason"
                    rows={4}
                    onChange={(e) => setReason(e.target.value)}
                />
                <DialogFooter>
                    <Button
                        onClick={() => handleClick(form.id)}
                        disabled={approvalInProgress || rejectionInProgress}
                    >
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CloseOutForm
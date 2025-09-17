import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { IClearanceFormResponse } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ClearanceService } from '@/services/clearance-service'
import { toast } from 'sonner'
import { getClearanceFormsQueryOpt } from '@/lib/query-options/clearance'
import LoadingSpinner from '../shared/loading-spinner'
import useAuth from '@/providers/use-auth'

function DeleteClearanceForm({ form }: { form: IClearanceFormResponse }) {
    const [isOpen, setIsOpen] = useState(false)
    const { employee } = useAuth()
    const queryClient = useQueryClient()
    const { mutate: deleteForm, isPending } = useMutation({
        mutationFn: async (id: number) => {
            return await new ClearanceService().deleteClearanceForm(id)
        },
        onSuccess: () => {
            toast.success("Form Deleted Successfully", {
                description: "The clearance form has been deleted."
            })
            queryClient.invalidateQueries(getClearanceFormsQueryOpt(employee?.role || ""))
            setIsOpen(false)
        },
        onError: (error) => {
            toast.error("Form Deletion Failed", {
                description: error ? error.message : "There was an error while deleting the clearance form."
            })
        }
    })

    const handleDelete = (id: number) => {
        deleteForm(id)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <p>Clearance Form Deletion</p>
                    </DialogTitle>
                </DialogHeader>
                <p>Are you sure you wish to delete this clearance form? This action cannot be undone.</p>
                <DialogFooter className='mt-4 flex justify-end space-x-2'>
                    <DialogClose>
                        <Button variant={"outline"} className='px-4 py-2'>Cancel</Button>
                    </DialogClose>
                    <Button variant={"destructive"} disabled={isPending} className='px-4 py-2' onClick={() => handleDelete(form.id)}>{isPending ? <LoadingSpinner /> : "Delete"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteClearanceForm
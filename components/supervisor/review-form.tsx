import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Eye, Upload, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supervisorReviewSchema } from '@/lib/schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useMutation } from '@tanstack/react-query'
import { ClearanceService } from '@/services/clearance-service'
import { IClearanceFormResponse, IEmployeeCreationResponse } from '@/types'
import { fileToBase64 } from '@/lib/utils'

type FormValues = z.infer<typeof supervisorReviewSchema>;

function ReviewForm({ selectedForm, employee }: { selectedForm: IClearanceFormResponse, employee: IEmployeeCreationResponse }) {
    const [fileList, setFileList] = useState<File | null>(null)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const { mutate: reviewForm, isPending } = useMutation({
        mutationFn: async (data: FormData) => {
            await new ClearanceService().supervisorReview(employee.id ?? "", data, employee.role)
        }
    })

    const form = useForm<FormValues>({
        resolver: zodResolver(supervisorReviewSchema),
        defaultValues: {
            supervisorName: employee ? employee.name : "",
            daysAbsent: 0,
            conductRemark: ""
        }
    })

    const handleReviewSubmit = async (values: FormValues) => {
        const formData = new FormData();
        formData.append("supervisorName", values.supervisorName);
        formData.append("daysAbsent", values.daysAbsent.toString());
        formData.append("conductRemark", values.conductRemark)
        if (fileList) {
            const signatureBase64 = await fileToBase64(fileList);
    formData.append("signatureFile", fileList);
        }
        console.log(values, formData)
        reviewForm(formData)
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={() => {
            setIsDialogOpen(!isDialogOpen)
            form.reset();
            setFileList(null)
        }}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                >
                    <Eye className="h-4 w-4 mr-1" />
                    Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Review Clearance Form</DialogTitle>
                    <DialogDescription>
                        Review and provide feedback for {selectedForm?.corpsName}'s clearance form
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleReviewSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name='supervisorName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Supervisor Name <span className='text-red-600 text-sm'>*</span></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter supervisor name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='daysAbsent'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Days Absent <span className='text-red-600 text-sm'>*</span></FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter number of absent days' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='conductRemark'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Conduct Remark <span className='text-red-600 test-sm'>*</span></FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter conduct remark' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="mt-4">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-medium text-greyscale-text-title">
                                        Signature Image
                                    </h3>
                                    <p className="text-sm text-greyscale-text-body">
                                        File size should not exceed 50MB
                                    </p>
                                </div>
                                <Button variant="secondary" className="relative">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files) { setFileList(e.target.files?.[0]) }
                                        }}
                                        className="absolute inset-0 z-10 w-full max-w-full cursor-pointer opacity-0"
                                    />
                                    <Upload className="cursor-pointer text-greyscale-icon-default group-hover:scale-105" />
                                    Attach Image
                                </Button>
                                {fileList && <div className='space-y-2'>
                                    <img src={URL.createObjectURL(fileList)} alt='preview' className='object-cover rounded-md' />
                                    <div className='flex items-center gap-1'>
                                        <p>{fileList.name}</p>
                                        <button onClick={() => setFileList(null)} aria-label='Remove attached file' title='Remove attached file' className='hover:scale-125 transition-all ease-in-out duration-300'>
                                            <X color='red' size={16} className='cursor-pointer' />
                                        </button>
                                    </div>
                                </div>}
                            </div>
                        </div>

                        <DialogFooter className="flex gap-2 pt-4">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="flex-1 bg-primary hover:bg-primary/90"
                                disabled={isPending}
                            >
                                {isPending ? "Submitting..." : "Submit Review"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewForm
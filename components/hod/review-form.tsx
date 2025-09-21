import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { MessageSquare, RefreshCw, Send, Upload, UserCheck, X } from 'lucide-react'
import { IClearanceFormResponse, IEmployeeCreationResponse, IHodReview } from '@/types'
import { hodReviewSchema } from '@/lib/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ClearanceService } from '@/services/clearance-service'
import { toast } from 'sonner'
import { FORM_STATUSES } from '@/lib/constants'

type ReviewFormValues = z.infer<typeof hodReviewSchema>;

function ReviewForm({ selectedForm, employee }: { selectedForm: IClearanceFormResponse, employee: IEmployeeCreationResponse }) {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [fileList, setFileList] = React.useState<File | null>(null)
    const queryClient = useQueryClient();

    const { mutate: hodReview, isPending } = useMutation({
        mutationFn: async (data: FormData) => {
            await new ClearanceService().hodReview(selectedForm.id ?? "", data)
        },
        onSuccess: (res) => {
            setIsDialogOpen(false)
            setFileList(null)
            form.reset();
            queryClient.invalidateQueries({ queryKey: ["clearanceForms", employee.role, "PENDING_APPROVAL", employee.id] })
            queryClient.invalidateQueries({ queryKey: ["clearanceForms", employee.role, FORM_STATUSES.PENDING_ADMIN] })
            toast.success("Review submitted successfully", {
                description: "Moved to Admin for final approval"
            })
        },
        onError: (error) => {
            toast.error("An error occurred", {
                description: error?.message || "Please try again"
            })
        }
    })

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(hodReviewSchema),
        defaultValues: {
            hodName: employee ? employee.name : "",
            hodRemark: "",
        },
    });

    const onSubmit = (values: ReviewFormValues) => {
        const formData = new FormData();
        formData.append("hodName", values.hodName);
        formData.append("hodRemark", values.hodRemark);
        if (!fileList) {
            toast.error("Please attach your signature image");
            return;
        }
        if (fileList) {
            formData.append("signatureFile", fileList)
        }
        hodReview(formData)
    }

    return (
        // <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        //     <DialogTrigger asChild>
        //         <Button
        //             size="sm"
        //             className="bg-primary hover:bg-primary/90"
        //         >
        //             <UserCheck className="h-4 w-4 mr-1" />
        //             Review
        //         </Button>
        //     </DialogTrigger>
        //     <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        //         <DialogHeader>
        //             <DialogTitle>HOD Review</DialogTitle>
        //             <DialogDescription>
        //                 Provide your review for {selectedForm?.corpsName}'s clearance form
        //             </DialogDescription>
        //         </DialogHeader>
        //         <Form {...form}>
        //             <form
        //                 onSubmit={form.handleSubmit(onSubmit)}
        //                 className="space-y-4"
        //             >
        //                 {/* HOD Name */}
        //                 <FormField
        //                     control={form.control}
        //                     name="hodName"
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel className='gap-0'>HOD Name<span className='text-sm text-red-600'>*</span></FormLabel>
        //                             <FormControl>
        //                                 <Input placeholder="Enter HOD name" disabled {...field} />
        //                             </FormControl>
        //                             <FormMessage />
        //                         </FormItem>
        //                     )}
        //                 />

        //                 {/* HOD Remark */}
        //                 <FormField
        //                     control={form.control}
        //                     name="hodRemark"
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel className='gap-0'>HOD Remark<span className='text-sm text-red-600'>*</span></FormLabel>
        //                             <FormControl>
        //                                 <Textarea
        //                                     placeholder="Enter your remarks and recommendations..."
        //                                     rows={4}
        //                                     {...field}
        //                                 />
        //                             </FormControl>
        //                             <FormMessage />
        //                         </FormItem>
        //                     )}
        //                 />

        //                 <div className="mt-4">
        //                     <div className="space-y-4">
        //                         <div className="space-y-1">
        //                             <h3 className="text-sm font-medium text-greyscale-text-title">
        //                                 Signature Image
        //                                 <span className='text-sm text-red-600'>*</span>
        //                             </h3>
        //                             <p className="text-sm text-greyscale-text-body">
        //                                 File size should not exceed 50MB
        //                             </p>
        //                         </div>
        //                         <Button variant="secondary" className="relative">
        //                             <Input
        //                                 type="file"
        //                                 accept="image/*"
        //                                 onChange={(e) => {
        //                                     if (e.target.files) { setFileList(e.target.files?.[0]) }
        //                                 }}
        //                                 className="absolute inset-0 z-10 w-full max-w-full cursor-pointer opacity-0"
        //                             />
        //                             <Upload className="cursor-pointer text-greyscale-icon-default group-hover:scale-105" />
        //                             Attach Image
        //                         </Button>
        //                         {fileList && <div className='space-y-2'>
        //                             <img src={URL.createObjectURL(fileList)} alt='preview' className='size-28 object-cover rounded-md' />
        //                             <div className='flex items-center gap-1'>
        //                                 <p>{fileList.name}</p>
        //                                 <button onClick={() => setFileList(null)} aria-label='Remove attached file' title='Remove attached file' className='hover:scale-125 transition-all ease-in-out duration-300'>
        //                                     <X color='red' size={16} className='cursor-pointer' />
        //                                 </button>
        //                             </div>
        //                         </div>}
        //                     </div>
        //                 </div>

        //                 {/* Buttons */}
        //                 <DialogFooter className="flex gap-2 pt-4">
        //                     <DialogClose asChild>
        //                         <Button
        //                             type="button"
        //                             variant="outline"
        //                             className="flex-1"
        //                         >
        //                             Cancel
        //                         </Button>
        //                     </DialogClose>
        //                     <Button
        //                         type="submit"
        //                         className="flex-1 bg-primary hover:bg-primary/90"
        //                         disabled={isPending}
        //                     >
        //                         {isPending ? <LoadingSpinner/> : "Submit Review"}
        //                     </Button>
        //                 </DialogFooter>
        //             </form>
        //         </Form>
        //     </DialogContent>
        // </Dialog>
        <Dialog open={isDialogOpen}
                // <Dialog open={isDialogOpen && selectedForm?.id === formItem.id}
                onOpenChange={() => {
                    setIsDialogOpen(!isDialogOpen)
                    form.reset();
                    setFileList(null)
                }}>
                <DialogTrigger asChild>
                    <Button
                        size="sm"
                        style={{ backgroundColor: '#0066CC' }}
                    >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Review
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[95vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Supervisor Review - {selectedForm?.corpsName}</DialogTitle>
                        <DialogDescription>
                            Complete your review for this corps member's clearance form
                        </DialogDescription>
                    </DialogHeader>

                    {selectedForm && (
                        <div className="space-y-6">
                            {/* Form Details Summary */}
                            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
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
                                    <label className="text-sm font-medium text-gray-700">Form ID</label>
                                    <p className="text-sm text-gray-900">{selectedForm.id}</p>
                                </div>
                            </div>

                            <Form {...form}>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="hodName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>HOD Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="hodRemark"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Conduct Remark</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Provide your assessment of the corps member's conduct and performance..."
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
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
                                                    <span className='text-sm text-red-600 ml-2'>*</span>
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
                                                <img src={URL.createObjectURL(fileList)} alt='preview' className='size-28 object-cover rounded-md' />
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
                                            onClick={form.handleSubmit(onSubmit)}
                                            disabled={isPending}
                                            className="flex-1"
                                            style={{ backgroundColor: '#0066CC' }}
                                        >
                                            {isPending ? (
                                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                            ) : (
                                                <Send className="w-4 h-4 mr-2" />
                                            )}
                                            Submit Review
                                        </Button>
                                    </DialogFooter>
                                </div>
                            </Form>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
    )
}

export default ReviewForm
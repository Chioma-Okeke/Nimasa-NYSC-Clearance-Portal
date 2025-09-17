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
import { Upload, UserCheck, X } from 'lucide-react'
import { IClearanceFormResponse, IEmployeeCreationResponse, IHodReview } from '@/types'
import { hodReviewSchema } from '@/lib/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { ClearanceService } from '@/services/clearance-service'
import { toast } from 'sonner'
import LoadingSpinner from '../shared/loading-spinner'

type ReviewFormValues = z.infer<typeof hodReviewSchema>;

function ReviewForm({ selectedForm, employee }: { selectedForm: IClearanceFormResponse, employee: IEmployeeCreationResponse }) {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [fileList, setFileList] = React.useState<File | null>(null)
    const { mutate: hodReview, isPending } = useMutation({
        mutationFn: async (data: FormData) => {
            await new ClearanceService().hodReview(employee.id ?? "", data)
        },
        onSuccess: (res) => {
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
            hodName: "",
            hodRemark: "",
        },
    });

    const onSubmit = (values: ReviewFormValues) => {
        const formData = new FormData();
        formData.append("hodName", values.hodName);
        formData.append("hodRemark", values.hodRemark);
        if (fileList) {
            formData.append("signatureFile", fileList)
        }
        console.log(values, formData)
        hodReview(formData)
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                >
                    <UserCheck className="h-4 w-4 mr-1" />
                    Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>HOD Review</DialogTitle>
                    <DialogDescription>
                        Provide your review for {selectedForm?.corpsName}'s clearance form
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* HOD Name */}
                        <FormField
                            control={form.control}
                            name="hodName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>HOD Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter HOD name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* HOD Remark */}
                        <FormField
                            control={form.control}
                            name="hodRemark"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>HOD Remark</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter your remarks and recommendations..."
                                            rows={4}
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

                        {/* Buttons */}
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
                                {isPending ? <LoadingSpinner/> : "Submit Review"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewForm
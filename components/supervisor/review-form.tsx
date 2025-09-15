import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Eye } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supervisorReviewSchema } from '@/lib/schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useMutation } from '@tanstack/react-query'
import { ClearanceService } from '@/services/clearance-service'
import { IClearanceFormResponse, IEmployeeCreationResponse } from '@/types'

type FormValues = z.infer<typeof supervisorReviewSchema>;

function ReviewForm({selectedForm, employee}: {selectedForm: IClearanceFormResponse, employee: IEmployeeCreationResponse}) {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const {mutate: reviewForm, isPending} = useMutation({
        mutationFn: async (data: FormValues) => {
            // await new ClearanceService().supervisorReview(employee.id ?? "", data)    Tell Ebus to employee response endpoint
        }
    })

    const form = useForm<FormValues>({
        resolver: zodResolver(supervisorReviewSchema),
        defaultValues: {
            supervisorName: "",
            daysAbsent: 0,
            conductRemark: ""
        }
    })

    const handleReviewSubmit = (values: FormValues) => {
        reviewForm(values)
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                                    <FormLabel>Days ABsent <span className='text-red-600 text-sm'>*</span></FormLabel>
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

                        <DialogFooter className="flex gap-2 pt-4">
                            <DialogClose>
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
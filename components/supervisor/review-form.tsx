import React, { useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Eye, MessageSquare, RefreshCw, Send, Upload, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supervisorReviewSchema } from '@/lib/schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ClearanceService } from '@/services/clearance-service'
import { IClearanceFormResponse, IEmployeeCreationResponse } from '@/types'
import { toast } from 'sonner'
import { Textarea } from '../ui/textarea'
import { FORM_STATUSES } from '@/lib/constants'
import SignaturePadComp from '../shared/signature-pad'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

type FormValues = z.infer<typeof supervisorReviewSchema>;
type UploadStyles = "attach" | "draw"

function ReviewForm({ selectedForm, employee }: { selectedForm: IClearanceFormResponse, employee: IEmployeeCreationResponse }) {
    const [fileList, setFileList] = useState<File | null>(null)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const queryClient = useQueryClient();
    const [uploadStyle, setUploadStyle] = useState("upload")

    const { mutate: reviewForm, isPending } = useMutation({
        mutationFn: async (data: FormData) => {
            for (const [key, value] of data.entries()) {
                console.log(`${key}:`, value, "in mutation");
            }
            await new ClearanceService().supervisorReview(selectedForm.id ?? "", data, employee.role)
        },
        onSuccess: (res) => {
            setIsDialogOpen(false)
            form.reset();
            setFileList(null)
            queryClient.invalidateQueries({ queryKey: ["clearanceForms", employee.role, "PENDING_APPROVAL", employee.id] })
            queryClient.invalidateQueries({ queryKey: ["clearanceForms", employee.role, FORM_STATUSES.PENDING_HOD] })
            toast.success("Review submitted successfully", {
                description: "Moved to HOD for review"
            })
        },
        onError: (error) => {
            toast.error("An error occurred", {
                description: error?.message || "Please try again"
            })
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
        formData.append("daysAbsent", String(values.daysAbsent));
        formData.append("conductRemark", values.conductRemark)
        if (!fileList) {
            toast.error("Please attach your signature image");
            return;
        }
        if (fileList) {
            formData.append("signatureFile", fileList);
        }
        reviewForm(formData)
    }

    return (
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
                    <MessageSquare className="w-3.5 h-3.5 mr-2" />
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
                                    name="supervisorName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Supervisor Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="daysAbsent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Days Absent</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max="365"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="conductRemark"
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
                                    <div className='space-y-3'>
                                        <h3 className="text-sm font-medium text-greyscale-text-title">
                                            Signature Image
                                            <span className='text-sm text-red-600 ml-2'>*</span>
                                        </h3>
                                        <RadioGroup
                                            defaultValue={uploadStyle}
                                            onValueChange={(val) => setUploadStyle(val)}
                                            className="flex gap-6"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="draw" id="draw" />
                                                <Label htmlFor="draw">Draw Signature</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="upload" id="upload" />
                                                <Label htmlFor="upload">Upload File</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    {uploadStyle === "draw" && <SignaturePadComp setFileList={setFileList} />}
                                    {uploadStyle === "upload" && <div className="space-y-4 mt-4">
                                        <div className="space-y-1">
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
                                    </div>}
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
                                        onClick={form.handleSubmit(handleReviewSubmit)}
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
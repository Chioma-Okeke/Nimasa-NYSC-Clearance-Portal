import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { daysOfTheWeek } from '@/lib/constants';
import { clearanceFormSchema } from '@/lib/schema'
import { ClearanceService } from '@/services/clearance-service';
import { ICorperForm, IEmployeeCreationResponse } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormValues = z.infer<typeof clearanceFormSchema>;

function ClearanceForm({ employee }: {
    employee: IEmployeeCreationResponse | undefined
}) {
    const clearanceService = new ClearanceService();
    const [showFormModal, setShowFormModal] = useState(false)
    const queryClient = useQueryClient()

    const form = useForm<FormValues>({
        resolver: zodResolver(clearanceFormSchema),
        defaultValues: {
            corpsName: employee ? employee.name : "",
            stateCode: "",
            department: employee ? employee.department : ""
        }
    })

    useEffect(() => {
        console.log(employee, "In create form")
    }, [])

    const { mutate: submitClearance, isPending } = useMutation({
        mutationFn: async (data: ICorperForm) => {
            return await clearanceService.submitClearanceForm(data)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["corper", employee?.id]})
            form.reset()
            setShowFormModal(false)
            toast.success("Form Submitted Successfully", {
                description: "Clearance Form successfully submitted."
            })
        },
        onError: (error) => {
            console.error(error)
            toast.error("For Submission Failed", {
                description: "An error occurred when submitting, try again."
            })
        }
    })

    const handleSubmitForm = (values: FormValues) => {
        submitClearance(values)
    }

    return (

        <Dialog open={showFormModal} onOpenChange={setShowFormModal}>
            <DialogTrigger asChild>
                <Button className="w-full" style={{ backgroundColor: '#0066CC' }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Form
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create New Clearance Form</DialogTitle>
                    <DialogDescription>
                        Fill in your details to submit a new clearance request
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="corpsName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Corps Member Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="stateCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g., LA, OG, AB" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cdsDay"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CDS Day</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-9 border-gray-300 focus:border-accent focus:ring-accent w-full">
                                                <SelectValue placeholder="Pick a day" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {daysOfTheWeek.map((day) => {
                                                return (
                                                    <SelectItem key={day} value={day}>
                                                        <div className="flex items-center space-x-2">
                                                            <span>{day}</span>
                                                        </div>
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => setShowFormModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="flex-1"
                                style={{ backgroundColor: '#0066CC' }}
                            >
                                {isPending ? (
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                    <Plus className="w-4 h-4 mr-2" />
                                )}
                                Submit Form
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ClearanceForm
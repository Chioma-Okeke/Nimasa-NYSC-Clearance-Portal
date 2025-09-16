import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { clearanceFormSchema } from '@/lib/schema'
import { ClearanceService } from '@/services/clearance-service';
import { ICorperForm, IEmployeeCreationResponse } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormValues = z.infer<typeof clearanceFormSchema>;

function ClearanceForm({employee} : {
    employee: IEmployeeCreationResponse
}) {
    const clearanceService = new ClearanceService();

    const form = useForm<FormValues>({
        resolver: zodResolver(clearanceFormSchema),
        defaultValues: {
            corpsName: employee ? employee.name : "",
            stateCode: "",
            department: employee ? employee.department : ""
        }
    })

    const {mutate: submitClearance, isPending} = useMutation({
        mutationFn: async (data: ICorperForm) => {
            return await clearanceService.submitClearanceForm(data)
        },
        onSuccess: () => {
            form.reset()
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

    const handleSubmitForm = (values:FormValues) => {
        //submission logic goes here
        submitClearance(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-4">
                <FormField 
                    control={form.control}
                    name='corpsName'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Corps Member Name</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter full Name' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name='stateCode'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>State Code</FormLabel>
                            <FormControl>
                                <Input placeholder='e.g., LA/23A/1234' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name='department'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter department' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isPending}>
                    {isPending ? "Submitting..." : "Submit Form"}
                </Button>
            </form>
        </Form>
    )
}

export default ClearanceForm
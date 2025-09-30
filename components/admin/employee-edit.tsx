import { z } from 'zod'
import { toast } from 'sonner'
import React, { useState } from 'react'

import { Input } from '../ui/input'
import { Edit } from 'lucide-react'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { employeeSchema } from '@/lib/schema'
import { EmployeeList, IEmployee } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingSpinner from '../shared/loading-spinner'
import EmployeeService from '@/services/employee-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

interface EmployeeDeactivationProp {
    selectedEmployee: EmployeeList
}

type FormValues = z.infer<typeof employeeSchema>;

function EmployeeEdit({ selectedEmployee }: EmployeeDeactivationProp) {
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()

    const employeeService = new EmployeeService();

    const { mutate: createEmployee, isPending } = useMutation({
        mutationFn: async (data: IEmployee) => {
            return await employeeService.editEmployee(selectedEmployee?.id, data)
        },
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({ queryKey: ["employee-list"] })
            form.reset()
            setIsOpen(false)
            toast.success("Employee Creation Successful", {
                description: "Employee was successfully created."
            })
        },
        onError: (error) => {
            console.error(error)
            toast.error("Employee Creation Failed", {
                description: "An error occurred when creating employee"
            })
        }
    })
    const form = useForm<FormValues>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            name: selectedEmployee?.name,
            department: selectedEmployee?.department,
            password: "",
            role: selectedEmployee?.userRole,
        },
    });

    const onSubmit = (values: FormValues) => {
        const { name, ...rest } = values
        createEmployee(rest)
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => {
            form.reset()
            setIsOpen(!isOpen)
        }}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={!selectedEmployee.active}
                >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Employee - {selectedEmployee?.name}</DialogTitle>
                    <DialogDescription>
                        Update employee information and permissions
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter full name" {...field} disabled />
                                    </FormControl>
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
                                        <Input placeholder="Enter department" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                            <SelectItem value="HOD">Head of Department</SelectItem>
                                            <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
                                            <SelectItem value="CORPS_MEMBER">Corps Member</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="flex gap-2 pt-4">
                            <DialogClose className='flex-1'>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type='submit'
                                className="flex-1 bg-[#0066CC]"
                                disabled={isPending}
                            >
                                {isPending ? <LoadingSpinner /> : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>


            </DialogContent>
        </Dialog>
    )
}

export default EmployeeEdit
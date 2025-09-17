import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserPlus } from "lucide-react";
import React, { useState } from "react";
import { employeeSchema } from "@/lib/schema";
import { useMutation } from "@tanstack/react-query";
import { IEmployee } from "@/types";
import EmployeeService from "@/services/employee-service";
import { toast } from "sonner";
import LoadingSpinner from "@/components/shared/loading-spinner";

type FormValues = z.infer<typeof employeeSchema>;

const AddEmployeeForm = () => {
    const [isOpen, setIsOpen] = useState(false)
    const employeeService = new EmployeeService();

    const { mutate: createEmployee, isPending } = useMutation({
        mutationFn: async (data: IEmployee) => {
            return await employeeService.addEmployee(data)
        },
        onSuccess: (res) => {
            form.reset()
            console.log(res)
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
            name: "",
            department: "",
            password: "",
            role: undefined,
        },
    });

    const onSubmit = (values: FormValues) => {
        console.log("New Employee:", values);
        createEmployee(values, {

        })
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Employee
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogDescription>
                        Add a new supervisor or HOD to the system
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
                                        <Input placeholder="Enter full name" {...field} />
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
                                {isPending ? <LoadingSpinner/> : "Add Employee"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddEmployeeForm;

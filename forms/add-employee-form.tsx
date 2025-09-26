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

import { Eye, EyeOff, UserPlus } from "lucide-react";
import React, { ReactNode, useState } from "react";
import { employeeSchema } from "@/lib/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IEmployee } from "@/types";
import EmployeeService from "@/services/employee-service";
import { toast } from "sonner";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { DEPARTMENTS } from "@/lib/constants";

type FormValues = z.infer<typeof employeeSchema>;

const AddEmployeeForm = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const employeeService = new EmployeeService();
    const queryClient = useQueryClient()

    const { mutate: createEmployee, isPending } = useMutation({
        mutationFn: async (data: IEmployee) => {
            return await employeeService.addEmployee(data)
        },
        onSuccess: async (res) => {
            form.reset()
            await queryClient.invalidateQueries({ queryKey: ["employee-list"] })
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
        createEmployee(values)
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => {
            form.reset()
            setIsOpen(!isOpen)
            setShowPassword(false)
        }}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent >
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
                                        <Input className="h-11" placeholder="Enter full name" {...field} />
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-11 w-full focus:border-blue-500 focus:ring-blue-500">
                                                <SelectValue placeholder="Select your department" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {DEPARTMENTS.map((department) => {
                                                return (
                                                    <SelectItem key={department} value={department}>
                                                        <div className="flex items-center space-x-2">
                                                            <span>{department}</span>
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
                                            <SelectTrigger className="h-11 w-full">
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                            <SelectItem value="CORPS_MEMBER">Corps Member</SelectItem>
                                            <SelectItem value="HOD">Head of Department</SelectItem>
                                            <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
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
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter your password"
                                                className="h-11 pr-11 focus:border-blue-500 focus:ring-blue-500"
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="flex gap-2 pt-4">
                            <DialogClose
                                className="flex-1"
                            >
                                <Button
                                    variant="outline"
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="flex-1 bg-primary hover:bg-primary/90"
                                disabled={isPending}
                            >
                                {isPending ? <LoadingSpinner /> : "Add Employee"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddEmployeeForm;

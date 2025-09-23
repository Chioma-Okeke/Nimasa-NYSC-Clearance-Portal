"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    UserCheck,
    UserX,
    Edit,
    Search,
    Shield,
    Users,
    AlertTriangle,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import EmployeeDeactivation from "@/components/admin/employee-deactivation";
import AddEmployeeForm from "@/forms/add-employee-form";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { EmployeeList } from "@/types";
import EmployeeEdit from "@/components/admin/employee-edit";
import EmployeeService from "@/services/employee-service";
import { getEmployeeListQueryOpt } from "@/lib/query-options/employee";

export default function EmployeeManagementTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [roleFilter, setRoleFilter] = useState("ALL");

    useEffect(() => {
        const data = new EmployeeService().getAdminStats()
        console.log(data, "fetched data")
    }, [])

    const { data: employees = [], isLoading: queryLoading } = useQuery(getEmployeeListQueryOpt)

    const filteredEmployees = useMemo(() => {
        return (employees ?? []).filter((emp) => {
            const matchesSearch =
                searchQuery === "" ||
                emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.id.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === "ALL" ||
                (statusFilter === "ACTIVE" && emp.active) ||
                (statusFilter === "INACTIVE" && !emp.active);

            const matchesRole =
                roleFilter === "ALL" || emp.userRole === roleFilter;

            return matchesSearch && matchesStatus && matchesRole;
        });
    }, [employees, searchQuery, statusFilter, roleFilter]);

    const getRoleBadge = (role: string) => {
        const roleConfig: Record<string, { color: string; text: string }> = {
            ADMIN: { color: "bg-red-100 text-red-800", text: "Admin" },
            HOD: { color: "bg-purple-100 text-purple-800", text: "HOD" },
            SUPERVISOR: { color: "bg-blue-100 text-blue-800", text: "Supervisor" },
        };
        const config = roleConfig[role] || {
            color: "bg-gray-100 text-gray-800",
            text: role,
        };
        return <Badge className={config.color}>{config.text}</Badge>;
    };

    const getStatusBadge = (active: boolean) => {
        return active ? (
            <Badge className="bg-green-100 text-green-800">Active</Badge>
        ) : (
            <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-NG", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <Card>
            <CardHeader className="px-6">
                <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <p className="text-2xl">Manage People</p>
                </CardTitle>
                <CardDescription>Add supervisors, HODs, and other employees to the system</CardDescription>
            </CardHeader>

            <CardContent className="px-6">
                <div className="space-y-6">
                    <AddEmployeeForm />
                </div>

                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row gap-4 my-6">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search employees..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Status</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="INACTIVE">Inactive</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="All Roles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Roles</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                                <SelectItem value="HOD">HOD</SelectItem>
                                <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="border-2 border-input rounded-lg overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead>Employee</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Forms Pending</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {queryLoading ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-6">
                                        <LoadingSpinner />
                                    </TableCell>
                                </TableRow>
                            ) : filteredEmployees.length > 0 ? (
                                filteredEmployees.map((employee) => (
                                    <TableRow key={employee.id} className="hover:bg-gray-50">
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{employee.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    ID: {employee.id}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{employee.department}</TableCell>
                                        <TableCell>{getRoleBadge(employee.userRole)}</TableCell>
                                        <TableCell>{getStatusBadge(employee.active)}</TableCell>
                                        <TableCell>
                                            {formatDate(employee.createdAT)}
                                        </TableCell>
                                        <TableCell>{employee.formPendingReview}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center space-x-2">
                                                <EmployeeEdit selectedEmployee={employee} />
                                                {employee.active && <EmployeeDeactivation selectedEmployee={employee} />}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-6 flex items-center flex-col justify-center">
                                        <UserX/>
                                        No employees found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}

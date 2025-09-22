// import React, { useState } from 'react';
// import {
//     UserCheck,
//     UserX,
//     Edit,
//     Search,
//     Filter,
//     MoreVertical,
//     Trash2,
//     Shield,
//     Eye,
//     EyeOff
// } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';

// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from '@/components/ui/dialog';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { EmployeeList } from '@/types';

// // Mock employee data
// const mockEmployees = [
//     {
//         id: 'EMP001',
//         name: 'Dr. Sarah Ahmed',
//         department: 'Maritime Safety',
//         role: 'SUPERVISOR',
//         status: 'ACTIVE',
//         email: 'sarah.ahmed@nimasa.gov.ng',
//         dateAdded: '2024-01-15',
//         lastLogin: '2024-03-18',
//         formsReviewed: 45
//     },
//     {
//         id: 'EMP002',
//         name: 'Engr. Michael Okonkwo',
//         department: 'Maritime Safety',
//         role: 'HOD',
//         status: 'ACTIVE',
//         email: 'michael.okonkwo@nimasa.gov.ng',
//         dateAdded: '2024-01-10',
//         lastLogin: '2024-03-17',
//         formsReviewed: 32
//     },
//     {
//         id: 'EMP003',
//         name: 'Mrs. Fatima Bello',
//         department: 'Administration',
//         role: 'ADMIN',
//         status: 'ACTIVE',
//         email: 'fatima.bello@nimasa.gov.ng',
//         dateAdded: '2024-01-05',
//         lastLogin: '2024-03-18',
//         formsReviewed: 78
//     },
//     {
//         id: 'EMP004',
//         name: 'Dr. James Okoro',
//         department: 'Maritime Security',
//         role: 'SUPERVISOR',
//         status: 'ACTIVE',
//         email: 'james.okoro@nimasa.gov.ng',
//         dateAdded: '2024-02-01',
//         lastLogin: '2024-03-16',
//         formsReviewed: 28
//     },
//     {
//         id: 'EMP005',
//         name: 'Prof. Amina Hassan',
//         department: 'Maritime Security',
//         role: 'HOD',
//         status: 'INACTIVE',
//         email: 'amina.hassan@nimasa.gov.ng',
//         dateAdded: '2024-01-20',
//         lastLogin: '2024-03-10',
//         formsReviewed: 15
//     },
//     {
//         id: 'EMP006',
//         name: 'Mr. David Adebayo',
//         department: 'Operations',
//         role: 'SUPERVISOR',
//         status: 'ACTIVE',
//         email: 'david.adebayo@nimasa.gov.ng',
//         dateAdded: '2024-02-15',
//         lastLogin: '2024-03-17',
//         formsReviewed: 22
//     }
// ];

// export default function EmployeeManagementTable() {
//     const [employees, setEmployees] = useState(mockEmployees);
//     const [filteredEmployees, setFilteredEmployees] = useState(mockEmployees);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedEmployee, setSelectedEmployee] = useState<EmployeeList | null>(null);
//     const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
//     const [showEditDialog, setShowEditDialog] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [statusFilter, setStatusFilter] = useState('ALL');
//     const [roleFilter, setRoleFilter] = useState('ALL');

//     // Filter employees based on search and filters
//     React.useEffect(() => {
//         let filtered = employees;

//         // Search filter
//         if (searchQuery) {
//             filtered = filtered.filter(emp =>
//                 emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 emp.id.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//         }

//         // Status filter
//         if (statusFilter !== 'ALL') {
//             filtered = filtered.filter(emp => emp.status === statusFilter);
//         }

//         // Role filter
//         if (roleFilter !== 'ALL') {
//             filtered = filtered.filter(emp => emp.role === roleFilter);
//         }

//         setFilteredEmployees(filtered);
//     }, [employees, searchQuery, statusFilter, roleFilter]);

//     const getRoleBadge = (role) => {
//         const roleConfig = {
//             'ADMIN': { color: 'bg-red-100 text-red-800', text: 'Admin' },
//             'HOD': { color: 'bg-purple-100 text-purple-800', text: 'HOD' },
//             'SUPERVISOR': { color: 'bg-blue-100 text-blue-800', text: 'Supervisor' }
//         };

//         const config = roleConfig[role] || { color: 'bg-gray-100 text-gray-800', text: role };
//         return <Badge className={config.color}>{config.text}</Badge>;
//     };

//     const getStatusBadge = (status) => {
//         const statusConfig = {
//             'ACTIVE': { color: 'bg-green-100 text-green-800', text: 'Active' },
//             'INACTIVE': { color: 'bg-gray-100 text-gray-800', text: 'Inactive' }
//         };

//         const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', text: status };
//         return <Badge className={config.color}>{config.text}</Badge>;
//     };

//     const handleDeactivate = async (employee) => {
//         setIsLoading(true);

//         try {
//             // Simulate API call to POST /api/unified-auth/employee/deactivate
//             await new Promise(resolve => setTimeout(resolve, 1500));

//             setEmployees(prev => prev.map(emp =>
//                 emp.id === employee.id
//                     ? { ...emp, status: 'INACTIVE' }
//                     : emp
//             ));

//             setShowDeactivateDialog(false);
//         } catch (error) {
//             console.error('Deactivation error:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleEdit = (employee) => {
//         setSelectedEmployee(employee);
//         setShowEditDialog(true);
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-NG', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                     <UserCheck className="w-5 h-5" style={{ color: '#003366' }} />
//                     <span>Employee Management</span>
//                 </CardTitle>
//                 <CardDescription>
//                     Manage NIMASA employees and their system access
//                 </CardDescription>
//             </CardHeader>

//             <CardContent>
//                 {/* Search and Filter Controls */}
//                 <div className="flex flex-col md:flex-row gap-4 mb-6">
//                     <div className="flex-1">
//                         <div className="relative">
//                             <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                             <Input
//                                 placeholder="Search employees..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="pl-10"
//                             />
//                         </div>
//                     </div>

//                     <div className="flex gap-2">
//                         <select
//                             value={statusFilter}
//                             onChange={(e) => setStatusFilter(e.target.value)}
//                             className="px-3 py-2 border rounded-md text-sm"
//                         >
//                             <option value="ALL">All Status</option>
//                             <option value="ACTIVE">Active</option>
//                             <option value="INACTIVE">Inactive</option>
//                         </select>

//                         <select
//                             value={roleFilter}
//                             onChange={(e) => setRoleFilter(e.target.value)}
//                             className="px-3 py-2 border rounded-md text-sm"
//                         >
//                             <option value="ALL">All Roles</option>
//                             <option value="ADMIN">Admin</option>
//                             <option value="HOD">HOD</option>
//                             <option value="SUPERVISOR">Supervisor</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Summary Stats */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                     <div className="p-4 bg-blue-50 rounded-lg">
//                         <p className="text-2xl font-bold text-blue-600">{employees.filter(e => e.status === 'ACTIVE').length}</p>
//                         <p className="text-sm text-blue-600">Active Employees</p>
//                     </div>
//                     <div className="p-4 bg-purple-50 rounded-lg">
//                         <p className="text-2xl font-bold text-purple-600">{employees.filter(e => e.role === 'HOD').length}</p>
//                         <p className="text-sm text-purple-600">HODs</p>
//                     </div>
//                     <div className="p-4 bg-green-50 rounded-lg">
//                         <p className="text-2xl font-bold text-green-600">{employees.filter(e => e.role === 'SUPERVISOR').length}</p>
//                         <p className="text-sm text-green-600">Supervisors</p>
//                     </div>
//                     <div className="p-4 bg-red-50 rounded-lg">
//                         <p className="text-2xl font-bold text-red-600">{employees.filter(e => e.role === 'ADMIN').length}</p>
//                         <p className="text-sm text-red-600">Admins</p>
//                     </div>
//                 </div>

//                 {/* Employees Table */}
//                 <div className="border rounded-lg overflow-hidden">
//                     <Table>
//                         <TableHeader>
//                             <TableRow className="bg-gray-50">
//                                 <TableHead>Employee</TableHead>
//                                 <TableHead>Department</TableHead>
//                                 <TableHead>Role</TableHead>
//                                 <TableHead>Status</TableHead>
//                                 <TableHead>Last Login</TableHead>
//                                 <TableHead>Forms Reviewed</TableHead>
//                                 <TableHead className="text-center">Actions</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {filteredEmployees.map((employee) => (
//                                 <TableRow key={employee.id} className="hover:bg-gray-50">
//                                     <TableCell>
//                                         <div>
//                                             <p className="font-medium">{employee.name}</p>
//                                             <p className="text-sm text-gray-500">{employee.email}</p>
//                                             <p className="text-xs text-gray-400">ID: {employee.id}</p>
//                                         </div>
//                                     </TableCell>
//                                     <TableCell>
//                                         <p className="font-medium">{employee.department}</p>
//                                     </TableCell>
//                                     <TableCell>
//                                         {getRoleBadge(employee.role)}
//                                     </TableCell>
//                                     <TableCell>
//                                         {getStatusBadge(employee.status)}
//                                     </TableCell>
//                                     <TableCell>
//                                         <p className="text-sm">{formatDate(employee.lastLogin)}</p>
//                                     </TableCell>
//                                     <TableCell>
//                                         <p className="font-medium">{employee.formsReviewed}</p>
//                                     </TableCell>
//                                     <TableCell>
//                                         <div className="flex items-center justify-center space-x-2">
//                                             <Button
//                                                 variant="outline"
//                                                 size="sm"
//                                                 onClick={() => handleEdit(employee)}
//                                                 disabled={employee.status === 'INACTIVE'}
//                                             >
//                                                 <Edit className="w-4 h-4 mr-1" />
//                                                 Edit
//                                             </Button>

//                                             <Button
//                                                 variant="outline"
//                                                 size="sm"
//                                                 onClick={() => {
//                                                     setSelectedEmployee(employee);
//                                                     setShowDeactivateDialog(true);
//                                                 }}
//                                                 disabled={employee.status === 'INACTIVE'}
//                                                 className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
//                                             >
//                                                 <UserX className="w-4 h-4 mr-1" />
//                                                 Deactivate
//                                             </Button>
//                                         </div>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </div>

//                 {/* No results message */}
//                 {filteredEmployees.length === 0 && (
//                     <div className="text-center py-12">
//                         <UserX className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
//                         <p className="text-gray-600">
//                             {searchQuery || statusFilter !== 'ALL' || roleFilter !== 'ALL'
//                                 ? 'Try adjusting your search or filter criteria'
//                                 : 'No employees have been added to the system yet'}
//                         </p>
//                     </div>
//                 )}

//                 {/* Deactivate Confirmation Dialog */}
//                 <Dialog open={showDeactivateDialog} onOpenChange={setShowDeactivateDialog}>
//                     <DialogContent>
//                         <DialogHeader>
//                             <DialogTitle>Deactivate Employee</DialogTitle>
//                             <DialogDescription>
//                                 Are you sure you want to deactivate {selectedEmployee?.name}? They will lose access to the system immediately.
//                             </DialogDescription>
//                         </DialogHeader>

//                         {selectedEmployee && (
//                             <div className="py-4">
//                                 <Alert>
//                                     <Shield className="w-4 h-4" />
//                                     <AlertDescription>
//                                         <strong>Warning:</strong> This action will immediately revoke {selectedEmployee.name}'s access to the NIMASA clearance system. Any pending reviews will need to be reassigned.
//                                     </AlertDescription>
//                                 </Alert>

//                                 <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                                     <div className="grid grid-cols-2 gap-4 text-sm">
//                                         <div>
//                                             <span className="text-gray-500">Name:</span>
//                                             <p className="font-medium">{selectedEmployee.name}</p>
//                                         </div>
//                                         <div>
//                                             <span className="text-gray-500">Role:</span>
//                                             <p className="font-medium">{selectedEmployee.role}</p>
//                                         </div>
//                                         <div>
//                                             <span className="text-gray-500">Department:</span>
//                                             <p className="font-medium">{selectedEmployee.department}</p>
//                                         </div>
//                                         <div>
//                                             <span className="text-gray-500">Forms Reviewed:</span>
//                                             <p className="font-medium">{selectedEmployee.formsReviewed}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         <div className="flex gap-2 pt-4">
//                             <Button
//                                 variant="outline"
//                                 className="flex-1"
//                                 onClick={() => setShowDeactivateDialog(false)}
//                                 disabled={isLoading}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button
//                                 onClick={() => handleDeactivate(selectedEmployee)}
//                                 disabled={isLoading}
//                                 className="flex-1 bg-red-600 hover:bg-red-700"
//                             >
//                                 {isLoading ? 'Deactivating...' : 'Deactivate'}
//                             </Button>
//                         </div>
//                     </DialogContent>
//                 </Dialog>

//                 {/* Edit Employee Dialog - Placeholder */}
//                 <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
//                     <DialogContent>
//                         <DialogHeader>
//                             <DialogTitle>Edit Employee - {selectedEmployee?.name}</DialogTitle>
//                             <DialogDescription>
//                                 Update employee information and permissions
//                             </DialogDescription>
//                         </DialogHeader>

//                         <div className="py-4">
//                             <Alert>
//                                 <Edit className="w-4 h-4" />
//                                 <AlertDescription>
//                                     Edit functionality would be implemented here with form fields for updating employee details, role changes, department transfers, etc.
//                                 </AlertDescription>
//                             </Alert>
//                         </div>

//                         <div className="flex gap-2 pt-4">
//                             <Button
//                                 variant="outline"
//                                 className="flex-1"
//                                 onClick={() => setShowEditDialog(false)}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button
//                                 className="flex-1"
//                                 style={{ backgroundColor: '#0066CC' }}
//                             >
//                                 Save Changes
//                             </Button>
//                         </div>
//                     </DialogContent>
//                 </Dialog>
//             </CardContent>
//         </Card>
//     );
// }


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

    // ✅ Fetch employees using React Query
    const { data: employees = [], isLoading: queryLoading } = useQuery(getEmployeeListQueryOpt)

    // ✅ Apply filters
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
            <CardHeader className="px-3">
                <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <p className="text-2xl">Manage People</p>
                </CardTitle>
                <CardDescription>Add supervisors, HODs, and other employees to the system</CardDescription>
            </CardHeader>

            <CardContent className="px-3">
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
                        {/* ✅ Status Filter with shadcn Select */}
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

                        {/* ✅ Role Filter with shadcn Select */}
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

                {/* Employees Table */}
                <div className="border border-accent rounded-lg overflow-x-auto">
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
                                    <TableCell colSpan={7} className="text-center py-6">
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

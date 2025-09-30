"use client"

import Link from 'next/link';
import { toast } from 'sonner';
import React, { useState } from 'react';
import { useRouter } from '@bprogress/next';
import { useQuery } from '@tanstack/react-query';

import {
    Users,
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    Download,
    UserCheck,
    UserX,
    Settings,
    LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import useAuth from '@/providers/use-auth';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AuthGuard } from '@/components/auth-guard';
import AddEmployeeForm from '@/forms/add-employee-form';
import { ClearanceService } from '@/services/clearance-service';
import LoadingSpinner from '@/components/shared/loading-spinner';
import { getAdminStatsQueryOpt } from '@/lib/query-options/employee';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface StatusCardProps { title: string, value: number, subtitle: string, icon: LucideIcon, color: string, trend: number }

export default function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(false)
    const { employee, isLoading: employeeLoading } = useAuth()
    const { data: adminStats, isLoading: statsLoading } = useQuery({
        ...getAdminStatsQueryOpt(employee?.id ?? ""),
        refetchOnMount: true
    })
    const router = useRouter()

    const navigateToEmployeePage = () => {
        router.push("/dashboard/admin-dashboard/employee-management")
    }

    const exportData = async () => {
        const clearanceService = new ClearanceService()
        try {
            setIsLoading(true)
            const response = await clearanceService.exportEmployeeList()
            if (!response) {
                toast.warning("Nothing to download.")
            }
            const link = document.createElement("a")
            link.href = response
            link.download = "employee.csv"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            toast.success("User Data Exported Successfully", {
                description: "The CSV file was successfully downloaded"
            })
        } catch (error) {
            toast.error("User Data Export Failed", {
                description: "An error occurred when exporting the file"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }: StatusCardProps) => (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <div className="flex items-center space-x-2">
                            {employeeLoading || statsLoading ? <Skeleton className='h-4 w-10 my-2'></Skeleton> : <p className={cn(`text-2xl font-bold text-[${color}]`)}>{value}</p>}
                        </div>
                        {employeeLoading || statsLoading ? <Skeleton className='h-4 w-18 my-2'></Skeleton> : <p className="text-xs text-gray-500">{subtitle}</p>}
                    </div>
                    <div className={cn(`p-3 rounded-full bg-[${color}]/15`, color)} >
                        <Icon className="size-6" color={color} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gray-50">
                <div className="px-6 py-4 border-b bg-white">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Welcome, {employee?.name}</h2>
                            <p className="text-gray-600 text-sm md:text-base">Review and manage corps member clearance forms</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="p-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Employees"
                            value={adminStats?.totalEmployees ?? 0}
                            subtitle={`${adminStats?.activeEmployees} active, ${adminStats?.inactiveEmployees} inactive`}
                            icon={Users}
                            color="#0066CC"
                            trend={5.2}
                        />
                        <StatCard
                            title="Corps Members"
                            value={adminStats?.totalCorpsMembers ?? 0}
                            subtitle={`${adminStats?.totalCorpsMembers} currently active`}
                            icon={UserCheck}
                            color="#006633"
                            trend={12.1}
                        />
                        <StatCard
                            title="Total Clearances"
                            value={adminStats?.approvedForms ?? 0}
                            subtitle="Completed this year"
                            icon={FileText}
                            color="#7B1FA2"
                            trend={8.3}
                        />
                        <StatCard
                            title="Pending Reviews"
                            value={adminStats?.pendingForms ?? 0}
                            subtitle="Awaiting action"
                            icon={Clock}
                            color="#FF6B35"
                            trend={-15.2}
                        />
                    </div>

                    {/* Dashboard Tabs */}
                    <Tabs defaultValue="forms" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2 lg:w-[600px]">
                            <TabsTrigger value="forms">Forms <span className='max-sm:hidden'>Management</span></TabsTrigger>
                            <TabsTrigger value="employees">Employee <span className='max-sm:hidden'>Management</span></TabsTrigger>
                        </TabsList>

                        {/* Forms Management Tab */}
                        <TabsContent value="forms" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Clearance Forms Overview</CardTitle>
                                    <CardDescription>Manage and monitor all clearance forms in the system</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                                <span className="font-medium text-green-900">Approved</span>
                                            </div>
                                            <p className="text-2xl font-bold text-green-900 mt-2">{employeeLoading || statsLoading ? <Skeleton className='h-4 w-10 my-2'></Skeleton> : adminStats?.approvedForms}</p>
                                        </div>
                                        <div className="bg-orange-50 p-4 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <Clock className="w-5 h-5 text-orange-600" />
                                                <Link href={"/dashboard/admin-dashboard/forms"} className="cursor-pointer font-medium text-orange-900">Pending</Link>
                                            </div>
                                            <p className="text-2xl font-bold text-orange-900 mt-2">{employeeLoading || statsLoading ? <Skeleton className='h-4 w-10 my-2'></Skeleton> : adminStats?.pendingForms}</p>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <XCircle className="w-5 h-5 text-red-600" />
                                                <span className="font-medium text-red-900">Rejected</span>
                                            </div>
                                            <p className="text-2xl font-bold text-red-900 mt-2">{employeeLoading || statsLoading ? <Skeleton className='h-4 w-10 my-2'></Skeleton> : adminStats?.rejectedForms}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Employee Management Tab */}
                        <TabsContent value="employees" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Employee Statistics</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <Users className="w-5 h-5 text-blue-600" />
                                                    <span className="font-medium">Total Employees</span>
                                                </div>
                                                <span className="text-xl font-bold text-blue-900">{adminStats?.totalEmployees}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <UserCheck className="w-5 h-5 text-green-600" />
                                                    <span className="font-medium">Active</span>
                                                </div>
                                                <span className="text-xl font-bold text-green-900">{adminStats?.activeEmployees}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <UserX className="w-5 h-5 text-red-600" />
                                                    <span className="font-medium">Inactive</span>
                                                </div>
                                                <span className="text-xl font-bold text-red-900">{adminStats?.inactiveEmployees}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Quick Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <AddEmployeeForm>
                                            <Button variant="outline" className="w-full justify-start">
                                                <Users className="w-4 h-4 mr-2" />
                                                Add New Employee
                                            </Button>
                                        </AddEmployeeForm>
                                        <Button onClick={navigateToEmployeePage} variant="outline" className="w-full justify-start">
                                            <Settings className="w-4 h-4 mr-2" />
                                            Manage Roles & Permissions
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start" onClick={exportData}>
                                            {isLoading ? <LoadingSpinner /> : (<><Download className="w-4 h-4 mr-2" /> Export Employee Data</>)}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </AuthGuard>
    );
}
"use client"

import React, { useState, useEffect } from 'react';
import {
    Building2,
    Users,
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    TrendingUp,
    Calendar,
    Search,
    Filter,
    Download,
    UserCheck,
    UserX,
    Eye,
    Settings,
    Bell,
    LucideIcon
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import Logo from '@/components/shared/logo';
import useAuth from '@/providers/use-auth';

interface StatusCardProps { title: string, value: number, subtitle: string, icon: LucideIcon, color: string, trend: number }

// Mock data for the dashboard
const mockStats = {
    totalEmployees: 156,
    activeEmployees: 142,
    inactiveEmployees: 14,
    totalCorpsMembers: 89,
    activeCorpsMembers: 76,
    completedClearances: 234,
    pendingClearances: 43,
    rejectedClearances: 12,
    thisMonthSubmissions: 28,
    averageProcessingTime: '5.2 days'
};

const formStatusData = [
    { name: 'Approved', value: 234, color: '#006633' },
    { name: 'Pending Supervisor', value: 18, color: '#FF6B35' },
    { name: 'Pending HOD', value: 15, color: '#0066CC' },
    { name: 'Pending Admin', value: 10, color: '#7B1FA2' },
    { name: 'Rejected', value: 12, color: '#D32F2F' }
];

const monthlyTrendData = [
    { month: 'Jan', submissions: 45, approved: 42, rejected: 3 },
    { month: 'Feb', submissions: 52, approved: 48, rejected: 4 },
    { month: 'Mar', submissions: 38, approved: 35, rejected: 3 },
    { month: 'Apr', submissions: 61, approved: 56, rejected: 5 },
    { month: 'May', submissions: 49, approved: 44, rejected: 5 },
    { month: 'Jun', submissions: 67, approved: 62, rejected: 5 },
    { month: 'Jul', submissions: 54, approved: 51, rejected: 3 },
    { month: 'Aug', submissions: 72, approved: 68, rejected: 4 },
    { month: 'Sep', submissions: 58, approved: 55, rejected: 3 },
    { month: 'Oct', submissions: 43, approved: 40, rejected: 3 },
    { month: 'Nov', submissions: 36, approved: 34, rejected: 2 },
    { month: 'Dec', submissions: 28, approved: 26, rejected: 2 }
];

const departmentData = [
    { department: 'Maritime Safety', employees: 28, corpsMembers: 12, clearances: 34 },
    { department: 'Marine Environment', employees: 22, corpsMembers: 8, clearances: 28 },
    { department: 'Shipping Development', employees: 34, corpsMembers: 15, clearances: 42 },
    { department: 'Maritime Security', employees: 19, corpsMembers: 9, clearances: 25 },
    { department: 'Administration', employees: 31, corpsMembers: 18, clearances: 48 },
    { department: 'Finance', employees: 22, corpsMembers: 6, clearances: 19 }
];

const recentActivities = [
    { id: 1, type: 'approval', user: 'John Adebayo', action: 'approved clearance for', target: 'Mary Okafor', time: '2 minutes ago', status: 'approved' },
    { id: 2, type: 'submission', user: 'Peter Nwankwo', action: 'submitted new clearance form', target: '', time: '15 minutes ago', status: 'pending' },
    { id: 3, type: 'review', user: 'Dr. Sarah Ahmed', action: 'reviewed and forwarded clearance for', target: 'James Okonkwo', time: '1 hour ago', status: 'forwarded' },
    { id: 4, type: 'rejection', user: 'Admin System', action: 'rejected clearance for', target: 'Alice Bello', time: '2 hours ago', status: 'rejected' },
    { id: 5, type: 'employee', user: 'System', action: 'new employee added:', target: 'Michael Eze (Supervisor)', time: '3 hours ago', status: 'active' }
];

export default function AdminDashboard() {
    const [selectedTimeRange, setSelectedTimeRange] = useState('last30days');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentUser] = useState({
        name: 'Administrator',
        department: 'IT Administration',
        role: 'ADMIN'
    });
    const { employee } = useAuth()

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
            case 'pending': return <Clock className="w-4 h-4 text-orange-500" />;
            case 'forwarded': return <TrendingUp className="w-4 h-4 text-blue-600" />;
            case 'active': return <UserCheck className="w-4 h-4 text-green-600" />;
            default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
        }
    };

    const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }: StatusCardProps) => (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <div className="flex items-center space-x-2">
                            <p className={cn(`text-2xl font-bold text-[${color}]`)}>{value}</p>
                            {trend && (
                                <span className={`text-xs px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {trend > 0 ? '+' : ''}{trend}%
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-500">{subtitle}</p>
                    </div>
                    <div className={cn(`p-3 rounded-full bg-[${color}]/15`, color)} >
                        <Icon className="size-6" color={color} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
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
                        value={mockStats.totalEmployees}
                        subtitle={`${mockStats.activeEmployees} active, ${mockStats.inactiveEmployees} inactive`}
                        icon={Users}
                        color="#0066CC"
                        trend={5.2}
                    />
                    <StatCard
                        title="Corps Members"
                        value={mockStats.totalCorpsMembers}
                        subtitle={`${mockStats.activeCorpsMembers} currently active`}
                        icon={UserCheck}
                        color="#006633"
                        trend={12.1}
                    />
                    <StatCard
                        title="Total Clearances"
                        value={mockStats.completedClearances}
                        subtitle="Completed this year"
                        icon={FileText}
                        color="#7B1FA2"
                        trend={8.3}
                    />
                    <StatCard
                        title="Pending Reviews"
                        value={mockStats.pendingClearances}
                        subtitle="Awaiting action"
                        icon={Clock}
                        color="#FF6B35"
                        trend={-15.2}
                    />
                </div>

                {/* Dashboard Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="forms">Forms Management</TabsTrigger>
                        <TabsTrigger value="employees">Employee Management</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Form Status Distribution */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <FileText className="w-5 h-5" style={{ color: '#0066CC' }} />
                                        <span>Clearance Status Distribution</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={formStatusData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, value }) => `${name}: ${value}`}
                                            >
                                                {formStatusData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Monthly Trends */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <TrendingUp className="w-5 h-5" style={{ color: '#006633' }} />
                                        <span>Monthly Submission Trends</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={monthlyTrendData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="submissions" stackId="1" stroke="#0066CC" fill="#0066CC" fillOpacity={0.3} />
                                            <Area type="monotone" dataKey="approved" stackId="2" stroke="#006633" fill="#006633" fillOpacity={0.3} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-5 h-5" style={{ color: '#FF6B35' }} />
                                        <span>Recent System Activity</span>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Eye className="w-4 h-4 mr-2" />
                                        View All
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentActivities.map((activity) => (
                                        <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                            {getStatusIcon(activity.status)}
                                            <div className="flex-1">
                                                <p className="text-sm">
                                                    <span className="font-medium">{activity.user}</span>
                                                    {' '}{activity.action}{' '}
                                                    {activity.target && <span className="font-medium">{activity.target}</span>}
                                                </p>
                                                <p className="text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Forms Management Tab */}
                    <TabsContent value="forms" className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Search clearance forms..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-64"
                                />
                                <Button variant="outline">
                                    <Search className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <Select>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter
                                </Button>
                            </div>
                        </div>

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
                                        <p className="text-2xl font-bold text-green-900 mt-2">{mockStats.completedClearances}</p>
                                    </div>
                                    <div className="bg-orange-50 p-4 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <Clock className="w-5 h-5 text-orange-600" />
                                            <span className="font-medium text-orange-900">Pending</span>
                                        </div>
                                        <p className="text-2xl font-bold text-orange-900 mt-2">{mockStats.pendingClearances}</p>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <XCircle className="w-5 h-5 text-red-600" />
                                            <span className="font-medium text-red-900">Rejected</span>
                                        </div>
                                        <p className="text-2xl font-bold text-red-900 mt-2">{mockStats.rejectedClearances}</p>
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
                                            <span className="text-xl font-bold text-blue-900">{mockStats.totalEmployees}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <UserCheck className="w-5 h-5 text-green-600" />
                                                <span className="font-medium">Active</span>
                                            </div>
                                            <span className="text-xl font-bold text-green-900">{mockStats.activeEmployees}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <UserX className="w-5 h-5 text-red-600" />
                                                <span className="font-medium">Inactive</span>
                                            </div>
                                            <span className="text-xl font-bold text-red-900">{mockStats.inactiveEmployees}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button className="w-full justify-start" style={{ backgroundColor: '#0066CC' }}>
                                        <Users className="w-4 h-4 mr-2" />
                                        Add New Employee
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Manage Roles & Permissions
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Employee Data
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Department Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Department Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={departmentData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="employees" fill="#0066CC" name="Employees" />
                                        <Bar dataKey="corpsMembers" fill="#006633" name="Corps Members" />
                                        <Bar dataKey="clearances" fill="#7B1FA2" name="Clearances" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Processing Time Trends</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={monthlyTrendData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="submissions" stroke="#0066CC" strokeWidth={2} />
                                            <Line type="monotone" dataKey="approved" stroke="#006633" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>System Performance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-medium">Average Processing Time</span>
                                                <span className="text-sm text-gray-500">{mockStats.averageProcessingTime}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-600 h-2 rounded-full w-[75%]"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-medium">Approval Rate</span>
                                                <span className="text-sm text-gray-500">95.2%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full w-[95%]"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-medium">User Satisfaction</span>
                                                <span className="text-sm text-gray-500">4.6/5</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-purple-600 h-2 rounded-full w-[92%]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
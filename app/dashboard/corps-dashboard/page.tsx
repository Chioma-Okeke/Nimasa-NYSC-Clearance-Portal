"use client"

import React, { useState, useEffect } from 'react';
import {
    Building2,
    FileText,
    Plus,
    Search,
    Filter,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Eye,
    User,
    MapPin,
    Briefcase,
    Download,
    RefreshCw,
    LogOut
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import StatusBadge from '@/components/shared/status-badge';
import { cn } from '@/lib/utils';
import ClearanceForm from '@/forms/clearance-form';
import { IEmployeeCreationResponse } from '@/types';
import CorperFormList from '@/components/corper/corper-form-list';

// Zod schema for clearance form creation
const clearanceFormSchema = z.object({
    corpsName: z.string().min(1, 'Corps member name is required'),
    stateCode: z.string().min(1, 'State code is required').length(2, 'State code must be 2 characters'),
    department: z.string().min(1, 'Department is required'),
});

type ClearanceFormValues = z.infer<typeof clearanceFormSchema>;

type FormItemProps = {
    id: string;
    corpsName: string;
    stateCode: string;
    department: string;
    status: string;
    createdDate: string;
    lastUpdated: string;
    supervisorName: string;
    hodName?: string;
    adminName?: string;
    supervisorRemark?: string;
    daysAbsent?: number;
    rejectionReason?: string;
}

// Mock data for corps member forms
const mockFormsData = [
    {
        id: 'CF001',
        corpsName: 'John Adebayo',
        stateCode: 'LA',
        department: 'Maritime Safety',
        status: 'APPROVED',
        createdDate: '2024-01-15',
        lastUpdated: '2024-01-22',
        supervisorName: 'Dr. Sarah Ahmed',
        hodName: 'Prof. Michael Eze',
        adminName: 'System Admin'
    },
    {
        id: 'CF002',
        corpsName: 'John Adebayo',
        stateCode: 'LA',
        department: 'Maritime Safety',
        status: 'PENDING_HOD',
        createdDate: '2024-02-10',
        lastUpdated: '2024-02-15',
        supervisorName: 'Dr. Sarah Ahmed',
        supervisorRemark: 'Excellent conduct throughout service',
        daysAbsent: 2
    },
    {
        id: 'CF003',
        corpsName: 'John Adebayo',
        stateCode: 'LA',
        department: 'Maritime Safety',
        status: 'PENDING_SUPERVISOR',
        createdDate: '2024-03-01',
        lastUpdated: '2024-03-01'
    },
    {
        id: 'CF004',
        corpsName: 'John Adebayo',
        stateCode: 'LA',
        department: 'Maritime Safety',
        status: 'REJECTED',
        createdDate: '2024-01-05',
        lastUpdated: '2024-01-08',
        rejectionReason: 'Incomplete documentation'
    }
];

export default function CorpsMemberDashboard() {
    const [forms, setForms] = useState(mockFormsData);
    const [filteredForms, setFilteredForms] = useState(mockFormsData);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [employee, setEmployee] = useState<IEmployeeCreationResponse>()

    useEffect(() => {
        const data = localStorage.getItem("corper_details")
        if (data) {
            setEmployee(JSON.parse(data ?? ""))
        }
    }, [])

    // Filter forms based on search and status
    useEffect(() => {
        let filtered = forms;

        if (searchQuery) {
            filtered = filtered.filter(form =>
                form.corpsName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                form.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                form.id.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(form => form.status === statusFilter);
        }

        setFilteredForms(filtered);
    }, [forms, searchQuery, statusFilter]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Welcome Section */}
            <div className="px-6 py-4 border-b bg-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Welcome, {employee?.name}</h2>
                        <p className="text-gray-600">Manage your NYSC clearance forms and track their progress</p>
                    </div>
                    <div className="text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span>Dept: {employee?.department}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="p-6">
                {/* Quick Stats */}
                {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <FileText className="w-8 h-8" style={{ color: '#0066CC' }} />
                                <div>
                                    <p className="text-2xl font-bold">{forms.length}</p>
                                    <p className="text-sm text-gray-600">Total Forms</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                                <div>
                                    <p className="text-2xl font-bold">{forms.filter(f => f.status === 'APPROVED').length}</p>
                                    <p className="text-sm text-gray-600">Approved</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <Clock className="w-8 h-8 text-orange-500" />
                                <div>
                                    <p className="text-2xl font-bold">
                                        {forms.filter(f => f.status.startsWith('PENDING')).length}
                                    </p>
                                    <p className="text-sm text-gray-600">Pending</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <XCircle className="w-8 h-8 text-red-600" />
                                <div>
                                    <p className="text-2xl font-bold">{forms.filter(f => f.status === 'REJECTED').length}</p>
                                    <p className="text-sm text-gray-600">Rejected</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div> */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Create New Form Section */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Plus className="w-5 h-5" style={{ color: '#006633' }} />
                                    <span>Create New Clearance Form</span>
                                </CardTitle>
                                <CardDescription>
                                    Submit a new clearance request for processing
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {employee && <ClearanceForm employee={employee} />}
                                <div className="mt-6 space-y-3">
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                        <h4 className="font-medium text-blue-900 text-sm">Quick Info</h4>
                                        <p className="text-blue-700 text-xs mt-1">
                                            Your form will be reviewed by your supervisor first, then HOD, and finally by admin.
                                        </p>
                                    </div>

                                    <div className="p-3 bg-green-50 rounded-lg">
                                        <h4 className="font-medium text-green-900 text-sm">Processing Time</h4>
                                        <p className="text-green-700 text-xs mt-1">
                                            Average processing time is 5-7 business days.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* My Forms Section */}
                    <div className="lg:col-span-2">
                        {employee && <CorperFormList employee={employee} />}
                    </div>
                </div>
            </main>
        </div>
    );
}
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import {
    Building2,
    FileText,
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
    RefreshCw,
    LogOut,
    MessageSquare,
    UserCheck,
    Send,
    Star
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import useAuth from '@/providers/use-auth';
import StatusBadge from '@/components/shared/status-badge';
import { IClearanceFormResponse } from '@/types';
import { getClearanceFormsByStatusQueryOpt, getPendingApprovalFormsQueryOpt } from '@/lib/query-options/clearance';
import { useQuery } from '@tanstack/react-query';
import { FORM_STATUSES } from '@/lib/constants';
import PendingApprovalForms from '@/components/hod/pending-approval-forms';
import ReviewedForms from '@/components/hod/reviewed-forms';

export default function SupervisorDashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('pending');
    const { employee } = useAuth()
    const { data: pendingForms, isLoading: isLoadingPendingForms } = useQuery({
        ...getPendingApprovalFormsQueryOpt(employee?.role || "", employee?.id || ""),
        refetchOnMount: "always"
    })
    const { data: reviewedForms = [], isLoading: isLoadingReviewedFOrms } = useQuery(getClearanceFormsByStatusQueryOpt(employee?.role || "", FORM_STATUSES.PENDING_ADMIN))

    const filteredPending = useMemo(() => {
        if (!pendingForms) return [];
        if (!searchQuery) return pendingForms;
        return pendingForms.filter(form =>
            form.corpsName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            form.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            form.stateCode.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [pendingForms, searchQuery]);

    const filteredReviewed = useMemo(() => {
        if (!reviewedForms) return [];
        if (!searchQuery) return reviewedForms;
        return reviewedForms.filter(form =>
            form.corpsName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            form.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            form.stateCode.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [reviewedForms, searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Welcome Section */}
            <div className="px-6 py-4 border-b bg-white">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Welcome, {employee?.name}</h2>
                        <p className="text-gray-600 text-sm md:text-base">Review and manage corps member clearance forms</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span>Dept: {employee?.department}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="py-6 px-4 relative">

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <Clock className="w-8 h-8 text-orange-500" />
                                <div>
                                    <p className="text-2xl font-bold">{pendingForms?.length ?? 0}</p>
                                    <p className="text-sm text-gray-600">Pending Reviews</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                                <div>
                                    <p className="text-2xl font-bold">{reviewedForms.length}</p>
                                    <p className="text-sm text-gray-600">Reviewed Forms</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <Star className="w-8 h-8" style={{ color: '#0066CC' }} />
                                <div>
                                    <p className="text-2xl font-bold">{reviewedForms.filter(f => f.status === 'APPROVED').length}</p>
                                    <p className="text-sm text-gray-600">Approved</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <FileText className="w-8 h-8" style={{ color: '#7B1FA2' }} />
                                <div>
                                    <p className="text-2xl font-bold">{(pendingForms?.length ?? 0) + reviewedForms.length}</p>
                                    <p className="text-sm text-gray-600">Total Forms</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                            <TabsTrigger value="pending" className="relative">
                                Pending Reviews
                                {pendingForms && pendingForms?.length > 0 && (
                                    <Badge className="ml-2 bg-orange-100 text-orange-800">
                                        {pendingForms?.length}
                                    </Badge>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="reviewed">My Reviews</TabsTrigger>
                        </TabsList>

                        {/* Search */}
                        <div className="flex items-center space-x-2">
                            <Input
                                placeholder="Search forms..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-64"
                            />
                            <Button variant="outline" size="sm">
                                <Search className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Pending Reviews Tab */}
                    <TabsContent value="pending">
                        <PendingApprovalForms pendingForms={filteredPending ?? []} isLoading={isLoadingPendingForms} searchQuery={searchQuery} />
                    </TabsContent>

                    {/* Reviewed Forms Tab */}
                    <TabsContent value="reviewed">
                        <ReviewedForms reviewedForms={filteredReviewed ?? []} searchQuery={searchQuery} isLoading={isLoadingReviewedFOrms} />
                    </TabsContent>
                </Tabs>

                {/* Footer with subtle hint */}
                <footer className="mt-12 text-center text-xs text-gray-400">
                    <p>NIMASA NYSC Clearance System v1.0 </p>
                </footer>
            </main>
        </div>
    );
}
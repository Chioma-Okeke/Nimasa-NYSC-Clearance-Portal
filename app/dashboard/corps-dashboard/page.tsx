"use client"

import React, { useState, useEffect } from 'react';

import { Briefcase } from 'lucide-react';
import ClearanceForm from '@/forms/clearance-form';
import { Skeleton } from '@/components/ui/skeleton';
import { IEmployeeCreationResponse } from '@/types';
import CorperFormList from '@/components/corper/corper-form-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CorpsMemberDashboard() {
    const [employee, setEmployee] = useState<IEmployeeCreationResponse>()

    useEffect(() => {
        const data = localStorage.getItem("corper_details")
        if (data) {
            setEmployee(JSON.parse(data ?? ""))
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Welcome Section */}
            <div className="px-6 py-4 border-b bg-white">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Welcome, {employee?.name}</h2>
                        <p className="text-gray-600 text-sm md:text-base">Manage your NYSC clearance forms and track their progress</p>
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
            <main className="py-6 px-4">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Create New Form Section */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>Create New Clearance Form</span>
                                </CardTitle>
                                <CardDescription>
                                    Submit a new clearance request for processing
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {employee ? <ClearanceForm employee={employee} /> : <Skeleton className='h-9 w-full'></Skeleton>}
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
                        <CorperFormList employee={employee} />
                    </div>
                </div>
            </main>
        </div>
    );
}
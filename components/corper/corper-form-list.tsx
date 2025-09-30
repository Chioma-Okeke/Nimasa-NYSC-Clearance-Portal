import type {
    IEmployeeCreationResponse,
    PrintableFormResponse,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import React, { useEffect, useRef, useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FileText } from "lucide-react";
import StatusIcon from "../shared/status-icon";
import StatusBadge from "../shared/status-badge";
import { cn, getFormProgress } from "@/lib/utils";
import ClearanceForm from "@/forms/clearance-form";
import LoadingSpinner from "../shared/loading-spinner";
import { ClearanceService } from "@/services/clearance-service";
import { PrintableClearanceForm } from "./print-clearance-form";
import { trackCorperFormsQueryOpt } from "@/lib/query-options/clearance";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type CoperFormListProps = {
    employee: IEmployeeCreationResponse | undefined;
};

function CorperFormList({ employee }: CoperFormListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredForms, setFilteredForms] = useState<
        PrintableFormResponse[]
    >([]);
    const [printData, setPrintData] = useState<PrintableFormResponse | null>(
        null
    );
    const [statusFilter, setStatusFilter] = useState('all');

    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({ contentRef: componentRef });

    const { data: employeeForms, isLoading } = useQuery(
        trackCorperFormsQueryOpt(employee?.id ?? "")
    );

    useEffect(() => {
        if (!employeeForms) return;

        const timeout = setTimeout(() => {
            let filtered = employeeForms.filter(
                (form) =>
                    form.corpsName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    form.stateCode
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    form.department
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );

            if (statusFilter !== 'all') {
                filtered = filtered.filter(form => form.status === statusFilter);
            }
            setFilteredForms(filtered.length > 0 ? filtered : employeeForms);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchQuery, employeeForms, statusFilter]);

    const printForm = async (form: PrintableFormResponse) => {
        const clearanceService = new ClearanceService();
        const data = await clearanceService.printClearanceForm(
            form.formId,
            form.corpsName
        );
        setPrintData(data);
    };

    useEffect(() => {
        if (printData && handlePrint) {
            setTimeout(() => handlePrint(), 100);
        }
    }, [printData, handlePrint]);

    return (
        <div className="lg:col-span-2 space-y-6">
            {/* Search Section */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center space-x-2">
                                <FileText className="w-5 h-5" style={{ color: '#7B1FA2' }} />
                                <span>My Clearance Forms</span>
                            </CardTitle>
                            <CardDescription>Track the status of your submitted forms</CardDescription>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Search forms..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="PENDING_SUPERVISOR">Pending Supervisor</SelectItem>
                                <SelectItem value="PENDING_HOD">Pending HOD</SelectItem>
                                <SelectItem value="PENDING_ADMIN">Pending Admin</SelectItem>
                                <SelectItem value="APPROVED">Approved</SelectItem>
                                <SelectItem value="REJECTED">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading || !employee ? <LoadingSpinner /> : filteredForms.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No forms found</h3>
                            <p className="text-gray-600 mb-4">
                                {searchQuery || statusFilter !== 'all'
                                    ? 'No forms match your search criteria'
                                    : 'You haven\'t created any clearance forms yet'}
                            </p>
                            {!searchQuery && statusFilter === 'all' && (
                                <ClearanceForm employee={employee} />
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredForms.map((formItem) => (
                                <div key={formItem.formId} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col gap-4 items-start justify-between">
                                        <div className="flex-1 w-full">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <StatusIcon status={formItem.status ?? ""} />
                                                <div>
                                                    <p className="text-sm text-gray-600">
                                                        {formItem.department}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mb-3">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-600">Progress</span>
                                                    <span className="text-gray-600">{getFormProgress(formItem.status ?? "")}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        style={{ width: `${getFormProgress(formItem.status ?? "")}%` }}
                                                        className={cn(`h-2 rounded-full transition-all bg-[#0066CC]`, {
                                                            "bg-[#D32F2F]": formItem.status === 'REJECTED',

                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <StatusBadge status={formItem.status ?? ""} />
                                            </div>
                                        </div>

                                        {formItem.status?.toLowerCase() === "approved" && <Button onClick={() => printForm(formItem)}>Print</Button>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Hidden Printable Component */}
            {printData && (
                <div className="hidden">
                    <PrintableClearanceForm ref={componentRef} form={printData} />
                </div>
            )}
        </div>
    );
}

export default CorperFormList;

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Search } from 'lucide-react'
import StatusBadge from '../shared/status-badge'
import { formatDate } from '@/lib/utils'
import { Input } from '../ui/input'
import { useQuery } from '@tanstack/react-query'
import { getIndividualClearanceFormQueryOpt } from '@/lib/query-options/clearance'
import { IClearanceFormResponse, IEmployeeCreationResponse } from '@/types'

type CoperFormListProps = {
    employee: IEmployeeCreationResponse
}

function CorperFormList({ employee }: CoperFormListProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredForms, setFilteredForms] = useState<IClearanceFormResponse[]>([])
    const { data: employeeForms, isLoading } = useQuery(getIndividualClearanceFormQueryOpt(employee.id, employee.role))

    useEffect(() => {
        let timeOut: ReturnType<typeof setTimeout>;
        if (employeeForms) {
            timeOut = setTimeout(() => {
                const filtered = employeeForms.find((form) => form.corpsName.toLowerCase().includes(searchQuery.toLowerCase()) || form.stateCode.toLowerCase().includes(searchQuery.toLowerCase()))
                setFilteredForms(filtered ? [filtered] : employeeForms)
            }, 500)
        }

        return () => clearTimeout(timeOut);
    }, [searchQuery, employeeForms])


    return (
        <div className="lg:col-span-2 space-y-6">
            {/* Search Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-primary" />
                        Search Forms
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search by name, state code, or form ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* My Forms List Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        My Forms ({filteredForms.length})
                    </CardTitle>
                    <CardDescription>Track the status of your submitted clearance forms</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-muted-foreground">Loading your forms...</p>
                        </div>
                    ) : filteredForms.length === 0 ? (
                        <div className="text-center py-8">
                            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">
                                {searchQuery ? "No forms match your search." : "No forms submitted yet."}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredForms.map((form) => (
                                <div
                                    key={form.id}
                                    className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-medium text-foreground">{form.corpsName}</h3>
                                                <StatusBadge status={form.status} />
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Form ID: {form.id} • State Code: {form.stateCode}
                                            </p>
                                            <p className="text-sm text-muted-foreground">Department: {form.department}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Submitted: {formatDate(form.createdAt)}</p>
                                            <p className="text-sm text-muted-foreground">Updated: {formatDate(form.updatedAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default CorperFormList
import { ClearanceService } from "@/services/clearance-service";

export const getPendingApprovalFormsQueryOpt = (role: string) => ({
    queryKey: ["clearanceForms", role, "PENDING_APPROVAL"],
    queryFn: () => new ClearanceService().pendingApproval(role),
});

export const getClearanceFormsQueryOpt = (role: string) => ({
    queryKey: ["clearanceForms", role],
    queryFn: () => new ClearanceService().getClearanceForms(role),
});

export const getIndividualClearanceFormQueryOpt = (id: number, role: string) => ({
    queryKey: ["clearanceForm", id, role],
    queryFn: () => new ClearanceService().getClearanceForm(id, role)
})

export const getClearanceFormsByStatusQueryOpt = (role: string, status: string) => ({
    queryKey: ["clearanceForms", role, status],
    queryFn: () => new ClearanceService().getClearanceFormsByStatus(role, status)
})

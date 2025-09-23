import { ClearanceService } from "@/services/clearance-service";

const clearanceService = new ClearanceService()

export const getPendingApprovalFormsQueryOpt = (role: string, userId: string) => ({
    queryKey: ["clearanceForms", role, "PENDING_APPROVAL", userId],
    queryFn: () => clearanceService.pendingApproval(role),
    staleTime: 0,
    refetchOnMount: "always",
    enabled: !!role && !!userId
});

export const getClearanceFormsQueryOpt = (role: string) => ({
    queryKey: ["clearanceForms", role],
    queryFn: () => clearanceService.getClearanceForms(role),
});

export const getIndividualClearanceFormQueryOpt = (id: number, role: string) => ({
    queryKey: ["clearanceForm", id, role],
    queryFn: () => clearanceService.getClearanceForm(id, role)
})

export const getClearanceFormsByStatusQueryOpt = (role: string, status: string) => ({
    queryKey: ["clearanceForms", role, status],
    queryFn: () => clearanceService.getClearanceFormsByStatus(role, status)
})

export const getCorpersClearanceFormsQueryOpt = (name: string) => ({
    queryKey: ["corperForms", name],
    queryFn: () => clearanceService.getCorperClearanceForms(name)
})

export const trackCorperFormsQueryOpt = (id: string) => ({
    queryKey: ["corper", id],
    queryFn: () => clearanceService.trackCorperForm(id)
})

export const trackDepartmentFormsQueryOpt = (dept: string) => ({
    queryKey: ["departmentFormList", dept],
    queryFn: () => clearanceService.trackDepartmentalForms(),
    staleTime: 0,
    refetchOnMount: "always",
    enabled: !!dept
})

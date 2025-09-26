import EmployeeService from "@/services/employee-service";
import { queryOptions } from "@tanstack/react-query";

const employeeService = new EmployeeService()

export const addEmployeeQueryOpt = queryOptions({
    queryKey: ["employee", "add"],
})

export const getCurrentUserQueryOpt = queryOptions({
    queryKey: ["current-user"],
    queryFn: () => {
        return employeeService.getCurrentUser()
    }
})

export const getEmployeeListQueryOpt = queryOptions({
    queryKey: ["employee-list"],
    queryFn: async () => {
        const res = await employeeService.getEmployeeList()
        return res.employees
    }
})

export const getCorpsListQueryOpt = queryOptions({
    queryKey: ["corpers-list"],
    queryFn: async () => {
        const res = await employeeService.getCorperList()
        return res.corpsMembers
    }
})

export const getAdminStatsQueryOpt = (id: string) => ({
    queryKey: ["admin-stats", id],
    queryFn: () => employeeService.getAdminStats(),
    staleTime: 0,
    refetchOnMount: "always",
    enabled: !!id
});

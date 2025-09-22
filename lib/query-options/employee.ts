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
    queryFn: () => {
        return employeeService.getEmployeeList()
    }
})

import EmployeeService from "@/services/employee-service";
import { queryOptions } from "@tanstack/react-query";

export const addEmployeeQueryOpt = queryOptions({
    queryKey: ["employee", "add"],
})

export const getCurrentUserQueryOpt = queryOptions({
    queryKey: ["current-user"],
    queryFn: () => {
        return new EmployeeService().getCurrentUser()
    }
})

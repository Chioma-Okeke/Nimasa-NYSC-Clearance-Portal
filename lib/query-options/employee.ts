import { queryOptions } from "@tanstack/react-query";

export const addEmployeeQueryOpt = queryOptions({
    queryKey: ["employee", "add"],
})
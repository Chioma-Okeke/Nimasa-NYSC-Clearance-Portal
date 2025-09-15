import { ClearanceService } from "@/services/clearance-service";
import { queryOptions } from "@tanstack/react-query";

export const getClearanceFormsQueryOpt = queryOptions({
    queryKey: ['clearanceForms', 'ADMIN'],
    queryFn: () => new ClearanceService().getClearanceForms("ADMIN"),
})
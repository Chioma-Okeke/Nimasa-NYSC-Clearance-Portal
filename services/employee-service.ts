import { EmployeeList, IEmployee, IEmployeeCreationResponse } from "@/types";
import { BaseService } from "./base-service";

class EmployeeService extends BaseService {
    constructor() {
        super("/unified-auth");
    }

    public async getCurrentUser() {
        return this.get<IEmployeeCreationResponse>("/me")
    }

    public async addEmployee(data: IEmployee) {
        const res = await this.post(`/employee/add`, data);
        return res;
    }

    public async deactivateEmployee(id: string, reason: string) {
        const res = await this.post(`employee/${id}/deactivate`, { reason });
    }

    public async changePassword(data: {userName: string, newPassword: string}) {
        const res = await this.post('employee/change-password', data);
    }

    public async login(data: IEmployee) {
        const res = await this.post<IEmployeeCreationResponse, IEmployee>("/login", data);
        return res;
    }

    public async logout() {
        const res = await this.post("/logout");
    }
    public async getEmployeeList() {
        return await this.get<EmployeeList>("/admin/employees/EmployeeList")
    }

    public async editEmployee(id: string, data: IEmployee) {
        return await this.post<EmployeeList, IEmployee>(`/employee/${id}/edit`, data)
    }
}

export default EmployeeService;

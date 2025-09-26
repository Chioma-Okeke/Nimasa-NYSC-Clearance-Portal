import { EmployeeList, EmployeeListResponse, IEmployee, IEmployeeCreationResponse } from "@/types";
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

    public async deactivateCorper(id: string) {
        const res = await this.post(`admin/corps-members/${id}/deactivate`);
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
        return await this.get<EmployeeListResponse>("/admin/employees/employeeList")
    }

    public async getCorperList() {
        return await this.get("/admin/coprs-members/list")
    }

    public async editEmployee(id: string, data: IEmployee) {
        return await this.patch<EmployeeList, IEmployee>(`/employee/${id}/edit`, data)
    }

    public async getAdminStats() {
        return await this.get("/admin/employees/stats")
    }
}

export default EmployeeService;

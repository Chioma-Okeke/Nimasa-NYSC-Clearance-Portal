import { IEmployee, IEmployeeCreationResponse } from "@/types";
import { BaseService } from "./base-service";

class EmployeeService extends BaseService {
    constructor() {
        super("/unified-auth");
    }

    public async addEmployee(data: IEmployee) {
        const query = new URLSearchParams(
            Object.entries(data).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();
        const res = await this.post(`/employee/add?${query}`);
        return res;
    }

    public async deactivateEmployee(name: string) {
        const res = await this.post("employee/deactivate", { name });
    }

    public async changePassword(data: {userName: string, newPassword: string}) {
        const res = await this.post('employee/change-password', data);
    }

    public async login(data: IEmployee) {
        const res = await this.post<IEmployeeCreationResponse, IEmployee>("/login", data);
        localStorage.setItem("token", res.token)
        return res;
    }

    public async logout() {
        const res = await this.post("/logout");
    }
}

export default EmployeeService;

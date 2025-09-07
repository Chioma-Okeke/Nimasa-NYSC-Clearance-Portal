import { IEmployee } from "@/types";
import { BaseService } from "./base-service";

class EmployeeService extends BaseService {
    constructor() {
        super('/unified-auth')
    }

    public async addEmployee(data: IEmployee) {
         const res = this.post('/employee/add', data)
    }

    public async login(data: IEmployee) {
        const res = this.post<IEmployee, IEmployee>('/login', data)
        return res
    }
}

export default EmployeeService;
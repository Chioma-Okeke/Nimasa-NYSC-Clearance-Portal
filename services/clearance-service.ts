import {
    IClearanceFormResponse,
    ICorperForm,
    ICorperPrintableForm,
    IHodReview,
    ISupervisorReview,
    PrintableFormResponse,
} from "@/types";
import { BaseService } from "./base-service";

export class ClearanceService extends BaseService {
    constructor() {
        super("/clearance-forms");
    }

    public async getClearanceForms(role: string) {
        return this.get<IClearanceFormResponse[]>("", { role });
    }

    public async getClearanceForm(id: number, role: string) {
        return this.get<IClearanceFormResponse[]>(`/${id}`, { role });
    }

    public async approvedCorperForms(corpsName: string) {
        return this.get<ICorperPrintableForm[]>(`/approved/corps/${corpsName}`);
    }

    public async clearanceFormsCount(status: string) {
        return this.get<number>(`count/${status}`);
    }

    public async deleteClearanceForm(id: number) {
        return this.delete(`/${id}`);
    } // he need to explain what the request body is for. And if it is to confirm if that ia an admin, teach him how to better do it

    public async printClearanceForm(id: number, corpsName: string) {
        return this.get<PrintableFormResponse>(`/${id}/printable`, {
            corpsName,
        });
    }

    public async submitClearanceForm(data: ICorperForm) {
        return this.post<ICorperForm, ICorperForm>("/submission", data);
    }

    // public async supervisorReview(id: number, data: FormData, role?: string) {
    //     return this.post(`/${id}/supervisor-review?${role}`, data);
    // }

    public async supervisorReview(id: number, data: FormData, role?: string) {
        return this.makeRawRequest({
            url: `/${id}/supervisor-review?role=${role}`,
            method: "post",
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data
        })
    }

    public async hodReview(id: number, data: FormData) {
        return this.post(`/${id}/hod-review`, data);
    }

    public async rejectClearanceForm(id: number, reason: string) {
        return this.post(`/${id}/reject`, {reason});
    }

    public async approveClearanceForm(id: number, reason: string) {
        return this.post(`/${id}/approve`, {reason});
    }

    public async supervisorsList() {
        this.get("/admin/supervisors");
    } //teach Ebus how to handle this better

    public async hodsList() {
        this.get("/admin/hod");
    } //teach Ebus how to handle this better

    public async pendingApproval(role: string) {
        return this.get<IClearanceFormResponse[]>("/pending", { role });
    } //teach him how to better handle this that he wont all these separate end points

    public async getClearanceFormsByStatus(role: string, status: string) {
        return this.get<IClearanceFormResponse[]>(`/status/${status}`, { role });
    }

    public async getCorperClearanceForms(name: string) {
        return this.get<PrintableFormResponse[]>(`/approved/corps/${name}`);
    }
}

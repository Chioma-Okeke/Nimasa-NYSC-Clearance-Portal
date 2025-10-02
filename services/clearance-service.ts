import {
    IClearanceFormResponse,
    ICorperForm,
    ICorperPrintableForm,
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
    }

    public async printClearanceForm(id: number, corpsName: string) {
        return this.get<PrintableFormResponse>(`/${id}/printable`, {
            corpsName,
        });
    }

    public async submitClearanceForm(data: ICorperForm) {
        return this.post<ICorperForm, ICorperForm>("/submission", data);
    }

    public async supervisorReview(id: number, data: FormData, role?: string) {
        return this.makeRawRequest({
            url: `/${id}/supervisor-review?role=${role}`,
            method: "post",
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            // },
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
        return this.get("/admin/supervisors");
    }

    public async hodsList() {
        return this.get("/admin/hod");
    }

    public async pendingApproval(role: string) {
        return this.get<IClearanceFormResponse[]>("/pending", { role });
    }

    public async getClearanceFormsByStatus(role: string, status: string) {
        return this.get<IClearanceFormResponse[]>(`/status/${status}`, { role });
    }

    public async getCorperClearanceForms(name: string) {
        return this.get<PrintableFormResponse[]>(`/approved/corps/${name}`);
    }

    public async trackCorperForm(id: string) {
        return this.get<PrintableFormResponse[]>(`/corps/${id}/forms/track`)
    }

    public async exportEmployeeList() {
        return this.makeRawRequest<Blob>({
            url: "/admin/export/excel",
            method: "get",
            responseType: "blob",
        })
    }

    public async trackDepartmentalForms() {
        return this.get<IClearanceFormResponse[]>("/forms/track")
    }
}

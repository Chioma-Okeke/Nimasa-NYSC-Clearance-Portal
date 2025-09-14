import {
    IClearanceFormResponse,
    ICorperForm,
    ICorperPrintableForm,
    IHodReview,
    ISupervisorReview,
} from "@/types";
import { BaseService } from "./base-service";

export class ClearanceService extends BaseService {
    constructor() {
        super("/clearance-forms");
    }

    public async getClearanceForms(role: string) {
        return this.get("", { role });
    }

    public async getClearanceForm(id: string, role: string) {
        return this.get<IClearanceFormResponse>(`/${id}`, { role });
    }

    public async approvedCorperForms(corpsName: string) {
        return this.get<ICorperPrintableForm[]>(`/approved/corps/${corpsName}`);
    }

    public async clearanceFormsCount(status: string) {
        return this.get<number>(`count/${status}`);
    }

    public async deleteClearanceForm(id: string) {
        return this.delete(`/${id}`);
    } // he need to explain what the request body is for. And if it is to confirm if that ia an admin, teach him how to better do it

    public async printClearanceForm(id: string, corpsName: string) {
        return this.get<ICorperPrintableForm>(`/${id}/printable`, {
            corpsName,
        });
    }

    public async submitClearanceForm(data: ICorperForm) {
        return this.post<ICorperForm, ICorperForm>("", data);
    }

    public async supervisorReview(id: string, data: ISupervisorReview) {
        return this.post(`/${id}/supervisor-review`);
    }

    public async hodReview(id: string, data: IHodReview) {
        return this.post(`/${id}/hod-review`, data);
    }

    public async rejectClearanceForm(id: string, adminName: string) {
        return this.post(`/${id}/reject`, { adminName });
    }

    public async approveClearanceForm(id: string, adminName: string) {
        return this.post(`/${id}/approve`, { adminName });
    }

    public async supervisorsList() {
        this.get("/admin/supervisors");
    } //teach Ebus how to handle this better

    public async hodsList() {
        this.get("/admin/hod");
    } //teach Ebus how to handle this better

    public async pendingSupervisorApproval(role: string) {
        this.get<IClearanceFormResponse[]>("supervisor/pending", { role });
    } //teach him how to better handle this that he wont all these separate end points

    public async pendingHodApproval(role: string) {
        this.get<IClearanceFormResponse[]>("hod/pending", { role });
    } //teach him how to better handle this that he wont all these separate end points

    public async pendingAdminApproval(role: string) {
        this.get<IClearanceFormResponse[]>("admin/pending", { role });
    } //teach him how to better handle this that he wont all these separate end points

    public async clearanceFormStatus(role: string, status: string) {
        this.get<IClearanceFormResponse[]>(`/status/${status}`, { role });
    } //ask about the use for this
}

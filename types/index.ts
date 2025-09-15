export interface IEmployee {
    id?: string;
    name: string;
    password?: string;
    department: string;
    role: "CORPS_MEMBER" | "SUPERVISOR" | "HOD" | "ADMIN";
}

export interface IEmployeeCreationResponse {
    id: number;
    department: string;
    message: string;
    name: string;
    newCorpsMember: boolean;
    passwordRequired: boolean;
    role: string;
    token: string;
    userType: string;
}

export interface ICorperForm {
    id?: string;
    corpsName: string;
    stateCode: string;
    department: string;
}

export interface ISupervisorReview {
    supervisorName: string;
    daysAbsent: number;
    conductRemark: string;
    signatureFile?: string
}

export interface IHodReview {
    hodName: string;
    hodRemark: string;
    role: string;
}

export interface IReviewResponse {
    id: string;
    corpsName: string;
    stateCode: string;
    department: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    dayAbsent: number;
    conductRemark: string;
    supervisorName: string;
    supervisorSignaturePath: string;
    supervisorDate: string;
    hodRemark: string;
    hodName: string;
    hodSignaturePath: string;
    hodDate: string;
    adminName: string;
    approvalDate: string;
    approved: true;
}

export interface ICorperPrintableForm {
    corpsName: string;
    stateCode: string;
    department: string;
    daysAbsent: number;
    conductRemark: string;
    supervisorName: string;
    supervisorSignatureUrl: string;
    supervisorDate: string;
    hodRemark: string;
    hodName: string;
    hodSignatureUrl: string;
    hodDate: string;
    adminName: string;
    approvalDate: string;
    status: string;
    createdAt: string;
    formId: number;
}

export interface IClearanceFormResponse {
    id: number;
    corpsName: string;
    stateCode: string;
    department: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    dayAbsent: number;
    conductRemark: string;
    supervisorName: string;
    supervisorSignaturePath: string;
    supervisorDate: string;
    hodRemark: string;
    hodName: string;
    hodSignaturePath: string;
    hodDate: string;
    adminName: string;
    approvalDate: string;
    approved: boolean;
}

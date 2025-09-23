import { Building2, Shield, Users } from "lucide-react";

export const FORM_STATUSES = {
    PENDING_SUPERVISOR: "PENDING_SUPERVISOR",
    PENDING_HOD: "PENDING_HOD",
    PENDING_ADMIN: "PENDING_ADMIN",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
};

export const ROLES = {
    CORPER: "CORPS_MEMBER",
    SUPERVISOR: "SUPERVISOR",
    HOD: "HOD",
    ADMIN: "ADMIN",
};

export const ROLE_MAPPING = {
    CORPS_MEMBER: "Corps Member",
    ADMIN: "Admin",
    HOD: "HOD",
    SUPERVISOR: "Supervisor"
}

export const ALLOWED_ROLES = ["CORPS_MEMBER", "SUPERVISOR", "HOD", "ADMIN"];

export const ROLE_SELECTION = [
    {
        roleName: "Administrator",
        Icon: Shield,
        value: "ADMIN",
    },
    {
        roleName: "Head of Department",
        Icon: Building2,
        value: "HOD",
    },
    {
        roleName: "NYSC Corps Member",
        Icon: Users,
        value: "CORPS_MEMBER",
    },
    {
        roleName: "Supervisor",
        Icon: Shield,
        value: "SUPERVISOR",
    },
];

export const DEPARTMENTS = [
    "AHRD",
    "DEEP BLUE",
    "DG's OFFICE",
    "ED (F&A)'S OFFICE",
    "ED (ML&CS)'S OFFICE",
    "ED (OPS)'S OFFICE",
    "FSD",
    "ICT",
    "INTERNAL AUDIT",
    "LEGAL SERVICE",
    "PPP",
    "PRDMS",
    "PROCUREMENT",
    "PROTOCOL",
    "PUBLIC RELATIONS",
    "RCSM&BE",
    "SECURITY & INTELIGENCE",
    "SERVICOM",
    "SPECIAL DUTIES",
];

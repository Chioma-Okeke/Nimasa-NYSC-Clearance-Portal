import { Building2, Shield, Users } from "lucide-react";

export const FORM_STATUSES = {
    PENDING_SUPERVISOR: "PENDING_SUPERVISOR",
    PENDING_HOD: "PENDING_HOD",
    PENDING_ADMIN: "PENDING_ADMIN",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED"
}

export const ROLES = {
    CORPER: "CORPS_MEMBER",
    SUPERVISOR: "SUPERVISOR",
    HOD: "HOD",
    ADMIN: "ADMIN"
}

export const ALLOWED_ROLES = ["CORPS_MEMBER", "SUPERVISOR", "HOD", "ADMIN"];

export const ROLE_SELECTION = [
    {
        roleName: "NYSC Corps Member",
        Icon: Users,
        value: "CORPS_MEMBER"
    },
    {
        roleName: "Supervisor",
        Icon: Shield,
        value: "SUPERVISOR"
    },
    {
        roleName: "Head of Department",
        Icon: Building2,
        value: "HOD"
    },
    {
        roleName: "Administrator",
        Icon: Shield,
        value: "ADMIN"
    },
]

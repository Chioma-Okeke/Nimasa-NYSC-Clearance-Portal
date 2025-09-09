import { z } from "zod";

export const employeeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    department: z.string().min(1, "Department is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["CORPS_MEMBER", "SUPERVISOR", "HOD", "ADMIN"]),
});
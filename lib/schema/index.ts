import { z } from "zod";

export const employeeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    department: z.string().min(1, "Department is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["CORPS_MEMBER", "SUPERVISOR", "HOD", "ADMIN"]),
});

export const clearanceFormSchema = z.object({
    corpsName: z.string().min(5, "Kindly Enter a valid Full name."),
    stateCode: z.string().min(5, "Kindly input a valid state code."),
    department: z.string().min(5, "Choose your department.")
})

export const loginFormSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  department: z.string().min(1, "Department is required"),
  role: z.enum(["CORPS_MEMBER", "SUPERVISOR", "HOD", "ADMIN"], {
    required_error: "Role is required",
  }),
  password: z.string().optional(),
}).refine(
  (data) => {
    if (data.role !== "CORPS_MEMBER" && !data.password) return false
    return true
  },
  {
    message: "Password is required for employees",
    path: ["password"],
  }
)

export const supervisorReviewSchema = z.object({
    supervisorName: z.string().min(1, "Supervisor name is required"),
    daysAbsent: z.coerce.number().min(0, "Days absent cannot be negative"),
    conductRemark: z.string().min(1, "Conduct remark is required"),
    // signatureFile: z.any().refine((file) => file instanceof File && file.size > 0, "Signature image is required")
})

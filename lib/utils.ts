import { StatusType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ROLES } from "./constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const generateUserInitials = (name: string) => {
    let initials = "";
    initials = name
        .trim()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
    return initials.slice(0, 2);
};

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });
}

export const getRoleDisplayName = (role: string) => {
    switch (role) {
        case "CORPS_MEMBER":
            return "NYSC Corps Member";
        case "SUPERVISOR":
            return "Supervisor";
        case "HOD":
            return "Head of Department";
        case "ADMIN":
            return "Administrator";
        default:
            return role;
    }
};

export const getFormProgress = (status: string) => {
    const progressMap: Record<StatusType, number> = {
        PENDING_SUPERVISOR: 25,
        PENDING_HOD: 50,
        PENDING_ADMIN: 75,
        APPROVED: 100,
        REJECTED: 0,
    };
    return progressMap[status as StatusType] ?? 0;
};

export function dataURLtoFile(dataURL: string, filename: string) {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
export const roleRequiresDesktop = (role: string) => {
    return role != ROLES.CORPER
}

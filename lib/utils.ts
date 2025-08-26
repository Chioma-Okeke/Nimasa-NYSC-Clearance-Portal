import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

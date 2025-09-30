"use client"

import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { useRouter } from "@bprogress/next";
import Link from "next/link";

export default function Unauthorized() {
    const router = useRouter()

    return (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-xl w-full text-center bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex justify-center mb-5">
                <Logo />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Access Restricted</h1>
            <p className="text-sm text-gray-600">
                This application can only be accessed on company-managed systems
                (corporate desktops/laptops or devices connected via the company VPN).
                Mobile devices are not permitted.
            </p>
            <p className="mt-4 text-sm text-gray-700">
                If you believe this is an error, please contact IT support.
            </p>
            <Link
                href={"/login"}
                className="w-full py-3 text-xs mt-6 text-secondary underline"
            >
                Back to Login
            </Link>
        </div>
    );
}

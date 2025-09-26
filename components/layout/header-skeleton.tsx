import { Skeleton } from "@/components/ui/skeleton";
import Logo from "../shared/logo";

export function HeaderSkeleton() {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <Skeleton className="size-6 rounded-md mr-4" />
                {/* Left side (Logo + Page Name stays visible) */}
                <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center space-x-3 flex-1">
                        <Logo />
                        <div>
                            <h1 className="text-xl font-bold text-[#003366]">NIMASA</h1>
                        </div>
                    </div>
                </div>

                {/* Right side skeletons */}
                <div className="flex items-center space-x-4">
                    {/* Export Data button skeleton */}
                    <Skeleton className="h-8 w-28 rounded-md" />

                    {/* Notification button skeleton */}
                    <Skeleton className="h-8 w-8 rounded-md" />

                    {/* Refresh button skeleton (hidden on small screens, so keep minimal) */}
                    <div className="hidden lg:block">
                        <Skeleton className="h-8 w-24 rounded-md" />
                    </div>

                    {/* Profile section skeleton */}
                    <div className="items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hidden xl:flex">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <div className="hidden lg:block">
                            <Skeleton className="w-24 h-3 mb-2" />
                            <Skeleton className="w-20 h-3" />
                        </div>
                    </div>

                    {/* Mobile profile skeleton */}
                    <div className="xl:hidden">
                        <Skeleton className="w-8 h-8 rounded-full" />
                    </div>

                    {/* Logout button skeleton */}
                    <Skeleton className="h-8 w-24 rounded-md hidden xl:block" />
                </div>
            </div>
        </header>
    );
}

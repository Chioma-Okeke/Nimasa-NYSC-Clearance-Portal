import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Download, LogOut, RefreshCw } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { generateUserInitials } from '@/lib/utils'
import { Button } from '../ui/button'
import { ROLES } from '@/lib/constants'
import LoadingSpinner from './loading-spinner'

interface UserProfileCardProps {
    userName: string;
    userRole: string;
    isLoading: boolean;
    handleLogout: () => void;
    refreshForms: () => void;
    exportData: () => void;
}

function UserProfileCard({ userName, userRole, handleLogout, refreshForms, exportData, isLoading }: UserProfileCardProps) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer'>
                    <AvatarFallback>
                        {generateUserInitials(userName)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-52 border-input -translate-x-8 p-0'>
                <div className="flex flex-col items-center gap-2 text-sm md:text-base w-full p-4">
                    <Avatar>
                        <AvatarFallback>
                            {generateUserInitials(userName)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{userName}</span>
                    <span className="text-muted-foreground">({userRole})</span>
                </div>
                <hr className='xl:hidden' />
                <div className='p-4 xl:hidden block space-y-4 w-full'>
                    {userRole === ROLES.ADMIN &&
                        <Button variant="outline" className="w-full hover:bg-secondary" size="sm" onClick={exportData}>
                            <Download className="w-4 h-4 mr-2" />
                            {isLoading ? <LoadingSpinner
                             /> : "Export Data"}
                        </Button>}
                    {userRole === ROLES.CORPER && <Button variant="outline" size="sm" onClick={refreshForms} className='w-full hover:bg-secondary'>
                        <RefreshCw className={`w-4 h-4 mr-2`} />
                        Refresh
                    </Button>}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLogout()}
                        className="items-center gap-2 text-white bg-red-600 flex w-full"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserProfileCard
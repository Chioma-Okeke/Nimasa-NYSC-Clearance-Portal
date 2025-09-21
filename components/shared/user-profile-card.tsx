import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { LogOut, RefreshCw } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { generateUserInitials } from '@/lib/utils'
import { Button } from '../ui/button'
import { ROLES } from '@/lib/constants'

interface UserProfileCardProps {
    userName: string
    userRole: string
    handleLogout: () => void
    refreshForms: () => void
}

function UserProfileCard({ userName, userRole, handleLogout, refreshForms }: UserProfileCardProps) {
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer'>
                    <AvatarFallback>
                        {generateUserInitials(userName)}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-full max-w:w-48'>
                <div className="flex flex-col items-center gap-2 text-sm md:text-base py-4 px-20">
                    <Avatar>
                        <AvatarFallback>
                            {generateUserInitials(userName)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{userName}</span>
                    <span className="text-muted-foreground">({userRole})</span>
                </div>
                <hr className='xl:hidden' />
                <div className='py-4 px-20 xl:hidden block space-y-4'>
                    {userRole === ROLES.CORPER && <Button variant="outline" size="sm" onClick={refreshForms} className='w-full hover:bg-secondary'>
                        <RefreshCw className={`w-4 h-4 mr-2`} />
                        Refresh
                    </Button>}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLogout()}
                        className="items-center gap-2 bg-transparent hover:bg-red-500 flex w-full"
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
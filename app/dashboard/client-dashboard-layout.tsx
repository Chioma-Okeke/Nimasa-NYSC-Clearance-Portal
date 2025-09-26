"use client"

import { Header } from '@/components/layout/header'
import { SideNavigation } from '@/components/shared/side-navigation'
import { Calendar } from '@/components/ui/calendar'
import { ROLES } from '@/lib/constants'
import useAuth from '@/providers/use-auth'
import { IEmployeeCreationResponse } from '@/types'
import React, { ReactNode, useEffect, useState } from 'react'

function ClientDashboardLayout({ children }: { children: ReactNode }) {
    const [corper, setCorper] = useState<IEmployeeCreationResponse>()
    const { employee } = useAuth()
    const today = new Date()

    useEffect(() => {
        const data = localStorage.getItem("corper_details")
        if (data) {
            setCorper(JSON.parse(data ?? ""))
        }
    }, [])
    return (
        <>
            {employee?.role === ROLES.ADMIN && !corper && <SideNavigation />}
            <main className='flex-1 overflow-hidden'>
                <Header employee={corper ?? employee as IEmployeeCreationResponse} />
                <div className='xl:flex'>
                    <div className='flex-1'>
                        {children}
                    </div>
                    <div className="hidden xl:flex justify-center p-4 w-fit">
                        <Calendar
                            mode="single"
                            selected={today}
                            className="w-fit"
                        />
                    </div>
                </div>
            </main>
        </>
    )
}

export default ClientDashboardLayout
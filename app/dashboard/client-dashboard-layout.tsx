"use client"

import { Header } from '@/components/layout/header'
import { SideNavigation } from '@/components/shared/side-navigation'
import { ROLES } from '@/lib/constants'
import useAuth from '@/providers/use-auth'
import { IEmployeeCreationResponse } from '@/types'
import React, { ReactNode, useEffect, useState } from 'react'

function ClientDashboardLayout({ children }: { children: ReactNode }) {
    const [corper, setCorper] = useState<IEmployeeCreationResponse>()
    const { employee } = useAuth()

    useEffect(() => {
        const data = localStorage.getItem("corper_details")
        if (data) {
            setCorper(JSON.parse(data ?? ""))
        }
    }, [])
    return (
        <>
            {employee?.role === ROLES.ADMIN && !corper && <SideNavigation />}
            <main className='flex-1 overflow-x-hidden'>
                {(corper ?? employee) ? (
                    <Header employee={corper ?? employee as IEmployeeCreationResponse} />
                ) : null}
                {children}
            </main>
        </>
    )
}

export default ClientDashboardLayout
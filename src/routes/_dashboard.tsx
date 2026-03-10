import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { DashboardShell } from '../components/layout/DashboardShell'
import { MockDataProvider } from '../context/MockDataContext'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

export const Route = createFileRoute('/_dashboard')({
    component: DashboardLayout,
})

function DashboardLayout() {
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate({ to: '/' })
        }
    }, [user, navigate])

    if (!user) return null

    return (
        <MockDataProvider>
            <DashboardShell>
                <Outlet />
            </DashboardShell>
        </MockDataProvider>
    )
}

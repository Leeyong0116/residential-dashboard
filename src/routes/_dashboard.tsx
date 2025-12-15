import { createFileRoute, Outlet } from '@tanstack/react-router'
import { DashboardShell } from '../components/layout/DashboardShell'
import { MockDataProvider } from '../context/MockDataContext'

export const Route = createFileRoute('/_dashboard')({
    beforeLoad: async () => {
        // We can't easily access React Context here in beforeLoad without more setup.
        // For simplicity in this stack, we'll do the check in the component or use a wrapper.
        // However, TanStack Router context is different from React Context.
        // Let's use the component-level protection for now since AuthContext is React-based.
    },
    component: DashboardLayout,
})

import { useAuth } from '../context/AuthContext'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

function DashboardLayout() {
    const { user, loading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && !user) {
            navigate({ to: '/' })
        }
    }, [user, loading, navigate])

    if (loading) {
        return <div className="flex h-screen items-center justify-center bg-slate-950 text-white">Loading...</div>
    }

    // Double check to prevent flash of content
    if (!user) return null

    return (
        <MockDataProvider>
            <DashboardShell>
                <Outlet />
            </DashboardShell>
        </MockDataProvider>
    )
}

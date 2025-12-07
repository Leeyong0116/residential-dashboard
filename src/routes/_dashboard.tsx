import { createFileRoute, Outlet } from '@tanstack/react-router'
import { DashboardShell } from '../components/layout/DashboardShell'
import { MockDataProvider } from '../context/MockDataContext'

export const Route = createFileRoute('/_dashboard')({
    component: DashboardLayout,
})

function DashboardLayout() {
    return (
        <MockDataProvider>
            <DashboardShell>
                <Outlet />
            </DashboardShell>
        </MockDataProvider>
    )
}

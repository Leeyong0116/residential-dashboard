import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from 'sonner'
import { AuthProvider } from '../context/AuthContext'

export const Route = createRootRoute({
    component: () => (
        <AuthProvider>
            <Outlet />
            <Toaster position="top-center" theme="dark" richColors />
            <TanStackRouterDevtools />
        </AuthProvider>
    ),
})

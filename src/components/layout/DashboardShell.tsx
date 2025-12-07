import type { ReactNode } from "react"
import { Sidebar } from "./Sidebar"
import { Topbar } from "./Topbar"

interface DashboardShellProps {
    children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
    return (
        <div className="flex h-screen w-full bg-[#0F172A] text-slate-100 overflow-hidden">
            {/* Background Gradients/Blobs for Glassmorphism */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[100px]" />
            </div>

            <Sidebar />

            <div className="relative z-10 flex flex-1 flex-col pl-64 transition-all">
                <Topbar />

                <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    <div className="container mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

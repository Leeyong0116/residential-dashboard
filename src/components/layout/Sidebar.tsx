import { Link } from "@tanstack/react-router"
import { LayoutDashboard, Shield, Users, Camera, LogOut } from "lucide-react"


const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/entry-logs", icon: Shield, label: "Entry Log" },
    { to: "/users", icon: Users, label: "Users" },
    { to: "/camera", icon: Camera, label: "Camera" },
]

export function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-slate-950/50 backdrop-blur-xl transition-transform">
            <div className="flex h-16 items-center px-6 border-b border-white/10">
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    ResiGuard
                </span>
            </div>

            <div className="flex flex-col gap-1 p-4">
                {navItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-400 transition-all hover:text-white hover:bg-white/10 [&.active]:bg-indigo-600/20 [&.active]:text-indigo-400 [&.active]:shadow-lg [&.active]:shadow-indigo-500/10"
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </div>

            <div className="absolute bottom-4 left-0 w-full px-4">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    )
}

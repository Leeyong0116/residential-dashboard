import { Bell, Search } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export function Topbar() {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-slate-950/50 backdrop-blur-xl px-6">
            <div className="w-96">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search residents, plates..."
                        className="pl-9 bg-slate-900/50 border-white/5"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-950 animate-pulse" />
                </Button>
                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-white">Security Guard</p>
                        <p className="text-xs text-slate-400">Main Gate</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 ring-2 ring-white/10" />
                </div>
            </div>
        </header>
    )
}

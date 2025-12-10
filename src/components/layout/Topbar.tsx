import { Bell } from "lucide-react"
import { Button } from "../ui/button"
import { useState, useRef, useEffect } from "react"
import { useMockData } from "../../context/MockDataContext"
import { cn } from "../../lib/utils"

export function Topbar() {
    const { notifications, markAllRead } = useMockData()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const unreadCount = notifications.filter(n => !n.read).length

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-slate-950/50 backdrop-blur-xl px-6">
            <div className="flex item-end gap-4 w-full">
                {/* Notification Dropdown Container */}
                <div className="relative" ref={dropdownRef}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("relative text-slate-400 hover:text-white", isOpen && "bg-white/10 text-white")}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-950 animate-pulse" />
                        )}
                    </Button>

                    {/* Dropdown Panel */}
                    {isOpen && (
                        <div className="absolute left-0 mt-2 w-80 rounded-lg border border-white/10 bg-slate-950 shadow-xl z-50 overflow-hidden ring-1 ring-white/10">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-slate-900/50">
                                <span className="font-semibold text-white text-sm">Notifications</span>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllRead}
                                        className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                                    >
                                        Mark all read
                                    </button>
                                )}
                            </div>
                            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                {notifications.length > 0 ? (
                                    <div className="divide-y divide-white/5">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={cn(
                                                    "p-4 hover:bg-white/5 transition-colors relative group",
                                                    !notification.read ? "bg-white/[0.02]" : "bg-transparent"
                                                )}
                                            >
                                                <div className="flex gap-3">
                                                    <div className={cn(
                                                        "mt-1.5 h-2 w-2 rounded-full flex-shrink-0 transition-colors",
                                                        !notification.read ? "bg-emerald-500" : "bg-slate-700"
                                                    )} />
                                                    <div className="space-y-1">
                                                        <p className={cn(
                                                            "text-sm leading-snug transition-colors",
                                                            !notification.read ? "text-white font-medium" : "text-slate-400"
                                                        )}>
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">
                                                            {notification.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center flex flex-col items-center gap-2">
                                        <Bell className="h-8 w-8 text-slate-700 mb-1" />
                                        <span className="text-slate-500 text-sm">No new notifications</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 pl-4 border-l border-white/10 ml-auto">
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

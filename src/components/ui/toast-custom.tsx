import { useEffect, useState } from "react"
import { useMockData } from "../../context/MockDataContext"
import { cn } from "../../lib/utils"
import { Bell } from "lucide-react"

export function Toast() {
    const { lastNotification } = useMockData()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (lastNotification) {
            setIsVisible(true)
            const timer = setTimeout(() => setIsVisible(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [lastNotification])

    if (!lastNotification || !isVisible) return null

    return (
        <div className={cn(
            "fixed top-24 right-6 z-50 flex items-center gap-3 rounded-lg border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-right-10 fade-in",
            "ring-1 ring-inset ring-white/10"
        )}>
            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <div>
                <p className="text-sm font-medium text-white">{lastNotification.message}</p>
                <p className="text-[10px] text-slate-400">{lastNotification.time}</p>
            </div>
        </div>
    )
}

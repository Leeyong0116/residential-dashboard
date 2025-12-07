import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Users, UserCheck, AlertTriangle, Car } from 'lucide-react'
import { cn } from '../../lib/utils'

export const Route = createFileRoute('/_dashboard/dashboard')({
    component: DashboardPage,
})

import * as React from 'react'
import { useMockData } from '../../context/MockDataContext'

function DashboardPage() {
    const { stats, entries } = useMockData()
    const videoRef = React.useRef<HTMLVideoElement | null>(null)
    const streamRef = React.useRef<MediaStream | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    // Handle stream fetching
    React.useEffect(() => {
        let mounted = true

        async function getCamera() {
            try {
                // Request camera access
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true
                })

                if (!mounted) {
                    stream.getTracks().forEach(track => track.stop())
                    return
                }

                streamRef.current = stream
                setError(null)

                // Attach to video if it exists
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                    videoRef.current.play().catch(e => console.error("Error playing video:", e))
                }
            } catch (err) {
                console.error("Error accessing webcam:", err)
                if (mounted) {
                    setError("Camera unavailable")
                }
            }
        }

        getCamera()

        return () => {
            mounted = false
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop())
            }
        }
    }, [])

    const setVideoRef = React.useCallback((node: HTMLVideoElement | null) => {
        videoRef.current = node
        if (node && streamRef.current) {
            node.srcObject = streamRef.current
            node.play().catch(e => console.error("Error playing video:", e))
        }
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    {/* Date placeholder */}
                    <span className="text-sm text-slate-400">Oct 24, 2025</span>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Visitors"
                    value={stats.totalVisitors.toLocaleString()}
                    icon={Users}
                    trend="+12% from last month"
                    className="bg-indigo-500/10 border-indigo-500/20"
                />
                <StatsCard
                    title="Residents Active"
                    value={stats.residentsActive.toLocaleString()}
                    icon={UserCheck}
                    trend="+2 New this week"
                    className="bg-emerald-500/10 border-emerald-500/20"
                />
                <StatsCard
                    title="Vehicles Logged"
                    value={stats.vehiclesLogged.toLocaleString()}
                    icon={Car}
                    trend="843 today"
                    className="bg-cyan-500/10 border-cyan-500/20"
                />
                <StatsCard
                    title="Security Alerts"
                    value="3"
                    icon={AlertTriangle}
                    trend="Requires attention"
                    className="bg-red-500/10 border-red-500/20 text-red-100"
                    valueColor="text-red-400"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Entries</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {entries.slice(0, 5).map((entry, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
                                            <Car className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{entry.plate}</p>
                                            <p className="text-xs text-slate-400">{entry.type} • {entry.name}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-white">{entry.time}</p>
                                        <span className={cn(
                                            "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                            entry.statusColor === 'green' && "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20",
                                            entry.statusColor === 'yellow' && "bg-yellow-500/10 text-yellow-500 ring-yellow-500/20",
                                            entry.statusColor === 'red' && "bg-red-500/10 text-red-500 ring-red-500/20"
                                        )}>
                                            {entry.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Camera Feeds</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                            {[1, 2, 3, 4].map((id, i) => (
                                <div key={i} className="aspect-video rounded bg-slate-950/50 border border-white/5 relative overflow-hidden group">
                                    {i === 0 && !error ? (
                                        <video
                                            ref={setVideoRef}
                                            autoPlay
                                            muted
                                            playsInline
                                            onLoadedMetadata={(e) => e.currentTarget.play()}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                <span className="text-xs text-slate-500">Cam {id}</span>
                                                {i === 0 && error && <span className="text-[10px] text-red-400 mt-1">{error}</span>}
                                            </div>
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function StatsCard({ title, value, icon: Icon, trend, className, valueColor = "text-white" }: any) {
    return (
        <Card className={cn("backdrop-blur-xl", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
                <div className={cn("text-2xl font-bold", valueColor)}>{value}</div>
                <p className="text-xs text-slate-400 mt-1">
                    {trend}
                </p>
            </CardContent>
        </Card>
    )
}

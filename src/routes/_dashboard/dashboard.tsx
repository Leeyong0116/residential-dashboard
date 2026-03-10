import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Users, UserCheck, Car } from 'lucide-react'
import { cn } from '../../lib/utils'
import * as React from 'react'
import { useMockData } from '../../context/MockDataContext'
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts'
import dayjs from 'dayjs'

export const Route = createFileRoute('/_dashboard/dashboard')({
    component: DashboardPage,
})

function DashboardPage() {
    const { stats, entries, isCameraOn, isGateOpen, toggleGate, dailyVisitors, dailyResidents } = useMockData()
    const videoRef = React.useRef<HTMLVideoElement | null>(null)
    const streamRef = React.useRef<MediaStream | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    const setVideoRef = React.useCallback((node: HTMLVideoElement | null) => {
        videoRef.current = node
        if (node && streamRef.current) {
            node.srcObject = streamRef.current
            node.play().catch(e => console.error("Error playing video:", e))
        }
    }, [])

    // Handle stream fetching
    React.useEffect(() => {
        let mounted = true

        if (!isCameraOn) {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop())
                streamRef.current = null
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null
            }
            return
        }

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
    }, [isCameraOn])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    {/* Date placeholder */}
                    <span className="text-sm text-slate-400">{dayjs().format('MMM DD, YYYY')}</span>
                </div>
            </div>

            {/* Top Row: 3 Columns */}
            <div className="grid gap-4 md:grid-cols-3">
                {/* Column 1: Visitors Stats */}
                <StatsCard
                    title="Total Visitors"
                    value={stats.totalVisitors.toLocaleString()}
                    icon={Users}
                    trend="+12% from last month"
                    className="bg-indigo-500/10 border-indigo-500/20"
                    chartData={dailyVisitors}
                    chartType="area"
                    chartColor="#6366f1" // indigo-500
                />

                {/* Column 2: Residents Stats */}
                <StatsCard
                    title="Residents Active"
                    value={stats.residentsActive.toLocaleString()}
                    icon={UserCheck}
                    trend="+2 New this week"
                    className="bg-emerald-500/10 border-emerald-500/20"
                    chartData={dailyResidents}
                    chartType="bar"
                    chartColor="#10b981" // emerald-500
                />

                {/* Column 3: Main Camera Feed + Gate Control */}
                <Card className="bg-slate-950/50 backdrop-blur-xl border-white/10 overflow-hidden flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Main Gate Camera</CardTitle>
                        <div className={cn(
                            "h-2 w-2 rounded-full animate-pulse",
                            isCameraOn && !error ? "bg-red-500" : "bg-slate-600"
                        )} />
                    </CardHeader>
                    <CardContent className="p-0 flex-1 relative min-h-[200px]">
                        {/* Camera Feed */}
                        <div className="absolute inset-0 bg-slate-900">
                            {!error && isCameraOn ? (
                                <video
                                    ref={setVideoRef}
                                    autoPlay
                                    muted
                                    playsInline
                                    onLoadedMetadata={(e) => e.currentTarget.play()}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                                    <span className="text-xs">{error || "Camera Off"}</span>
                                </div>
                            )}

                            {/* Overlay Gate Status */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className={cn(
                                    "px-2 py-1 text-[10px] font-bold rounded uppercase",
                                    isGateOpen ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                                )}>
                                    Gate {isGateOpen ? "Open" : "Closed"}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                    {/* Gate Control Footer */}
                    <div className="p-4 border-t border-white/10 bg-slate-900/50 flex justify-between items-center">
                        <span className="text-xs text-slate-400">Control Access</span>
                        <Button
                            size="sm"
                            variant={isGateOpen ? "destructive" : "default"}
                            onClick={toggleGate}
                            className={cn(
                                "h-8 text-xs",
                                isGateOpen ? "bg-red-500 hover:bg-red-600" : "bg-emerald-600 hover:bg-emerald-500"
                            )}
                        >
                            {isGateOpen ? "Close Gate" : "Open Gate"}
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Bottom Section: Recent Entries (Full Width) */}
            <Card className="col-span-full">
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
        </div>
    )
}

function StatsCard({ title, value, icon: Icon, trend, className, valueColor = "text-white", chartData, chartType, chartColor }: any) {
    return (
        <Card className={cn("backdrop-blur-xl flex flex-col justify-between", className)}>
            <div>
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
            </div>

            {/* Mini Chart */}
            {chartData && (
                <div className="h-[80px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        {chartType === 'area' ? (
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={false}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke={chartColor}
                                    fillOpacity={1}
                                    fill={`url(#gradient-${title})`}
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        ) : (
                            <BarChart data={chartData}>
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar
                                    dataKey="count"
                                    fill={chartColor}
                                    radius={[4, 4, 0, 0]}
                                    barSize={20}
                                />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </div>
            )}
        </Card>
    )
}

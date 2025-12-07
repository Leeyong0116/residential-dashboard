import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { Card, CardContent } from '../../components/ui/card'
import { Maximize2, Minimize2, Settings, Video } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../../components/ui/button'

export const Route = createFileRoute('/_dashboard/camera')({
    component: CameraPage,
})


function CameraPage() {
    const [fullscreenCamId, setFullscreenCamId] = React.useState<number | null>(null)
    const [error, setError] = React.useState<string | null>(null)
    const videoRef = React.useRef<HTMLVideoElement | null>(null)
    const streamRef = React.useRef<MediaStream | null>(null)

    // Handle stream fetching
    React.useEffect(() => {
        let mounted = true

        async function getCamera() {
            try {
                // Request camera access
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true // Simple constraints to ensure compatibility
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
                    setError("Camera access denied or unavailable. Please check permissions.")
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

    // Callback to handle video element mounting/remounting
    const setVideoRef = React.useCallback((node: HTMLVideoElement | null) => {
        videoRef.current = node
        if (node && streamRef.current) {
            node.srcObject = streamRef.current
            node.play().catch(e => console.error("Error playing video:", e))
        }
    }, [])

    const cameras = [
        { id: 1, name: "Main Gate - Entry", status: error ? "Error" : "Online" },
        { id: 2, name: "Main Gate - Exit", status: "Online" },
        { id: 3, name: "Lobby A", status: "Online" },
        { id: 4, name: "Car Park B1", status: "Offline" }
    ]

    const toggleFullscreen = (id: number) => {
        if (fullscreenCamId === id) {
            setFullscreenCamId(null)
        } else {
            setFullscreenCamId(id)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Live Camera Feeds</h2>
                    <p className="text-slate-400">Monitor entry points and perimeter</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Settings className="mr-2 h-4 w-4" /> Camera Config</Button>
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-md p-4 mb-4 text-red-500 flex items-center">
                    <Video className="h-5 w-5 mr-2" />
                    {error}
                </div>
            )}

            <div className={cn(
                "grid gap-6 transition-all duration-300",
                fullscreenCamId !== null ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
            )}>
                {cameras.map((cam) => {
                    const isFullscreen = fullscreenCamId === cam.id
                    if (fullscreenCamId !== null && !isFullscreen) return null

                    return (
                        <Card
                            key={cam.id}
                            className={cn(
                                "overflow-hidden border-0 bg-slate-950/80 ring-1 ring-white/10 transition-all duration-500",
                                isFullscreen ? "fixed inset-4 z-50 h-[calc(100vh-2rem)] w-[calc(100vw-2rem)]" : "aspect-video"
                            )}
                        >
                            <CardContent className="p-0 relative h-full w-full group">
                                {/* Camera Feed */}
                                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center overflow-hidden">
                                    {cam.id === 1 && !error ? (
                                        <video
                                            ref={setVideoRef}
                                            autoPlay
                                            muted
                                            playsInline
                                            onLoadedMetadata={(e) => e.currentTarget.play()}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-slate-800 to-slate-900">
                                            <Video className="h-12 w-12 text-slate-700 opacity-20 mb-2" />
                                            {cam.id === 1 && error && (
                                                <span className="text-red-400 text-sm">Failed to load feed</span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Overlay Controlls */}
                                <div className="absolute top-4 left-4 flex gap-2 z-10">
                                    <span className="bg-black/60 backdrop-blur px-2 py-1 text-xs font-mono text-white rounded">
                                        {cam.name}
                                    </span>
                                    <span className={cn(
                                        "px-2 py-1 text-xs font-bold rounded flex items-center gap-1",
                                        cam.status === 'Online' ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-700 text-slate-400',
                                        cam.status === 'Error' && 'bg-red-900/50 text-red-200'
                                    )}>
                                        {cam.status === 'Online' && <span className="h-2 w-2 rounded-full bg-white block" />}
                                        {cam.status === 'Online' ? 'LIVE' : cam.status.toUpperCase()}
                                    </span>
                                </div>

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <Button
                                        size="icon"
                                        variant="glass"
                                        className="h-8 w-8 hover:bg-white/20"
                                        onClick={() => toggleFullscreen(cam.id)}
                                    >
                                        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                                    </Button>
                                </div>

                                <div className="absolute bottom-4 left-4 font-mono text-xs text-green-400 shadow-black drop-shadow-sm z-10">
                                    REC 00:04:23
                                </div>
                                <div className="absolute bottom-4 right-4 font-mono text-xs text-white/50 z-10">
                                    1080p | 30fps
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Backdrop for fullscreen */}
            {fullscreenCamId !== null && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                    onClick={() => setFullscreenCamId(null)}
                />
            )}
        </div>
    )
}

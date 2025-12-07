import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '../../components/ui/card'
import { Maximize2, Settings, Video } from 'lucide-react'
import { Button } from '../../components/ui/button'

export const Route = createFileRoute('/_dashboard/camera')({
    component: CameraPage,
})

function CameraPage() {
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { id: 1, name: "Main Gate - Entry", status: "Online" },
                    { id: 2, name: "Main Gate - Exit", status: "Online" },
                    { id: 3, name: "Lobby A", status: "Online" },
                    { id: 4, name: "Car Park B1", status: "Offline" }
                ].map((cam) => (
                    <Card key={cam.id} className="overflow-hidden border-0 bg-slate-950/80 ring-1 ring-white/10">
                        <CardContent className="p-0 relative aspect-video group">
                            {/* Simulated Camera Feed Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                <Video className="h-12 w-12 text-slate-700 opacity-20" />
                            </div>

                            {/* Overlay Controlls */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="bg-black/60 backdrop-blur px-2 py-1 text-xs font-mono text-white rounded">
                                    {cam.name}
                                </span>
                                <span className={`px-2 py-1 text-xs font-bold rounded flex items-center gap-1 ${cam.status === 'Online' ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-700 text-slate-400'}`}>
                                    {cam.status === 'Online' && <span className="h-2 w-2 rounded-full bg-white block" />}
                                    {cam.status === 'Online' ? 'LIVE' : 'OFFLINE'}
                                </span>
                            </div>

                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="glass" className="h-8 w-8">
                                    <Maximize2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="absolute bottom-4 left-4 font-mono text-xs text-green-400 shadow-black drop-shadow-sm">
                                REC 00:04:23
                            </div>
                            <div className="absolute bottom-4 right-4 font-mono text-xs text-white/50">
                                1080p | 30fps
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

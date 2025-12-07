import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { ShieldCheck, User, Lock } from 'lucide-react'

export const Route = createFileRoute('/')({
    component: LoginPage,
})

function LoginPage() {
    const navigate = useNavigate()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulated login
        navigate({ to: '/dashboard' })
    }

    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-slate-950 overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-indigo-600/20 blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-cyan-600/10 blur-[120px]" />

            <div className="relative z-10 w-full max-w-md p-8">
                <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20 ring-1 ring-indigo-400/50">
                        <ShieldCheck className="h-8 w-8 text-indigo-400" />
                    </div>

                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                        <p className="mt-2 text-slate-400">Sign in to access the security dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="w-full space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                            <Input placeholder="Username" className="pl-10" />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                            <Input type="password" placeholder="Password" className="pl-10" />
                        </div>

                        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 h-11 text-base">
                            Sign In
                        </Button>
                    </form>

                    <div className="text-center text-xs text-slate-500">
                        Protected by ResiGuard AI Security Systems
                    </div>
                </div>
            </div>
        </div>
    )
}

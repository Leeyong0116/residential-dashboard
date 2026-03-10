import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { ShieldCheck, User, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'sonner'

export const Route = createFileRoute('/')(({
    component: LoginPage,
}))

function LoginPage() {
    const navigate = useNavigate()
    const { user, login } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (user) {
            navigate({ to: '/dashboard' })
        }
    }, [user, navigate])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error('Login Failed', { description: 'Please enter email and password' })
            return
        }
        login(email, password)
        toast.success('Welcome back!')
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
                            <Input
                                placeholder="Email"
                                type="text"
                                className="pl-10 text-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                            <Input
                                type="text"
                                placeholder="Password"
                                className="pl-10 text-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 h-11 text-base"
                        >
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

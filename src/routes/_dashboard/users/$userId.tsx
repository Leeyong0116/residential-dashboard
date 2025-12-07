import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { ArrowLeft, Save } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/users/$userId')({
    component: EditUserPage,
})

function EditUserPage() {
    const navigate = useNavigate()
    const { userId } = Route.useParams()

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/users' })}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Edit User</h2>
                    <p className="text-slate-400">ID: {userId}</p>
                </div>
            </div>

            <Card className="backdrop-blur-xl">
                <CardHeader>
                    <CardTitle>User Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Full Name</label>
                                <Input defaultValue="Alice Chen" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Email Address</label>
                                <Input type="email" defaultValue="alice@example.com" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Role</label>
                                <select className="flex h-10 w-full rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 backdrop-blur-sm">
                                    <option value="resident">Resident</option>
                                    <option value="guard">Security Guard</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Unit / Block</label>
                                <Input defaultValue="A-12-01" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Vehicle Plate Numbers</label>
                            <Input defaultValue="WUA 1234" />
                        </div>

                        <div className="pt-4 flex justify-end gap-4">
                            <Button type="button" variant="ghost" onClick={() => navigate({ to: '/users' })}>Cancel</Button>
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500">
                                <Save className="mr-2 h-4 w-4" /> Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

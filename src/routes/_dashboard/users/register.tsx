import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { ArrowLeft, Save } from 'lucide-react'
import { useMockData } from '../../../context/MockDataContext'
import * as React from 'react'

export const Route = createFileRoute('/_dashboard/users/register')({
    component: RegisterUserPage,
})

function RegisterUserPage() {
    const navigate = useNavigate()
    const { addUser } = useMockData()
    const [formData, setFormData] = React.useState({
        name: "",
        phone: "",
        role: "Resident",
        unit: "",
        vehicles: "",
    })

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        addUser({
            name: formData.name,
            phone: formData.phone,
            role: formData.role as any,
            unit: formData.unit,
            vehicles: formData.vehicles.split(",").map(v => v.trim()).filter(Boolean),
        })
        navigate({ to: '/users' })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/users' })}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-3xl font-bold tracking-tight text-white">Register New User</h2>
            </div>

            <Card className="backdrop-blur-xl">
                <CardHeader>
                    <CardTitle>User Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Full Name</label>
                                <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Phone Number</label>
                                <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="012-3456789" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="flex h-10 w-full rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 backdrop-blur-sm"
                                >
                                    <option value="Resident">Resident</option>
                                    <option value="Guard">Security Guard</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Unit / Block</label>
                                <Input name="unit" value={formData.unit} onChange={handleChange} placeholder="e.g. A-12-01" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Vehicle Plate Numbers</label>
                            <Input name="vehicles" value={formData.vehicles} onChange={handleChange} placeholder="e.g. WUA 1234, VBN 5566 (Separated by comma)" />
                        </div>

                        <div className="pt-4 flex justify-end gap-4">
                            <Button type="button" variant="ghost" onClick={() => navigate({ to: '/users' })}>Cancel</Button>
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500">
                                <Save className="mr-2 h-4 w-4" /> Register User
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { ArrowLeft, Save, Trash, Plus } from 'lucide-react'
import { useMockData } from '../../../context/MockDataContext'
import { useState, useEffect } from 'react'
import * as React from 'react'

export const Route = createFileRoute('/_dashboard/users/$userId')({
    component: EditUserPage,
})

function EditUserPage() {
    const navigate = useNavigate()
    const { userId } = Route.useParams()
    const { users, updateUser } = useMockData()

    // Find user by ID (userId is from URL params, so it might be a string)
    const currentUser = users.find(u => u.id === Number(userId))

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        role: "Resident",
        unit: "",
        vehicles: [] as { plate: string, photoUrl: string }[],
        status: "Active"
    })

    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name,
                phone: currentUser.phone,
                role: currentUser.role,
                unit: currentUser.unit,
                vehicles: currentUser.vehicles || [],
                status: currentUser.status as any
            })
        }
    }, [currentUser])

    if (!currentUser) {
        return <div className="p-8 text-center text-slate-400">User not found</div>
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, update logic would go here via context/API
        // For this mock, we are just 'updating' state locally in this component
        // But since we can't easily update the context stats without an 'updateUser' function,
        // we'll just navigate back to simulate success. 
        // Real implementation would require `updateUser` in MockDataContext.
        if (currentUser) {
            updateUser({
                ...currentUser,
                ...formData,
                role: formData.role as "Resident" | "Guard" | "Admin",
                status: formData.status as "Active" | "Inactive"
            })
        }
        navigate({ to: '/users' })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleVehicleChange = (index: number, field: 'plate' | 'photoUrl', value: string) => {
        const newVehicles = [...formData.vehicles]
        newVehicles[index] = { ...newVehicles[index], [field]: value }
        setFormData({ ...formData, vehicles: newVehicles })
    }

    const addVehicle = () => {
        setFormData({
            ...formData,
            vehicles: [...formData.vehicles, { plate: "", photoUrl: "" }]
        })
    }

    const removeVehicle = (index: number) => {
        const newVehicles = formData.vehicles.filter((_, i) => i !== index)
        setFormData({ ...formData, vehicles: newVehicles })
    }

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
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Full Name</label>
                                <Input name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Phone Number</label>
                                <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
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
                                <Input name="unit" value={formData.unit} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 backdrop-blur-sm"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-400">Vehicles</label>
                                <Button type="button" size="sm" variant="outline" onClick={addVehicle}>
                                    <Plus className="mr-2 h-3 w-3" /> Add Vehicle
                                </Button>
                            </div>

                            {formData.vehicles.map((vehicle, index) => (
                                <div key={index} className="flex gap-4 items-start p-4 rounded-lg border border-white/5 bg-black/20">
                                    <div className="grid gap-4 flex-1">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs text-slate-500">Plate Number</label>
                                                <Input
                                                    value={vehicle.plate}
                                                    onChange={(e) => handleVehicleChange(index, 'plate', e.target.value)}
                                                    placeholder="Plate No."
                                                    className="h-8"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-slate-500">Photo URL</label>
                                                <Input
                                                    value={vehicle.photoUrl}
                                                    onChange={(e) => handleVehicleChange(index, 'photoUrl', e.target.value)}
                                                    placeholder="https://..."
                                                    className="h-8"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" className="mt-6 text-slate-500 hover:text-red-400" onClick={() => removeVehicle(index)}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            {formData.vehicles.length === 0 && (
                                <div className="text-sm text-slate-500 italic p-4 text-center border border-dashed border-white/10 rounded-lg">
                                    No vehicles registered
                                </div>
                            )}
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

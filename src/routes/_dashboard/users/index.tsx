import { createFileRoute, Link } from '@tanstack/react-router'
import * as React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../components/ui/table'
import { Card, CardContent, CardHeader } from '../../../components/ui/card'
import { Button, getButtonClasses } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Plus, Search, Edit, Trash } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { useMockData } from '../../../context/MockDataContext'

export const Route = createFileRoute('/_dashboard/users/')({
    component: UsersPage,
})

function UsersPage() {
    const { users } = useMockData()
    const [searchQuery, setSearchQuery] = React.useState("")

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.vehicles.some(v => v.plate.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">User Management</h2>
                    <p className="text-slate-400">Manage residents and security personnel</p>
                </div>
                <Link
                    to="/users/register"
                    className={getButtonClasses("default")}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add User
                </Link>
            </div>

            <Card className="backdrop-blur-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="relative w-[300px]">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search name, unit, vehicle..."
                            className="pl-9 h-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Assets</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium text-white">{user.name}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.unit}</TableCell>
                                        <TableCell>{user.unit}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-2">
                                                {user.vehicles && user.vehicles.length > 0 ? (
                                                    user.vehicles.map((v, i) => (
                                                        <div key={i} className="flex items-center gap-2">
                                                            <div className="h-8 w-12 rounded overflow-hidden bg-slate-800">
                                                                {v.photoUrl ? (
                                                                    <img src={v.photoUrl} alt={v.plate} className="h-full w-full object-cover" />
                                                                ) : (
                                                                    <div className="h-full w-full flex items-center justify-center text-xs text-slate-500">No Img</div>
                                                                )}
                                                            </div>
                                                            <span className="text-xs font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 border border-slate-700">
                                                                {v.plate}
                                                            </span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="text-slate-500">-</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={cn(
                                                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                                user.status === 'Active' ? "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20" : "bg-slate-500/10 text-slate-500 ring-slate-500/20"
                                            )}>
                                                {user.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link
                                                to="/users/$userId"
                                                params={{ userId: user.id.toString() }}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-400">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

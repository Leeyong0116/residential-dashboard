import { createFileRoute, Link } from '@tanstack/react-router'
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
                        <Input placeholder="Search name, unit, vehicle..." className="pl-9 h-9" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Vehicles</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium text-white">{user.name}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.unit}</TableCell>
                                    <TableCell>{user.vehicles.join(", ") || "-"}</TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                            user.status === 'Active' ? "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20" : "bg-slate-500/10 text-slate-500 ring-slate-500/20"
                                        )}>
                                            {user.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-400">
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

import { createFileRoute } from '@tanstack/react-router'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../components/ui/table'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Filter, Download } from 'lucide-react'
import { cn } from '../../lib/utils'

import { useMockData } from '../../context/MockDataContext'

export const Route = createFileRoute('/_dashboard/entry-logs')({
    component: EntryLogsPage,
})

function EntryLogsPage() {
    const { entries } = useMockData()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Entry Logs</h2>
                    <p className="text-slate-400">View and manage entry history</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
                </div>
            </div>

            <Card className="backdrop-blur-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex gap-2">
                        <Input placeholder="Search plates..." className="w-[300px] h-9" />
                        <Button variant="outline" size="sm" className="h-9"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Car Plate</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Name/Details</TableHead>
                                <TableHead>Time Stamp</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {entries.map((entry) => (
                                <TableRow key={entry.id}>
                                    <TableCell className="font-medium text-white">{entry.plate}</TableCell>
                                    <TableCell>{entry.type}</TableCell>
                                    <TableCell>{entry.name}</TableCell>
                                    <TableCell>{entry.time}</TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                            entry.statusColor === 'green' && "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20",
                                            entry.statusColor === 'yellow' && "bg-yellow-500/10 text-yellow-500 ring-yellow-500/20",
                                            entry.statusColor === 'red' && "bg-red-500/10 text-red-500 ring-red-500/20"
                                        )}>
                                            {entry.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300">View</Button>
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

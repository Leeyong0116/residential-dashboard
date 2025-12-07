import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
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
import { Download } from 'lucide-react'
import { cn } from '../../lib/utils'

import { useMockData } from '../../context/MockDataContext'

export const Route = createFileRoute('/_dashboard/entry-logs')({
    component: EntryLogsPage,
})


function EntryLogsPage() {
    const { entries } = useMockData()
    const [searchQuery, setSearchQuery] = React.useState("")

    const filteredEntries = entries.filter(entry =>
        entry.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.type.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const residentEntries = filteredEntries.filter(entry => entry.type === "Resident")
    const visitorEntries = filteredEntries.filter(entry => entry.type !== "Resident")

    const renderTable = (data: typeof entries, title: string) => (
        <Card className="backdrop-blur-xl h-full">
            <CardHeader>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Car Plate</TableHead>
                            <TableHead>Name/Details</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((entry) => (
                                <TableRow key={entry.id}>
                                    <TableCell className="font-medium text-white">{entry.plate}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{entry.name}</span>
                                            <span className="text-xs text-slate-500">{entry.type}</span>
                                        </div>
                                    </TableCell>
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
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No entries found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )

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

            <div className="flex items-center gap-2 mb-6">
                <div className="relative w-[300px]">
                    <Input
                        placeholder="Search plates, names..."
                        className="h-9 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {renderTable(residentEntries, "Residents")}
                {renderTable(visitorEntries, "Visitors")}
            </div>
        </div>
    )
}

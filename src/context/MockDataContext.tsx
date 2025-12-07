import { createContext, useContext, useState, ReactNode } from 'react'

export interface User {
    id: number
    name: string
    phone: string
    role: "Resident" | "Guard" | "Admin"
    unit: string
    vehicles: string[]
    status: "Active" | "Inactive"
}

export interface EntryLog {
    id: number
    plate: string
    type: "Visitor" | "Resident" | "Delivery" | "Unknown"
    name: string
    time: string
    status: "Granted" | "Pending" | "Denied"
    statusColor: "green" | "yellow" | "red"
}

export interface Camera {
    id: number
    name: string
    status: "Online" | "Offline"
}

interface MockDataContextType {
    users: User[]
    entries: EntryLog[]
    cameras: Camera[]
    addUser: (user: Omit<User, "id" | "status">) => void
    addEntry: (entry: Omit<EntryLog, "id">) => void
    stats: {
        totalVisitors: number
        residentsActive: number
        vehiclesLogged: number
    }
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined)

export function MockDataProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: "Alice Chen", phone: "012-3456789", role: "Resident", unit: "A-12-01", vehicles: ["WUA 1234"], status: "Active" },
        { id: 2, name: "Bob Smith", phone: "012-9876543", role: "Resident", unit: "B-05-02", vehicles: ["WXA 1122", "JKA 3344"], status: "Active" },
        { id: 3, name: "Charlie Tan", phone: "019-1122334", role: "Guard", unit: "-", vehicles: [], status: "Active" },
        { id: 4, name: "David Lee", phone: "017-5566778", role: "Resident", unit: "A-01-01", vehicles: ["BGT 7788"], status: "Inactive" },
    ])

    const [entries, setEntries] = useState<EntryLog[]>([
        { id: 1, plate: "WUA 1234", type: "Visitor", name: "John Doe", time: "10:42 AM", status: "Granted", statusColor: "green" },
        { id: 2, plate: "VBA 5566", type: "Resident", name: "Alice Chen", time: "10:30 AM", status: "Granted", statusColor: "green" },
        { id: 3, plate: "WXC 9988", type: "Delivery", name: "GrabFood", time: "10:15 AM", status: "Pending", statusColor: "yellow" },
        { id: 4, plate: "UNKNOWN", type: "Unknown", name: "---", time: "09:55 AM", status: "Denied", statusColor: "red" },
        { id: 5, plate: "WXA 1122", type: "Resident", name: "Bob Smith", time: "09:40 AM", status: "Granted", statusColor: "green" },
        { id: 6, plate: "JKA 3344", type: "Visitor", name: "Jane Tan", time: "09:12 AM", status: "Granted", statusColor: "green" },
    ])

    const [cameras] = useState<Camera[]>([
        { id: 1, name: "Main Gate - Entry", status: "Online" },
        { id: 2, name: "Main Gate - Exit", status: "Online" },
        { id: 3, name: "Lobby A", status: "Online" },
        { id: 4, name: "Car Park B1", status: "Offline" }
    ])

    const addUser = (newUser: Omit<User, "id" | "status">) => {
        const user: User = {
            ...newUser,
            id: users.length + 1,
            status: "Active"
        }
        setUsers([...users, user])
    }

    const addEntry = (newEntry: Omit<EntryLog, "id">) => {
        const entry: EntryLog = {
            ...newEntry,
            id: entries.length + 1
        }
        setEntries([entry, ...entries])
    }

    const stats = {
        totalVisitors: entries.filter(e => e.type === "Visitor").length + 5400, // Mock base value
        residentsActive: users.filter(u => u.role === "Resident" && u.status === "Active").length + 1890, // Mock base value
        vehiclesLogged: entries.length + 12200, // Mock base value
    }

    return (
        <MockDataContext.Provider value={{ users, entries, cameras, addUser, addEntry, stats }}>
            {children}
        </MockDataContext.Provider>
    )
}

export function useMockData() {
    const context = useContext(MockDataContext)
    if (context === undefined) {
        throw new Error('useMockData must be used within a MockDataProvider')
    }
    return context
}

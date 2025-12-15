import { createContext, useContext, useState } from 'react'
import { toast } from 'sonner'
import type { ReactNode } from 'react'

export interface User {
    id: number
    name: string
    phone: string
    role: "Resident" | "Guard" | "Admin"
    unit: string
    vehicles: Vehicle[]
    status: "Active" | "Inactive"
}

export interface Vehicle {
    plate: string
    photoUrl: string // URL to vehicle photo
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
    updateUser: (user: User) => void
    addEntry: (entry: Omit<EntryLog, "id">) => void
    stats: {
        totalVisitors: number
        residentsActive: number
        vehiclesLogged: number
    }
    dailyVisitors: DailyStats[]
    dailyResidents: DailyStats[]
    isCameraOn: boolean
    toggleCamera: () => void
    notifications: Notification[]
    addNotification: (message: string) => void
    markAllRead: () => void
    isGateOpen: boolean
    toggleGate: () => void
}

export interface Notification {
    id: number
    message: string
    time: string
    read: boolean
}

export interface DailyStats {
    day: string
    count: number
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined)

export function MockDataProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            name: "Alice Chen",
            phone: "012-3456789",
            role: "Resident",
            unit: "A-12-01",
            vehicles: [
                { plate: "WUA 1234", photoUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=300" }
            ],
            status: "Active"
        },
        {
            id: 2,
            name: "Bob Smith",
            phone: "012-9876543",
            role: "Resident",
            unit: "B-05-02",
            vehicles: [
                { plate: "WXA 1122", photoUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=300" },
                { plate: "JKA 3344", photoUrl: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=300" }
            ],
            status: "Active"
        },
        { id: 3, name: "Charlie Tan", phone: "019-1122334", role: "Guard", unit: "-", vehicles: [], status: "Active" },
        {
            id: 4,
            name: "David Lee",
            phone: "017-5566778",
            role: "Resident",
            unit: "A-01-01",
            vehicles: [
                { plate: "BGT 7788", photoUrl: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&q=80&w=300" }
            ],
            status: "Inactive"
        },
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

    const updateUser = (updatedUser: User) => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u))
    }

    const addEntry = (newEntry: Omit<EntryLog, "id">) => {
        const entry: EntryLog = {
            ...newEntry,
            id: entries.length + 1
        }
        setEntries([entry, ...entries])
        addNotification(`New entry logged: ${newEntry.plate} (${newEntry.type})`)
    }

    const stats = {
        totalVisitors: entries.filter(e => e.type === "Visitor").length + 5400, // Mock base value
        residentsActive: users.filter(u => u.role === "Resident" && u.status === "Active").length + 1890, // Mock base value
        vehiclesLogged: entries.length + 12200, // Mock base value
    }

    const dailyVisitors: DailyStats[] = [
        { day: 'Mon', count: 120 },
        { day: 'Tue', count: 145 },
        { day: 'Wed', count: 132 },
        { day: 'Thu', count: 156 },
        { day: 'Fri', count: 189 },
        { day: 'Sat', count: 210 },
        { day: 'Sun', count: 175 },
    ]

    const dailyResidents: DailyStats[] = [
        { day: 'Mon', count: 85 },
        { day: 'Tue', count: 90 },
        { day: 'Wed', count: 88 },
        { day: 'Thu', count: 92 },
        { day: 'Fri', count: 95 },
        { day: 'Sat', count: 70 },
        { day: 'Sun', count: 75 },
    ]

    const [isCameraOn, setIsCameraOn] = useState(true)
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: 1, message: "Visitor John Doe granted access", time: "10:42 AM", read: false },
        { id: 2, message: "Suspicious vehicle detected at Gate B", time: "10:30 AM", read: false },
    ])

    const toggleCamera = () => setIsCameraOn(prev => !prev)

    const addNotification = (message: string) => {
        const newNotification: Notification = {
            id: Date.now(),
            message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
        }
        setNotifications([newNotification, ...notifications])

        // Trigger Sonner toast
        toast(message, {
            description: newNotification.time,
        })
    }

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })))
    }

    const [isGateOpen, setIsGateOpen] = useState(false)
    const toggleGate = () => {
        const newState = !isGateOpen
        setIsGateOpen(newState)
        addNotification(newState ? "Main Gate Opened" : "Main Gate Closed")
    }

    return (
        <MockDataContext.Provider value={{
            users,
            entries,
            cameras,
            addUser,
            updateUser,
            addEntry,
            stats,
            dailyVisitors,
            dailyResidents,
            isCameraOn,
            toggleCamera,
            notifications,
            addNotification,
            markAllRead,
            isGateOpen,
            toggleGate,
        }}>
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

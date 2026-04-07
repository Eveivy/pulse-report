'use client';

import { 
    BarChart3, 
    Layout,
    LogOut,
    Menu,
    Search,
    Settings,
    Users,
    X,
} from 'lucide-react';
import { useAtomValue } from 'jotai';
import { profileAtom } from '@/store/auth';
import { useState } from 'react';
import Link from 'next/link';
import { LogoutButton } from './logout-button';

export default function Header() {
    const user = useAtomValue(profileAtom);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    return (
        < header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border dark:bg-background/95" >
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="rounded-lg p-2 hover:bg-secondary dark:hover:bg-secondary"
                    >
                        {sidebarOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-accent" />
                        <span className="text-lg font-semibold">{user?.name}</span>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center px-8 max-w-md">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full rounded-lg border border-border bg-secondary py-2 pl-10 pr-4 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent dark:bg-input dark:border-border"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="rounded-lg p-2 hover:bg-secondary dark:hover:bg-secondary">
                        <Settings className="h-5 w-5" />
                    </button>
                    <LogoutButton />
                    {/* <button className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary dark:hover:bg-secondary">
                        <LogOut className="h-5 w-5" />
                    </button> */}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-t border-border px-6 dark:border-border">
                <div className="flex gap-8">
                    {[
                        { id: 'overview', label: 'Overview', icon: Layout },
                        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                        { id: 'users', label: 'Users', icon: Users }, 
                        { id: 'settings', label: 'Settings', icon: Settings },
                    ].map(({ id, label, icon: Icon }) => (
                        <Link href={`/admin/${id === 'overview' ? '' : id}`}
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition-colors ${activeTab.includes(id)
                                ? 'border-accent text-foreground'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    )
}

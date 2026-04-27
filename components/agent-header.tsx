'use client';

import { useAtomValue } from 'jotai';
import { profileAtom } from '@/store/auth';
import { useState } from 'react';
import Link from 'next/link';
import { LogoutButton } from './logout-button';
import { mockAgentReports } from '@/lib/data';
import {
    Activity,
    AlertCircle,
    AlertTriangle,
    CheckCircle,
    Clock,
    Filter,
    Zap,
    Search,
    RefreshCw
} from 'lucide-react';

export default function AgentHeader() {
    const user = useAtomValue(profileAtom);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [autoRefresh, setAutoRefresh] = useState(true);

    return (

        <header
            className={`fixed top-0 right-0 z-10 bg-card border-b border-border py-4 px-8 flex items-center justify-between transition-all duration-300 ${sidebarOpen ? "left-64" : "left-20"
                }`}
        >
            <div className="flex items-center gap-4 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-foreground truncate">
                    Live Agent Reports
                </h1>

                <div className="hidden sm:flex items-center gap-2 ml-auto text-sm text-muted-foreground">
                    <Activity size={16} className="animate-pulse text-green-500 shrink-0" />
                    <span>
                        {mockAgentReports.filter((a) => a.status === "active").length} Active
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4 ml-4">
                <button
                    type="button"
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    className={`p-2 rounded-lg transition-colors ${autoRefresh
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground hover:bg-secondary"
                        }`}
                    title={autoRefresh ? "Disable auto-refresh" : "Enable auto-refresh"}
                >
                    <RefreshCw size={18} className={autoRefresh ? "animate-spin" : ""} />
                </button>

                <div className="relative hidden md:block">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                        type="text"
                        placeholder="Search agents..."
                        className="w-64 pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>
            </div>
        </header>
        // <header className="bg-card border-b border-border py-4 flex items-center justify-between px-8 fixed top-0 z-10">
        //     <div className="flex items-center gap-4 flex-1">
        //         <h1 className="text-2xl font-bold text-foreground">Live Agent Reports</h1>
        //         <div className="flex items-center gap-2 ml-auto text-sm text-muted-foreground">
        //             <Activity size={16} className="animate-pulse text-green-500" />
        //             <span>{mockAgentReports.filter((a) => a.status === 'active').length} Active</span>
        //         </div>
        //     </div>

        //     <div className="flex items-center gap-4">
        //         <button
        //             onClick={() => setAutoRefresh(!autoRefresh)}
        //             className={`p-2 rounded-lg transition-colors ${autoRefresh
        //                 ? 'bg-accent text-accent-foreground'
        //                 : 'bg-muted text-muted-foreground hover:bg-secondary'
        //                 }`}
        //             title={autoRefresh ? 'Disable auto-refresh' : 'Enable auto-refresh'}
        //         >
        //             <RefreshCw size={18} className={autoRefresh ? 'animate-spin' : ''} />
        //         </button>
        //         <div className="relative">
        //             <Search
        //                 size={18}
        //                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        //             />
        //             <input
        //                 type="text"
        //                 placeholder="Search agents..."
        //                 className="pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        //             />
        //         </div>
        //     </div>
        // </header>

    )
}


'use client';

import { useState } from 'react';
import {
    Activity,
    Clock,
    Database,
    GitBranch,
    Icon,
} from 'lucide-react';
import Link from 'next/link';


export default function SideBar() {
    const [sidebarOpen, ] = useState(true); 
    return (
        <>
            {
                sidebarOpen && (
                    <aside className="w-64 border-r border-border bg-secondary dark:border-border dark:bg-card">
                        <nav className="space-y-2 p-6">
                            {[
                                { icon: Activity, label: 'Live Activity', badge: '12' },
                                { icon: Activity, label: 'All Users', badge: '12' },
                                { icon: Activity, label: 'Agents', badge: '50' },
                                { icon: Database, label: 'Database', badge: null },
                                { icon: GitBranch, label: 'Deployments', badge: '3' },
                                { icon: Clock, label: 'History', badge: null },
                            ].map(({ icon: Icon, label, badge }) => (
                                <Link href={`users/${label.toLowerCase().replace(' ', '-')}`}
                                    key={label}
                                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-background hover:text-foreground dark:hover:bg-background"
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="h-4 w-4" />
                                        {label}
                                    </div>
                                    {badge && (
                                        <span className="rounded bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
                                            {badge}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </nav>
                    </aside>
                )

            }
        </>
    )
}

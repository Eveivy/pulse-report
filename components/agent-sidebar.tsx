
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Filter,
    LogOut,
    Menu,
    RefreshCw,
    Search,
    Settings,
    X,
    Zap,
} from 'lucide-react';
import { mockAgentReports } from '@/lib/data';
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users } from "lucide-react";

const navItems = [ 
    {
        name: "Reports",
        href: "/agent/reports",
        icon: FileText,
    },
    {
        name: "Agents",
        href: "/agents",
        icon: Users,
    },
];


export default function AgentSideBar() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const pathname = usePathname();


    return (
        <>
            {
                sidebarOpen && (
                    <aside
                        className={`sticky top-0 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300 flex flex-col ${sidebarOpen ? "w-64" : "w-20"
                            }`}
                    >
                        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
                            {sidebarOpen && (
                                <div className="font-bold text-lg text-sidebar-foreground">
                                    Reports
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 hover:bg-sidebar-accent rounded-lg text-sidebar-foreground ml-auto"
                            >
                                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>

                        {/* <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                            {sidebarOpen && (
                                <div className="px-2 py-1 text-xs font-semibold text-sidebar-accent-foreground/50 uppercase tracking-wider">
                                    Active Agents
                                </div>
                            )}

                            {mockAgentReports.map((agent) => {
                                const isActive = selectedAgent === agent.id;

                                return (
                                    <Link
                                        key={agent.id}
                                        href="/agent/reports"
                                        // onClick={() => setSelectedAgent(agent.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                                : "text-sidebar-foreground hover:bg-sidebar-accent"
                                            } ${!sidebarOpen ? "justify-center" : ""}`}
                                    >
                                        <span
                                            className={`w-2 h-2 rounded-full shrink-0 ${agent.status === "active"
                                                    ? "bg-green-500 animate-pulse"
                                                    : agent.status === "warning"
                                                        ? "bg-yellow-500"
                                                        : "bg-gray-500"
                                                }`}
                                        />

                                        {sidebarOpen && (
                                            <span className="truncate text-xs">
                                                {agent.name.split(" ")[0]}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav> */}

                        <nav className="flex-1 p-4 space-y-2">
                            {navItems.map((item) => {
                                const isActive =
                                    pathname === item.href ||
                                    pathname.startsWith(item.href + "/"); // handles nested routes

                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? "bg-sidebar-primary text-blue-500"
                                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                                            } ${!sidebarOpen ? "justify-center" : ""}`}
                                    >
                                        <Icon size={18} className="shrink-0" />

                                        {sidebarOpen && (
                                            <span className="truncate text-xs">
                                                {item.name}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="p-4 border-t border-sidebar-border space-y-2">
                            <button
                                type="button"
                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground text-sm ${sidebarOpen ? "justify-start" : "justify-center"
                                    }`}
                            >
                                <Settings size={18} />
                                {sidebarOpen && <span>Settings</span>}
                            </button>

                            <button
                                type="button"
                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground text-sm ${sidebarOpen ? "justify-start" : "justify-center"
                                    }`}
                            >
                                <LogOut size={18} />
                                {sidebarOpen && <span>Logout</span>}
                            </button>
                        </div>
                    </aside>
                    // <aside className="w-64 border-r sticky border-border bg-secondary dark:border-border dark:bg-card">
                    //     <div
                    //         className={`${sidebarOpen ? 'w-64' : 'w-20'
                    //             } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
                    //     >
                    //         <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
                    //             <div
                    //                 className={`font-bold text-lg text-sidebar-foreground transition-all ${!sidebarOpen && 'hidden'
                    //                     }`}
                    //             >
                    //                 Reports
                    //             </div>
                    //             <button
                    //                 onClick={() => setSidebarOpen(!sidebarOpen)}
                    //                 className="p-2 hover:bg-sidebar-accent rounded-lg text-sidebar-foreground"
                    //             >
                    //                 {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    //             </button>
                    //         </div>

                    //         <nav className="flex-1 p-4 space-y-2">
                    //             <div className="px-2 py-1 text-xs font-semibold text-sidebar-accent-foreground/50 uppercase tracking-wider">
                    //                 {sidebarOpen ? 'Active Agents' : ''}
                    //             </div>
                    //             {mockAgentReports.map((agent) => (
                    //                 <button
                    //                     key={agent.id}
                    //                     //   onClick={() => setSelectedAgent(agent.id)}
                    //                     className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedAgent === agent.id
                    //                         ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    //                         : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    //                         }`}
                    //                 >
                    //                     <Link href="/agent/reports" className='flex items-center gap-3'>
                    //                         <div
                    //                             className={`w-2 h-2 rounded-full ${agent.status === 'active'
                    //                                 ? 'bg-green-500 animate-pulse'
                    //                                 : agent.status === 'warning'
                    //                                     ? 'bg-yellow-500'
                    //                                     : 'bg-gray-500'
                    //                                 }`}
                    //                         />
                    //                         {sidebarOpen && (
                    //                             <span className="truncate text-xs">{agent.name.split(' ')[0]}</span>
                    //                         )}
                    //                     </Link>
                    //                 </button>
                    //             ))}
                    //         </nav>

                    //         <div className="p-4 border-t border-sidebar-border space-y-2">
                    //             <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground text-sm">
                    //                 <Settings size={18} />
                    //                 {sidebarOpen && <span>Settings</span>}
                    //             </button>
                    //             <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground text-sm">
                    //                 <LogOut size={18} />
                    //                 {sidebarOpen && <span>Logout</span>}
                    //             </button>
                    //         </div>
                    //     </div>
                    // </aside>
                )

            }
        </>
    )
}

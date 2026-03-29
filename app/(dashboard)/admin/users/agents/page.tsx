"use client";


import AddAgent from '@/components/add-agent';
import { useState } from 'react';

const usersData = [
    { id: 1, name: 'Alex Thompson', email: 'alex@example.com', status: 'Active', joined: '2024-01-15' },
    { id: 2, name: 'Jordan Lee', email: 'jordan@example.com', status: 'Active', joined: '2024-01-20' },
    { id: 3, name: 'Morgan Smith', email: 'morgan@example.com', status: 'Inactive', joined: '2023-12-10' },
    { id: 4, name: 'Casey Johnson', email: 'casey@example.com', status: 'Active', joined: '2024-02-01' },
    { id: 5, name: 'Riley Brown', email: 'riley@example.com', status: 'Active', joined: '2024-02-05' },
];

export default function AgentsPage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Users</h2>
                    <button onClick={() => setIsOpen(true)} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90">
                        Add User
                    </button>
                </div>

                <div className="rounded-lg border border-border bg-card dark:border-border dark:bg-background">
                    <table className="w-full">
                        <thead className="border-b border-border dark:border-border">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                                    Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                                    Joined
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border dark:divide-border">
                            {usersData.map((user) => (
                                <tr key={user.id} className="hover:bg-secondary dark:hover:bg-secondary">
                                    <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.status === 'Active'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-gray-500/10 text-gray-500'
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.joined}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <button className="text-accent hover:text-accent/80">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isOpen &&
                <AddAgent
                    isOpen={isOpen}
                    closeModal={() => setIsOpen(false)}
                />}
        </>
    )
}


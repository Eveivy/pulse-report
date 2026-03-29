'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
} from 'recharts';
import {
    Activity,
    AlertCircle,
    ArrowUp,
    ArrowDown,
    Clock,
    TrendingUp
} from 'lucide-react';



// Mock data
const analyticsData = [
    { name: '12 AM', value: 2400, requests: 2210, errors: 290 },
    { name: '2 AM', value: 3398, requests: 2290, errors: 9221 },
    { name: '4 AM', value: 2000, requests: 9800, errors: 2290 },
    { name: '6 AM', value: 2780, requests: 3908, errors: 2000 },
    { name: '8 AM', value: 1890, requests: 4800, errors: 2181 },
    { name: '10 AM', value: 2390, requests: 3800, errors: 2500 },
    { name: '12 PM', value: 3490, requests: 4300, errors: 2100 },
];


const requestsData = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 5200 },
    { name: 'Thu', value: 4278 },
    { name: 'Fri', value: 5890 },
    { name: 'Sat', value: 3908 },
    { name: 'Sun', value: 4800 },
];


export default function Overview() {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    {
                        label: 'Total Requests',
                        value: '2.4M',
                        change: '+12.5%',
                        positive: true,
                        icon: TrendingUp,
                    },
                    {
                        label: 'Error Rate',
                        value: '0.32%',
                        change: '-2.3%',
                        positive: true,
                        icon: AlertCircle,
                    },
                    {
                        label: 'Avg Response',
                        value: '245ms',
                        change: '-8.1%',
                        positive: true,
                        icon: Clock,
                    },
                    {
                        label: 'Uptime',
                        value: '99.99%',
                        change: '+0.01%',
                        positive: true,
                        icon: Activity,
                    },
                ].map(({ label, value, change, positive, icon: Icon }) => (
                    <div
                        key={label}
                        className="rounded-lg border border-border bg-card p-6 dark:border-border dark:bg-background"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                                <p className="mt-2 text-3xl font-semibold">{value}</p>
                            </div>
                            <div className="rounded-lg bg-secondary p-3 dark:bg-secondary">
                                <Icon className="h-5 w-5 text-accent" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-1">
                            {positive ? (
                                <ArrowUp className="h-4 w-4 text-green-500" />
                            ) : (
                                <ArrowDown className="h-4 w-4 text-red-500" />
                            )}
                            <span
                                className={`text-sm font-medium ${positive ? 'text-green-500' : 'text-red-500'}`}
                            >
                                {change}
                            </span>
                            <span className="text-sm text-muted-foreground">vs last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="col-span-2 rounded-lg border border-border bg-card p-6 dark:border-border dark:bg-background">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Analytics</h3>
                        <select className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm dark:bg-input dark:border-border">
                            <option>Last 12 hours</option>
                            <option>Last 24 hours</option>
                            <option>Last 7 days</option>
                        </select>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={analyticsData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#282828" />
                            <XAxis dataKey="name" stroke="#a0a0a0" />
                            <YAxis stroke="#a0a0a0" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1a1a1a',
                                    border: '1px solid #282828',
                                    borderRadius: '8px',
                                }}
                            />
                            {/* <AreaChart
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          fillOpacity={1}
                          fill="url(#colorValue)"
                        /> */}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="rounded-lg border border-border bg-card p-6 dark:border-border dark:bg-background">
                    <h3 className="mb-6 text-lg font-semibold">Requests</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={requestsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#282828" />
                            <XAxis dataKey="name" stroke="#a0a0a0" />
                            <YAxis stroke="#a0a0a0" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1a1a1a',
                                    border: '1px solid #282828',
                                    borderRadius: '8px',
                                }}
                            />
                            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

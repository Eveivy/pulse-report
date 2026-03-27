'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  Activity,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  BarChart3,
  Clock,
  Database,
  GitBranch,
  Layout,
  LogOut,
  Menu,
  Search,
  Settings,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { useAtomValue } from 'jotai';
import { profileAtom } from '@/store/auth';
import AddAgent from '@/components/add-agent';

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

const usersData = [
  { id: 1, name: 'Alex Thompson', email: 'alex@example.com', status: 'Active', joined: '2024-01-15' },
  { id: 2, name: 'Jordan Lee', email: 'jordan@example.com', status: 'Active', joined: '2024-01-20' },
  { id: 3, name: 'Morgan Smith', email: 'morgan@example.com', status: 'Inactive', joined: '2023-12-10' },
  { id: 4, name: 'Casey Johnson', email: 'casey@example.com', status: 'Active', joined: '2024-02-01' },
  { id: 5, name: 'Riley Brown', email: 'riley@example.com', status: 'Active', joined: '2024-02-05' },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isOpen, setIsOpen] = useState(false)

  const user = useAtomValue(profileAtom);

  console.log(user)


  return (
    <>
      <div className="min-h-screen bg-background text-foreground dark:bg-dark dark:text-white">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border dark:bg-background/95">
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
              <button className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary dark:hover:bg-secondary">
                <LogOut className="h-5 w-5" />
              </button>
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
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition-colors ${activeTab === id
                    ? 'border-accent text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          {sidebarOpen && (
            <aside className="w-64 border-r border-border bg-secondary dark:border-border dark:bg-card">
              <nav className="space-y-2 p-6">
                {[
                  { icon: Activity, label: 'Live Activity', badge: '12' },
                  { icon: Database, label: 'Database', badge: null },
                  { icon: GitBranch, label: 'Deployments', badge: '3' },
                  { icon: Clock, label: 'History', badge: null },
                ].map(({ icon: Icon, label, badge }) => (
                  <button
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
                  </button>
                ))}
              </nav>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 p-8">
            {activeTab === 'overview' && (
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
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Detailed Analytics</h2>
                <div className="rounded-lg border border-border bg-card p-6 dark:border-border dark:bg-background">
                  <h3 className="mb-6 text-lg font-semibold">Request Distribution</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={analyticsData}>
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
                      <Legend />
                      <Line type="monotone" dataKey="requests" stroke="#3b82f6" dot={false} />
                      <Line type="monotone" dataKey="errors" stroke="#ef4444" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
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
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Settings</h2>
                <div className="rounded-lg border border-border bg-card p-6 dark:border-border dark:bg-background">
                  <h3 className="text-lg font-semibold">Application Settings</h3>
                  <div className="mt-6 space-y-6">
                    {[
                      { label: 'API Keys', description: 'Manage your API keys' },
                      { label: 'Webhooks', description: 'Configure webhook endpoints' },
                      { label: 'Notifications', description: 'Manage notification preferences' },
                    ].map(({ label, description }) => (
                      <div key={label} className="flex items-center justify-between border-b border-border py-4 dark:border-border">
                        <div>
                          <p className="font-medium">{label}</p>
                          <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                        <button className="rounded-lg px-4 py-2 hover:bg-secondary dark:hover:bg-secondary">
                          Configure
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {isOpen &&
        <AddAgent
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
        />}
    </>
  );
}

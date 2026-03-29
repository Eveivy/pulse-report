"use client";

import { 
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer, 
} from 'recharts';


const analyticsData = [
  { name: '12 AM', value: 2400, requests: 2210, errors: 290 },
  { name: '2 AM', value: 3398, requests: 2290, errors: 9221 },
  { name: '4 AM', value: 2000, requests: 9800, errors: 2290 },
  { name: '6 AM', value: 2780, requests: 3908, errors: 2000 },
  { name: '8 AM', value: 1890, requests: 4800, errors: 2181 },
  { name: '10 AM', value: 2390, requests: 3800, errors: 2500 },
  { name: '12 PM', value: 3490, requests: 4300, errors: 2100 },
];



export default function AnalyticsPage() {
  return (
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
  )
}


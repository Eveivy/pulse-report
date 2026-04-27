'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Activity,
   AlertTriangle,
  CheckCircle,
  Clock,
  Filter, 
  Zap,
} from 'lucide-react'; 
import { mockAgentReports } from '@/lib/data';

// Mock agent data with live updates


const performanceData = [
  { time: '00:00', alpha: 89, beta: 76, gamma: 92, delta: 65 },
  { time: '04:00', alpha: 92, beta: 78, gamma: 95, delta: 68 },
  { time: '08:00', alpha: 95, beta: 82, gamma: 98, delta: 72 },
  { time: '12:00', alpha: 98, beta: 85, gamma: 96, delta: 75 },
  { time: '16:00', alpha: 94, beta: 88, gamma: 99, delta: 78 },
  { time: '20:00', alpha: 96, beta: 90, gamma: 97, delta: 81 },
  { time: '23:59', alpha: 98.5, beta: 97.2, gamma: 99.1, delta: 94.3 },
];

const tasksData = [
  { time: '12:00 AM', completed: 120, failed: 5, pending: 12 },
  { time: '4:00 AM', completed: 180, failed: 8, pending: 15 },
  { time: '8:00 AM', completed: 340, failed: 12, pending: 25 },
  { time: '12:00 PM', completed: 520, failed: 18, pending: 40 },
  { time: '4:00 PM', completed: 380, failed: 14, pending: 22 },
  { time: '8:00 PM', completed: 290, failed: 10, pending: 18 },
  { time: '11:59 PM', completed: 1243, failed: 52, pending: 8 },
];

const liveActivityLog = [
  {
    id: 1,
    agent: 'Report Generator Alpha',
    action: 'Completed quarterly report',
    timestamp: 'now',
    type: 'success',
  },
  {
    id: 2,
    agent: 'Data Analyst Beta',
    action: 'Processing customer metrics',
    timestamp: '30s ago',
    type: 'processing',
  },
  {
    id: 3,
    agent: 'Report Validator Delta',
    action: 'High memory usage detected',
    timestamp: '2m ago',
    type: 'warning',
  },
  {
    id: 4,
    agent: 'Insight Engine Gamma',
    action: 'Idle - waiting for tasks',
    timestamp: '15m ago',
    type: 'idle',
  },
  {
    id: 5,
    agent: 'Report Generator Alpha',
    action: 'Generated executive summary',
    timestamp: '22m ago',
    type: 'success',
  },
];

export default function AgentReportsDashboard() { 

  return (
      <div className="p-8 space-y-8">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {mockAgentReports.map((agent) => (
            <div
              key={agent.id}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors cursor-pointer"
            //   onClick={() => setSelectedAgent(agent.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-3 h-3 rounded-full ${agent.status === 'active'
                      ? 'bg-green-500 animate-pulse'
                      : agent.status === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-gray-500'
                      }`}
                  />
                  <h3 className="font-semibold text-foreground text-sm truncate">
                    {agent.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Success Rate</span>
                    <span className="text-sm font-bold text-foreground">
                      {agent.successRate}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{ width: `${agent.successRate}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary rounded p-2">
                    <div className="text-xs text-muted-foreground">Completed</div>
                    <div className="text-lg font-bold text-foreground">
                      {agent.tasksCompleted}
                    </div>
                  </div>
                  <div className="bg-secondary rounded p-2">
                    <div className="text-xs text-muted-foreground">In Progress</div>
                    <div className="text-lg font-bold text-accent">
                      {agent.tasksInProgress}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border">
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Memory</div>
                    <div className="flex items-center gap-1">
                      <div className="w-full bg-secondary rounded h-1.5">
                        <div
                          className={`h-1.5 rounded ${agent.memory > 70
                            ? 'bg-red-500'
                            : agent.memory > 50
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            }`}
                          style={{ width: `${agent.memory}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground">
                        {agent.memory}%
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">CPU</div>
                    <div className="flex items-center gap-1">
                      <div className="w-full bg-secondary rounded h-1.5">
                        <div
                          className={`h-1.5 rounded ${agent.cpu > 70
                            ? 'bg-red-500'
                            : agent.cpu > 50
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            }`}
                          style={{ width: `${agent.cpu}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground">
                        {agent.cpu}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                  Last report: {agent.lastReport}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Success Rate Trend</h3>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-muted-foreground cursor-pointer" />
              <span className="text-sm text-muted-foreground">24h</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#888" style={{ fontSize: '12px' }} />
              <YAxis stroke="#888" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                }}
                cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="alpha"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Report Generator Alpha"
              />
              <Line
                type="monotone"
                dataKey="beta"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={false}
                name="Data Analyst Beta"
              />
              <Line
                type="monotone"
                dataKey="gamma"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
                name="Insight Engine Gamma"
              />
              <Line
                type="monotone"
                dataKey="delta"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                name="Report Validator Delta"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tasks Overview */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Tasks Overview</h3>
              <span className="text-sm text-muted-foreground">Last 24h</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={tasksData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="time" stroke="#888" style={{ fontSize: '11px' }} />
                <YAxis stroke="#888" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
                <Bar dataKey="pending" stackId="a" fill="#3b82f6" name="Pending" />
                <Bar dataKey="failed" stackId="a" fill="#ef4444" name="Failed" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Live Activity Log */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Activity size={20} />
                Live Activity
              </h3>
              <Activity size={16} className="text-green-500 animate-pulse" />
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {liveActivityLog.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="flex-shrink-0 mt-1">
                    {entry.type === 'success' && (
                      <CheckCircle size={18} className="text-green-500" />
                    )}
                    {entry.type === 'processing' && (
                      <Zap size={18} className="text-blue-500 animate-pulse" />
                    )}
                    {entry.type === 'warning' && (
                      <AlertTriangle size={18} className="text-yellow-500" />
                    )}
                    {entry.type === 'idle' && (
                      <Clock size={18} className="text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{entry.agent}</p>
                    <p className="text-sm text-muted-foreground">{entry.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{entry.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    
  );
}

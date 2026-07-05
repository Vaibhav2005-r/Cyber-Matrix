import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Users, Key, Database, Activity } from 'lucide-react';

export const Administration: React.FC = () => {
  return (
    <div className="p-6 pb-16">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
          Administration <ShieldAlert className="text-destructive" size={28}/>
        </h1>
        <p className="text-muted-foreground">System settings, Role-Based Access Control, and Audit Logs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="p-4 bg-primary/20 text-primary rounded-full"><Users size={32} /></div>
            <h3 className="font-bold">User Management</h3>
            <p className="text-xs text-muted-foreground">Manage police personnel access and assignments.</p>
            <Button variant="outline" className="w-full mt-2">Manage Users</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="p-4 bg-yellow-500/20 text-yellow-500 rounded-full"><Key size={32} /></div>
            <h3 className="font-bold">RBAC & Roles</h3>
            <p className="text-xs text-muted-foreground">Define permissions for Inspectors, Analysts, etc.</p>
            <Button variant="outline" className="w-full mt-2">Configure Roles</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="p-4 bg-green-500/20 text-green-500 rounded-full"><Database size={32} /></div>
            <h3 className="font-bold">Catalyst Integration</h3>
            <p className="text-xs text-muted-foreground">Manage Data Store, Cache, and API limits.</p>
            <Button variant="outline" className="w-full mt-2">System Health</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="p-4 bg-purple-500/20 text-purple-500 rounded-full"><Activity size={32} /></div>
            <h3 className="font-bold">Audit Logs</h3>
            <p className="text-xs text-muted-foreground">Track all data access and modifications.</p>
            <Button variant="outline" className="w-full mt-2">View Logs</Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events (Audit Log)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">IP Address</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: '2024-10-24 14:32:11', user: 'insp_ramesh', action: 'Exported FIR Data (CSV)', ip: '192.168.1.45', status: 'Success' },
                  { time: '2024-10-24 12:15:00', user: 'admin_sys', action: 'Updated Role: Analyst', ip: '10.0.0.12', status: 'Success' },
                  { time: '2024-10-24 09:01:22', user: 'unknown', action: 'Failed Login (3 attempts)', ip: '45.22.19.102', status: 'Failed' },
                  { time: '2024-10-23 18:45:30', user: 'acp_kumar', action: 'Viewed Case #1B001202400142', ip: '192.168.1.88', status: 'Success' },
                ].map((log, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium text-xs">{log.time}</td>
                    <td className="px-4 py-3 text-muted-foreground">{log.user}</td>
                    <td className="px-4 py-3">{log.action}</td>
                    <td className="px-4 py-3 font-mono text-xs">{log.ip}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${log.status === 'Success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

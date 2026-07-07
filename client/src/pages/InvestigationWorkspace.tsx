import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchRecentAlerts } from '@/lib/catalyst';
import { Terminal, ShieldAlert, FileText, Activity } from 'lucide-react';

export const InvestigationWorkspace: React.FC = () => {
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    const loadCases = async () => {
      setCases(await fetchRecentAlerts());
    };
    loadCases();
  }, []);

  return (
    <div className="p-6 h-[calc(100vh-2rem)] flex flex-col space-y-4">
      <div className="flex justify-between items-end border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-mono font-bold tracking-widest mb-1 text-foreground">INVESTIGATION_WORKSPACE</h1>
          <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em]">KSP • Intelligence Matrix • Terminal 04</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 border border-border bg-card flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
            <Activity size={12} className="text-green-500 animate-pulse" /> LIVE_SYNC_ACTIVE
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 bg-card border border-border rounded-none shadow-none flex flex-col">
          <CardHeader className="border-b border-border pb-3 bg-background">
            <CardTitle className="text-xs font-mono tracking-widest flex items-center gap-2 text-muted-foreground uppercase">
              <Terminal size={14} className="text-secondary"/> Global_Case_Stream
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-y-auto bg-background">
            {cases.length === 0 ? (
              <div className="p-6 text-xs font-mono text-muted-foreground animate-pulse">FETCHING_CASE_LOGS...</div>
            ) : (
              <table className="w-full text-left font-mono text-[10px] uppercase tracking-wider">
                <thead className="bg-card border-b border-border sticky top-0">
                  <tr>
                    <th className="p-3 text-muted-foreground font-normal border-r border-border w-24">LOG_ID</th>
                    <th className="p-3 text-muted-foreground font-normal border-r border-border w-32">TIMESTAMP</th>
                    <th className="p-3 text-muted-foreground font-normal border-r border-border w-24">SEVERITY</th>
                    <th className="p-3 text-muted-foreground font-normal border-r border-border w-32">LOCATION</th>
                    <th className="p-3 text-muted-foreground font-normal">INCIDENT_DATA</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((c, i) => (
                    <tr key={i} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-3 border-r border-border text-secondary">#{c.id}</td>
                      <td className="p-3 border-r border-border text-muted-foreground">{c.time}</td>
                      <td className="p-3 border-r border-border">
                        <span className={`px-2 py-0.5 border ${
                          c.type === 'critical' ? 'border-destructive text-destructive bg-destructive/10' :
                          c.type === 'warning' ? 'border-amber-500 text-amber-500 bg-amber-500/10' :
                          'border-blue-500 text-blue-500 bg-blue-500/10'
                        }`}>
                          {c.type}
                        </span>
                      </td>
                      <td className="p-3 border-r border-border truncate max-w-[120px]">{c.raw?.location || 'UNKNOWN'}</td>
                      <td className="p-3 text-foreground">{c.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1 bg-background border border-destructive/50 rounded-none shadow-none flex flex-col">
          <CardHeader className="border-b border-destructive/50 pb-3 bg-destructive/5">
            <CardTitle className="text-xs font-mono tracking-widest flex items-center gap-2 text-destructive uppercase">
              <ShieldAlert size={14} className="animate-pulse"/> Active_Investigation_Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2 font-mono">
              <div className="text-[10px] text-muted-foreground tracking-widest border-b border-border pb-1">SELECTED_RECORD</div>
              <div className="p-3 border border-border bg-card">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-secondary font-bold">CASE_ID: AWAITING_SELECTION</span>
                  <FileText size={14} className="text-muted-foreground"/>
                </div>
                <div className="text-[10px] text-muted-foreground space-y-1">
                  <p>STATUS: <span className="text-foreground">STANDBY</span></p>
                  <p>ASSIGNED_IO: <span className="text-foreground">NONE</span></p>
                  <p>LAST_UPDATED: <span className="text-foreground">--:--:--</span></p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 font-mono">
              <div className="text-[10px] text-muted-foreground tracking-widest border-b border-border pb-1">ACTION_CONSOLE</div>
              <div className="grid grid-cols-2 gap-2">
                <button disabled className="p-2 border border-border text-[10px] text-muted-foreground uppercase opacity-50 bg-card">Deploy_Unit</button>
                <button disabled className="p-2 border border-border text-[10px] text-muted-foreground uppercase opacity-50 bg-card">Flag_Record</button>
                <button disabled className="p-2 border border-border text-[10px] text-muted-foreground uppercase opacity-50 col-span-2 bg-card">Request_AI_Analysis</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

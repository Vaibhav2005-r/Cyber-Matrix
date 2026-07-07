import React, { useEffect, useState } from 'react';
import { KPICard } from '@/components/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, FileText, CheckCircle, Crosshair, Users, Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { fetchDashboardOverview, fetchCrimeTrends } from '@/lib/catalyst';
import { GlobalFilterBar } from '@/components/GlobalFilterBar';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    const overviewData = await fetchDashboardOverview(filters);
    const trendData = await fetchCrimeTrends(filters);
    setStats(overviewData);
    setTrends(trendData);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!stats) return <div className="p-6 text-secondary font-mono animate-pulse">INIT_SYSTEM_CORE...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] overflow-y-auto">
      <GlobalFilterBar filters={filters} setFilters={setFilters} onApply={loadData} />
      
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-end mb-4 border-b border-border pb-4">
          <div>
            <h1 className="text-2xl font-mono font-bold tracking-widest mb-1 text-foreground">COMMAND_CENTER</h1>
            <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em]">KSP • Intelligence Matrix • Terminal 01</p>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-destructive/10 border border-destructive flex items-center gap-2 text-[10px] font-mono font-bold text-destructive tracking-widest">
              <div className="w-1.5 h-1.5 bg-destructive animate-pulse"></div>
              3_CRITICAL_ALERTS
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-secondary font-mono animate-pulse">
            QUERYING_DATABASE...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard title="TTL_FIRS_REGISTERED" value={stats.totalFirs} icon={<FileText size={16} />} trend={{ value: '+12%_MOM', isPositive: false }} />
              <KPICard title="ACTIVE_CASES" value={stats.activeCases} icon={<Activity size={16} />} trend={{ value: '-2%_MOM', isPositive: true }} />
              <KPICard title="CASES_SOLVED" value={stats.casesSolved} icon={<CheckCircle size={16} />} trend={{ value: '+18%_MOM', isPositive: true }} />
              <KPICard title="CHARGESHEETS_FILED" value={stats.chargesheetsFiled} icon={<Crosshair size={16} />} />
              
              <KPICard title="HIGH_PRIORITY_CASES" value={stats.highPriorityCases} icon={<AlertCircle size={16} />} trend={{ value: '+4_NEW', isPositive: false }} />
              <KPICard title="REPEAT_OFFENDERS" value={stats.repeatOffenders} icon={<Users size={16} />} />
              <KPICard title="ACTIVE_HOTSPOTS" value={stats.activeHotspots} icon={<AlertTriangle size={16} />} />
              <KPICard title="CRIME_RATE_IDX" value={`${stats.crimeIncrease}%`} icon={<TrendingUp size={16} />} trend={{ value: 'ELEVATED', isPositive: false }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card className="bg-card border border-border rounded-none shadow-none">
                <CardHeader className="border-b border-border pb-3">
                  <CardTitle className="text-xs font-mono tracking-widest flex items-center gap-2 text-muted-foreground">
                    <Activity size={14} className="text-secondary"/> 12_MONTH_CRIME_VOL_MATRIX
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80 pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="2 2" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{fontSize: 10, fontFamily: 'monospace'}} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" tick={{fontSize: 10, fontFamily: 'monospace'}} tickLine={false} axisLine={false} />
                      <Tooltip 
                        cursor={{fill: 'hsl(var(--muted))'}}
                        contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0', color: 'hsl(var(--foreground))', fontFamily: 'monospace', fontSize: '11px' }} 
                      />
                      <Bar dataKey="crimes" fill="hsl(var(--secondary))" radius={0} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="bg-background border border-destructive rounded-none shadow-none">
                  <CardHeader className="bg-destructive/10 border-b border-destructive pb-2 pt-3">
                    <CardTitle className="text-destructive flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                      <AlertTriangle size={14} className="animate-pulse" /> PRIORITY_OVERRIDE_ALERT
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="font-mono">
                      <h4 className="font-bold text-foreground text-sm mb-2">INCIDENT: ARMED_ROBBERY // LOC: INDIRANAGAR</h4>
                      <p className="text-xs text-muted-foreground mb-4">MULTIPLE SUSPECTS DETECTED. 2 UNITS RESPONDING. REQ_BACKUP & CCTV_CROSSREF.</p>
                      <div className="flex gap-2">
                        <button className="px-4 py-1.5 bg-destructive hover:bg-destructive/80 text-destructive-foreground text-[10px] font-bold tracking-widest transition-colors uppercase">
                          Dispatch_Units
                        </button>
                        <button className="px-4 py-1.5 bg-transparent hover:bg-muted text-muted-foreground text-[10px] border border-border font-bold tracking-widest transition-colors uppercase">
                          View_Intel
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border border-border rounded-none shadow-none">
                  <CardHeader className="border-b border-border pb-2 pt-3">
                    <CardTitle className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">ZCQL_DB_QUERY_LOGS</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 font-mono text-[10px]">
                      {[
                        { q: 'SELECT * FROM FIR WHERE status = "Active"', time: 'T-2m' },
                        { q: 'SELECT count(id) FROM Suspects WHERE risk > 8', time: 'T-15m' },
                        { q: 'SELECT * FROM Hotspots WHERE severity = "Critical"', time: 'T-1h' },
                      ].map((log, i) => (
                        <div key={i} className="flex justify-between items-center p-1.5 bg-background border border-border">
                          <span className="text-secondary">{log.q}</span>
                          <span className="text-muted-foreground">{log.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

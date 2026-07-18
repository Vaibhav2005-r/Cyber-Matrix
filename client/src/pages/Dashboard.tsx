import React, { useEffect, useState } from 'react';
import { KPICard } from '@/components/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, FileText, CheckCircle, Crosshair, Users, Activity, TrendingUp, AlertTriangle, Terminal } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { fetchDashboardOverview, fetchCrimeTrends, submitAction } from '@/lib/catalyst';
import { GlobalFilterBar } from '@/components/GlobalFilterBar';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { toast } from 'sonner';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const INITIAL_LOGS = [
  { q: 'SELECT * FROM FIR WHERE status = "Active"', time: 'T-2m' },
  { q: 'SELECT count(id) FROM Suspects WHERE risk > 8', time: 'T-15m' },
  { q: 'SELECT * FROM Hotspots WHERE severity = "Critical"', time: 'T-1h' }
];

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState(INITIAL_LOGS);

  const loadData = async () => {
    setIsLoading(true);
    const overviewData = await fetchDashboardOverview(filters);
    const trendData = await fetchCrimeTrends(filters);
    setStats(overviewData);
    setTrends(trendData);
    setIsLoading(false);
    
    // Simulate finding a high priority alert
    if (overviewData?.highPriorityCases > 0) {
      toast.error('HIGH PRIORITY OVERRIDE', { 
        description: 'New critical incidents detected in sector 4. Dispatching units.'
      });
    }
  };

  useEffect(() => {
    loadData();
    
    // Simulate streaming ZCQL logs
    const interval = setInterval(() => {
      const queries = [
        'SELECT status FROM PatrolUnits WHERE sector = "North"',
        'UPDATE Alerts SET read = true WHERE id = 901',
        'SELECT * FROM Analytics WHERE confidence > 0.95',
        'INSERT INTO AuditLogs (action) VALUES ("Query")',
        'SELECT count(id) FROM Suspects WHERE active = true'
      ];
      const newQuery = queries[Math.floor(Math.random() * queries.length)];
      setLogs(prev => [{ q: newQuery, time: 'T-0s' }, ...prev.slice(0, 4)]);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] overflow-y-auto">
      <GlobalFilterBar filters={filters} setFilters={setFilters} onApply={loadData} />
      
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end mb-4 border-b border-border/50 pb-4">
          <div>
            <h1 className="text-2xl font-mono font-bold tracking-widest mb-1 text-foreground">COMMAND_CENTER</h1>
            <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em]">KSP • Intelligence Matrix • Terminal 01</p>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-destructive/10 border border-destructive/50 flex items-center gap-2 text-[10px] font-mono font-bold text-destructive tracking-widest rounded shadow-[0_0_10px_rgba(220,38,38,0.2)]">
              <div className="w-1.5 h-1.5 bg-destructive animate-pulse rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
              3_CRITICAL_ALERTS
            </div>
          </div>
        </motion.div>

        {isLoading || !stats ? (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <motion.div key={i} variants={containerVariants} className="h-32 glass-panel rounded-lg animate-pulse bg-card/40 border border-white/5" />
            ))}
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
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
              <motion.div variants={containerVariants} className="h-full">
                <Card className="glass-panel h-full rounded-lg shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
                  <CardHeader className="border-b border-border/50 pb-3 relative z-10">
                    <CardTitle className="text-xs font-mono tracking-widest flex items-center gap-2 text-muted-foreground">
                      <Activity size={14} className="text-secondary"/> 12_MONTH_CRIME_VOL_MATRIX
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-80 pt-4 relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorCrimes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="2 2" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{fontSize: 10, fontFamily: 'monospace'}} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" tick={{fontSize: 10, fontFamily: 'monospace'}} tickLine={false} axisLine={false} />
                        <Tooltip 
                          cursor={{fill: 'hsl(var(--muted))', opacity: 0.4}}
                          contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', border: '1px solid hsl(var(--border))', borderRadius: '4px', color: 'hsl(var(--foreground))', fontFamily: 'monospace', fontSize: '11px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                        />
                        <Bar dataKey="crimes" fill="url(#colorCrimes)" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="space-y-6 flex flex-col">
                <motion.div variants={containerVariants} className="flex-1">
                  <Card className="glass-panel border-destructive/30 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.1)] relative overflow-hidden h-full">
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-10 animate-scan-line pointer-events-none" />
                    <CardHeader className="bg-destructive/5 border-b border-destructive/20 pb-2 pt-3 relative z-10">
                      <CardTitle className="text-destructive flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                        <AlertTriangle size={14} className="animate-pulse drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]" /> PRIORITY_OVERRIDE_ALERT
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 relative z-10">
                      <div className="font-mono">
                        <h4 className="font-bold text-foreground text-sm mb-2 drop-shadow-md">INCIDENT: ARMED_ROBBERY // LOC: INDIRANAGAR</h4>
                        <p className="text-xs text-muted-foreground mb-4">MULTIPLE SUSPECTS DETECTED. 2 UNITS RESPONDING. REQ_BACKUP & CCTV_CROSSREF.</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={async () => {
                              toast.loading('Dispatching units...');
                              await submitAction('DISPATCH_UNIT', { location: 'INDIRANAGAR' });
                              toast.success('Units Dispatched', { description: '2 Patrol units en route to Indiranagar.'});
                            }}
                            className="px-4 py-1.5 bg-destructive hover:bg-destructive/80 text-destructive-foreground text-[10px] font-bold tracking-widest transition-colors uppercase rounded shadow-lg"
                          >
                            Dispatch_Units
                          </button>
                          <button 
                            onClick={() => toast.info('Loading Intel...', { description: 'Fetching CCTV cross-reference data from backend.'})}
                            className="px-4 py-1.5 bg-background/50 hover:bg-muted text-muted-foreground text-[10px] border border-border font-bold tracking-widest transition-colors uppercase rounded backdrop-blur-sm"
                          >
                            View_Intel
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={containerVariants} className="flex-1">
                  <Card className="glass-panel rounded-lg h-full">
                    <CardHeader className="border-b border-border/50 pb-2 pt-3 flex flex-row items-center justify-between">
                      <CardTitle className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Terminal size={12} className="text-secondary" /> ZCQL_DB_QUERY_LOGS
                      </CardTitle>
                      <div className="w-2 h-2 rounded-full bg-secondary animate-pulse-glow" />
                    </CardHeader>
                    <CardContent className="pt-4 overflow-hidden h-[180px]">
                      <div className="space-y-2 font-mono text-[10px]">
                        <AnimatePresence>
                          {logs.map((log, i) => (
                            <motion.div 
                              key={`${log.q}-${i}`}
                              initial={{ opacity: 0, x: -10, height: 0 }}
                              animate={{ opacity: 1, x: 0, height: 'auto' }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.3 }}
                              className="flex justify-between items-center p-1.5 bg-background/40 border border-white/5 rounded backdrop-blur-sm"
                            >
                              <span className="text-secondary/90 truncate mr-2">{log.q}</span>
                              <span className="text-muted-foreground shrink-0">{log.time}</span>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

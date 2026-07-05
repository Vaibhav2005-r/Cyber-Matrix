import React, { useEffect, useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  FileText, Shield, CheckCircle, FileSignature, 
  AlertOctagon, Repeat, MapPin, TrendingUp, Bell 
} from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  fetchDashboardOverview, fetchCrimeTrends, fetchDistrictDistribution, 
  fetchCrimeCategories, fetchRecentAlerts 
} from '../lib/catalyst';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#f97316', '#06b6d4'];

export const Dashboard: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [o, t, d, c, a] = await Promise.all([
        fetchDashboardOverview(),
        fetchCrimeTrends(),
        fetchDistrictDistribution(),
        fetchCrimeCategories(),
        fetchRecentAlerts()
      ]);
      setOverview(o);
      setTrends(t);
      setDistricts(d);
      setCategories(c);
      setAlerts(a);
    };
    loadData();
  }, []);

  if (!overview) return <div className="p-8 text-muted-foreground">Loading Command Center...</div>;

  return (
    <div className="p-6 pb-16">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
          <p className="text-muted-foreground">Real-time crime intelligence across Karnataka.</p>
        </div>
        <Button variant="outline" className="border-primary/50 bg-primary/10 text-primary hover:bg-primary/20">
          Ask AI Assistant
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total FIRs Registered" value={overview.totalFirs.toLocaleString()} icon={<FileText className="text-primary" size={20} />} trend={{ value: '12%', isPositive: true }} />
        <KPICard title="Active Cases" value={overview.activeCases.toLocaleString()} icon={<AlertOctagon className="text-destructive" size={20} />} trend={{ value: '5%', isPositive: false }} />
        <KPICard title="Cases Solved" value={overview.casesSolved.toLocaleString()} icon={<CheckCircle className="text-green-500" size={20} />} trend={{ value: '8%', isPositive: true }} />
        <KPICard title="Chargesheets Filed" value={overview.chargesheetsFiled.toLocaleString()} icon={<FileSignature className="text-yellow-500" size={20} />} />
        <KPICard title="High Priority Cases" value={overview.highPriorityCases} icon={<Shield className="text-destructive" size={20} />} />
        <KPICard title="Repeat Offenders" value={overview.repeatOffenders} icon={<Repeat className="text-orange-500" size={20} />} />
        <KPICard title="Active Crime Hotspots" value={overview.activeHotspots} icon={<MapPin className="text-destructive" size={20} />} />
        <KPICard title="Crime Increase" value={`${overview.crimeIncrease}%`} icon={<TrendingUp className="text-destructive" size={20} />} trend={{ value: 'vs last month', isPositive: false }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Crime Trends (Weekly)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }} />
                <Line type="monotone" dataKey="crimes" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crime Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categories} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {categories.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>District Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
                <Legend />
                <Bar dataKey="firs" name="Total FIRs" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending Cases" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} className="text-yellow-500" /> Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 h-80">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'critical' ? 'bg-red-500/10 border-red-500' : 
                alert.type === 'success' ? 'bg-green-500/10 border-green-500' : 
                'bg-yellow-500/10 border-yellow-500'
              }`}>
                <p className="text-sm text-foreground mb-1 font-medium">{alert.message}</p>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

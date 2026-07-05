import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ComposedChart, Line, Area
} from 'recharts';
import { Filter, Calendar as CalendarIcon, Download } from 'lucide-react';
import { fetchCrimeResolutionFunnel, fetchCrimeTypeComparison } from '../lib/catalyst';

export const CrimeAnalytics: React.FC = () => {
  const [funnelData, setFunnelData] = useState<any[]>([]);
  const [comparisonData, setComparisonData] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const [funnel, comparison] = await Promise.all([
        fetchCrimeResolutionFunnel(),
        fetchCrimeTypeComparison()
      ]);
      setFunnelData(funnel);
      setComparisonData(comparison);
    };
    load();
  }, []);

  // Generate mock Heat Calendar data (7 days x 24 hours simplified to 7x4 blocks)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const timeBlocks = ['00:00-06:00', '06:00-12:00', '12:00-18:00', '18:00-24:00'];
  const heatData = days.map(d => timeBlocks.map(() => Math.floor(Math.random() * 100)));

  const getHeatColor = (value: number) => {
    if (value > 80) return 'bg-red-500';
    if (value > 60) return 'bg-orange-500';
    if (value > 40) return 'bg-yellow-500';
    if (value > 20) return 'bg-primary/60';
    return 'bg-primary/20';
  };

  return (
    <div className="p-6 pb-16">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crime Analytics</h1>
          <p className="text-muted-foreground">Deep analysis and trend comparison.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter size={16} /> Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <CalendarIcon size={16} /> Last 30 Days
          </Button>
          <Button variant="default" className="gap-2">
            <Download size={16} /> Export Report
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="mb-6">
        <CardContent className="p-4 flex gap-4 flex-wrap">
          {['District: All', 'Police Station: All', 'Crime Head: All', 'Severity: High', 'Status: Pending'].map(f => (
            <span key={f} className="px-3 py-1.5 bg-muted rounded-md text-sm border border-border cursor-pointer hover:bg-muted/80 transition-colors">
              {f}
            </span>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Crime Type Comparison Stacked Bar */}
        <Card>
          <CardHeader>
            <CardTitle>Crime Type Growth (Month-over-Month)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
                <Bar dataKey="theft" stackId="a" fill="#3b82f6" name="Theft" />
                <Bar dataKey="cyber" stackId="a" fill="#10b981" name="Cyber Crime" />
                <Bar dataKey="assault" stackId="a" fill="#f59e0b" name="Assault" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Crime Resolution Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Crime Resolution Funnel</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={funnelData} layout="vertical" margin={{ left: 50, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="stage" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
                <Bar dataKey="count" fill="hsl(var(--primary))" barSize={30} radius={[0, 4, 4, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heat Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Crime Frequency Heat Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 mb-2">
                <div className="w-12"></div>
                {timeBlocks.map(tb => <div key={tb} className="flex-1 text-center text-xs text-muted-foreground">{tb}</div>)}
              </div>
              {days.map((day, i) => (
                <div key={day} className="flex gap-2 items-center">
                  <div className="w-12 text-sm font-medium text-muted-foreground">{day}</div>
                  {heatData[i].map((val, j) => (
                    <div 
                      key={j} 
                      className={`flex-1 h-12 rounded-md ${getHeatColor(val)} flex items-center justify-center text-xs text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                      title={`${val} incidents`}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-6 text-xs text-muted-foreground justify-end">
              <span>Low</span>
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded bg-primary/20"></div>
                <div className="w-4 h-4 rounded bg-primary/60"></div>
                <div className="w-4 h-4 rounded bg-yellow-500"></div>
                <div className="w-4 h-4 rounded bg-orange-500"></div>
                <div className="w-4 h-4 rounded bg-red-500"></div>
              </div>
              <span>High</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Growth Metrics</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Month-over-Month (MoM)</p>
              <div className="text-3xl font-bold text-destructive">+4.2%</div>
              <p className="text-xs text-muted-foreground mt-1">Compared to last 30 days</p>
            </div>
            <div className="h-[1px] bg-border w-full"></div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Quarter-over-Quarter (QoQ)</p>
              <div className="text-3xl font-bold text-green-500">-1.8%</div>
              <p className="text-xs text-muted-foreground mt-1">Compared to Q1 2026</p>
            </div>
            <div className="h-[1px] bg-border w-full"></div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Year-over-Year (YoY)</p>
              <div className="text-3xl font-bold text-green-500">-5.4%</div>
              <p className="text-xs text-muted-foreground mt-1">Compared to 2025</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

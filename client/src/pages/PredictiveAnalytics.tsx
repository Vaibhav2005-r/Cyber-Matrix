import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { BrainCircuit, AlertTriangle, ShieldCheck } from 'lucide-react';

const forecastData = [
  { month: 'Oct 2024', actual: 4200, predicted: 4150 },
  { month: 'Nov 2024', actual: 4350, predicted: 4400 },
  { month: 'Dec 2024', actual: 4800, predicted: 4750 }, // Holiday spike
  { month: 'Jan 2025', actual: null, predicted: 4100 },
  { month: 'Feb 2025', actual: null, predicted: 3950 },
  { month: 'Mar 2025', actual: null, predicted: 4200 },
];

export const PredictiveAnalytics: React.FC = () => {
  return (
    <div className="p-6 pb-16">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
          Crime Forecasting <BrainCircuit className="text-purple-500" size={28}/>
        </h1>
        <p className="text-muted-foreground">Powered by Zoho Catalyst QuickML Time-Series Forecasting.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 lg:col-span-2 border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle>6-Month Crime Volume Forecast</CardTitle>
            <CardDescription>Historical data vs. QuickML AI predictions.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={['dataMin - 500', 'dataMax + 500']} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} name="Actual FIRs" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="predicted" stroke="#a855f7" strokeWidth={3} strokeDasharray="5 5" name="AI Prediction" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="border-purple-500/30 bg-purple-500/5 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-purple-400">
                <AlertTriangle size={18} /> High-Risk Prediction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium mb-2">Expected 15% spike in Property Crimes during Dec 2024.</p>
              <p className="text-xs text-muted-foreground mb-4">Correlated with holiday season travel and historical patterns.</p>
              <Button variant="outline" className="w-full text-xs border-purple-500/50 hover:bg-purple-500/20">Generate Deployment Plan</Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-green-500">
                <ShieldCheck size={18} /> Resource Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium mb-2">Shift 12 units from Central to East Zone on Weekends.</p>
              <p className="text-xs text-muted-foreground mb-4">Model suggests this will reduce response time by 4 minutes during peak hours.</p>
              <Button variant="outline" className="w-full text-xs">Approve Reallocation</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

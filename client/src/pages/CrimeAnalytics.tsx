import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { fetchCrimeCategories, fetchDistrictDistribution } from '@/lib/catalyst';
import { PieChart as PieChartIcon, BarChart2 } from 'lucide-react';
import { GlobalFilterBar } from '@/components/GlobalFilterBar';

export const CrimeAnalytics: React.FC = () => {
  const [districtData, setDistrictData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    setDistrictData(await fetchDistrictDistribution(filters));
    setCategoryData(await fetchCrimeCategories(filters));
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!districtData.length || !categoryData.length) return <div className="p-6 text-secondary font-mono animate-pulse">INIT_ANALYTICS_CORE...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] overflow-y-auto">
      <GlobalFilterBar filters={filters} setFilters={setFilters} onApply={loadData} />
      
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-end mb-4 border-b border-border pb-4">
          <div>
            <h1 className="text-2xl font-mono font-bold tracking-widest mb-1 text-foreground">CRIME_ANALYTICS</h1>
            <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em]">KSP • Intelligence Matrix • Module 02</p>
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-secondary font-mono animate-pulse">
            QUERYING_DATABASE...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border border-border rounded-none shadow-none">
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-xs font-mono tracking-widest flex items-center gap-2 text-muted-foreground">
                  <BarChart2 size={14} className="text-secondary"/> DISTRICT_HOTSPOTS
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={districtData} layout="vertical" margin={{ top: 10, right: 10, left: 30, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 2" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" tick={{fontSize: 10, fontFamily: 'monospace'}} axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" tick={{fontSize: 10, fontFamily: 'monospace'}} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{fill: 'hsl(var(--muted))'}}
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0', color: 'hsl(var(--foreground))', fontFamily: 'monospace', fontSize: '11px' }} 
                    />
                    <Bar dataKey="firs" fill="hsl(var(--destructive))" radius={0} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border rounded-none shadow-none">
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-xs font-mono tracking-widest flex items-center gap-2 text-muted-foreground">
                  <PieChartIcon size={14} className="text-secondary"/> CRIME_TYPOLOGY
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0', color: 'hsl(var(--foreground))', fontFamily: 'monospace', fontSize: '11px' }} 
                    />
                    <Legend wrapperStyle={{fontSize: '10px', fontFamily: 'monospace', paddingTop: '20px'}} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

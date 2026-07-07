import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

interface ChartsGridProps {
  monthlyTrend: any[];
  crimeDistribution: any[];
}

export default function ChartsGrid({ monthlyTrend, crimeDistribution }: ChartsGridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-8">
      {/* Crime Trend Line Chart */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white">Monthly Crime Trends</h3>
          <p className="text-xs text-slate-400">Aggregated monthly crime reports across all divisions (Year 2023)</p>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px' }}
                labelStyle={{ color: '#F8FAFC', fontWeight: 'bold' }}
                itemStyle={{ color: '#38BDF8' }}
              />
              <Line 
                type="monotone" 
                dataKey="cases" 
                stroke="#2563EB" 
                strokeWidth={3} 
                dot={{ r: 4, strokeWidth: 2, fill: '#0F172A' }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Crime Distribution Pie Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-1">Crime Distribution</h3>
        <p className="text-xs text-slate-400 mb-6">Overview of top incident categories in the database</p>
        
        <div className="h-60 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={crimeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {crimeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px' }}
                itemStyle={{ color: '#F8FAFC' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-2 mt-4 overflow-y-auto max-h-36 pr-1">
          {crimeDistribution.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-300 font-medium truncate max-w-[140px]" title={entry.name}>{entry.name}</span>
              </div>
              <span className="text-slate-400 font-semibold">{entry.value.toLocaleString()} cases</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

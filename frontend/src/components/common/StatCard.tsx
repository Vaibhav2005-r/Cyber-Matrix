import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
}

export default function StatCard({ title, value, change, trend, color }: StatCardProps) {
  // Determine color theme for border and accent
  const colorMap: Record<string, { border: string; bg: string; text: string }> = {
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-400' },
    cyan: { border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
    green: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
    emerald: { border: 'border-teal-500/30', bg: 'bg-teal-500/10', text: 'text-teal-400' },
  };

  const currentTheme = colorMap[color] || colorMap.blue;

  return (
    <div className={`bg-slate-900 border ${currentTheme.border} rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-slate-700/50`}>
      <div className="flex justify-between items-start">
        <span className="text-slate-400 text-sm font-semibold tracking-wide uppercase">
          {title}
        </span>
        <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ${
          trend === 'up' 
            ? 'bg-emerald-500/10 text-emerald-400' 
            : trend === 'down' 
            ? 'bg-rose-500/10 text-rose-400' 
            : 'bg-slate-800 text-slate-400'
        }`}>
          {trend === 'up' && <TrendingUp size={12} />}
          {trend === 'down' && <TrendingDown size={12} />}
          {trend === 'neutral' && <Minus size={12} />}
          {change}
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-white tracking-tight">
          {value}
        </span>
      </div>
      
      <div className="mt-4 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${currentTheme.bg.replace('/10', '')}`} style={{ width: '70%' }} />
      </div>
    </div>
  );
}

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend }) => {
  return (
    <Card className="bg-card border border-border border-l-4 border-l-border hover:border-l-secondary transition-colors cursor-default rounded-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">{title}</CardTitle>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="text-3xl font-mono font-bold tracking-tight text-foreground">{value}</div>
        {trend && (
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-1.5 h-1.5 rounded-full ${trend.isPositive ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              {trend.value}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

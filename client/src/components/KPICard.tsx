import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend }) => {
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -4, scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
      <Card className="glass-card h-full border-l-4 border-l-border hover:border-l-secondary rounded-lg shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
          <CardTitle className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">{title}</CardTitle>
          <div className="text-secondary/80 group-hover:text-secondary group-hover:scale-110 transition-all duration-300">
            {icon}
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <div className="text-3xl font-mono font-bold tracking-tight text-foreground group-hover:text-white transition-colors">{value}</div>
          {trend && (
            <div className="flex items-center gap-2 mt-2">
              <div className={`w-1.5 h-1.5 rounded-full ${trend.isPositive ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse'}`}></div>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                {trend.value}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};


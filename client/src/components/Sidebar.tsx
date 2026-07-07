import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  MessageSquare, 
  BarChart2, 
  Map, 
  Network, 
  User, 
  TrendingUp, 
  Search, 
  FileText, 
  ShieldAlert, 
  Users,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/command-center', icon: LayoutDashboard, label: 'COMMAND_CENTER' },
    { path: '/ai-assistant', icon: MessageSquare, label: 'AI_ASSISTANT' },
    { path: '/crime-analytics', icon: BarChart2, label: 'CRIME_ANALYTICS' },
    { path: '/heatmap', icon: Map, label: 'GEOSPATIAL_MAP' },
    { path: '/criminal-network', icon: Network, label: 'CRIMINAL_NETWORK' },
    { path: '/offender-profiling', icon: User, label: 'OFFENDER_PROFILES' },
    { path: '/socio-demographics', icon: Users, label: 'DEMOGRAPHICS' },
    { path: '/investigation-workspace', icon: Search, label: 'INVESTIGATION_WS' },
    { path: '/financial-crime', icon: Briefcase, label: 'FINANCIAL_CRIME' },
    { path: '/forecasting', icon: TrendingUp, label: 'FORECASTING_MDL' },
    { path: '/reports', icon: FileText, label: 'REPORT_EXPORTS' },
    { path: '/administration', icon: ShieldAlert, label: 'SYSTEM_ADMIN' },
  ];

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col h-full overflow-y-auto z-10">
      <div className="sticky top-0 z-10 flex items-center gap-3 p-6 pb-4 border-b border-border mb-4 bg-card">
        <Shield className="text-secondary" size={24} strokeWidth={1.5} />
        <span className="font-mono font-bold text-lg tracking-widest text-foreground">KSP:OPCENTER</span>
      </div>
      
      <div className="px-4 pb-2">
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2 border-b border-border pb-1">Navigation_Grid</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 pb-6">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink 
              key={item.path}
              to={item.path} 
              className={({ isActive }) => cn(
                "group flex items-center gap-3 px-3 py-2 transition-none text-xs font-mono relative",
                isActive 
                  ? "bg-muted text-secondary border-l-4 border-secondary font-bold" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border-l-4 border-transparent"
              )}
            >
              {({ isActive }) => (
                <>
                  <IconComponent size={14} className={isActive ? "text-secondary" : "group-hover:text-foreground"} strokeWidth={isActive ? 2 : 1.5} />
                  <span className="tracking-wider">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border mt-auto">
        <div className="text-[10px] font-mono text-muted-foreground flex justify-between">
          <span>SYS_STATUS:</span>
          <span className="text-green-500">ONLINE</span>
        </div>
      </div>
    </aside>
  );
};

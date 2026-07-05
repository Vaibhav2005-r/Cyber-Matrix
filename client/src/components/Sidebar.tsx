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
    { path: '/command-center', icon: LayoutDashboard, label: '1. Command Center' },
    { path: '/ai-assistant', icon: MessageSquare, label: '2. AI Crime Assistant' },
    { path: '/crime-analytics', icon: BarChart2, label: '3. Crime Analytics' },
    { path: '/heatmap', icon: Map, label: '4. Crime Heatmap' },
    { path: '/criminal-network', icon: Network, label: '5. Criminal Network' },
    { path: '/offender-profiling', icon: User, label: '6. Offender Profiling' },
    { path: '/socio-demographics', icon: Users, label: '7. Socio-Demographics' },
    { path: '/investigation-workspace', icon: Search, label: '8. Investigator Workspace' },
    { path: '/financial-crime', icon: Briefcase, label: '9. Financial Crime' },
    { path: '/forecasting', icon: TrendingUp, label: '10. Crime Forecasting' },
    { path: '/reports', icon: FileText, label: '11. Reports Center' },
    { path: '/administration', icon: ShieldAlert, label: '12. Administration' },
  ];

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col h-full overflow-y-auto">
      <div className="sticky top-0 z-10 flex items-center gap-3 p-6 pb-4 bg-card border-b border-border mb-4">
        <Shield className="text-yellow-500" size={28} />
        <span className="font-bold text-lg text-card-foreground">KSP Command</span>
      </div>
      
      <nav className="flex-1 px-3 space-y-1 pb-6">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink 
              key={item.path}
              to={item.path} 
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <IconComponent size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

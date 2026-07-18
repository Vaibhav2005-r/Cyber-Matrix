import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Briefcase,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  
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
    <motion.aside 
      initial={{ width: 256 }}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="glass-panel flex flex-col h-full overflow-y-auto z-20 relative border-r border-border"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4 border-b border-border/50 mb-4 bg-background/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <svg width="0" height="0">
            <linearGradient id="ka-gradient-sidebar" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop stopColor="#eab308" offset="50%" />
              <stop stopColor="#ef4444" offset="50%" />
            </linearGradient>
          </svg>
          <Shield className="shrink-0 animate-pulse-glow drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" size={24} strokeWidth={1.5} stroke="url(#ka-gradient-sidebar)" />
          <AnimatePresence>
            {!collapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col overflow-visible"
              >
                <span className="font-mono font-bold text-lg tracking-wider text-foreground whitespace-nowrap leading-tight">
                  KSP:OPCENTER
                </span>
                <span className="text-[10px] text-red-500 font-bold whitespace-nowrap">ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:text-secondary transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      <div className="px-4 pb-2 text-center">
        {!collapsed && <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2 border-b border-border/50 pb-1">Navigation_Grid</p>}
      </div>

      <nav className="flex-1 px-3 space-y-1 pb-6">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink 
              key={item.path}
              to={item.path} 
              className={({ isActive }) => cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-300 text-xs font-mono relative overflow-hidden",
                isActive 
                  ? "bg-secondary/10 text-secondary font-bold shadow-[inset_2px_0_0_0_hsl(var(--secondary))]" 
                  : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
              )}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab" 
                      className="absolute inset-0 bg-secondary/5 border-l-2 border-secondary" 
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <IconComponent size={16} className={cn("shrink-0 relative z-10", isActive ? "text-secondary" : "group-hover:text-foreground")} strokeWidth={isActive ? 2 : 1.5} />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="tracking-wider relative z-10 whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border/50 mt-auto bg-background/30 space-y-4">
        {onLogout && (
          <button 
            onClick={onLogout}
            className={cn("w-full flex items-center text-muted-foreground hover:text-destructive transition-colors text-[10px] font-mono", collapsed ? "justify-center" : "gap-2")}
            title="Log Out"
          >
            <LogOut size={16} className={collapsed ? "" : "shrink-0"} />
            {!collapsed && <span>TERMINATE_SESSION</span>}
          </button>
        )}
        <div className={cn("text-[10px] font-mono flex items-center", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && <span className="text-muted-foreground">SYS_STATUS:</span>}
          <span className="text-green-500 font-bold tracking-widest animate-pulse flex items-center gap-2">
            {collapsed ? <div className="w-2 h-2 rounded-full bg-green-500" /> : "ONLINE"}
          </span>
        </div>
      </div>
    </motion.aside>
  );
};

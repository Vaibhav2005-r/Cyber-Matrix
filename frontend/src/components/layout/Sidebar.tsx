import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Map,
  Network,
  FileText,
  Settings,
  Shield,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "AI Assistant",
    icon: MessageSquare,
    path: "/chat",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    title: "Crime Map",
    icon: Map,
    path: "/crime-map",
  },
  {
    title: "Network",
    icon: Network,
    path: "/network",
  },
  {
    title: "Reports",
    icon: FileText,
    path: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 h-screen flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Shield className="text-blue-500" size={34} />
          <div>
            <h1 className="font-bold text-xl">Cyber Matrix</h1>
            <p className="text-xs text-slate-400">
              Crime Intelligence Platform
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <item.icon size={20} />
            {item.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
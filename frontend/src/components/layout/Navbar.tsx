import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-bold">
          Police Intelligence Command Center
        </h2>
        <p className="text-slate-400 text-sm">
          AI Powered Crime Analytics
        </p>
      </div>

      <div className="flex items-center gap-5">
        <Search className="text-slate-400" />
        <Bell className="text-slate-400" />
        <UserCircle2 size={34} />
      </div>
    </header>
  );
}
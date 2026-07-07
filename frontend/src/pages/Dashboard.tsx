import React from 'react';
import useDashboard from '../hooks/useDashboard';
import StatGrid from '../components/dashboard/StatGrid';
import ChartsGrid from '../components/dashboard/ChartsGrid';
import BottomGrid from '../components/dashboard/BottomGrid';

export default function Dashboard() {
  const { statistics, monthlyTrend, crimeDistribution, recentCases, loading } = useDashboard();

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header Loading */}
        <div className="h-10 w-64 bg-slate-900 border border-slate-800 rounded-xl" />
        {/* StatGrid Loading */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
        {/* ChartsGrid Loading */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 h-96 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse" />
          <div className="h-96 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse" />
        </div>
        {/* BottomGrid Loading */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <div className="h-80 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse" />
          <div className="h-80 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight uppercase">Intelligence Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time surveillance feeds, statistical trends, and AI-assisted case investigations.</p>
      </div>

      <StatGrid statistics={statistics} />
      <ChartsGrid monthlyTrend={monthlyTrend} crimeDistribution={crimeDistribution} />
      <BottomGrid recentCases={recentCases} />
    </div>
  );
}

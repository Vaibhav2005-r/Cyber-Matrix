import React from 'react';
import { Filter, Trash2, Tag, Calendar, MapPin, Building, ShieldCheck } from 'lucide-react';

interface ConversationSummaryProps {
  context: {
    district?: string | null;
    crime?: string | null;
    station?: string | null;
    year?: number | null;
    only_convicted?: boolean;
  } | null;
  onReset: () => void;
}

export default function ConversationSummary({ context, onReset }: ConversationSummaryProps) {
  if (!context) return null;

  const hasFilters = context.district || context.crime || context.station || context.year || context.only_convicted;

  if (!hasFilters) return null;

  return (
    <div className="bg-slate-900 border-l border-slate-800 w-80 p-6 hidden xl:flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-6 text-sm font-bold text-white uppercase tracking-wider">
          <Filter size={16} className="text-blue-500" />
          <span>Investigation Filters</span>
        </div>

        <div className="space-y-4">
          {context.crime && (
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Crime Type</div>
              <div className="text-sm font-bold text-slate-200 mt-1 flex items-center gap-2">
                <Tag size={14} className="text-blue-400" />
                {context.crime}
              </div>
            </div>
          )}

          {context.district && (
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">District</div>
              <div className="text-sm font-bold text-slate-200 mt-1 flex items-center gap-2">
                <MapPin size={14} className="text-cyan-400" />
                {context.district}
              </div>
            </div>
          )}

          {context.station && (
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Police Station</div>
              <div className="text-sm font-bold text-slate-200 mt-1 flex items-center gap-2">
                <Building size={14} className="text-purple-400" />
                {context.station}
              </div>
            </div>
          )}

          {context.year && (
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Year</div>
              <div className="text-sm font-bold text-slate-200 mt-1 flex items-center gap-2">
                <Calendar size={14} className="text-amber-400" />
                {context.year}
              </div>
            </div>
          )}

          {context.only_convicted && (
            <div className="bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/20">
              <div className="text-[10px] text-emerald-500/60 font-semibold uppercase">Disposition</div>
              <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-400" />
                Convicted Cases Only
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition"
      >
        <Trash2 size={14} className="text-rose-500" />
        <span>Reset Filters</span>
      </button>
    </div>
  );
}

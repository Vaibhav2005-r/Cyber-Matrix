import React from 'react';
import { Filter, Search } from 'lucide-react';

interface GlobalFilterBarProps {
  filters: any;
  setFilters: (filters: any) => void;
  onApply: () => void;
}

export const GlobalFilterBar: React.FC<GlobalFilterBarProps> = ({ filters, setFilters, onApply }) => {
  return (
    <div className="bg-card border-b border-border p-3 flex flex-wrap items-center gap-4 text-xs font-mono">
      <div className="flex items-center gap-2 text-muted-foreground tracking-widest">
        <Filter size={14} className="text-secondary" /> GLOBAL_PARAMETERS
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">DISTRICT:</span>
        <select 
          className="bg-background border border-border text-foreground p-1 outline-none focus:border-secondary transition-colors max-w-[200px]"
          value={filters.district || ''}
          onChange={(e) => setFilters({...filters, district: e.target.value || undefined})}
        >
          <option value="">-- ALL DISTRICTS --</option>
          {[
            'Bagalkote', 'Ballari (Bellary)', 'Belagavi (Belgaum)', 'Bengaluru Rural', 'Bengaluru Urban',
            'Bidar', 'Chamarajanagar', 'Chikkaballapur', 'Chikkamagaluru (Chikmagalur)', 'Chitradurga',
            'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi (Gulbarga)',
            'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru (Mysore)', 'Raichur', 'Ramanagara',
            'Shivamogga (Shimoga)', 'Tumakuru (Tumkur)', 'Udupi', 'Uttara Kannada (Karwar)',
            'Vijayapura (Bijapur)', 'Yadgir', 'Vijayanagara'
          ].map(district => (
            <option key={district} value={district}>{district.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">YEAR:</span>
        <select 
          className="bg-background border border-border text-foreground p-1 outline-none focus:border-secondary transition-colors"
          value={filters.year || ''}
          onChange={(e) => setFilters({...filters, year: e.target.value ? parseInt(e.target.value) : undefined})}
        >
          <option value="">-- ALL YEARS --</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">CRIME_TYPE:</span>
        <select 
          className="bg-background border border-border text-foreground p-1 outline-none focus:border-secondary transition-colors"
          value={filters.crime || ''}
          onChange={(e) => setFilters({...filters, crime: e.target.value || undefined})}
        >
          <option value="">-- ALL TYPES --</option>
          <option value="THEFT">THEFT</option>
          <option value="MURDER">MURDER</option>
          <option value="CYBER">CYBER CRIME</option>
          <option value="FRAUD">FRAUD</option>
        </select>
      </div>

      <button 
        onClick={onApply}
        className="ml-auto flex items-center gap-2 px-4 py-1.5 border border-secondary text-secondary bg-secondary/10 hover:bg-secondary hover:text-black transition-colors tracking-widest"
      >
        <Search size={14} /> EXECUTE_QUERY
      </button>
    </div>
  );
};

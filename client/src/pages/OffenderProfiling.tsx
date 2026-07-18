import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, ShieldAlert, Fingerprint, Crosshair, Map as MapIcon, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { fetchOffenderProfile, submitAction } from '@/lib/catalyst';
import { toast } from 'sonner';

export const OffenderProfiling: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      const data = await fetchOffenderProfile('A1_RAMESH');
      setProfile(data);
      setIsLoading(false);
    };
    loadProfile();
  }, []);
  const radarData = [
    { subject: 'Violence', A: 85, fullMark: 100 },
    { subject: 'Evasion', A: 65, fullMark: 100 },
    { subject: 'Organization', A: 90, fullMark: 100 },
    { subject: 'Cyber', A: 20, fullMark: 100 },
    { subject: 'Weapons', A: 75, fullMark: 100 },
    { subject: 'Mobility', A: 80, fullMark: 100 },
  ];

  return (
    <div className="p-6 h-[calc(100vh-2rem)] overflow-y-auto space-y-4">
      <div className="flex justify-between items-end border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-mono font-bold tracking-widest mb-1 text-foreground">TARGET_DOSSIER</h1>
          <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em]">KSP • Intelligence Matrix • Module 06</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 border border-destructive bg-destructive/10 flex items-center gap-2 text-[10px] font-mono text-destructive">
            <AlertTriangle size={12} className="animate-pulse" /> HIGH_VALUE_TARGET
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Profile Card */}
        <Card className="col-span-1 border border-border bg-card rounded-none shadow-none">
          <CardHeader className="border-b border-border pb-3 bg-background">
            <CardTitle className="text-xs font-mono tracking-widest flex items-center gap-2 text-muted-foreground">
              <User size={14} className="text-secondary"/> SUBJECT_IDENTIFIER
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-10 text-center font-mono text-muted-foreground animate-pulse text-xs">LOADING_DOSSIER...</div>
            ) : (
              <>
                <div className="p-6 flex flex-col items-center justify-center border-b border-border bg-[#050505]">
                  <div className="w-32 h-32 border border-secondary p-1 mb-4 relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-secondary"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-secondary"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-secondary"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-secondary"></div>
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Mugshot" className="w-full h-full object-cover grayscale brightness-75 contrast-125" />
                    <div className="absolute inset-0 bg-secondary/10 mix-blend-overlay"></div>
                  </div>
                  <h2 className="text-lg font-mono font-bold text-destructive uppercase">{profile?.name || 'RAMESH KUMAR'}</h2>
                  <p className="text-[10px] font-mono text-muted-foreground tracking-widest">ALIAS: "{profile?.alias || 'RKT'}"</p>
                </div>
                
                <div className="p-4 space-y-4 font-mono text-xs">
                  <div className="flex justify-between border-b border-border/50 pb-1">
                    <span className="text-muted-foreground">AGE</span>
                    <span className="text-foreground">{profile?.age || 34}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-1">
                    <span className="text-muted-foreground">STATUS</span>
                    <span className="text-amber-500">{profile?.status || 'AT_LARGE'}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-1">
                    <span className="text-muted-foreground">RISK_SCORE</span>
                    <span className="text-destructive">{profile?.riskScore || 88}/100</span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-1">
                    <span className="text-muted-foreground">LAST_SEEN</span>
                    <span className="text-foreground">{profile?.lastKnownLocation || 'MYSURU_SOUTH'}</span>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      onClick={async () => {
                        toast.loading('Running biometric match...');
                        await submitAction('BIOMETRIC_MATCH', { target: profile?.name || 'RAMESH' });
                        toast.success('Match Found', { description: 'Subject identified in recent CCTV footage.' });
                      }}
                      className="w-full p-2 border border-secondary text-[10px] text-secondary hover:bg-secondary hover:text-black transition-colors uppercase flex items-center justify-center gap-2"
                    >
                      <Fingerprint size={12}/> Run_Biometric_Match
                    </button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Analytics Center */}
        <div className="col-span-1 md:col-span-2 xl:col-span-2 space-y-4">
          <Card className="border border-border bg-card rounded-none shadow-none">
            <CardHeader className="border-b border-border pb-3 bg-background flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-mono tracking-widest flex items-center gap-2 text-muted-foreground">
                <Crosshair size={14} className="text-secondary"/> BEHAVIORAL_VECTORS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[250px] flex items-center justify-center bg-[#050505] relative">
               <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle at center, rgba(45, 212, 191, 0.05) 0%, transparent 70%)'
               }}></div>
               <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontFamily: 'monospace' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Target" dataKey="A" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card rounded-none shadow-none">
            <CardHeader className="border-b border-border pb-3 bg-background">
              <CardTitle className="text-xs font-mono tracking-widest flex items-center gap-2 text-muted-foreground">
                <ShieldAlert size={14} className="text-secondary"/> RAP_SHEET_HISTORY
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-left font-mono text-[10px] uppercase">
                <thead className="bg-muted/20 border-b border-border">
                  <tr>
                    <th className="p-3 text-muted-foreground font-normal border-r border-border">FIR_NO</th>
                    <th className="p-3 text-muted-foreground font-normal border-r border-border">DATE</th>
                    <th className="p-3 text-muted-foreground font-normal border-r border-border">CHARGE</th>
                    <th className="p-3 text-muted-foreground font-normal">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { fir: '102/2024', date: '2024-03-12', charge: 'Armed Robbery', status: 'Pending Trial', sColor: 'text-amber-500' },
                    { fir: '145/2024', date: '2024-04-05', charge: 'Extortion', status: 'Under Investigation', sColor: 'text-secondary' },
                    { fir: '088/2023', date: '2023-11-20', charge: 'Assault', status: 'Convicted', sColor: 'text-destructive' },
                    { fir: '201/2022', date: '2022-08-14', charge: 'Theft', status: 'Acquitted', sColor: 'text-muted-foreground' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border bg-background hover:bg-muted/30">
                      <td className="p-3 border-r border-border text-foreground">{row.fir}</td>
                      <td className="p-3 border-r border-border text-muted-foreground">{row.date}</td>
                      <td className="p-3 border-r border-border text-foreground">{row.charge}</td>
                      <td className={`p-3 ${row.sColor}`}>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1 space-y-4">
          <Card className="border border-border bg-card rounded-none shadow-none">
            <CardHeader className="border-b border-border pb-3 bg-background">
              <CardTitle className="text-xs font-mono tracking-widest flex items-center gap-2 text-muted-foreground">
                <LinkIcon size={14} className="text-secondary"/> KNOWN_ASSOCIATES
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 bg-[#050505]">
              {isLoading ? (
                 <div className="text-xs font-mono text-muted-foreground animate-pulse text-center">LOADING...</div>
              ) : (
                profile?.associates?.map((ass: string, i: number) => {
                  const isHigh = ass.includes('At Large');
                  return (
                    <div key={i} className="flex justify-between items-center p-2 border border-border bg-background hover:border-secondary transition-colors cursor-pointer">
                      <div>
                        <div className="text-xs font-mono font-bold text-foreground">{ass}</div>
                      </div>
                      <div className={`text-[10px] font-mono px-2 py-0.5 border ${isHigh ? 'border-destructive text-destructive bg-destructive/10' : 'border-amber-500 text-amber-500 bg-amber-500/10'}`}>
                        {isHigh ? 'HIGH' : 'MEDIUM'}
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          <Card className="border border-border bg-card rounded-none shadow-none">
            <CardHeader className="border-b border-border pb-3 bg-background">
              <CardTitle className="text-xs font-mono tracking-widest flex items-center gap-2 text-muted-foreground">
                <MapIcon size={14} className="text-secondary"/> OPERATING_ZONES
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 bg-background">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-foreground">Mysuru South</span>
                  <span className="text-destructive">45%</span>
                </div>
                <div className="w-full h-1 bg-muted">
                  <div className="h-full bg-destructive" style={{ width: '45%' }}></div>
                </div>
                
                <div className="flex justify-between items-center text-xs font-mono mt-4">
                  <span className="text-foreground">Mandya Central</span>
                  <span className="text-amber-500">30%</span>
                </div>
                <div className="w-full h-1 bg-muted">
                  <div className="h-full bg-amber-500" style={{ width: '30%' }}></div>
                </div>
                
                <div className="flex justify-between items-center text-xs font-mono mt-4">
                  <span className="text-foreground">Bengaluru Urban</span>
                  <span className="text-secondary">25%</span>
                </div>
                <div className="w-full h-1 bg-muted">
                  <div className="h-full bg-secondary" style={{ width: '25%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

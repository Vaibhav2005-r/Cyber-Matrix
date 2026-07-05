import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, AlertTriangle, Scale, Target, Clock, Calendar as CalendarIcon, FileText } from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';

const mockProfile = {
  name: "Ramesh Kumar a.k.a 'Blade' Ramesh",
  age: 34,
  gender: "Male",
  district: "Mysuru",
  riskLevel: "Critical",
  photo: "https://ui-avatars.com/api/?name=Ramesh+Kumar&background=ef4444&color=fff&size=256",
  stats: {
    firs: 14,
    arrests: 5,
    chargesheets: 8,
    convictions: 1,
    bailCount: 4
  },
  behavior: {
    preferredCrime: "Armed Robbery, Vehicle Theft",
    operatingArea: "Mysuru South, Mandya",
    activeTime: "02:00 AM - 05:00 AM",
    frequency: "1 incident / month"
  },
  radarData: [
    { subject: 'Violence', A: 90, fullMark: 100 },
    { subject: 'Flight Risk', A: 85, fullMark: 100 },
    { subject: 'Organization', A: 60, fullMark: 100 },
    { subject: 'Weapons', A: 95, fullMark: 100 },
    { subject: 'Recidivism', A: 100, fullMark: 100 },
    { subject: 'Influence', A: 40, fullMark: 100 },
  ],
  timeline: [
    { date: '2025-11-12', event: 'Released on Bail (High Court)' },
    { date: '2025-08-04', event: 'Arrested by CCB Mysuru' },
    { date: '2025-07-22', event: 'Named in FIR #22156 (Armed Robbery)' },
    { date: '2024-03-15', event: 'Convicted (2 years sentence)' },
  ]
};

export const OffenderProfiling: React.FC = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Offender Profiling</h1>
          <p className="text-sm text-muted-foreground">AI-driven behavioral analysis and risk scoring.</p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Search Aadhar, Name, or FIR..." className="w-64" />
          <Button><Search size={16} className="mr-2" /> Search</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Profile Identity Card */}
        <Card className="col-span-1 border-border bg-card shadow-sm flex flex-col">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-red-500 mb-4 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <img src={mockProfile.photo} alt={mockProfile.name} className="w-full h-full object-cover" />
            </div>
            <CardTitle className="text-2xl">{mockProfile.name}</CardTitle>
            <CardDescription className="text-md flex items-center justify-center gap-1 mt-1">
              <MapPin size={14} /> {mockProfile.district} • {mockProfile.age} Yrs • {mockProfile.gender}
            </CardDescription>
            <div className="mt-4 inline-flex items-center gap-2 bg-red-500/20 text-red-500 px-4 py-1.5 rounded-full font-bold border border-red-500/30">
              <AlertTriangle size={16} /> AI Risk Level: {mockProfile.riskLevel}
            </div>
          </CardHeader>
          
          <CardContent className="mt-4 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-3 rounded-lg text-center border border-border">
                <div className="text-2xl font-bold text-primary">{mockProfile.stats.firs}</div>
                <div className="text-xs text-muted-foreground">Total FIRs</div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center border border-border">
                <div className="text-2xl font-bold text-destructive">{mockProfile.stats.arrests}</div>
                <div className="text-xs text-muted-foreground">Arrests</div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center border border-border">
                <div className="text-2xl font-bold text-yellow-500">{mockProfile.stats.chargesheets}</div>
                <div className="text-xs text-muted-foreground">Chargesheets</div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center border border-border">
                <div className="text-2xl font-bold text-green-500">{mockProfile.stats.convictions}</div>
                <div className="text-xs text-muted-foreground">Convictions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Behavioral Analysis & AI Radar */}
        <Card className="col-span-1 xl:col-span-2 border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle>Behavioral Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground mb-2">
                    <Target size={16} className="text-primary"/> Preferred Crime
                  </h4>
                  <p className="font-medium bg-muted/50 p-2 rounded border border-border">{mockProfile.behavior.preferredCrime}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin size={16} className="text-primary"/> Operating Area
                  </h4>
                  <p className="font-medium bg-muted/50 p-2 rounded border border-border">{mockProfile.behavior.operatingArea}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground mb-2">
                    <Clock size={16} className="text-primary"/> Active Time
                  </h4>
                  <p className="font-medium bg-muted/50 p-2 rounded border border-border">{mockProfile.behavior.activeTime}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground mb-2">
                    <CalendarIcon size={16} className="text-primary"/> Frequency
                  </h4>
                  <p className="font-medium bg-muted/50 p-2 rounded border border-border">{mockProfile.behavior.frequency}</p>
                </div>
              </div>

              <div className="h-64 md:h-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockProfile.radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--border))" tick={false} />
                    <Radar name="Risk Attributes" dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>

      {/* Case Timeline */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle>Case Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative border-l border-border ml-3 space-y-6 pb-4">
            {mockProfile.timeline.map((item, i) => (
              <div key={i} className="relative pl-6">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-background"></div>
                <div className="text-xs text-primary font-bold mb-1">{item.date}</div>
                <div className="text-sm font-medium p-3 bg-muted/30 border border-border rounded-lg shadow-sm">
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

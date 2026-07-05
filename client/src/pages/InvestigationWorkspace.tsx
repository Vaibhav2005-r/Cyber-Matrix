import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FolderOpen, Clock, FileText, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';

const mockCases = [
  { id: '1B001202400142', title: 'Armed Robbery at MG Road', status: 'Active', priority: 'High', date: '2024-10-12', investigator: 'Insp. Ramesh' },
  { id: '3M014202400142', title: 'Cyber Fraud - Phishing', status: 'Pending Evidence', priority: 'Medium', date: '2024-10-10', investigator: 'SI Priya' },
  { id: '1B001202400145', title: 'Vehicle Theft - Scorpio', status: 'Active', priority: 'High', date: '2024-10-09', investigator: 'Insp. Ramesh' },
  { id: '4D014202400142', title: 'Narcotics Seizure', status: 'Chargesheet Filed', priority: 'Critical', date: '2024-09-28', investigator: 'ACP Kumar' },
];

export const InvestigationWorkspace: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState(mockCases[0]);
  const [showAIAssist, setShowAIAssist] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Investigator Workspace</h1>
          <p className="text-sm text-muted-foreground">Manage active cases, evidence, and AI-assisted analysis.</p>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Search FIR, Suspect..." className="w-64" />
          <Button><Search size={16} className="mr-2" /> Search</Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Case List */}
        <Card className="w-1/3 flex flex-col border-border bg-card shadow-sm overflow-hidden">
          <CardHeader className="py-4 border-b border-border bg-muted/20">
            <CardTitle className="text-lg flex items-center gap-2"><FolderOpen size={18}/> My Cases</CardTitle>
          </CardHeader>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {mockCases.map(c => (
              <div 
                key={c.id} 
                onClick={() => setSelectedCase(c)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedCase.id === c.id ? 'bg-primary/10 border-primary' : 'bg-card border-border hover:bg-muted/50'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-primary">FIR #{c.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c.priority === 'Critical' ? 'bg-red-500/20 text-red-500' : c.priority === 'High' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'}`}>
                    {c.priority}
                  </span>
                </div>
                <h3 className="font-semibold text-sm mb-1">{c.title}</h3>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12}/> {c.date}</span>
                  <span>{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Case Details */}
        <Card className="flex-1 flex flex-col border-border bg-card shadow-sm overflow-hidden relative">
          <CardHeader className="py-4 border-b border-border bg-muted/20 flex flex-row justify-between items-center space-y-0">
            <div>
              <CardTitle className="text-xl">{selectedCase.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">FIR #{selectedCase.id} • Assigned to: {selectedCase.investigator}</p>
            </div>
            <Button onClick={() => setShowAIAssist(true)} className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white border-none shadow-[0_0_15px_rgba(79,70,229,0.4)]">
              <Sparkles size={16} /> Zia AI Summary
            </Button>
          </CardHeader>

          <div className="flex-1 overflow-y-auto p-6">
            {showAIAssist && (
              <div className="mb-6 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
                <h4 className="flex items-center gap-2 text-indigo-400 font-bold mb-2"><Sparkles size={16}/> AI Case Summary (Zia Text Analytics)</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Based on the FIR and initial statements, 3 masked individuals entered the jewelry store at 22:45. Weapons (machetes) were displayed but no injuries occurred. 
                  CCTV footage from Camera #4 is partially obscured. <strong>Suggested Action:</strong> Cross-reference recent vehicle thefts in a 5km radius, as the getaway vehicle matches a stolen Scorpio (FIR #1B001202400145).
                </p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/40">Extract Entities</Button>
                  <Button variant="outline" size="sm" className="text-xs border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/40">Translate to Kannada</Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-md mb-4 flex items-center gap-2"><FileText size={16}/> Case Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Incident Location</label>
                    <p className="text-sm font-medium">MG Road, Ward 76, Bengaluru</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Complainant</label>
                    <p className="text-sm font-medium">Vikram Seth (Store Manager)</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Sections Applied</label>
                    <p className="text-sm font-medium bg-muted p-1.5 rounded inline-block mt-1 border border-border">IPC 392, IPC 397</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-md mb-4 flex items-center gap-2"><CheckCircle size={16}/> Investigation Timeline</h3>
                <div className="relative border-l border-border ml-2 space-y-4 pb-2">
                  <div className="relative pl-6">
                    <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full -left-[5.5px] top-1"></div>
                    <div className="text-sm font-medium">CCTV Footage Recovered</div>
                    <div className="text-xs text-muted-foreground">Today, 09:30 AM</div>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute w-2.5 h-2.5 bg-primary rounded-full -left-[5.5px] top-1"></div>
                    <div className="text-sm font-medium">Statements Recorded (3 Witnesses)</div>
                    <div className="text-xs text-muted-foreground">Yesterday, 14:00 PM</div>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute w-2.5 h-2.5 bg-muted-foreground rounded-full -left-[5.5px] top-1"></div>
                    <div className="text-sm font-medium">FIR Registered</div>
                    <div className="text-xs text-muted-foreground">12-Oct-2024, 23:15 PM</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 text-xs">Add Timeline Entry</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Filter, FileSpreadsheet, FileIcon } from 'lucide-react';

const recentReports = [
  { id: 'REP-104', name: 'Monthly Crime Statistics - Oct 2024', type: 'PDF', size: '2.4 MB', date: '2024-11-01' },
  { id: 'REP-103', name: 'Hotspot Analysis - Bengaluru East', type: 'CSV', size: '840 KB', date: '2024-10-28' },
  { id: 'REP-102', name: 'Financial Fraud Summary Q3', type: 'PDF', size: '1.8 MB', date: '2024-10-15' },
  { id: 'REP-101', name: 'Repeat Offenders List (Active)', type: 'Excel', size: '1.1 MB', date: '2024-10-10' },
];

export const Reports: React.FC = () => {
  return (
    <div className="p-6 pb-16">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Reports Center</h1>
          <p className="text-muted-foreground">Generate, schedule, and download automated reports via Zoho SmartBrowz.</p>
        </div>
        <Button className="gap-2">
          <FileText size={16} /> Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map(report => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-muted/40 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${report.type === 'PDF' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                      {report.type === 'PDF' ? <FileIcon size={24} /> : <FileSpreadsheet size={24} />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{report.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Generated: {report.date} • {report.size}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download size={14} /> Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border-l-4 border-primary bg-muted/30 rounded-r-lg">
                <h5 className="font-semibold text-sm">Daily FIR Summary</h5>
                <p className="text-xs text-muted-foreground mt-1">Runs every day at 08:00 AM</p>
                <div className="mt-2 text-xs font-medium text-primary">Recipients: DGP, IGPs</div>
              </div>
              <div className="p-3 border-l-4 border-orange-500 bg-muted/30 rounded-r-lg">
                <h5 className="font-semibold text-sm">Weekly Hotspot Alerts</h5>
                <p className="text-xs text-muted-foreground mt-1">Runs every Monday at 09:00 AM</p>
                <div className="mt-2 text-xs font-medium text-orange-500">Recipients: All SPs</div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-6">Manage Schedules</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

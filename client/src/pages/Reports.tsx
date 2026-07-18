import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, FileSpreadsheet, FileIcon } from 'lucide-react';
import { fetchRecentReports, submitAction } from '@/lib/catalyst';
import { toast } from 'sonner';

export const Reports: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      setIsLoading(true);
      const data = await fetchRecentReports();
      setReports(data);
      setIsLoading(false);
    };
    loadReports();
  }, []);

  return (
    <div className="p-6 pb-16">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Reports Center</h1>
          <p className="text-muted-foreground">Generate, schedule, and download automated reports via Zoho SmartBrowz.</p>
        </div>
        <Button 
          className="gap-2"
          onClick={async () => {
            toast.loading('Generating report...');
            await submitAction('GENERATE_REPORT');
            toast.success('Report Generated', { description: 'New report is available for download.' });
          }}
        >
          <FileText size={16} /> Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="p-10 text-center text-muted-foreground font-mono animate-pulse">FETCHING_REPORTS...</div>
            ) : (
              <div className="space-y-4">
                {reports.map(report => (
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => toast.info(`Downloading ${report.id}...`, { description: 'Your download will start shortly.' })}
                    >
                      <Download size={14} /> Download
                    </Button>
                  </div>
                ))}
              </div>
            )}
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
            <Button 
              variant="outline" 
              className="w-full mt-6"
              onClick={() => toast.info('Opening Schedules...', { description: 'Loading SmartBrowz schedule configuration.' })}
            >
              Manage Schedules
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

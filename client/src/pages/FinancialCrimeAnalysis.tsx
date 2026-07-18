import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { TrendingDown, DollarSign, Building, AlertCircle } from 'lucide-react';
import { fetchFinancialTransactions, fetchFraudTrends, submitAction } from '@/lib/catalyst';
import { toast } from 'sonner';

export const FinancialCrimeAnalysis: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const txns = await fetchFinancialTransactions();
      const trends = await fetchFraudTrends();
      setTransactions(txns);
      setTrendData(trends);
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="p-6 pb-16">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Financial Crime Analysis</h1>
          <p className="text-muted-foreground">Monitor suspicious transactions, money laundering, and economic offenses.</p>
        </div>
        <Button 
          variant="destructive" 
          className="gap-2"
          onClick={async () => {
            toast.loading('Freezing accounts...');
            await submitAction('FREEZE_HIGH_RISK_ACCOUNTS');
            toast.success('Accounts Frozen', { description: 'All critical risk accounts have been locked pending EOW review.' });
          }}
        >
          <AlertCircle size={16} /> Freeze High-Risk Accounts
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Fraud Value (YTD)</CardTitle>
            <DollarSign className="text-red-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹42.5 Crores</div>
            <p className="text-xs text-red-500 mt-1 font-medium">+14% compared to last year</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Flagged Accounts</CardTitle>
            <Building className="text-orange-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? '...' : '142'}</div>
            <p className="text-xs text-muted-foreground mt-1">Pending verification by EOW</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recovered Assets</CardTitle>
            <TrendingDown className="text-green-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹8.2 Crores</div>
            <p className="text-xs text-green-500 mt-1 font-medium">19.2% recovery rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Fraud Volume (Trailing 7 Months)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground font-mono animate-pulse">
                LOADING_CHART_DATA...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Area type="monotone" dataKey="value" stroke="#ef4444" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High-Risk Transactions (AI Flagged)</CardTitle>
            <CardDescription>Detected via Catalyst QuickML anomaly detection.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="h-32 flex items-center justify-center text-muted-foreground font-mono animate-pulse">
                  FETCHING_TXN_LOGS...
                </div>
              ) : (
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3">TXN ID</th>
                      <th className="px-4 py-3">Account</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{txn.id}</td>
                        <td className="px-4 py-3 text-muted-foreground">{txn.account}</td>
                        <td className="px-4 py-3">{txn.amount}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold ${txn.risk === 'Critical' ? 'bg-red-500/20 text-red-500' : 'bg-orange-500/20 text-orange-500'}`}>
                            {txn.risk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => toast.info('Loading complete logs...', { description: 'Navigating to full ledger view.' })}
            >
              View All Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

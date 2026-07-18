import React, { useState } from 'react';
import { ShieldAlert, Fingerprint, Lock, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [badgeId, setBadgeId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!badgeId || !password) {
      toast.error('ACCESS DENIED', { description: 'Missing credentials.' });
      return;
    }
    setLoading(true);
    toast.loading('Authenticating...', { id: 'login-toast' });
    
    // Simulate network/auth delay
    setTimeout(() => {
      setLoading(false);
      toast.success('ACCESS GRANTED', { id: 'login-toast', description: 'Welcome to KSP Intelligence Matrix.' });
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center relative overflow-hidden text-foreground">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-[#050505] to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '100% 4px'
      }}></div>

      <div className="z-10 w-full max-w-md p-6">
        <div className="text-center mb-8">
          <svg width="0" height="0">
            <linearGradient id="ka-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop stopColor="#eab308" offset="50%" />
              <stop stopColor="#ef4444" offset="50%" />
            </linearGradient>
          </svg>
          <div className="mx-auto w-24 h-24 border-2 border-red-500/30 rounded-full flex items-center justify-center mb-4 bg-black shadow-[0_0_40px_rgba(239,68,68,0.15)] relative overflow-hidden">
            <Shield className="animate-pulse-glow relative z-10" size={48} strokeWidth={1.5} stroke="url(#ka-gradient)" />
          </div>
          <h1 className="text-3xl font-mono font-bold tracking-widest text-foreground">KSP:OPCENTER</h1>
          <h2 className="text-lg font-bold text-red-500 mt-2 tracking-wider">ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್</h2>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.3em] mt-2">Intelligence Matrix • v2.0</p>
        </div>

        <Card className="bg-black/50 border border-secondary/30 backdrop-blur-md rounded-none shadow-[0_0_50px_rgba(45,212,191,0.1)] relative overflow-hidden">
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-secondary"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-secondary"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-secondary"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-secondary"></div>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-secondary tracking-widest uppercase flex items-center gap-2">
                  <Fingerprint size={12} /> Officer Badge ID
                </label>
                <input 
                  type="text" 
                  value={badgeId}
                  onChange={(e) => setBadgeId(e.target.value)}
                  className="w-full bg-background/50 border border-border p-3 font-mono text-sm focus:outline-none focus:border-secondary transition-colors"
                  placeholder="e.g. KSP-992-AX"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-secondary tracking-widest uppercase flex items-center gap-2">
                  <Lock size={12} /> Security Clearance Code
                </label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background/50 border border-border p-3 font-mono text-sm focus:outline-none focus:border-secondary transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full font-mono font-bold tracking-widest bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-none h-12 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? <ShieldAlert className="animate-spin" size={16} /> : 'INITIALIZE UPLINK'}
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8 space-y-2">
          <p className="text-[10px] font-mono text-muted-foreground uppercase">
            Restricted Access • Unauthorized entry is logged.
          </p>
          <div className="flex justify-center items-center gap-2 text-[10px] font-mono">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-500/70">SECURE CONNECTION ESTABLISHED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

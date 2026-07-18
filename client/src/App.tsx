import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { AIAssistant } from './pages/AIAssistant';
import { CrimeAnalytics } from './pages/CrimeAnalytics';
import { Heatmap } from './pages/Heatmap';
import { CriminalNetwork } from './pages/CriminalNetwork';
import { OffenderProfiling } from './pages/OffenderProfiling';
import { SocioDemographicInsights } from './pages/SocioDemographicInsights';
import { PredictiveAnalytics } from './pages/PredictiveAnalytics';
import { InvestigationWorkspace } from './pages/InvestigationWorkspace';
import { FinancialCrimeAnalysis } from './pages/FinancialCrimeAnalysis';
import { Reports } from './pages/Reports';
import { Administration } from './pages/Administration';
import { Login } from './pages/Login';
import { Toaster } from 'sonner';
import './index.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Toaster theme="dark" position="top-right" toastOptions={{ className: 'glass-panel font-mono border-secondary/50 text-foreground' }} />
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route
            path="*"
            element={
              <div className="flex h-screen w-full bg-background text-foreground overflow-hidden relative selection:bg-secondary/30 selection:text-secondary-foreground">
                <Sidebar onLogout={() => setIsAuthenticated(false)} />
                <main className="flex-1 overflow-hidden flex flex-col h-full bg-background/95 relative">
                  <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/5 via-background to-background pointer-events-none" />
                  <div className="flex-1 overflow-y-auto z-10 relative">
                    <Routes>
                      <Route path="/" element={<Navigate to="/command-center" replace />} />
                      <Route path="/command-center" element={<Dashboard />} />
                      <Route path="/ai-assistant" element={<AIAssistant />} />
                      <Route path="/crime-analytics" element={<CrimeAnalytics />} />
                      <Route path="/heatmap" element={<Heatmap />} />
                      <Route path="/criminal-network" element={<CriminalNetwork />} />
                      <Route path="/offender-profiling" element={<OffenderProfiling />} />
                      <Route path="/socio-demographics" element={<SocioDemographicInsights />} />
                      <Route path="/investigation-workspace" element={<InvestigationWorkspace />} />
                      <Route path="/financial-crime" element={<FinancialCrimeAnalysis />} />
                      <Route path="/forecasting" element={<PredictiveAnalytics />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/administration" element={<Administration />} />
                      <Route path="*" element={<Navigate to="/command-center" replace />} />
                    </Routes>
                  </div>
                </main>
              </div>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;

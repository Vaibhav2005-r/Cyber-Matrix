import React from 'react';
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
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
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
        </main>
      </div>
    </Router>
  );
};

export default App;

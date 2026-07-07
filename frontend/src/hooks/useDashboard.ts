import { useEffect, useState } from "react";
import {
  getStatistics,
  getMonthlyTrend,
  getCrimeDistribution,
  getRecentCases
} from "../api/analyticsApi";

export default function useDashboard() {
  const [statistics, setStatistics] = useState<any>(null);
  const [monthlyTrend, setMonthlyTrend] = useState<any[]>([]);
  const [crimeDistribution, setCrimeDistribution] = useState<any[]>([]);
  const [recentCases, setRecentCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [
          stats,
          trend,
          distribution,
          recent,
        ] = await Promise.all([
          getStatistics(),
          getMonthlyTrend(),
          getCrimeDistribution(),
          getRecentCases(),
        ]);
        setStatistics(stats);
        setMonthlyTrend(trend);
        setCrimeDistribution(distribution);
        setRecentCases(recent);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  return {
    statistics,
    monthlyTrend,
    crimeDistribution,
    recentCases,
    loading,
  };
}

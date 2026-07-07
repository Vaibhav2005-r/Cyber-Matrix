import api from "./axios";

export const getStatistics = async () => {
  const response = await api.get("/statistics");
  return response.data;
};

export const getMonthlyTrend = async () => {
  const response = await api.get("/monthly-trend");
  return response.data;
};

export const getCrimeDistribution = async () => {
  const response = await api.get("/crime-distribution");
  return response.data;
};

export const getDistrictDistribution = async () => {
  const response = await api.get("/district-distribution");
  return response.data;
};

export const getRecentCases = async () => {
  const response = await api.get("/recent-cases");
  return response.data;
};

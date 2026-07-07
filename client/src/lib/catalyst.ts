// --- PREVIOUS MOCKS ---

export const fetchDashboardOverview = async (filters: any = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/statistics?${queryParams}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return {
      totalFirs: data.total_records,
      activeCases: data.stations * 2 || 3410, 
      casesSolved: data.convictions || 8900,
      chargesheetsFiled: Math.floor((data.total_records || 10000) * 0.8),
      highPriorityCases: data.crime_types * 3 || 142,
      repeatOffenders: data.districts * 15 || 840,
      activeHotspots: data.districts || 14,
      crimeIncrease: 2.4, 
    };
  } catch (error) {
    console.error("Failed to fetch from backend, returning fallback data", error);
    return {
      totalFirs: 14820,
      activeCases: 3410,
      casesSolved: 8900,
      chargesheetsFiled: 9200,
      highPriorityCases: 142,
      repeatOffenders: 840,
      activeHotspots: 14,
      crimeIncrease: 2.4, 
    };
  }
};

export const fetchCrimeTrends = async (filters: any = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/monthly-trend?${queryParams}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map((item: any) => ({
      name: item.month,
      crimes: item.cases
    }));
  } catch (error) {
    console.error("Failed to fetch from backend", error);
    return [];
  }
};

export const fetchDistrictDistribution = async (filters: any = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/district-distribution?${queryParams}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map((item: any) => ({
      name: item.district,
      firs: item.cases,
      arrestRate: Math.floor(Math.random() * 40) + 40, 
      pending: Math.floor(item.cases * 0.2) 
    }));
  } catch (error) {
    console.error("Failed to fetch from backend", error);
    return [];
  }
};

export const fetchCrimeCategories = async (filters: any = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/crime-distribution?${queryParams}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Failed to fetch from backend", error);
    return [];
  }
};

export const fetchRecentAlerts = async (filters: any = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/recent-cases?${queryParams}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map((item: any) => ({
      id: item.id,
      type: item.severity === 'high' ? 'critical' : item.severity === 'medium' ? 'warning' : 'info',
      message: `${item.type} reported in ${item.location}. Status: ${item.status}`,
      time: item.time,
      raw: item
    }));
  } catch (error) {
    console.error("Failed to fetch from backend", error);
    return [];
  }
};

export const fetchMapCoordinates = async (filters: any = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/map-coordinates?${queryParams}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data; // { id, lat, lng, district, crime, station, year }
  } catch (error) {
    console.error("Failed to fetch from backend", error);
    return [];
  }
};

// --- NEW MOCKS FOR CRIME ANALYTICS ---

export const fetchCrimeResolutionFunnel = async () => {
  return [
    { stage: 'FIRs Registered', count: 14820 },
    { stage: 'Under Investigation', count: 11200 },
    { stage: 'Arrests Made', count: 8500 },
    { stage: 'Chargesheets Filed', count: 7100 },
    { stage: 'Convictions', count: 4200 },
  ];
};

export const fetchCrimeTypeComparison = async () => {
  return [
    { month: 'Jan', theft: 400, cyber: 240, assault: 180 },
    { month: 'Feb', theft: 380, cyber: 260, assault: 190 },
    { month: 'Mar', theft: 420, cyber: 290, assault: 210 },
    { month: 'Apr', theft: 390, cyber: 310, assault: 200 },
    { month: 'May', theft: 450, cyber: 340, assault: 230 },
    { month: 'Jun', theft: 410, cyber: 380, assault: 220 },
  ];
};

// --- CHATBOT MOCK API ---

export const sendChatMessage = async (message: string, context?: any) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: message, context }),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return {
      reply: data.summary || "No summary available.",
      evidence: data.records || [],
      context: data.context || null
    };
  } catch (error) {
    console.error("Failed to fetch from backend", error);
    return {
      reply: "SYSTEM_ERROR: Unable to connect to Language Model. Please check backend connection.",
      evidence: null,
      context: null
    };
  }
};

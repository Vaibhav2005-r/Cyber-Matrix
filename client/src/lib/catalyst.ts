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

// --- NEW DATA & ACTION MOCKS FOR PREVIOUSLY HARDCODED PAGES ---

export const fetchFinancialTransactions = async (filters: any = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/financial/transactions?${queryParams}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch from backend", error);
    return [
      { id: 'TXN-9982', account: '11200045678', amount: '₹14,50,000', type: 'Wire Transfer', risk: 'Critical', date: '2024-10-14' },
      { id: 'TXN-9983', account: '44500012345', amount: '₹8,20,000', type: 'Crypto Purchase', risk: 'High', date: '2024-10-14' },
      { id: 'TXN-9984', account: '11200045678', amount: '₹5,00,000', type: 'Cash Withdrawal', risk: 'High', date: '2024-10-13' },
      { id: 'TXN-9985', account: '99800055443', amount: '₹12,00,000', type: 'Offshore Transfer', risk: 'Critical', date: '2024-10-10' }
    ];
  }
};

export const fetchFraudTrends = async (filters: any = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/financial/trends?${queryParams}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch from backend", error);
    return [
      { month: 'Jan', value: 400 },
      { month: 'Feb', value: 300 },
      { month: 'Mar', value: 550 },
      { month: 'Apr', value: 450 },
      { month: 'May', value: 700 },
      { month: 'Jun', value: 900 },
      { month: 'Jul', value: 850 }
    ];
  }
};

export const fetchRecentReports = async (filters: any = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/reports/recent?${queryParams}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch from backend", error);
    return [
      { id: 'REP-104', name: 'Monthly Crime Statistics - Oct 2024', type: 'PDF', size: '2.4 MB', date: '2024-11-01' },
      { id: 'REP-103', name: 'Hotspot Analysis - Bengaluru East', type: 'CSV', size: '840 KB', date: '2024-10-28' },
      { id: 'REP-102', name: 'Financial Fraud Summary Q3', type: 'PDF', size: '1.8 MB', date: '2024-10-15' },
      { id: 'REP-101', name: 'Repeat Offenders List (Active)', type: 'Excel', size: '1.1 MB', date: '2024-10-10' }
    ];
  }
};

export const fetchCriminalNetwork = async (filters: any = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/network/suspects?${queryParams}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch from backend", error);
    return {
      nodes: [
        { id: 'K. Ramesh', group: 1, type: 'leader' },
        { id: 'S. Kumar', group: 2, type: 'associate' },
        { id: 'M. Ali', group: 2, type: 'associate' },
        { id: 'V. Prakash', group: 1, type: 'associate' },
        { id: 'Bank Acct #1092', group: 3, type: 'financial' },
        { id: 'Phone #9880...', group: 4, type: 'communication' },
      ],
      links: [
        { source: 'K. Ramesh', target: 'S. Kumar', value: 5 },
        { source: 'K. Ramesh', target: 'V. Prakash', value: 8 },
        { source: 'S. Kumar', target: 'M. Ali', value: 3 },
        { source: 'K. Ramesh', target: 'Bank Acct #1092', value: 10 },
        { source: 'M. Ali', target: 'Phone #9880...', value: 6 },
      ]
    };
  }
};

export const fetchOffenderProfile = async (id: string) => {
  try {
    const response = await fetch(`/api/offenders/profile?id=${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch from backend", error);
    return {
      name: "Ramesh Gowda",
      alias: "Raja",
      age: 34,
      status: "Active Warrant",
      riskScore: 88,
      lastKnownLocation: "K.R. Puram, Bengaluru",
      primaryOffenses: ["Vehicle Theft", "Extortion"],
      associates: ["Suresh (Arrested)", "Kiran (At Large)"],
      recentActivity: "Spotted via CCTV near Indiranagar on Oct 14th."
    };
  }
};

export const submitAction = async (actionType: string, payload: any = {}) => {
  try {
    const response = await fetch('/api/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: actionType, payload, timestamp: new Date().toISOString() }),
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Failed to execute action ${actionType} on backend. Using fallback mock.`, error);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, message: `Action ${actionType} simulated successfully.` };
  }
};

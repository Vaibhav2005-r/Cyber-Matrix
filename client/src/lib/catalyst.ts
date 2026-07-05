// --- PREVIOUS MOCKS ---

export const fetchDashboardOverview = async () => {
  return {
    totalFirs: 14820,
    activeCases: 3410,
    casesSolved: 8900,
    chargesheetsFiled: 9200,
    highPriorityCases: 142,
    repeatOffenders: 840,
    activeHotspots: 14,
    crimeIncrease: 2.4, // % compared to last month
  };
};

export const fetchCrimeTrends = async () => {
  return [
    { name: 'Mon', crimes: 120 },
    { name: 'Tue', crimes: 145 },
    { name: 'Wed', crimes: 110 },
    { name: 'Thu', crimes: 135 },
    { name: 'Fri', crimes: 190 },
    { name: 'Sat', crimes: 210 },
    { name: 'Sun', crimes: 180 },
  ];
};

export const fetchDistrictDistribution = async () => {
  return [
    { name: 'Bengaluru Urban', firs: 3200, arrestRate: 68, pending: 400 },
    { name: 'Mysuru', firs: 1100, arrestRate: 72, pending: 150 },
    { name: 'Dakshina Kannada', firs: 950, arrestRate: 75, pending: 120 },
    { name: 'Belagavi', firs: 850, arrestRate: 60, pending: 200 },
    { name: 'Hubballi-Dharwad', firs: 720, arrestRate: 65, pending: 180 },
  ];
};

export const fetchCrimeCategories = async () => {
  return [
    { name: 'Theft', value: 3500 },
    { name: 'Assault', value: 2100 },
    { name: 'Cyber Crime', value: 1800 },
    { name: 'Fraud', value: 1200 },
    { name: 'Drug Offence', value: 850 },
    { name: 'Robbery', value: 650 },
    { name: 'Murder', value: 240 },
    { name: 'Kidnapping', value: 120 },
  ];
};

export const fetchRecentAlerts = async () => {
  return [
    { id: 1, type: 'critical', message: 'Crime spike detected: +18% Burglaries in Bengaluru East.', time: '10 mins ago' },
    { id: 2, type: 'warning', message: 'New hotspot emerging in Whitefield area.', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'Repeat offender arrested in Mysuru (FIR #22156).', time: '3 hours ago' },
    { id: 4, type: 'info', message: 'Major traffic incident reported on MG Road.', time: '5 hours ago' },
  ];
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

export const sendChatMessage = async (message: string, language: string) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const lowerMsg = message.toLowerCase();
  
  let reply = "";
  let query = "";
  let firs: string[] = [];
  
  if (lowerMsg.includes("murder") && lowerMsg.includes("bengaluru")) {
    reply = language === 'kn' 
      ? "2024 ರಲ್ಲಿ ಬೆಂಗಳೂರು ನಗರ ಜಿಲ್ಲೆಯಲ್ಲಿ 847 ಕೊಲೆ ಪ್ರಕರಣಗಳು ದಾಖಲಾಗಿವೆ."
      : "There were 847 murder cases registered in Bengaluru Urban district in 2024.";
    query = "SELECT COUNT(*) FROM CaseMaster cm JOIN CrimeSubHead csh ON cm.CrimeMinorHeadID = csh.CrimeSubHeadID JOIN District d ON cm.DistrictID = d.DistrictID WHERE csh.CrimeHeadName = 'Murder' AND d.DistrictName = 'Bengaluru Urban' AND YEAR(cm.CrimeRegisteredDate) = 2024";
    firs = ["1B001202400142", "1B001202400287", "1B001202400301"];
  } else if (lowerMsg.includes("repeat offender") || lowerMsg.includes("highest repeat risk")) {
    reply = language === 'kn'
      ? "ರಮೇಶ್ ಕುಮಾರ್ (A1) 14 ಹಿಂದಿನ ಕಳ್ಳತನ ಪ್ರಕರಣಗಳಲ್ಲಿ ಭಾಗಿಯಾಗಿದ್ದು, ಹೆಚ್ಚಿನ ಪುನರಾವರ್ತಿತ ಅಪಾಯವನ್ನು ಹೊಂದಿದ್ದಾರೆ."
      : "Ramesh Kumar (A1) has the highest repeat risk, having been involved in 14 previous theft cases across Mysuru and Mandya.";
    query = "SELECT AccusedName, COUNT(CaseMasterID) as CaseCount FROM Accused GROUP BY AccusedName HAVING CaseCount > 5 ORDER BY CaseCount DESC LIMIT 1";
    firs = ["3M014202300412", "3M014202300501"];
  } else {
    reply = language === 'kn'
      ? `ನಾನು ವಿಶ್ಲೇಷಿಸಿದ್ದೇನೆ: "${message}". ಈ ಸಮಯದಲ್ಲಿ ನಾನು ನಿರ್ದಿಷ್ಟ ಡೇಟಾವನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಿಲ್ಲ, ಆದರೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಹುಡುಕಲಾಗಿದೆ.`
      : `Based on your query regarding "${message}", I analyzed the database. 1,240 records matched your criteria.`;
    query = "SELECT * FROM CaseMaster WHERE BriefFacts LIKE '%" + message.substring(0, 10) + "%' LIMIT 10";
    firs = ["9X999202412345"];
  }

  return {
    reply,
    evidence: {
      query,
      fir_numbers: firs,
      record_count: firs.length === 1 ? 1240 : firs.length,
      confidence: "High (92%)"
    }
  };
};

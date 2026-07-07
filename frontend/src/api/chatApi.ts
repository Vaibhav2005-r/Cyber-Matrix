import api from "./axios";

export const askCrimeAssistant = async (query: string, context?: any) => {
  const response = await api.post("/chat", {
    query,
    context,
  });
  return response.data;
};

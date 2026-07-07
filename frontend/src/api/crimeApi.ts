import api from './axios';

export const getStatistics = async () => {
  const response = await api.get('/statistics');
  return response.data;
};

export const sendChatMessage = async (query: string) => {
  const response = await api.post('/chat', { query });
  return response.data;
};

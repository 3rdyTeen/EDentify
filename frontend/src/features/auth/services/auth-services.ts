import { apiClient } from '@/lib/api';

export const login = async (credentials: { email: string; password: string }) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

//the rest of auth service here
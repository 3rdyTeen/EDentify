import { apiClient } from '@/lib/api';

export const signin = async (credentials: { email: string; password: string }) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

export const signup = async (credentials: { name: string, email: string; password: string }) => {
  const response = await apiClient.post('/auth/register', credentials);
  return response.data;
};

export const forgot_password = async (credentials: { email: string; }) => {
  const response = await apiClient.post('/auth/forgot-password', credentials);
  return response.data;
};

export const reset_password = async (credentials: { email: string, password: string; }) => {
  const response = await apiClient.post('/auth/reset-password', credentials);
  return response.data;
};

export const singup_confirmation = async (credentials: {code: string}) => {
  const response = await apiClient.post('auth/signup-confirmation', credentials);
  return response.data;
}

export const profile = async () => {
  const response = await apiClient.get('auth/profile');
  return response.data;
}

export const signout = async () => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
}


//the rest of auth service here
import { useMutation } from '@tanstack/react-query';
import { login } from '../services/auth-services';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Handle success (e.g., redirect, store token)
    },
    onError: (error) => {
      // Handle error
    },
  });
};
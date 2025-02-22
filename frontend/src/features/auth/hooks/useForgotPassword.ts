import { useMutation } from '@tanstack/react-query';
import { forgot_password } from '../services/auth-services';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgot_password,
    onSuccess: (data) => {
      // Handle success (e.g., redirect, store token)
      console.log(data)
    },
    onError: (error) => {
      // Handle error
      console.log(error)
    },
  });
};
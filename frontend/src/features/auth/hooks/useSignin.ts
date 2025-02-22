import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signin } from '../services/auth-services';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

export const useSignin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      const { token, ...user } = data;
      queryClient.setQueryData(['Auth'], user);
      
      // Store token in cookie
      if (token) {
        setCookie('token', token, {
          maxAge: 1 * 24 * 60 * 60, // 1 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
      }

      toast.success("Account created successfully!")
      router.push("/dashboard");
    },
    onError: (error) => {
      const message = error.error?.message || 'Signup failed';
      console.log(message);
      toast.error(message);
    },
  });
};
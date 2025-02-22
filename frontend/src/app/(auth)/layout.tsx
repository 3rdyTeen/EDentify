'use client';

import AuthHeader from "@/features/auth/components/auth-header";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({children}: AuthLayoutProps) => {
  const router = useRouter();
  const { data: user, isLoading} = useAuth();

  if(isLoading) return <div>Loading....</div>
  
  if(user){
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="h-screen flex flex-col max-w-[1400px] mx-auto">
        <AuthHeader />
        <div className="flex mt-7 items-center justify-center bg-background p-4 w-2/5 mx-auto">
            {children}
        </div>
    </div>
    
  )
}

export default AuthLayout
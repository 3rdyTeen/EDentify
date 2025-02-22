'use client'

import { useAuth } from "@/features/auth/hooks/useAuth"
import DashboardHeader from "@/features/dashboard/components/dashboard-header"
import { useRouter } from "next/navigation"

interface DashBoardLayoutProps {
    children: React.ReactNode
}
const DashBoardLayout = ({children}: DashBoardLayoutProps) => {
  const router = useRouter();
  const { data: user, isLoading} = useAuth();

  if(isLoading) return <div>Loading....</div>
  
  if(!user){
    router.push('/signin');
    return null;
  }

  return (
    <div className="flex flex-col max-w-[1400px] mx-auto h-screen px-4">
        <DashboardHeader/>
        {children}
    </div>
  )
}

export default DashBoardLayout
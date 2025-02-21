'use client'

import { Toaster } from "@/components/ui/toaster";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface QueryProviderProps {
    children: React.ReactNode
}

const queryClient = new QueryClient();

const QueryProvider = ({children}: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
          {children}
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default QueryProvider
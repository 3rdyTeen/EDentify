import { useQuery } from "@tanstack/react-query"
import { profile } from "../services/auth-services"

export const useAuth = () => {
    return useQuery({
        queryKey: ['Auth'],
        queryFn: profile,
        retry: false,
    })
}
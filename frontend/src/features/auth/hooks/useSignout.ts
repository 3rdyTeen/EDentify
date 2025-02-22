import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signout } from "../services/auth-services"
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const useSignout = () => {

    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: signout,
        onSuccess: (data) => {
            deleteCookie('token');
            queryClient.setQueryData(['Auth'], null);
            router.push("/signin");
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })
}
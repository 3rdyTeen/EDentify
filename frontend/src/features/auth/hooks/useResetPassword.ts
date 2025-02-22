import { useMutation } from "@tanstack/react-query";
import { reset_password } from "../services/auth-services";

export const useResetPassword = () => {
    return useMutation({
        mutationFn: reset_password,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })
}
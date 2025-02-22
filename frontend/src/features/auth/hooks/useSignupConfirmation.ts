import { useMutation } from "@tanstack/react-query"
import { singup_confirmation } from "../services/auth-services"

export const useSignupConfirmation = () => {
    return useMutation({
        mutationFn: singup_confirmation,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (data) => {
            console.log(data);
        }
    })
}
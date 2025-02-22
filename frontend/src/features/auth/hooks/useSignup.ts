import { useMutation } from "@tanstack/react-query"
import { signup } from "../services/auth-services"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const useSignup = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            toast.success("Account created successfully!")
            router.push("/signin");
        },
        onError: (error) => {
            const message = error.error?.message || 'Signup failed';
            console.log(message);
            toast.error(message);
        }
    })
}
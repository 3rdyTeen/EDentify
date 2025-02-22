"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { toast } from "sonner"
import { Loader } from "lucide-react"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useForgotPassword } from "../hooks/useForgotPassword"
import { ForgotPasswordSchema, ForgotPasswordSchemaType } from "../types/types"


const ForgotPasswordCard = () => {
  const router = useRouter()
  const { mutate, isPending } = useForgotPassword();

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: ""
    },
  })

  const handleSubmit = async(values: ForgotPasswordSchemaType) => {
    try {
      mutate(values)
      
      toast.success("Logged in successfully!")
      router.push("/dashboard") // Redirect after successful login
    } catch (error) {
      toast.error("Failed to login. Please try again.")
      console.error(error)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-center">
          Please 
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send Confirmation Email
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <Button variant="link" className="p-0" onClick={() => router.push("/signin")}>
            Sign in
          </Button>
      </CardFooter>
    </Card>
  )
}

export default ForgotPasswordCard
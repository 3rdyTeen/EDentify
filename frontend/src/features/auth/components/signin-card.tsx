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
import { Globe, Loader } from "lucide-react"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useSignin } from "../hooks/useSignin"
import { SigninSchema, SigninSchemaType } from "../types/types"


const SigninCard = () => {
  const router = useRouter()
  const { mutate: login, isPending } = useSignin();

  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = async(values: SigninSchemaType) => {
    try {
      login(values)
      
      toast.success("Logged in successfully!")
      router.push("/dashboard") // Redirect after successful login
    } catch (error) {
      toast.error("Failed to login. Please try again.")
      console.error(error)
    }
  }

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      // Add your Google OAuth logic here
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success("Logged in with Google successfully!")
      router.push("/dashboard")
    } catch (error) {
      toast.error("Failed to login with Google. Please try again.")
      console.error(error)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Welcome back
        </CardTitle>
        <CardDescription className="text-center">
          Choose your preferred login method
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
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
              Sign in
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          disabled={isPending}
          className="w-full"
          onClick={handleGoogleLogin}
        >
          {isPending ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Globe className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground">
          <span className="mr-1">Don&apos;t have an account?</span>
          <Button variant="link" className="p-0" onClick={() => router.push("/signup")}>
            Sign up
          </Button>
        </div>
        <Button variant="link" className="p-0" onClick={() => router.push("/forgot-password")}>
          Forgot password?
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SigninCard
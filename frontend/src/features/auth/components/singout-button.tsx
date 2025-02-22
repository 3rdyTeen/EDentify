"use client"

import { Button } from "@/components/ui/button"

import { toast } from "sonner"
import { Loader } from "lucide-react"
import { useSignout } from "../hooks/useSignout"
import { wait } from "@/lib/await"


const SignOutButton = () => {
  const { mutate, isPending } = useSignout();


  const handleSubmit = async () => {
    try {
      wait();
      mutate();
    } catch (error) {
      toast.error("Failed to login. Please try again.")
      console.error(error)
    }
  }

  return (
      <form onSubmit={handleSubmit} >
        <Button
          variant='destructive'
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending && (
            <Loader className="mr-2 h-4 w-4 animate-spin" > Signing out... </Loader>
          )}
          Sign out
        </Button>
      </form>
  )
}

export default SignOutButton
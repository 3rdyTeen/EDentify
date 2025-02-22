import AppLogo from "@/components/app-logo"
import { ToggleTheme } from "@/components/toggle-theme"
import SignOutButton from "@/features/auth/components/singout-button"

const DashboardHeader = () => {
  return (
    <div className="flex justify-between py-4">
        <AppLogo/>
        <div className="flex gap-2 items-center">
          <ToggleTheme/>
          <SignOutButton />
        </div>
    </div>
  )
}

export default DashboardHeader
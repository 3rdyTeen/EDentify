import AppLogo from "@/components/app-logo"
import { ToggleTheme } from "@/components/toggle-theme"

const AuthHeader = () => {
  return (
    <div className="flex justify-between items-center py-6">
        <AppLogo/>
        <ToggleTheme />
    </div>
  )
}

export default AuthHeader
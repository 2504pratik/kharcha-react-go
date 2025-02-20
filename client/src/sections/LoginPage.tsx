import { LoginSignupForm } from "@/components/LoginForm"
import { AuthProvider } from "@/hooks/useAuth"

export default function LoginPage() {
  return (
    <AuthProvider>
      <div className="flex min-h-svh flex-col items-center justify-center bg-black p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginSignupForm />
        </div>
      </div>
    </AuthProvider>

  )
}

"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks"
import { loginUser } from "@/app/features/authThunks"
import { useRouter } from "next/navigation";
import { Facebook, Github } from "lucide-react"


type loginPayload = {
  email: string
  password: string
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const { loading } = useAppSelector((state) => state.auth);

  const [loginData, setLoginData] = useState<loginPayload>({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const email = loginData.email.trim();
    const password = loginData.password.trim();

    // === Validation ===
    if (!email) return toast.error("Email is required");
    if (!validateEmail(email)) return toast.error("Please enter a valid email address");
    if (!password) return toast.error("Password is required");
    if (password.length < 6) return toast.error("Password must be at least 6 characters long");

    try {
      setLoginLoading(true);
      console.log("✅ Login payload:", loginData);

      // ✅ Await the thunk result
      const result = await dispatch(loginUser(loginData)).unwrap();

      // ✅ If we reach here, login succeeded
      toast.success(`Welcome, ${result.username}!`);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error || "Login failed. Please check your credentials.");
      setLoginLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setLoginData(prev => ({ ...prev, [id]: value }))
  }

  return (
    <form
      onSubmit={handleLogin}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
        <p className="text-muted-foreground text-xs font-light">
          Welcome back! Please enter your details below.
        </p>
      </div>

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          value={loginData.email}
          onChange={handleChange}
          className="rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 transition h-12"
        />
      </Field>

      <Field>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <a
            href="#"
            className="text-sm text-primary hover:underline underline-offset-4"
          >
            Forgot?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          required
          value={loginData.password}
          onChange={handleChange}
          className="rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 transition h-12"
        />
      </Field>

      <Button
        type="submit"
        disabled={loading || loginLoading}
        className="mt-2 w-full rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg h-12"
      >
        {loading || loginLoading ? 'Logging in...' : 'Login'}
      </Button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-gray-900 px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between px-[30%] gap-3">
        {/* GitHub */}
        <Button
          variant="outline"
          size="icon"
          className="bg-gray-900 hover:bg-gray-800 text-gray-50 hover:text-gray-50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.38c.6.11.82-.26.82-.58
        0-.29-.01-1.05-.02-2.06-3.34.73-4.05-1.61-4.05-1.61-.54-1.38-1.33-1.74-1.33-1.74
        -1.09-.75.09-.74.09-.74 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99
        .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93
        0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.1-3.18
        0 0 1-.32 3.29 1.23.95-.26 1.97-.4 2.99-.4
        1.02 0 2.04.14 2.99.4 2.29-1.55 3.29-1.23
        3.29-1.23.64 1.66.23 2.88.11 3.18.77.84
        1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.93
        .43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24
        0 .32.22.69.82.57A12 12 0 0024 12c0-6.63-5.37-12-12-12z"
            />
          </svg>
        </Button>

        {/* Google */}
        <Button
          variant="outline"
          size="icon"
          className="bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            className="w-5 h-5"
          >
            <path
              fill="#EA4335"
              d="M488 261.8c0-17.8-1.6-35.2-4.6-52H249v98.6h135.7c-5.9 31.6-23.6 58.4-50.4 76.3v63.5h81.4c47.7-44 74.3-108.8 74.3-186.4z"
            />
            <path
              fill="#34A853"
              d="M249 492c67.5 0 124.1-22.5 165.5-60.8l-81.4-63.5c-22.6 15.2-51.5 24.3-84.1 24.3-64.8 0-119.7-43.8-139.3-102.7H26.3v64.3C67.9 438 152.1 492 249 492z"
            />
            <path
              fill="#4A90E2"
              d="M109.7 289.3c-4.9-14.6-7.7-30.2-7.7-46.3s2.8-31.7 7.7-46.3V132.4H26.3C9.4 170.6 0 211.7 0 263s9.4 92.4 26.3 130.6l83.4-64.3z"
            />
            <path
              fill="#FBBC05"
              d="M249 97.7c36.8 0 69.8 12.6 95.8 37.3l71.4-71.4C373.1 24.2 316.5 0 249 0 152.1 0 67.9 54 26.3 132.4l83.4 64.3C129.3 141.5 184.2 97.7 249 97.7z"
            />
          </svg>
        </Button>

        {/* Facebook */}
        <Button
          variant="outline"
          size="icon"
          className="bg-blue-600 hover:bg-blue-700 text-white hover:text-gray-50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M279.14 288l14.22-92.66h-88.91V127.38c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.06 44.38-121.06 124.72v70.62H22.89V288h81.41v224h100.17V288z" />
          </svg>
        </Button>
      </div>


      <p className="text-center text-sm text-muted-foreground mt-4">
        Forgot Password?{" "}
        <a href="#" className="underline underline-offset-4 text-primary hover:text-primary/80">
          Reset Password
        </a>
      </p>
    </form>
  )
}

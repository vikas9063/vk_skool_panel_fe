"use client"

import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { configurations } from "@/lib/configurations"

export default function LoginPage() {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            {/* Left Section - Fullscreen Image */}
            <div className="relative hidden lg:block">
                {/* Background image */}
                <img
                    src={configurations.images.loginBanner}
                    alt="Login_Banner"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/90 to-transparent dark:from-gray-900/80 dark:via-gray-900/50 dark:to-gray-900/80" />

                {/* Optional text or logo overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-white text-4xl font-semibold drop-shadow-lg">
                        Welcome to {configurations.siteName}
                    </h2>
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="flex flex-col gap-4 p-6 md:p-10 bg-background">
                {/* Top logo */}
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        {configurations.siteName}
                    </a>
                </div>

                {/* Centered login form */}
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

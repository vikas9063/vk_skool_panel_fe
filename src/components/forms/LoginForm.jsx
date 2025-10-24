import React, { useState } from 'react'
import {
  EnvelopeIcon,
  LockClosedIcon,
  GlobeAltIcon,
  UserGroupIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-900">
          Welcome back
        </h2>

        {/* Social login buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <GlobeAltIcon className="size-5 text-gray-500" />
            Continue with Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <UserGroupIcon className="size-5 text-gray-500" />
            Continue with Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="px-3 text-xs text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        {/* Email/password login */}
        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative mt-1">
              <EnvelopeIcon className="absolute left-3 top-2.5 size-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <LockClosedIcon className="absolute left-3 top-2.5 size-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeSlashIcon className="size-5" />
                ) : (
                  <EyeIcon className="size-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
          >
            <ArrowRightEndOnRectangleIcon className="size-5" />
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm;

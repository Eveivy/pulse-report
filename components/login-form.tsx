"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { atom, useAtom } from "jotai";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Zap } from 'lucide-react'



export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) { 
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    return newErrors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) { 
      handleLogin(e) 
    } else {
      setErrors(newErrors)
    }
  }


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      setIsRedirecting(true);
      router.push("/fetching-details");

    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
      setIsRedirecting(false);
    }
  };


  // if (isSubmitted) {
  //   return (
  //     <main className="min-h-screen flex items-center justify-center px-4 bg-background">
  //       <div className="max-w-md w-full text-center space-y-8">
  //         <div className="space-y-4">
  //           <div className="flex items-center justify-center gap-2 mb-6">
  //             <Zap className="w-8 h-8 text-blue-600" />
  //             <span className="text-2xl font-bold text-foreground">Pulse Report</span>
  //           </div>
  //           <div className="space-y-2">
  //             <h2 className="text-2xl font-bold text-foreground">Welcome Back!</h2>
  //             <p className="text-foreground/70">You&apos;ve successfully signed in. Redirecting...</p>
  //           </div>
  //         </div>
  //         <div className="pt-4">
  //           <div className="w-12 h-12 rounded-full border-4 border-blue-600/20 border-t-blue-600 animate-spin mx-auto" />
  //         </div>
  //       </div>
  //     </main>
  //   )
  // }

  return (
    <>
      {/* <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div> */}

      <main className="flex items-center justify-center px-4 bg-background">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-2 mb-10">
              <Zap className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-foreground">Pulse Report</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground tracking-wider">Welcome Back</h1>
            <p className="text-foreground/70">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline hover:text-blue-800 text-blue-600"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all"
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            {/* <Button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Sign In
            </Button> */}

            {error && <p className="text-sm capitalize text-red-500">{error}</p>}

            <Button type="submit" className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200" disabled={isLoading || isRedirecting}>
              {isLoading ? "Logging in..." : isRedirecting ? "Redirecting..." : "Login"}
            </Button>
          </form>

          {/* Footer */}
          <div className="space-y-4 text-center">
            <p className="text-foreground/70 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign up here
              </Link>
            </p>
            <Link href="/" className="text-foreground/60 hover:text-foreground/80 text-sm transition-colors">
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

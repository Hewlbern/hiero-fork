'use client'
import Image from "next/image";
import Link from "next/link";
import { signInAction, signInWithGoogleAuth } from "@/app/actions/auth";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GitHubSignInButton } from "@/components/github-sign-in-button";
import { useEffect, useState } from "react";

export default function Login({ searchParams }: { searchParams: Message }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4 font-mono w-7/8 md:w-2/4">
      <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8">
        {/* Hiero Logo */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <Image
            src="/0_0.jpeg"
            alt="Hiero logo"
            width={48}
            height={48}
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
          <h2 className="text-3xl sm:text-4xl text-black font-black uppercase tracking-tighter ml-3 sm:ml-4">Hiero</h2>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8 text-[#2D4B73] tracking-tight">Sign in</h1>
        
        <form className="space-y-4 sm:space-y-6" action={signInAction}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#2D4B73] font-bold">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="w-full p-2 border-2 border-black rounded-none focus:ring-[#FF8A00] focus:ring-4 focus:border-black"
              placeholder="you@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-[#2D4B73] font-bold">Password</Label>
              <Link
                className="text-xs text-[#FF8A00] font-bold hover:underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="w-full p-2 border-2 border-black rounded-none focus:ring-[#FF8A00] focus:ring-4 focus:border-black"
              placeholder="Your password"
            />
          </div>
          
          {mounted && <FormMessage message={searchParams} />}
          
          <SubmitButton
            pendingText="Signing In..."
            formAction={signInAction}
            className="w-full bg-[#FF8A00] text-white py-3 px-4 rounded-none border-2 border-black font-bold text-lg hover:bg-[#E67A00] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Sign in
          </SubmitButton>
        </form>
        
        <p className="mt-6 sm:mt-8 text-center text-sm sm:text-base text-[#2D4B73] font-bold">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-[#FF8A00] hover:underline inline-flex items-center">
            Sign up
          </Link>
        </p>

        {/* Social Login Options */}
        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
          <button
            onClick={() => signInWithGoogleAuth()}
            className="w-full p-2 flex justify-center items-center transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 bg-white border-2 border-black rounded-none"
          >
            <Image
              src="/gauth/Web/svg/dark/web_dark_rd_SI.svg"
              alt="Sign in with Google"
              width={191}
              height={46}
              className="h-9 sm:h-11 w-auto"
            />
          </button>

          <GitHubSignInButton />
        </div>
      </div>
    </div>
  );
}

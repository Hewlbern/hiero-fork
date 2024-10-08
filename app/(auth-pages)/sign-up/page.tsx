"use client";
import { signUpAction, signInWithGoogleAuth } from "@/app/actions/auth";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { GitHubSignInButton } from "@/components/auth/github-sign-in-button";
import Image from "next/image";

export default function SignUp({
  searchParams,
}: {
  searchParams: Message & { next?: string };
}) {
  const next = searchParams.next ? encodeURIComponent(searchParams.next) : "";

  if ("message" in searchParams) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sky-200 p-4">
        <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-8">
          <FormMessage message={searchParams} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-200 p-4">
      <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-8">
        <h2 className="text-4xl font-bold text-black mb-6 text-center uppercase">
          <Image
            src="/0_0.jpeg"
            alt="Hiero logo"
            width={48}
            height={48}
            className="w-12 h-12"
          />{" "}
          Create Account
        </h2>
        <form className="space-y-6" action={signUpAction}>
          <input type="hidden" name="next" value={next} />
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-lg font-bold text-black">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full border-2 border-black p-2 text-lg"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-lg font-bold text-black"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full border-2 border-black p-2 text-lg"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          </div>

          <SubmitButton
            className="w-full bg-emerald-500 text-white font-bold py-3 px-4 border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-lg uppercase"
            pendingText="Creating..."
          >
            Sign up
          </SubmitButton>
        </form>

        <div className="mt-8 text-center">
          <p className="text-black font-bold">
            Already have an account?{" "}
            <Link
              href={`/sign-in${next ? `?next=${next}` : ""}`}
              className="text-emerald-500 underline hover:text-emerald-600"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-black" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-black font-bold">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => signInWithGoogleAuth()}
              className="flex items-center justify-center py-3 px-4 border-2 border-black bg-white shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <Image
                src="/gauth/Web/svg/dark/web_dark_rd_SI.svg"
                alt="Sign in with Google"
                width={191}
                height={46}
                className="h-8 w-auto" // Increased height from h-6 to h-8
              />
            </button>
            <GitHubSignInButton />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign, Copy, Check } from "lucide-react";
import { generateUserConnectionKey } from "@/app/actions/generate-user-connection-key";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { signInWithGoogleAuth } from "@/app/actions/auth";

type AIApp = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  loginUrl: string;
  uuid: string;
  rating: string;
  multiplier: string;
  tokenPrice: string;
  amountSpent: number;
  usage: number;
  slug: string; // Add this new property
};

type AIAppProps = {
  app: AIApp;
};

export function AIApplicationCard({ app }: AIAppProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [uuid, setUUID] = useState<string | null>(null);
  const [copiedUUID, setCopiedUUID] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const appName = app.name;
  const avgSpent = 6.73;

  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);
  
  const handleGoogleSignIn = async () => {
    try {
      console.log(`Redirecting to: /a/${app.slug}`);
      await signInWithGoogleAuth(`/a/${app.slug}`);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleGenerateUUID = async () => {
    try {
      const newUUID = await generateUserConnectionKey(app.id);
      setUUID(newUUID);
      // Redirect to checkout page with UUID as a query parameter
      router.push(`/protected/checkout?uuid=${encodeURIComponent(newUUID)}`);
    } catch (error) {
      console.error('Error generating UUID:', error);
    }
  };

  const handleCopyUUID = () => {
    if (uuid) {
      navigator.clipboard.writeText(uuid);
      setCopiedUUID(true);
      setTimeout(() => setCopiedUUID(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-3xl bg-white border-4 sm:border-8 border-black shadow-[12px_12px_0_0_#000] sm:shadow-[24px_24px_0_0_#000] transition-all duration-300 hover:shadow-[6px_6px_0_0_#000] sm:hover:shadow-[12px_12px_0_0_#000] hover:translate-x-1 hover:translate-y-1 sm:hover:translate-x-3 sm:hover:translate-y-3">
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 mb-4 sm:mb-0">
              <Image
                src="/0_0.jpeg"
                alt="Hiero logo"
                width={48}
                height={48}
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
              <h2 className="text-4xl sm:text-6xl text-black font-black uppercase tracking-tighter">Hiero</h2>
            </div>
            <div className="bg-black text-white text-xs sm:text-sm font-bold uppercase py-1 px-2 sm:py-2 sm:px-4 transform rotate-2">
              Beta
            </div>
          </div>

          {/* Tagline */}
          <p className="text-lg sm:text-2xl font-bold text-center border-y-2 sm:border-y-4 border-black py-2 sm:py-4 text-black">
            One Subscription for everything, use any AI application from one subscription.
          </p>

          {/* App Info */}
          <div className="bg-black text-white p-4 sm:p-8 -mx-4 sm:-mx-8">
            <h3 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">{appName}</h3>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <DollarSign className="w-8 h-8 sm:w-12 sm:h-12" />
              <span className="text-3xl sm:text-5xl font-bold">${avgSpent.toFixed(2)}/month</span>
            </div>
            <p className="text-lg sm:text-2xl mt-1 sm:mt-2">Average cost per user per month</p>
          </div>

          {/* Action Area */}
          <div className="space-y-4 sm:space-y-6 flex flex-col items-center">
            {!user ? (
              <button
                onClick={handleGoogleSignIn}
                className="w-full sm:w-2/3 p-0 flex justify-center items-center transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <Image
                  src="/gauth/Web/svg/dark/web_dark_rd_SI.svg"
                  alt="Sign in with Google"
                  width={100}
                  height={91}
                  className="w-full h-auto"
                />
              </button>
            ) : !uuid ? (
              <Button
                onClick={handleGenerateUUID}
                size="lg"
                className="w-full bg-black text-white hover:bg-green-500 hover:text-black border-2 sm:border-4 border-black text-xl sm:text-3xl py-3 sm:py-6 px-4 sm:px-8 font-extrabold uppercase tracking-wider transform transition-all duration-200 hover:scale-105 hover:rotate-1 relative overflow-hidden group before:content-[''] before:absolute before:top-0 before:right-0 before:w-1/2 before:h-full before:bg-green-500 before:transform before:skew-x-[-12deg] before:transition-transform before:duration-300 hover:before:translate-x-[-100%] shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10">Connect your Hiero Wallet!</span>
                <span className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Button>
            ) : (
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between bg-gray-100 p-3 sm:p-6 border-2 sm:border-4 border-black">
                  <span className="font-mono text-lg sm:text-2xl truncate flex-grow mr-2 sm:mr-4">{uuid}</span>
                  <Button
                    onClick={handleCopyUUID}
                    size="sm"
                    className="bg-black text-white hover:bg-white hover:text-black border-2 border-black text-xl sm:text-2xl py-2 sm:py-4 px-3 sm:px-6"
                  >
                    {copiedUUID ? (
                      <Check className="h-6 w-6 sm:h-8 sm:w-8" />
                    ) : (
                      <Copy className="h-6 w-6 sm:h-8 sm:w-8" />
                    )}
                  </Button>
                </div>
                <p className="text-base sm:text-xl text-center font-bold">
                  Your UUID has been generated. Copy it to use with {appName}.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 sm:border-t-4 border-black p-4 sm:p-6 text-black">
          <p className="text-xs sm:text-sm text-center">
            By connecting, you agree to Hiero's{" "}
            <a href="/terms" className="underline font-bold hover:text-gray-600">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline font-bold hover:text-gray-600">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
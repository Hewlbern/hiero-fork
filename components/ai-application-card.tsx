"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign, Copy, Check } from "lucide-react";
import { generateUserConnectionKey } from "@/app/actions/generate-user-connection-key";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
};

type AIAppProps = {
  app: AIApp;
};

export function AIApplicationCard({ app }: AIAppProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [uuid, setUUID] = useState<string | null>(null);
  const [copiedUUID, setCopiedUUID] = useState(false);
  const appName = app.name;
  const avgSpent = 6.73;
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      if (data) {
        const newUUID = await generateUserConnectionKey(app.id);
        setUUID(newUUID);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
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
      <div className="w-full max-w-3xl bg-white border-8 border-black shadow-[24px_24px_0_0_#000] transition-all duration-300 hover:shadow-[12px_12px_0_0_#000] hover:translate-x-3 hover:translate-y-3">
        <div className="p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/0_0.jpeg"
                alt="Hiero logo"
                width={64}
                height={64}
                className="w-16 h-16"
              />
              <h2 className="text-6xl text-black font-black uppercase tracking-tighter">Hiero</h2>
            </div>
            <div className="bg-black text-white text-sm font-bold uppercase py-2 px-4 transform rotate-2">
              Beta
            </div>
          </div>

          {/* Tagline */}
          <p className="text-2xl font-bold text-center border-y-4 border-black py-4 text-black">
            One Subscription for everything, use any AI application from one subscription.
          </p>

          {/* App Info */}
          <div className="bg-black text-white p-8 -mx-8">
            <h3 className="text-4xl font-bold mb-4">{appName}</h3>
            <div className="flex items-center space-x-3">
              <DollarSign className="w-12 h-12" />
              <span className="text-5xl font-bold">${avgSpent.toFixed(2)}/month</span>
            </div>
            <p className="text-2xl mt-2">Average cost per user per month</p>
          </div>

          {/* Action Area */}
          <div className="space-y-6 flex justify-center"> {/* Added flex and justify-center */}
            {!uuid ? (
              <button
                onClick={handleGoogleSignIn}
                className="w-2/3 p-0 flex justify-center items-center transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <Image
                  src="/gauth/Web/svg/dark/web_dark_rd_SI.svg"
                  alt="Sign in with Google"
                  width={100}
                  height={91}
                  className="w-full h-auto"
                />
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-100 p-6 border-4 border-black">
                  <span className="font-mono text-2xl truncate flex-grow mr-4">{uuid}</span>
                  <Button
                    onClick={handleCopyUUID}
                    size="lg"
                    className="bg-black text-white hover:bg-white hover:text-black border-2 border-black text-2xl py-4 px-6"
                  >
                    {copiedUUID ? (
                      <Check className="h-8 w-8" />
                    ) : (
                      <Copy className="h-8 w-8" />
                    )}
                  </Button>
                </div>
                <p className="text-xl text-center font-bold">
                  Your UUID has been generated. Copy it to use with {appName}.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-4 border-black p-6 text-black">
          <p className="text-sm text-center">
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
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign, Copy, Check, ArrowRight, Zap } from "lucide-react";
import { generateUserConnectionKey } from "@/app/actions/generate-user-connection-key";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { signInWithGoogleAuth } from "@/app/actions/auth";
import { motion, AnimatePresence } from "framer-motion";

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
  slug: string;
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
  const [isHovering, setIsHovering] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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

  const steps = [
    { title: "Sign In", description: "Connect with Google to get started" },
    { title: "Connect", description: "Create your unique identifier" },
    { title: "Start Using", description: "Begin using AI applications with Hiero" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white border-4 sm:border-8 border-black shadow-[12px_12px_0_0_#000] sm:shadow-[24px_24px_0_0_#000] transition-all duration-300 hover:shadow-[6px_6px_0_0_#000] sm:hover:shadow-[12px_12px_0_0_#000] hover:translate-x-1 hover:translate-y-1 sm:hover:translate-x-3 sm:hover:translate-y-3"
      >
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Header */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-between"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-4 sm:space-x-4 mb-4 mr-1 sm:mb-0">
              <Image
                src="/0_0.jpeg"
                alt="Hiero logo"
                width={48}
                height={48}
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
              <h2 className="text-4xl sm:text-6xl text-black font-black uppercase tracking-tighter">Hiero</h2>
              <span className="text-xs sm:text-sm text-gray-600 font-medium">Everything, in one subscription</span>

            </div>
            <motion.div 
              className="bg-black text-white text-xs sm:text-sm font-bold uppercase py-1 px-2 sm:py-2 sm:px-4 transform rotate-2"
              whileHover={{ rotate: 0, scale: 1.05 }}
            >
              Beta
            </motion.div>
          </motion.div>

          {/* Tagline */}
          <motion.p 
            className="text-lg sm:text-2xl font-bold text-center border-y-2 sm:border-y-4 border-black py-2 sm:py-4 text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
          All AI apps from one subscription.
          </motion.p>

          {/* App Info */}
          <motion.div 
            className="bg-black text-white p-4 sm:p-8 -mx-4 sm:-mx-8"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">{appName}</h3>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <DollarSign className="w-8 h-8 sm:w-12 sm:h-12" />
              <span className="text-3xl sm:text-5xl font-bold">${avgSpent.toFixed(2)}/month</span>
            </div>
            <p className="text-lg sm:text-2xl mt-1 sm:mt-2">Average cost per user per month</p>
          </motion.div>

          {/* Steps */}
          <motion.div 
            className="flex justify-between items-center px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full ${index <= currentStep ? 'bg-black' : 'bg-gray-300'} flex items-center justify-center text-white font-bold`}>
                  {index + 1}
                </div>
                <p className="text-xs mt-2 text-center">{step.title}</p>
              </div>
            ))}
          </motion.div>

          {/* Action Area */}
          <motion.div 
            className="space-y-4 sm:space-y-6 flex flex-col items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <AnimatePresence mode="wait">
              {!user ? (
                <motion.button
                  key="signin"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleGoogleSignIn}
                  className="w-full sm:w-2/3 p-2 flex justify-center items-center transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 border-4 border-black hover:bg-black group"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Image
                    src={isHovering ? "/gauth/Web/svg/light/web_light_rd_SI.svg" : "/gauth/Web/svg/dark/web_dark_rd_SI.svg"}
                    alt="Sign in with Google"
                    width={220}
                    height={50}
                    className="w-full h-auto"
                  />
                </motion.button>
              ) : !uuid ? (
                <motion.button
                  key="generate"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleGenerateUUID}
                  className="w-full bg-black text-white hover:bg-green-500 hover:text-black border-2 sm:border-4 border-black text-xl sm:text-3xl py-3 sm:py-6 px-4 sm:px-8 font-extrabold uppercase tracking-wider transform transition-all duration-200 hover:scale-105 hover:rotate-1 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Connect your Hiero Wallet! <Zap className="ml-2" />
                  </span>
                  <span className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </motion.button>
              ) : (
                <motion.div
                  key="uuid"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full space-y-4"
                >
                  <div className="flex items-center justify-between bg-gray-100 p-3 sm:p-6 border-2 sm:border-4 border-black">
                    <span className="font-mono text-lg sm:text-2xl truncate flex-grow mr-2 sm:mr-4">{uuid}</span>
                    <Button
                      onClick={handleCopyUUID}
                      size="sm"
                      className="bg-black text-white hover:bg-white hover:text-black border-2 border-black text-xl sm:text-2xl py-2 sm:py-4 px-3 sm:px-6 transition-all duration-200"
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
                  <Button
                    onClick={() => router.push(`/protected/dashboard`)}
                    size="lg"
                    className="w-full bg-green-500 text-black hover:bg-black hover:text-white border-2 sm:border-4 border-black text-xl sm:text-2xl py-3 sm:py-4 font-extrabold uppercase tracking-wider transition-all duration-200"
                  >
                    Go to Dashboard <ArrowRight className="ml-2" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          className="border-t-2 sm:border-t-4 border-black p-4 sm:p-6 text-black"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-xs sm:text-sm text-center">
            By connecting, you agree to Hiero's{" "}
            <a href="/terms" className="underline font-bold hover:text-gray-600 transition-colors duration-200">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline font-bold hover:text-gray-600 transition-colors duration-200">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
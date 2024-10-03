"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CreditCard, Zap, DollarSign, Check } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function SaveCardForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveCard = async () => {
    setIsLoading(true);
    const stripe = await stripePromise;

    const response = await fetch("/api/create-setup-intent", {
      method: "POST",
    });
    const { sessionId } = await response.json();

    const { error } = await stripe!.redirectToCheckout({ sessionId });

    if (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-yellow-400 transform rotate-2"></div>
      <Button
        onClick={handleSaveCard}
        disabled={isLoading}
        className="w-full bg-green-500 text-black px-4 py-4 sm:py-6 text-2xl sm:text-3xl font-black uppercase tracking-wider border-4 sm:border-8 border-black transition-all duration-300 shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 relative overflow-hidden group z-10"
      >
        <span className="relative z-10 flex items-center justify-center transition-colors duration-300 group-hover:text-white">
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              <span>Save Your Card</span>
              <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 ml-2 sm:ml-4" />
            </>
          )}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </Button>
      <motion.div 
        className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-red-500 text-white text-xs sm:text-base font-bold py-1 px-2 sm:py-2 sm:px-4 transform rotate-6"
        whileHover={{ scale: 1.1, rotate: 0 }}
      >
        START NOW!
      </motion.div>
    </motion.div>
  );
}

export default function UsageBasedPricingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-3">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-black border-4 sm:border-8 border-white p-4 sm:p-6 shadow-[8px_8px_0_0_#fff] sm:shadow-[16px_16px_0_0_#fff]"
      >
        <motion.div 
          className="mb-4 sm:mb-6 p-3 sm:p-4 border-2 sm:border-4 border-white bg-blue-500 text-white font-black relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div 
            className="absolute top-0 right-0 bg-black text-white text-xs font-bold py-1 px-2 transform rotate-12 translate-x-6 -translate-y-2"
            whileHover={{ scale: 1.1, rotate: 0 }}
          >
            LIMITED TIME
          </motion.div>
          <h2 className="text-xl sm:text-3xl mb-1 sm:mb-2 uppercase group-hover:text-yellow-300 transition-colors duration-300">First Month FREE!</h2>
          <p className="text-sm sm:text-base group-hover:text-yellow-100 transition-colors duration-300">Try risk-free. Cancel anytime during trial.</p>
          <Zap className="absolute bottom-1 right-1 w-4 h-4 sm:w-6 sm:h-6 group-hover:text-yellow-300 transition-colors duration-300" />
        </motion.div>

        <h1 className="text-2xl sm:text-4xl font-black mb-4 uppercase tracking-tight">Pay As You Go</h1>
        
        <motion.div 
          className="mb-4 sm:mb-6 p-3 sm:p-4 border-2 sm:border-4 border-white bg-white text-black font-black relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div 
            className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold py-1 px-2 transform rotate-12 translate-x-6 -translate-y-2"
            whileHover={{ scale: 1.1, rotate: 0 }}
          >
            FLEXIBLE PRICING
          </motion.div>
          <h2 className="text-xl sm:text-3xl mb-1 sm:mb-2 uppercase group-hover:text-blue-600 transition-colors duration-300">Credits for Any AI App!</h2>
          <p className="text-sm sm:text-base group-hover:text-blue-500 transition-colors duration-300">Use credits across our entire AI app ecosystem.</p>
          <DollarSign className="absolute bottom-1 right-1 w-4 h-4 sm:w-6 sm:h-6 group-hover:text-blue-500 transition-colors duration-300" />
        </motion.div>
        
        <div className="space-y-4 sm:space-y-6 mb-4 sm:mb-6">
          <motion.div 
            className="bg-white text-black p-2 sm:p-3 font-mono text-xs sm:text-sm border-l-2 sm:border-l-4 border-blue-500 transition-all duration-300"
            whileHover={{ borderLeftWidth: '8px', x: 4 }}
          >
            <p>{'// Fair and transparent pricing'}</p>
            <p>{'// Pay only for what you use'}</p>
            <p>{'// Use credits on any AI app'}</p>
          </motion.div>
          <SaveCardForm />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <motion.div 
            className="p-2 sm:p-3 border-2 sm:border-4 border-white group"
            whileHover={{ scale: 1.05, borderColor: '#3B82F6' }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Check className="w-4 h-4 sm:w-6 sm:h-6 mb-1 sm:mb-2 text-blue-500 group-hover:text-green-500 transition-colors duration-300" />
            <h3 className="text-base sm:text-lg font-bold mb-1 group-hover:text-blue-300 transition-colors duration-300">Universal Credits</h3>
            <p className="text-xs sm:text-sm group-hover:text-blue-100 transition-colors duration-300">Credits work across all AI apps in our ecosystem.</p>
          </motion.div>
          <motion.div 
            className="p-2 sm:p-3 border-2 sm:border-4 border-white group"
            whileHover={{ scale: 1.05, borderColor: '#3B82F6' }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 mb-1 sm:mb-2 text-blue-500 group-hover:text-green-500 transition-colors duration-300" />
            <h3 className="text-base sm:text-lg font-bold mb-1 group-hover:text-blue-300 transition-colors duration-300">Instant Access</h3>
            <p className="text-xs sm:text-sm group-hover:text-blue-100 transition-colors duration-300">Start using our AI services immediately.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
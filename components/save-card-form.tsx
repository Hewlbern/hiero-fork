"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface SaveCardButtonProps {
  onSave?: () => void;  // Made optional
  isTest?: boolean;
}

export default function SaveCardButton({ onSave, isTest = false }: SaveCardButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveCard = async () => {
    setIsLoading(true);

    if (isTest) {
      // Simulate a successful save for testing
      setTimeout(() => {
        setIsLoading(false);
        onSave?.();  // Use optional chaining
      }, 1000);
      return;
    }

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
    onSave?.();  // Call onSave if it exists
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full max-w-md mx-auto"
    >
      <Button
        onClick={handleSaveCard}
        disabled={isLoading}
        className="w-full bg-cyan-300 text-black px-6 py-6 text-2xl sm:text-3xl font-black uppercase tracking-wider border-4 sm:border-8 border-black transition-all duration-300 shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 relative overflow-hidden group z-10"
      >
        <span className="relative z-10 flex items-center justify-center transition-colors duration-300 group-hover:text-white">
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              <span>Save Your Card</span>
              <CreditCard className="w-8 h-8 ml-4" />
            </>
          )}
        </span>
        <span className="absolute inset-0 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </Button>
    
    </motion.div>
  );
}
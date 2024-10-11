import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { signInWithGoogleAuth } from "@/app/actions/auth";


interface SignInStepProps {
  onSignIn: () => void;
}

export default function SignInStep({ onSignIn }: SignInStepProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogleAuth("/checkout");
      onSignIn();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <>
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

    </>
  );
}
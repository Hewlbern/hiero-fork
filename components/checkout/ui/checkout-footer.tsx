import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.div 
      className="flex-shrink-0 border-t-2 sm:border-t-4 border-black p-4 sm:p-6 text-black"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <p className="text-xs sm:text-sm text-center">
        By continuing, you agree to Hiero's{" "}
        <a href="/terms" className="underline font-bold hover:text-sky-600 transition-colors duration-200">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline font-bold hover:text-emerald-600 transition-colors duration-200">
          Privacy Policy
        </a>
      </p>
    </motion.div>
  );
};

export default Footer;
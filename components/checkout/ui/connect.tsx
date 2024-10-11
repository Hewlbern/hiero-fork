import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ConnectToHieroProps {
  appName: string | null;
  onGenerateUUID: () => void;
  onGoToDashboard: () => void;
}

const ConnectToHiero: React.FC<ConnectToHieroProps> = ({ appName, onGenerateUUID, onGoToDashboard }) => {
  return (
    <motion.div
      key="connect"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-4"
    >
      <p className="text-xl sm:text-2xl text-center font-bold">
        Connect to Hiero
      </p>
      <Button
        onClick={appName ? onGenerateUUID : onGoToDashboard}
        size="lg"
        className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white hover:from-sky-600 hover:to-emerald-600 border-2 sm:border-4 border-black text-xl sm:text-2xl py-3 sm:py-4 font-extrabold uppercase tracking-wider transition-all duration-200"
      >
        {appName ? "Generate Connection Key" : "Go to Apps Dashboard"} <ArrowRight className="ml-2" />
      </Button>
    </motion.div>
  );
};

export default ConnectToHiero;
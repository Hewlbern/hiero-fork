import React from "react";
import { DollarSign, Zap } from "lucide-react";
import { motion } from "framer-motion";

type AppInfoProps = {
  name: string;
  avgSpent: number;
  icon?: React.ReactNode;
};

const AppInfo: React.FC<AppInfoProps> = ({ name, avgSpent, icon }) => (
  <motion.div 
    className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white p-4 sm:p-8 -mx-4 sm:-mx-8"
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.6 }}
  >
    <div className="flex items-center space-x-3 mb-2 sm:mb-4">
      {icon || <Zap className="w-8 h-8 sm:w-12 sm:h-12" />}
      <h3 className="text-2xl sm:text-4xl font-bold">{name}</h3>
    </div>
    <div className="flex items-center space-x-2 sm:space-x-3">
      <DollarSign className="w-8 h-8 sm:w-12 sm:h-12" />
      <span className="text-3xl sm:text-5xl font-bold">${avgSpent.toFixed(2)}/month</span>
    </div>
    <p className="text-lg sm:text-2xl mt-1 sm:mt-2">Average cost per user per month</p>
  </motion.div>
);

export default AppInfo;
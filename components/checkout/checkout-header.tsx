import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CheckoutHeader: React.FC = () => {
  return (
    <>
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
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter">
            <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">Hiero</span>
          </h2>
          <span className="text-xs sm:text-sm text-gray-600 font-medium">Everything, in one subscription</span>
        </div>
        <motion.div 
          className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-xs sm:text-sm font-bold uppercase py-1 px-2 sm:py-2 sm:px-4 transform rotate-2"
          whileHover={{ rotate: 0, scale: 1.05 }}
        >
          Beta
        </motion.div>
      </motion.div>

      <motion.p 
        className="text-lg sm:text-2xl font-bold text-center border-y-2 sm:border-y-4 border-black py-2 sm:py-4 bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent mb-8 sm:mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        All AI apps from one subscription.
      </motion.p>
    </>
  );
};

export default CheckoutHeader;
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CheckoutHeader: React.FC = () => {
  return (
    <>
      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-between mb-4 pb-2 border-b-4 border-black"
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
            <span className="bg-black bg-clip-text text-transparent">Hiero</span>
          </h2>
          <span className="text-xs sm:text-sm text-gray-600 font-medium">One subscription, endless AI possibilities.</span>
        </div>
        <motion.div 
          className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-xs sm:text-sm font-bold uppercase py-1 px-2 sm:py-2 sm:px-4 transform rotate-2"
          whileHover={{ rotate: 0, scale: 1.05 }}
        >
          Beta
        </motion.div>
      </motion.div>


    </>
  );
};

export default CheckoutHeader;
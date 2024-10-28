import { motion } from 'framer-motion'
import React from 'react'

interface PaymentStepsProps {
  steps: string[]
  activeStep: number
}

const PaymentSteps: React.FC<PaymentStepsProps> = ({ steps, activeStep }) => {
  return (
    <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
      <h2 className="text-xl mb-4 font-bold uppercase bg-white text-black inline-block px-2">Follow these steps:</h2>
      <ul className="space-y-4">
        {steps.map((step, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`
              border-2 border-white p-4 flex justify-between items-center
              ${index <= activeStep ? 'bg-white text-black' : 'bg-black text-white'}
              transform transition-all duration-300 ease-in-out
              ${index <= activeStep ? 'translate-y-[-4px]' : ''}
              ${index <= activeStep ? 'shadow-[4px_4px_0px_0px_rgba(255,59,48,1)]' : ''}
            `}
          >
            <span className="font-mono text-sm font-bold">
              [{index + 1}] {step}
            </span>
            <div className={`w-4 h-4 rounded-full ${index <= activeStep ? 'bg-red-500' : 'bg-white'}`}></div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default PaymentSteps

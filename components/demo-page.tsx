'use client'

import React from 'react'
import { motion } from 'framer-motion'
import HieroCheckoutButton from 'hiero-ui'
import Link from 'next/link'

interface AppData {
  name: string
  description: string
  redirectUrl: string
  features: string[]
  slug: string
  ctaTitle?: string
  pricingInfo?: {
    duration: string
    details: string
  }
  defaultEmail?: string
}

interface DemoPageProps {
  appData: AppData
}

const DemoPage: React.FC<DemoPageProps> = ({ appData }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-2 sm:p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden mb-16 "
      >
        <div className="bg-gradient-to-r from-blue-600 to-green-500 p-8 sm:p-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-white text-center"
          >
            {appData.name}
          </motion.h1>
        </div>
        <div className="p-8 sm:p-12 space-y-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-gray-700 text-center"
          >
            {appData.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-blue-800 text-center mb-2">
              Exclusive Offer
            </h2>
            <p className="text-blue-700 text-center text-lg">
              Get 1 Million Free Tokens
            </p>
            <p className="text-blue-600 text-center">
              Equivalent to a Full Month Subscription
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col items-center space-y-4"
          >
            <HieroCheckoutButton 
              appName={appData.slug}
              redirectUrl={appData.redirectUrl}
              email={appData.defaultEmail || ''}
            />
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-sm text-gray-600">
                Secure checkout. No Payment required. We pay you.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed bottom-3 right-3 z-10"
    >
      <Link
        href="/sign-up"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl p-4 font-bold text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-cyan-500 to-lime-500 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:translate-y-1 rounded-xl"></span>
        <span className="relative flex items-center space-x-2 bg-white px-4 py-2 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:translate-y-1 rounded-lg">
         <div className="flex flex-col">
          <span className="text-sm font-black uppercase">Dev? </span>
          <span className="text-sm font-black uppercase">Payments?</span>
          <span className="text-lg font-black uppercase">use Hiero!</span>
          </div>
          <motion.svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </motion.svg>
        </span>
      </Link>
    </motion.div>
    </div>
  )
}

export default DemoPage
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, Calendar, Lock, Mail, ArrowRight, X } from 'lucide-react'
import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { generateUserConnectionKey } from "@/app/actions/generate-user-connection-key"

type AIApp = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  loginUrl: string;
  uuid: string;
  rating: string;
  multiplier: string;
  tokenPrice: string;
  amountSpent: number;
  usage: number;
  slug: string;
  email: string; // Add this line
};

type AIAppProps = {
  app: AIApp;
};

// Add this near the top of your file, outside of the component
const isDevelopment = process.env.NODE_ENV === 'development'

export function HieroCheckout({ app }: AIAppProps) {
  const router = useRouter()
  const [uuid, setUUID] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [cardSaved, setCardSaved] = useState(false)
  const [step, setStep] = useState('verify')
  const [verificationCode, setVerificationCode] = useState(['', '', '', ''])
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [newEmail, setNewEmail] = useState('')

  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) setCurrentStep(1)
    }
    checkUser()
  }, [])

  useEffect(() => {
    if (app.email) {
      handleSignInWithOTP()
    }
  }, [app.email])

  const handleSignInWithOTP = async () => {
    setIsLoading(true)
    setError(null)

    if (isDevelopment) {
      console.log('Development mode: Simulating OTP sign-in for', app.email)
      
      // Simulate a 1-second loading time
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStep('verify')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: app.email,
        options: {
          shouldCreateUser: true,
        },
      })

      if (error) throw error

      setStep('verify')
    } catch (err) {
      console.error('Error sending OTP:', err)
      setError('Failed to send verification code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateUUID = async () => {
    try {
      const newUUID = await generateUserConnectionKey(app.id)
      setUUID(newUUID)
      setCurrentStep(2)
    } catch (error) {
      console.error('Error generating UUID:', error)
    }
  }

  const handleCardSaved = () => {
    setCardSaved(true)
    setCurrentStep(2)
  }

  const handleSignIn = () => {
    setCurrentStep(1)
  }

  const handleGoToDashboard = () => {
    router.push(`/protected/dashboard/apps`)
  }

  const handleVerificationChange = (index: number, value: string) => {
    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)
    if (value && index < 3) {
      document.getElementById(`code-${index + 1}`)?.focus()
    }
  }

  const handleCardDetailsChange = (field: string, value: string) => {
    setCardDetails({ ...cardDetails, [field]: value })
  }

  const handleVerifyOTP = async () => {
    setIsLoading(true)
    setError(null)

    if (isDevelopment) {
      console.log('Development mode: Simulating OTP verification')
      setStep('payment')
      setIsLoading(false)
      return
    }

    const otp = verificationCode.join('')

    try {
      const { error } = await supabase.auth.verifyOtp({
        email: app.email,
        token: otp,
        type: 'email',
      })

      if (error) throw error

      setStep('payment')
    } catch (err) {
      console.error('Error verifying OTP:', err)
      setError('Invalid verification code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically update the email in your backend
    // For now, we'll just update the local state
    app.email = newEmail
    setShowEmailModal(false)
    setNewEmail('')
    // You might want to reset the verification process here
    setStep('verify')
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-[#e0e0e0] p-4 pt-8">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#e0e0e0] rounded-2xl overflow-hidden"
      >
        <div className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-1">Hiero</h1>
            <p className="text-sm text-gray-600 mb-2">Pay once, use many</p>
            <div className="w-16 h-0.5 bg-white mx-auto"></div>
          </div>

          <div className="bg-white rounded-lg p-4 mb-8 flex items-center shadow-md">
            <div className="w-10 h-10 bg-black rounded-full mr-4 flex items-center justify-center text-white">
              <Mail size={20} />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium">{app.email}</p>
              <p className="text-xs text-gray-500">Balance: 1,000,000 free tokens!</p>
            </div>
            <button 
              className="text-xs text-gray-500 hover:underline"
              onClick={() => setShowEmailModal(true)}
            >
              Not you?
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 'verify' ? (
              <motion.div
                key="verify"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-[400px]"
              >
                {isLoading ? (
                  <div className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Verify your email</h2>
                      <p className="text-sm text-gray-600 mb-6 flex items-center">
                        <Lock className="mr-2" size={16} />
                        Just making sure you're "you" <span className="ml-2" role="img" aria-label="winking face">😉</span>
                      </p>
                      <div className="flex justify-between mb-2">
                        {verificationCode.map((digit, index) => (
                          <input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            maxLength={1}
                            className="w-14 h-14 text-center text-2xl font-bold border-2 border-black rounded-lg focus:border-black focus:outline-none bg-transparent"
                            value={digit}
                            onChange={(e) => handleVerificationChange(index, e.target.value)}
                          />
                        ))}
                      </div>
                      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                    <div className="flex-grow"></div>
                    <div>
                      <div className="w-full h-0.5 bg-white mb-6"></div>
                      <button
                        className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
                        onClick={handleVerifyOTP}
                        disabled={isLoading}
                      >
                        <span>Verify</span>
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4">Add Payment Method</h2>
                <p className="text-sm text-gray-600 mb-6">
                  This is so we can confirm your identity to give your free tokens.
                  <br />
                  <strong>You won't be charged</strong>
                </p>
                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Card number"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-black focus:outline-none bg-white"
                      value={cardDetails.number}
                      onChange={(e) => handleCardDetailsChange('number', e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-black focus:outline-none bg-white"
                      value={cardDetails.expiry}
                      onChange={(e) => handleCardDetailsChange('expiry', e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-black focus:outline-none bg-white"
                      value={cardDetails.cvc}
                      onChange={(e) => handleCardDetailsChange('cvc', e.target.value)}
                    />
                  </div>
                </div>
                <button className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg">
                  <span>Save Card</span>
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Email Change Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Change Email</h2>
                <button onClick={() => setShowEmailModal(false)}>
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleEmailChange}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    New Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Update Email
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
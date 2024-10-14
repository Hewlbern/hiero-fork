'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, Calendar, Lock, Mail, ArrowRight, X } from 'lucide-react'
import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { generateUserConnectionKey } from "@/app/actions/generate-user-connection-key"
import { signInWithGoogleAuth, handleSignInWithOTP, handleVerifyOTP } from "@/app/actions/auth";
import { EmailChangeModal } from '@/components/auth/email-modal';
import SignInComponent from '@/components/checkout/ui/otp-step'; // Add this import
import { Button } from "@/components/ui/button"

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
  redirectUrl: string; // Add this line
};

type AIAppProps = {
  app: AIApp;
  PaymentComponent: React.ComponentType<SaveCardButtonProps>; // Add this line
  test?: boolean; // Add this line
};

interface SaveCardButtonProps {
  onSave?: () => void;
  isTest?: boolean;
}

// Add this near the top of your file, outside of the component

// Add this type definition
type GoogleAuthResult = {
  user: User | null;
  error?: string;
};


// New Header component
function Header() {
  return (
    <div className="text-center mb-6">
      <h1 className="text-4xl text-black font-bold mb-1">Hiero</h1>
      <p className="text-sm text-gray-600 mb-2">Pay once, use many</p>
      <div className="w-16 h-0.5 bg-white mx-auto"></div>
    </div>
  );
}
// New EmailInfo component
function EmailInfo({ email, onChangeEmail }: { email: string; onChangeEmail: () => void }) {
  return (
    <div className="bg-white rounded-lg p-4 mb-8 flex items-center shadow-md">
      <div className="w-10 h-10 bg-black rounded-full mr-4 flex items-center justify-center text-white">
        <Mail size={20} />
      </div>
      <div className="flex-grow">
        <p className="text-sm text-black font-medium">{email}</p>
        <p className="text-xs text-gray-500">Balance: 1,000,000 free tokens!</p>
      </div>
      <button 
        className="text-xs text-gray-500 hover:underline"
        onClick={onChangeEmail}
      >
        Not you?
      </button>
    </div>
  );
}


export function HieroCheckout({ app, PaymentComponent }: AIAppProps) {
  const isDevelopment = true
  //process.env.NODE_ENV === 'development'  || test
  const router = useRouter()
  const [uuid, setUUID] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [cardSaved, setCardSaved] = useState(false)
  const [step, setStep] = useState('verify')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showEmailModal, setShowEmailModal] = useState(false)

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
      handleSignInWithOTPCheck()
    }
  }, [app.email])

  const handleSignInWithOTPCheck = async () => {
    setIsLoading(true);
    setError(null);

    const result = await handleSignInWithOTP(app.email, isDevelopment ?? false);

    if (result.success) {
      setStep('verify');
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

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

  const handleEmailChange = (newEmail: string) => {
    app.email = newEmail;
    setShowEmailModal(false);
    setStep('verify');
  };

  const handleSaveCard = () => {
    // Implement the logic for saving the card
    console.log('Card saved');
    setStep('success');
    
    // Check if redirectUrl is provided and redirect after a short delay
    if (app.redirectUrl) {
      setTimeout(() => {
        window.location.href = app.redirectUrl;
      }, 2000); // 2-second delay before redirect
    }
  };


  const handleVerificationSuccess = () => {
    setStep('payment');
  };


const handleConnectApp = () => {
  // Implement the logic to connect to app.name
  console.log(`Connecting to ${app.name}`)
}

const handleBuyTokens = () => {
  // Implement the logic to buy Hiero Tokens
  console.log('Buying $10 of Hiero Tokens')
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
          <Header />

          <EmailInfo 
            email={app.email} 
            onChangeEmail={() => setShowEmailModal(true)} 
          />

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
                <SignInComponent
                  email={app.email}
                  onVerificationSuccess={handleVerificationSuccess}
                  isDevelopment={isDevelopment ?? false}
                />
              </motion.div>
            ) : step === 'payment' ? (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                
                <PaymentComponent onSave={handleSaveCard} isTest={isDevelopment ?? false} />
              </motion.div>
            ) : (
              <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-2xl text-black font-bold mb-4">Hiero Account Created</h2>
              <p className="text-sm text-gray-600 mb-6">
                Your card has been saved successfully.
              </p>
              <div>
                Do you want too
              </div>
              <div className="flex flex-col w-full gap-4 mt-4">
                <Button onClick={handleConnectApp} className="w-full">
                  Connect to {app.name}
                </Button>
                <Button onClick={handleBuyTokens} variant="outline" className="w-full">
                  Buy $10 of Hiero Tokens for an extra 3 months of usage
                </Button>
              </div>
              {app.redirectUrl && (
                <p className="text-sm text-gray-600 mt-4">
                  You will be redirected in a moment...
                </p>
              )}
            </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <EmailChangeModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onEmailChange={handleEmailChange}
        isDevelopment={isDevelopment ?? false}
      />
    </div>
  )
}
